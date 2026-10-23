// SPDX-License-Identifier: GPL-3.0-only
// Package mobile is the primitive-type boundary used by the Android gomobile binding.
// Kotlin owns VPN permission and TUN setup. No Controller or per-handshake telemetry is exposed.
package mobile

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net"
	"net/http"
	"net/url"
	"regexp"
	"runtime"
	"strconv"
	"strings"
	"sync"
	"time"
	"unicode"

	"github.com/metacubex/mihomo/adapter/outbound"
	"github.com/metacubex/mihomo/component/proxydialer"
	C "github.com/metacubex/mihomo/constant"
)

const engineVersion = "v1.19.32"
const maxProbeRuns = 16

type node struct {
	Type                     string   `json:"type"`
	Name                     string   `json:"name,omitempty"`
	Server                   string   `json:"server"`
	Port                     int      `json:"port"`
	Password                 string   `json:"password,omitempty"`
	Username                 string   `json:"username,omitempty"`
	SNI                      string   `json:"sni,omitempty"`
	ClientFingerprint        string   `json:"client-fingerprint,omitempty"`
	ALPN                     []string `json:"alpn,omitempty"`
	SkipCertVerify           bool     `json:"skip-cert-verify,omitempty"`
	UDP                      bool     `json:"udp,omitempty"`
	TLS                      bool     `json:"tls,omitempty"`
	IdleSessionCheckInterval int      `json:"idle-session-check-interval,omitempty"`
	IdleSessionTimeout       int      `json:"idle-session-timeout,omitempty"`
	MinIdleSession           int      `json:"min-idle-session,omitempty"`
	DisableReuse             bool     `json:"disable-reuse,omitempty"`
}

type response struct {
	RunID         string `json:"runId,omitempty"`
	Engine        string `json:"engine"`
	EngineVersion string `json:"engineVersion"`
	State         string `json:"state"`
	Code          string `json:"code"`
	HTTPStatus    int    `json:"httpStatus,omitempty"`
	ElapsedMs     int64  `json:"elapsedMs,omitempty"`
}

var runs = struct {
	sync.Mutex
	active map[string]*probeRun
}{active: make(map[string]*probeRun)}

type probeRun struct {
	ctx     context.Context
	cancel  context.CancelFunc
	claimed bool
	expiry  *time.Timer
}

var validRunID = regexp.MustCompile(`^[A-Za-z0-9-]{1,64}$`)

// Info reports the capabilities of this Go package, not of an Android APK.
func Info() string {
	encoded, _ := json.Marshal(struct {
		Engine         string   `json:"engine"`
		Version        string   `json:"engineVersion"`
		Capabilities   []string `json:"capabilities"`
		VPNAvailable   bool     `json:"vpnAvailable"`
		StageTelemetry bool     `json:"stageTelemetry"`
	}{"mihomo", engineVersion, []string{"validate-node", "import-profile", "proxy-http-probe", "cancel", "vpn", "runtime-options", "outbound-rules", "dns-https", "live-counters", "connection-control"}, runtime.GOOS == "android", false})
	return string(encoded)
}

// ValidateNode validates the supported single-node JSON subset. It never authenticates a node.
func ValidateNode(configJSON string) (encoded string) {
	defer func() {
		if recover() != nil {
			encoded = encode("", "failed", "internal_error", 0, 0)
		}
	}()
	proxy, err := parseNode(configJSON)
	if err != nil {
		return encode("", "failed", "config_invalid", 0, 0)
	}
	defer proxy.Close()
	return encode("", "passed", "config_valid_not_connected", 0, 0)
}

// Probe performs one request through the supplied node. The result deliberately
// contains no URL, hostname, SNI, node label, password, raw error or response body.
func Probe(configJSON, targetURL, runID string, timeoutMillis int) (encoded string) {
	return probe(configJSON, targetURL, runID, timeoutMillis, false, false)
}

// ProbeDelay uses HEAD and optional connection reuse, matching the upstream
// unified-delay measurement. It reports reachability, never TLS identity proof.
// HTTP is permitted only for explicit delay targets, not subscription downloads.
func ProbeDelay(configJSON, targetURL, runID string, timeoutMillis int, unified bool) string {
	return probe(configJSON, targetURL, runID, timeoutMillis, true, unified)
}

func probe(configJSON, targetURL, runID string, timeoutMillis int, delay, unified bool) (encoded string) {
	defer func() {
		if recover() != nil {
			encoded = encode("", "failed", "internal_error", 0, 0)
		}
	}()
	if !validRunID.MatchString(runID) {
		return encode("", "failed", "invalid_run_id", 0, 0)
	}
	if (!delay && !validTarget(targetURL)) || (delay && !validDelayTarget(targetURL)) {
		return encode(runID, "failed", "target_invalid", 0, 0)
	}
	if timeoutMillis < 100 || timeoutMillis > 30000 {
		return encode(runID, "failed", "timeout_invalid", 0, 0)
	}
	proxy, err := parseNode(configJSON)
	if err != nil {
		return encode(runID, "failed", "config_invalid", 0, 0)
	}
	defer proxy.Close()
	runs.Lock()
	entry := runs.active[runID]
	if entry != nil && entry.claimed {
		runs.Unlock()
		return encode(runID, "not_attempted", "already_running", 0, 0)
	}
	if entry == nil && len(runs.active) >= maxProbeRuns {
		runs.Unlock()
		return encode(runID, "not_attempted", "resource_busy", 0, 0)
	}
	if entry == nil {
		entry = reserveRun(runID, timeoutMillis)
	}
	entry.claimed = true
	runs.Unlock()
	ctx, cancel := context.WithTimeout(entry.ctx, time.Duration(timeoutMillis)*time.Millisecond)
	defer cancel()
	defer func() {
		runs.Lock()
		delete(runs.active, runID)
		runs.Unlock()
		entry.expiry.Stop()
		entry.cancel()
	}()

	transport := &http.Transport{
		// No environment HTTP proxy and no fallback to a direct route.
		DialContext: func(dialContext context.Context, _, address string) (net.Conn, error) {
			// net/http detaches its dial context from a cancelled request. Explicitly
			// retain this run's deadline so a stalled proxy handshake cannot outlive it.
			dialRun, stopDial := context.WithCancel(ctx)
			stopTransportWatch := context.AfterFunc(dialContext, stopDial)
			defer stopTransportWatch()
			defer stopDial()
			metadata := &C.Metadata{NetWork: C.TCP, Type: C.INNER}
			if err := metadata.SetRemoteAddress(address); err != nil {
				return nil, err
			}
			conn, err := proxy.DialContext(dialRun, metadata)
			if err != nil {
				return nil, &proxyConnectError{cause: err}
			}
			return conn, nil
		},
		TLSHandshakeTimeout:    time.Duration(timeoutMillis) * time.Millisecond,
		DisableKeepAlives:      !unified,
		DisableCompression:     true,
		MaxResponseHeaderBytes: 32 * 1024,
	}
	defer transport.CloseIdleConnections()
	client := &http.Client{
		Transport:     transport,
		CheckRedirect: func(*http.Request, []*http.Request) error { return http.ErrUseLastResponse },
	}
	method := http.MethodGet
	if delay {
		method = http.MethodHead
	}
	request, err := http.NewRequestWithContext(ctx, method, targetURL, nil)
	if err != nil {
		return encode(runID, "failed", "target_invalid", 0, 0)
	}
	request.Header.Set("User-Agent", "PingClash-Diagnostic/0.2")
	// Auto-group health selection is preparation, not the selected path's RTT.
	// It remains inside the cancellation/deadline budget.
	if delay {
		if graph, ok := proxy.(*runtimeGraph); ok {
			_ = graph.activate(ctx)
		}
	}
	started := time.Now()
	reply, err := client.Do(request)
	elapsed := time.Since(started).Milliseconds()
	if delay && unified && err == nil {
		_ = reply.Body.Close()
		secondStart := time.Now()
		second, secondErr := client.Do(request)
		if secondErr == nil {
			reply = second
			elapsed = time.Since(secondStart).Milliseconds()
		} else if ctx.Err() != nil {
			err = secondErr
		}
	}
	if err != nil {
		if errors.Is(err, errSocketPolicy) {
			return encode(runID, "blocked", "local_network_restriction", 0, elapsed)
		}
		if errors.Is(ctx.Err(), context.Canceled) {
			return encode(runID, "cancelled", "cancelled", 0, elapsed)
		}
		var networkError net.Error
		code := proxyFailureCode(err)
		if code != "proxy_or_target_failed" && code != "proxy_channel_failed" {
			return encode(runID, "failed", code, 0, elapsed)
		}
		if errors.Is(ctx.Err(), context.DeadlineExceeded) || errors.As(err, &networkError) && networkError.Timeout() {
			return encode(runID, "failed", "timeout_stage_unknown", 0, elapsed)
		}
		return encode(runID, "failed", code, 0, elapsed)
	}
	defer reply.Body.Close()
	if !delay && (reply.StatusCode < 200 || reply.StatusCode >= 300) {
		return encode(runID, "failed", "target_http_status", reply.StatusCode, elapsed)
	}
	if delay {
		return encode(runID, "passed", "proxy_delay_measured", reply.StatusCode, elapsed)
	}
	return encode(runID, "passed", "proxy_request_verified", reply.StatusCode, elapsed)
}

// Cancel cancels only an existing run. It does not create background work.
func Cancel(runID string) bool {
	runs.Lock()
	entry, exists := runs.active[runID]
	runs.Unlock()
	if exists {
		entry.cancel()
	}
	return exists
}

// PrepareProbe reserves a cancellation token before the Java-to-Go call starts.
// A cancellation between auxiliary checks and Probe must prevent network traffic.
func PrepareProbe(runID string, timeoutMillis int) bool {
	if !validRunID.MatchString(runID) || timeoutMillis < 100 || timeoutMillis > 30000 {
		return false
	}
	runs.Lock()
	defer runs.Unlock()
	if _, exists := runs.active[runID]; exists || len(runs.active) >= maxProbeRuns {
		return false
	}
	reserveRun(runID, timeoutMillis)
	return true
}

func reserveRun(runID string, timeoutMillis int) *probeRun {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeoutMillis)*time.Millisecond)
	entry := &probeRun{ctx: ctx, cancel: cancel}
	runs.active[runID] = entry
	entry.expiry = time.AfterFunc(time.Duration(timeoutMillis+100)*time.Millisecond, func() {
		runs.Lock()
		defer runs.Unlock()
		if runs.active[runID] == entry && !entry.claimed {
			delete(runs.active, runID)
			cancel()
		}
	})
	return entry
}

// DiscardProbe releases an unclaimed reservation or cancels an executing probe.
func DiscardProbe(runID string) {
	runs.Lock()
	defer runs.Unlock()
	if entry := runs.active[runID]; entry != nil {
		entry.cancel()
		if !entry.claimed {
			delete(runs.active, runID)
			entry.expiry.Stop()
		}
	}
}

func parseNode(configJSON string) (C.ProxyAdapter, error) {
	if len(configJSON) <= 3*1024*1024 {
		var header struct {
			Type string `json:"type"`
		}
		if json.Unmarshal([]byte(configJSON), &header) == nil && header.Type == "profile-target" {
			return parseProfileTarget(configJSON)
		}
	}
	return parseNodeWithDialer(configJSON, nil)
}

func parseNodeWithDialer(configJSON string, via C.Dialer) (C.ProxyAdapter, error) {
	invalid := errors.New("config_invalid")
	if len(configJSON) == 0 || len(configJSON) > 96*1024 {
		return nil, invalid
	}
	mapping, err := strictNodeObject(configJSON)
	if err != nil {
		return nil, invalid
	}
	if raw, exists := mapping["dialer-chain"]; exists {
		if via != nil {
			return nil, invalid
		}
		chain, ok := raw.([]any)
		if !ok || len(chain) == 0 || len(chain) > 7 {
			return nil, invalid
		}
		owned := []C.ProxyAdapter{}
		retained := false
		defer func() {
			if !retained {
				for _, p := range owned {
					_ = p.Close()
				}
			}
		}()
		fail := func() (C.ProxyAdapter, error) {
			return nil, invalid
		}
		for i := len(chain) - 1; i >= 0; i-- {
			text, ok := chain[i].(string)
			if !ok {
				return fail()
			}
			child, err := strictNodeObject(text)
			if err != nil {
				return fail()
			}
			if _, exists := child["dialer-chain"]; exists {
				return fail()
			}
			p, err := parseNodeWithDialer(text, via)
			if err != nil {
				return fail()
			}
			owned = append(owned, p)
			via = proxydialer.New(p, false)
		}
		delete(mapping, "dialer-chain")
		encoded, _ := json.Marshal(mapping)
		p, err := parseNodeWithDialer(string(encoded), via)
		if err != nil {
			return fail()
		}
		retained = true
		return &ownedChain{ProxyAdapter: p, children: owned}, nil
	}
	kind, _ := mapping["type"].(string)
	if kind != "anytls" && kind != "socks5" {
		return parseExtendedNodeWithDialer(configJSON, via)
	}
	if !checkFields(mapping, basicNodeFields, 0) {
		return nil, invalid
	}
	var config node
	decoder := json.NewDecoder(strings.NewReader(configJSON))
	decoder.DisallowUnknownFields()
	if decoder.Decode(&config) != nil {
		return nil, invalid
	}
	if decoder.Decode(new(any)) != io.EOF {
		return nil, invalid
	}
	if !validHost(config.Server) || config.Port < 1 || config.Port > 65535 {
		return nil, invalid
	}
	if config.SNI != "" && !validHost(config.SNI) {
		return nil, invalid
	}
	if len(config.Password) > 1024 || len(config.Username) > 256 || len(config.Name) > 512 ||
		len(config.ClientFingerprint) > 64 || len(config.ALPN) > 16 {
		return nil, invalid
	}
	for _, protocol := range config.ALPN {
		if len(protocol) == 0 || len(protocol) > 255 {
			return nil, invalid
		}
	}
	config.Server = strings.TrimSuffix(config.Server, ".")
	config.SNI = strings.TrimSuffix(config.SNI, ".")
	switch config.Type {
	case "anytls":
		if config.Password == "" || config.Username != "" || config.TLS || config.IdleSessionCheckInterval > 600 || config.IdleSessionTimeout > 3600 || config.MinIdleSession > 16 {
			return nil, invalid
		}
		return outbound.NewAnyTLS(outbound.AnyTLSOption{
			BasicOption: outbound.BasicOption{DialerForAPI: via},
			Name:        "node-01", Server: config.Server, Port: config.Port, Password: config.Password,
			SNI: config.SNI, ALPN: config.ALPN, ClientFingerprint: config.ClientFingerprint,
			SkipCertVerify: config.SkipCertVerify, UDP: config.UDP,
			IdleSessionCheckInterval: config.IdleSessionCheckInterval, IdleSessionTimeout: config.IdleSessionTimeout,
			MinIdleSession: config.MinIdleSession, DisableReuse: config.DisableReuse,
		})
	case "socks5":
		if config.SkipCertVerify && !config.TLS {
			return nil, invalid
		}
		if config.SNI != "" || config.ClientFingerprint != "" || len(config.ALPN) != 0 || len(config.Username) > 255 || len(config.Password) > 255 || config.IdleSessionCheckInterval != 0 || config.IdleSessionTimeout != 0 || config.MinIdleSession != 0 || config.DisableReuse {
			return nil, invalid // Do not silently ignore security settings from another protocol.
		}
		loopback := net.ParseIP(config.Server)
		if loopback == nil || !loopback.IsLoopback() {
			// SOCKS TLS only protects its TCP transport; its UDP associate remains
			// plaintext in the pinned implementation. Never imply it encrypts UDP.
			if !config.TLS || config.UDP {
				return nil, invalid
			}
		}
		if (config.Username == "") != (config.Password == "") {
			return nil, invalid
		}
		return outbound.NewSocks5(outbound.Socks5Option{
			BasicOption: outbound.BasicOption{DialerForAPI: via},
			Name:        "node-01", Server: config.Server, Port: config.Port,
			UserName: config.Username, Password: config.Password,
			UDP:            config.UDP,
			TLS:            config.TLS,
			SkipCertVerify: config.SkipCertVerify,
		})
	default:
		return nil, invalid
	}
}

func validHost(host string) bool {
	if host == "" || len(host) > 253 || strings.IndexFunc(host, unicode.IsSpace) >= 0 ||
		strings.ContainsAny(host, "/@?#%\\") {
		return false
	}
	if net.ParseIP(host) != nil {
		return true
	}
	if strings.Contains(host, ":") {
		return false
	}
	if strings.IndexFunc(host, func(r rune) bool { return r != '.' && (r < '0' || r > '9') }) < 0 {
		return false // A malformed numeric IP must not become a DNS query.
	}
	for _, label := range strings.Split(strings.TrimSuffix(host, "."), ".") {
		if len(label) == 0 || len(label) > 63 || label[0] == '-' || label[len(label)-1] == '-' {
			return false
		}
		for _, r := range label {
			if !(r >= 'a' && r <= 'z' || r >= 'A' && r <= 'Z' || r >= '0' && r <= '9' || r == '-') {
				return false
			}
		}
	}
	return true
}

func validTarget(raw string) bool {
	if !validDelayTarget(raw) {
		return false
	}
	target, _ := url.Parse(raw)
	if target.Scheme == "https" {
		return true
	}
	ip := net.ParseIP(target.Hostname())
	return ip != nil && ip.IsLoopback()
}

func validDelayTarget(raw string) bool {
	if len(raw) > 2048 {
		return false
	}
	target, err := url.Parse(raw)
	if err != nil || !validHost(target.Hostname()) || target.User != nil || target.Fragment != "" || target.Opaque != "" {
		return false
	}
	if port := target.Port(); port != "" {
		value, err := strconv.Atoi(port)
		if err != nil || value < 1 || value > 65535 {
			return false
		}
	}
	return target.Scheme == "https" || target.Scheme == "http"
}

func encode(runID, state, code string, status int, elapsed int64) string {
	encoded, _ := json.Marshal(response{RunID: runID, Engine: "mihomo", EngineVersion: engineVersion,
		State: state, Code: code, HTTPStatus: status, ElapsedMs: elapsed})
	return string(encoded)
}
