// SPDX-License-Identifier: GPL-3.0-only
package mobile

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/netip"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/metacubex/mihomo/adapter/outbound"
	C "github.com/metacubex/mihomo/constant"
	M "github.com/metacubex/sing/common/metadata"
)

type runtimeOptions struct {
	Mode               string   `json:"mode"`
	MTU                int      `json:"mtu"`
	IPv6               bool     `json:"ipv6"`
	UDP                bool     `json:"udp"`
	LAN                string   `json:"lan"`
	ConnectTimeout     int      `json:"connectTimeout"`
	UDPTimeout         int      `json:"udpTimeout"`
	MaxConnections     int      `json:"maxConnections"`
	InspectConnections bool     `json:"inspectConnections"`
	DNSMode            string   `json:"dnsMode"`
	DNSHTTPS           string   `json:"dnsHttps"`
	Rules              []string `json:"rules"`
	Definition         string   `json:"definition"`
}

func defaultRuntimeOptions() runtimeOptions {
	return runtimeOptions{Mode: "global", MTU: 1500, IPv6: true, UDP: true, LAN: "proxy", ConnectTimeout: 10, UDPTimeout: 60, MaxConnections: 256, DNSMode: "tcp"}
}

// ValidateRuntimeOptions never opens sockets or starts health checks. Failure
// exposes only a line number and a fixed vocabulary, never a rule or target.
func ValidateRuntimeOptions(raw string) string {
	options, err := decodeRuntimeOptions(raw)
	if err != nil {
		return `{"state":"failed","code":"options_invalid"}`
	}
	rules, line, code := compileRules(options.Rules)
	if code != "" {
		b, _ := json.Marshal(map[string]any{"state": "failed", "code": code, "line": line})
		return string(b)
	}
	targets := map[string]bool{}
	for _, r := range rules {
		if r.target != "PROXY" && r.target != "DIRECT" && r.target != "REJECT" {
			targets[r.target] = true
		}
	}
	if len(targets) > 16 {
		return `{"state":"failed","code":"rule_target_limit"}`
	}
	if len(targets) > 0 {
		graph, e := parseLocalDefinition(options.Definition)
		if e != nil {
			return `{"state":"failed","code":"rule_target_invalid"}`
		}
		for target := range targets {
			p, e := graph.runtime(target)
			if e != nil {
				return `{"state":"failed","code":"rule_target_invalid"}`
			}
			_ = p.Close()
		}
	}
	return `{"state":"passed","code":"options_valid"}`
}
func decodeRuntimeOptions(raw string) (runtimeOptions, error) {
	o := defaultRuntimeOptions()
	if raw == "" {
		return o, nil
	}
	if len(raw) > 3*1024*1024 {
		return o, errors.New("options_invalid")
	}
	// The options bridge is private, but still reject duplicate/unknown keys.
	d := json.NewDecoder(strings.NewReader(raw))
	token, e := d.Token()
	if e != nil || token != json.Delim('{') {
		return o, errors.New("options_invalid")
	}
	seen := map[string]bool{}
	for d.More() {
		k, e := d.Token()
		if e != nil {
			return o, e
		}
		key, ok := k.(string)
		if !ok || seen[key] {
			return o, errors.New("options_invalid")
		}
		seen[key] = true
		var value json.RawMessage
		if d.Decode(&value) != nil {
			return o, errors.New("options_invalid")
		}
		if string(value) == "null" && key != "rules" {
			return o, errors.New("options_invalid")
		}
	}
	if _, e = d.Token(); e != nil || d.Decode(new(any)) != io.EOF {
		return o, errors.New("options_invalid")
	}
	d = json.NewDecoder(strings.NewReader(raw))
	d.DisallowUnknownFields()
	if e = d.Decode(&o); e != nil {
		return o, e
	}
	if o.Mode != "global" && o.Mode != "rule" && o.Mode != "direct" || o.LAN != "proxy" && o.LAN != "direct" && o.LAN != "block" || o.MTU < 1280 || o.MTU > 9000 || o.ConnectTimeout < 3 || o.ConnectTimeout > 60 || o.UDPTimeout < 10 || o.UDPTimeout > 300 || o.MaxConnections < 16 || o.MaxConnections > 512 || len(o.Definition) > 2*1024*1024 || o.DNSMode != "tcp" && o.DNSMode != "https" {
		return o, errors.New("options_invalid")
	}
	if o.DNSMode == "https" {
		u, e := url.Parse(o.DNSHTTPS)
		if e != nil || u.Scheme != "https" || u.Hostname() == "" || u.User != nil || u.Fragment != "" || u.RawQuery != "" || len(o.DNSHTTPS) > 2048 {
			return o, errors.New("options_invalid")
		}
		if u.Port() != "" {
			p, e := strconv.Atoi(u.Port())
			if e != nil || p < 1 || p > 65535 {
				return o, errors.New("options_invalid")
			}
		}
	}
	return o, nil
}

type outboundRule struct {
	kind, value, target string
	prefix              netip.Prefix
	low, high           uint16
}

func compileRules(lines []string) ([]outboundRule, int, string) {
	if len(lines) > 2000 {
		return nil, 0, "rule_limit"
	}
	total := 0
	rules := []outboundRule{}
	for i, line := range lines {
		total += len(line)
		if total > 256*1024 || len(line) > 2048 {
			return nil, i + 1, "rule_limit"
		}
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		if hasControl(line) {
			return nil, i + 1, "rule_invalid"
		}
		parts := strings.Split(line, ",")
		for j := range parts {
			parts[j] = strings.TrimSpace(parts[j])
		}
		r := outboundRule{kind: parts[0]}
		if r.kind == "MATCH" {
			if len(parts) != 2 {
				return nil, i + 1, "rule_invalid"
			}
			r.target = parts[1]
		} else {
			if len(parts) < 3 || len(parts) > 4 {
				return nil, i + 1, "rule_invalid"
			}
			r.value = parts[1]
			r.target = parts[2]
			if len(parts) == 4 && (parts[3] != "no-resolve" || (r.kind != "IP-CIDR" && r.kind != "IP-CIDR6")) {
				return nil, i + 1, "rule_unsupported"
			}
		}
		if r.target == "" || len(r.target) > 512 {
			return nil, i + 1, "rule_invalid"
		}
		switch r.kind {
		case "MATCH":
		case "DOMAIN", "DOMAIN-SUFFIX", "DOMAIN-KEYWORD":
			r.value = strings.ToLower(strings.TrimSuffix(r.value, "."))
			if r.value == "" || len(r.value) > 253 || strings.ContainsAny(r.value, " /:\\") {
				return nil, i + 1, "rule_invalid"
			}
		case "IP-CIDR", "IP-CIDR6":
			p, e := netip.ParsePrefix(r.value)
			if e != nil || (r.kind == "IP-CIDR" && !p.Addr().Is4()) || (r.kind == "IP-CIDR6" && !p.Addr().Is6()) {
				return nil, i + 1, "rule_invalid"
			}
			r.prefix = p.Masked()
		case "DST-PORT":
			span := strings.Split(r.value, "-")
			if len(span) > 2 {
				return nil, i + 1, "rule_invalid"
			}
			a, e := strconv.Atoi(span[0])
			if e != nil || a < 1 || a > 65535 {
				return nil, i + 1, "rule_invalid"
			}
			b := a
			if len(span) == 2 {
				b, e = strconv.Atoi(span[1])
				if e != nil || b < a || b > 65535 {
					return nil, i + 1, "rule_invalid"
				}
			}
			r.low = uint16(a)
			r.high = uint16(b)
		case "NETWORK":
			r.value = strings.ToLower(r.value)
			if r.value != "tcp" && r.value != "udp" {
				return nil, i + 1, "rule_invalid"
			}
		default:
			return nil, i + 1, "rule_unsupported"
		}
		rules = append(rules, r)
	}
	return rules, 0, ""
}
func (r outboundRule) matches(host string, ip netip.Addr, port uint16, network string) bool {
	switch r.kind {
	case "MATCH":
		return true
	case "DOMAIN":
		return host != "" && host == r.value
	case "DOMAIN-SUFFIX":
		return host != "" && (host == r.value || strings.HasSuffix(host, "."+r.value))
	case "DOMAIN-KEYWORD":
		return host != "" && strings.Contains(host, r.value)
	case "IP-CIDR", "IP-CIDR6":
		return ip.IsValid() && r.prefix.Contains(ip.Unmap())
	case "DST-PORT":
		return port >= r.low && port <= r.high
	case "NETWORK":
		return network == r.value
	}
	return false
}
func (s *vpnSession) configure(raw string) error {
	o, err := decodeRuntimeOptions(raw)
	if err != nil {
		return err
	}
	rules, _, code := compileRules(o.Rules)
	if code != "" {
		return errors.New(code)
	}
	s.options = o
	s.rules = rules
	s.trackDomains = o.InspectConnections
	if o.Mode == "rule" {
		for _, r := range rules {
			if strings.HasPrefix(r.kind, "DOMAIN") {
				s.trackDomains = true
				break
			}
		}
	}
	s.targets = map[string]C.ProxyAdapter{}
	s.direct = outbound.NewDirect()
	if o.Mode != "rule" {
		return nil
	}
	var graph *importGraph
	for _, r := range rules {
		if r.target == "DIRECT" || r.target == "REJECT" || r.target == "PROXY" || s.targets[r.target] != nil {
			continue
		}
		if len(s.targets) >= 16 {
			return errors.New("rule_target_limit")
		}
		if graph == nil {
			graph, err = parseLocalDefinition(o.Definition)
			if err != nil {
				return err
			}
		}
		p, e := graph.runtime(r.target)
		if e != nil {
			return e
		}
		s.targets[r.target] = p
	}
	return nil
}
func localDestination(ip netip.Addr) bool {
	return ip.IsValid() && (ip.IsPrivate() || ip.IsLoopback() || ip.IsLinkLocalUnicast())
}
func (s *vpnSession) route(destination M.Socksaddr, network string) (C.ProxyAdapter, string, error) {
	ip := destination.Addr.Unmap()
	if ip.IsValid() && (ip.IsUnspecified() || ip.IsMulticast() || !s.options.IPv6 && ip.Is6()) {
		s.rejected.Add(1)
		return nil, "REJECT", errors.New("destination_blocked")
	}
	target := "PROXY"
	if localDestination(ip) && s.options.LAN != "proxy" {
		if s.options.LAN == "direct" {
			target = "DIRECT"
		} else {
			target = "REJECT"
		}
	} else if s.options.Mode == "direct" {
		target = "DIRECT"
	} else if s.options.Mode == "rule" {
		host := strings.ToLower(strings.TrimSuffix(destination.Fqdn, "."))
		if host == "" {
			host = s.hostFor(ip)
		}
		for _, r := range s.rules {
			if r.matches(host, ip, destination.Port, network) {
				target = r.target
				break
			}
		}
	}
	switch target {
	case "REJECT":
		s.rejected.Add(1)
		return nil, target, errors.New("rule_rejected")
	case "DIRECT":
		return s.direct, target, nil
	case "PROXY":
		return s.proxy, target, nil
	default:
		if p := s.targets[target]; p != nil {
			return p, target, nil
		}
		return nil, "REJECT", errors.New("rule_target_unavailable")
	}
}
func (s *vpnSession) dnsBlocked(host string) bool {
	if s.options.Mode != "rule" {
		return false
	}
	for _, r := range s.rules {
		if r.matches(strings.ToLower(strings.TrimSuffix(host, ".")), netip.Addr{}, 53, "udp") {
			return r.target == "REJECT"
		}
	}
	return false
}

type dnsAssociation struct {
	host      string
	expires   time.Time
	ambiguous bool
}

func (s *vpnSession) rememberHost(ip netip.Addr, host string, ttl uint32) {
	if !ip.IsValid() {
		return
	}
	ip = ip.Unmap()
	if ttl > 300 {
		ttl = 300
	}
	if ttl == 0 {
		return
	}
	host = strings.ToLower(strings.TrimSuffix(host, "."))
	s.mu.Lock()
	defer s.mu.Unlock()
	if len(s.hosts) >= 1024 {
		for key, item := range s.hosts {
			if time.Now().After(item.expires) {
				delete(s.hosts, key)
			}
		}
		if len(s.hosts) >= 1024 {
			return
		}
	}
	old := s.hosts[ip]
	ambiguous := time.Now().Before(old.expires) && (old.ambiguous || old.host != host)
	s.hosts[ip] = dnsAssociation{host, time.Now().Add(time.Duration(ttl) * time.Second), ambiguous}
}
func (s *vpnSession) hostFor(ip netip.Addr) string {
	s.mu.Lock()
	defer s.mu.Unlock()
	item := s.hosts[ip.Unmap()]
	if item.ambiguous || time.Now().After(item.expires) {
		return ""
	}
	return item.host
}
func (s *vpnSession) dialWith(ctx context.Context, destination M.Socksaddr, proxy C.ProxyAdapter) (C.Conn, error) {
	metadata := &C.Metadata{NetWork: C.TCP, Type: C.TUN}
	if err := metadata.SetRemoteAddress(destination.String()); err != nil {
		return nil, err
	}
	return proxy.DialContext(ctx, metadata)
}
