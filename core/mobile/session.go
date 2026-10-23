// SPDX-License-Identifier: GPL-3.0-only
package mobile

import (
	"context"

	"encoding/json"
	"errors"
	"io"
	"net"
	"net/netip"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	C "github.com/metacubex/mihomo/constant"
	tun "github.com/metacubex/sing-tun"
	"github.com/metacubex/sing/common/buf"
	"github.com/metacubex/sing/common/logger"
	M "github.com/metacubex/sing/common/metadata"
	N "github.com/metacubex/sing/common/network"
	"github.com/miekg/dns"
)

type vpnSession struct {
	ctx              context.Context
	cancel           context.CancelFunc
	proxy            C.ProxyAdapter
	dns              netip.AddrPort
	device           tun.Tun
	stack            tun.Stack
	mu               sync.Mutex
	resources        map[io.Closer]struct{}
	udp              map[string]*udpFlow
	dnsSlots         chan struct{}
	up               atomic.Int64
	down             atomic.Int64
	failures         atomic.Int64
	closeOnce        sync.Once
	options          runtimeOptions
	rules            []outboundRule
	targets          map[string]C.ProxyAdapter
	direct           C.ProxyAdapter
	hosts            map[netip.Addr]dnsAssociation
	trackDomains     bool
	started          time.Time
	connections      map[uint64]*connectionRecord
	serial           atomic.Uint64
	totalConnections atomic.Int64
	dnsQueries       atomic.Int64
	rejected         atomic.Int64
}
type udpFlow struct {
	queue       chan []byte
	writer      N.PacketWriter
	destination M.Socksaddr
}

var vpnState struct {
	sync.Mutex
	session *vpnSession
}

func newSession(configJSON, dnsAddress string) (*vpnSession, error) {
	return newSessionConfigured(configJSON, dnsAddress, "")
}
func newSessionConfigured(configJSON, dnsAddress, options string) (*vpnSession, error) {
	destination, err := netip.ParseAddrPort(dnsAddress)
	if err != nil {
		ip, parseErr := netip.ParseAddr(dnsAddress)
		if parseErr != nil {
			return nil, errors.New("dns_invalid")
		}
		destination = netip.AddrPortFrom(ip, 53)
	}
	if destination.Port() == 0 || destination.Addr().IsUnspecified() || destination.Addr().IsMulticast() {
		return nil, errors.New("dns_invalid")
	}
	proxy, err := parseNode(configJSON)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithCancel(context.Background())
	s := &vpnSession{ctx: ctx, cancel: cancel, proxy: proxy, dns: destination, started: time.Now(), hosts: map[netip.Addr]dnsAssociation{}, connections: map[uint64]*connectionRecord{},
		resources: make(map[io.Closer]struct{}), udp: make(map[string]*udpFlow), dnsSlots: make(chan struct{}, 16)}
	if err := s.configure(options); err != nil {
		s.close()
		return nil, err
	}
	return s, nil
}

func (s *vpnSession) track(c io.Closer) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.ctx.Err() != nil || len(s.resources) >= s.options.MaxConnections*2 {
		_ = c.Close()
		return false
	}
	s.resources[c] = struct{}{}
	return true
}
func (s *vpnSession) release(c io.Closer) {
	s.mu.Lock()
	delete(s.resources, c)
	s.mu.Unlock()
	_ = c.Close()
}
func (s *vpnSession) close() {
	s.closeOnce.Do(func() {
		s.cancel()
		s.mu.Lock()
		resources := make([]io.Closer, 0, len(s.resources))
		for resource := range s.resources {
			resources = append(resources, resource)
		}
		s.mu.Unlock()
		for _, resource := range resources {
			_ = resource.Close()
		}
		if s.device != nil {
			_ = s.device.Close()
		}
		if s.stack != nil {
			_ = s.stack.Close()
		}
		_ = s.proxy.Close()
		if s.direct != nil {
			_ = s.direct.Close()
		}
		for _, p := range s.targets {
			_ = p.Close()
		}
	})
}

func (s *vpnSession) startDevice(device tun.Tun) error {
	s.device = device
	options := tun.Options{MTU: uint32(s.options.MTU), Inet4Address: []netip.Prefix{netip.MustParsePrefix("172.29.0.1/30")},
		Inet6Address: []netip.Prefix{netip.MustParsePrefix("fdfe:7069:6e67::1/126")}, Logger: logger.NOP()}
	stack, err := tun.NewStack("mips", tun.StackOptions{Context: s.ctx, Tun: device, TunOptions: options,
		Handler: s, Logger: logger.NOP(), UDPTimeout: time.Duration(s.options.UDPTimeout) * time.Second, ICMPTimeout: time.Second})
	if err != nil {
		return err
	}
	s.stack = stack
	return stack.Start()
}

func (s *vpnSession) NewError(context.Context, error) { s.failures.Add(1) }
func (s *vpnSession) PrepareConnection(network string, _, _ M.Socksaddr, _ tun.DirectRouteContext, _ time.Duration) (tun.DirectRouteDestination, error) {
	if network == N.NetworkICMP {
		return nil, tun.ErrDrop
	}
	return nil, nil // Never create a direct bypass route.
}
func (s *vpnSession) NewConnection(_ context.Context, conn net.Conn, metadata M.Metadata) error {
	if !s.track(conn) {
		return net.ErrClosed
	}
	defer s.release(conn)
	destination := metadata.Destination
	if destination.Port == 53 {
		return s.serveTCPDNS(conn)
	}
	proxy, route, err := s.route(destination, "tcp")
	if err != nil {
		return err
	}
	record, ok := s.openRecord("tcp", route, destination, conn)
	if !ok {
		return net.ErrClosed
	}
	defer s.endRecord(record.id)
	ctx, cancel := context.WithTimeout(s.ctx, time.Duration(s.options.ConnectTimeout)*time.Second)
	upstream, err := s.dialWith(ctx, destination, proxy)
	cancel()
	if err != nil {
		s.failures.Add(1)
		return errors.New("proxy_connect_failed")
	}
	if !s.track(upstream) {
		return net.ErrClosed
	}
	defer s.release(upstream)
	record.closer.(*flowCloser).add(upstream)
	finished := make(chan struct{})
	go func() {
		_, _ = io.Copy(countWriter{upstream, &s.up, &record.up}, conn)
		if half, ok := any(upstream).(interface{ CloseWrite() error }); ok {
			_ = half.CloseWrite()
		}
		close(finished)
	}()
	_, _ = io.Copy(countWriter{conn, &s.down, &record.down}, upstream)
	_ = conn.Close()
	_ = upstream.Close()
	<-finished
	return nil
}
func (s *vpnSession) dial(ctx context.Context, destination M.Socksaddr) (C.Conn, error) {
	metadata := &C.Metadata{NetWork: C.TCP, Type: C.TUN}
	if err := metadata.SetRemoteAddress(destination.String()); err != nil {
		return nil, err
	}
	return s.proxy.DialContext(ctx, metadata)
}

func (s *vpnSession) NewPacket(_ context.Context, key netip.AddrPort, packet *buf.Buffer, metadata M.Metadata, init func(N.PacketConn) N.PacketWriter) {
	if s.ctx.Err() != nil || packet.Len() > 65507 {
		packet.Release()
		return
	}
	data := append([]byte(nil), packet.Bytes()...)
	packet.Release()
	if metadata.Destination.Port == 53 {
		select {
		case s.dnsSlots <- struct{}{}:
			writer := init(nil)
			go func() { defer func() { <-s.dnsSlots }(); s.relayDNS(data, metadata.Destination, writer) }()
		default:
			s.failures.Add(1)
		}
		return
	}
	if !s.options.UDP {
		s.failures.Add(1)
		return
	}
	flowKey := key.String() + "|" + metadata.Destination.String()
	s.mu.Lock()
	flow := s.udp[flowKey]
	if flow == nil {
		if len(s.udp) >= 64 {
			s.mu.Unlock()
			s.failures.Add(1)
			return
		}
		flow = &udpFlow{queue: make(chan []byte, 8), writer: init(nil), destination: metadata.Destination}
		s.udp[flowKey] = flow
		go s.runUDP(flowKey, flow)
	}
	s.mu.Unlock()
	select {
	case flow.queue <- data:
	default:
		s.failures.Add(1)
	}
}

func (s *vpnSession) runUDP(key string, flow *udpFlow) {
	defer func() {
		s.mu.Lock()
		if s.udp[key] == flow {
			delete(s.udp, key)
		}
		s.mu.Unlock()
	}()
	ctx, cancel := context.WithTimeout(s.ctx, 10*time.Second)
	metadata := &C.Metadata{NetWork: C.UDP, Type: C.TUN}
	if metadata.SetRemoteAddress(flow.destination.String()) != nil {
		cancel()
		return
	}
	proxy, route, err := s.route(flow.destination, "udp")
	if err != nil || !proxy.SupportUDP() {
		cancel()
		s.failures.Add(1)
		return
	}
	conn, err := proxy.ListenPacketContext(ctx, metadata)
	cancel()
	if err != nil {
		s.failures.Add(1)
		return
	}
	if !s.track(conn) {
		return
	}
	defer s.release(conn)
	record, ok := s.openRecord("udp", route, flow.destination, conn)
	if !ok {
		return
	}
	defer s.endRecord(record.id)
	ended := make(chan struct{})
	defer close(ended)
	go func() {
		for {
			select {
			case payload := <-flow.queue:
				_ = conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
				n, err := conn.WriteTo(payload, flow.destination.UDPAddr())
				if err != nil {
					s.failures.Add(1)
					_ = conn.Close()
					return
				}
				s.up.Add(int64(n))
				record.up.Add(int64(n))
			case <-ended:
				return
			case <-s.ctx.Done():
				return
			}
		}
	}()
	buffer := make([]byte, 65535)
	for {
		_ = conn.SetReadDeadline(time.Now().Add(time.Duration(s.options.UDPTimeout) * time.Second))
		n, source, err := conn.ReadFrom(buffer)
		if err != nil {
			return
		}
		actual := M.SocksaddrFromNet(source)
		if actual.Addr.Unmap() != flow.destination.Addr.Unmap() || actual.Port != flow.destination.Port {
			s.failures.Add(1)
			continue
		}
		s.down.Add(int64(n))
		record.down.Add(int64(n))
		reply := buf.NewSize(n)
		_, _ = reply.Write(buffer[:n])
		if err := flow.writer.WritePacket(reply, M.SocksaddrFromNet(source)); err != nil {
			return
		}
	}
}

func (s *vpnSession) relayDNS(payload []byte, destination M.Socksaddr, writer N.PacketWriter) {
	response, err := s.exchangeDNS(payload)
	if err != nil {
		s.failures.Add(1)
		return
	}
	var query, answer dns.Msg
	if query.Unpack(payload) != nil || answer.Unpack(response) != nil {
		return
	}
	limit := dns.MinMsgSize
	if opt := query.IsEdns0(); opt != nil {
		limit = int(opt.UDPSize())
		if limit > 4096 {
			limit = 4096
		}
	}
	answer.Truncate(limit)
	response, err = answer.Pack()
	if err != nil {
		return
	}
	buffer := buf.NewSize(len(response))
	_, _ = buffer.Write(response)
	_ = writer.WritePacket(buffer, destination)
}
func matchingDNSReply(query, answer *dns.Msg) bool {
	if answer.Id != query.Id || !answer.Response || answer.Opcode != query.Opcode || len(query.Question) != 1 || len(answer.Question) != 1 {
		return false
	}
	a, b := query.Question[0], answer.Question[0]
	return strings.EqualFold(a.Name, b.Name) && a.Qtype == b.Qtype && a.Qclass == b.Qclass
}

// StartVPN borrows the caller's original FD. Android duplicates it; only that
// duplicate belongs to Go, including every startup-failure path.
func StartVPN(configJSON string, fd int, dnsAddress string) string {
	return StartVPNWithOptions(configJSON, fd, dnsAddress, "")
}
func StartVPNWithOptions(configJSON string, fd int, dnsAddress, options string) (result string) {
	defer func() {
		if recover() != nil {
			StopVPN()
			result = encode("", "failed", "vpn_start_failed", 0, 0)
		}
	}()
	vpnState.Lock()
	defer vpnState.Unlock()
	if vpnState.session != nil {
		return encode("", "not_attempted", "vpn_already_running", 0, 0)
	}
	if fd <= 0 {
		return encode("", "failed", "tun_fd_invalid", 0, 0)
	}
	session, err := newSessionConfigured(configJSON, dnsAddress, options)
	if err != nil {
		return encode("", "failed", "config_or_dns_invalid", 0, 0)
	}
	defer func() {
		if vpnState.session != session {
			session.close()
		}
	}()
	if err := startAndroidTun(session, fd); err != nil {
		return encode("", "failed", "vpn_start_failed", 0, 0)
	}
	vpnState.session = session
	return encode("", "passed", "tun_established_not_verified", 0, 0)
}

// StopVPN is safe to call repeatedly, including after revoked VPN permission.
func StopVPN() {
	vpnState.Lock()
	defer vpnState.Unlock()
	if session := vpnState.session; session != nil {
		vpnState.session = nil
		session.close()
	}
}

// VPNStatus contains counters and readiness, never endpoints or raw errors.
func VPNStatus() string {
	vpnState.Lock()
	defer vpnState.Unlock()
	status := struct {
		Running           bool   `json:"running"`
		Uploaded          int64  `json:"uploaded"`
		Downloaded        int64  `json:"downloaded"`
		Failures          int64  `json:"failures"`
		Uptime            int64  `json:"uptime"`
		ActiveConnections int    `json:"activeConnections"`
		TotalConnections  int64  `json:"totalConnections"`
		DNSQueries        int64  `json:"dnsQueries"`
		Rejected          int64  `json:"rejected"`
		HeapBytes         uint64 `json:"heapBytes"`
		Goroutines        int    `json:"goroutines"`
	}{}
	if session := vpnState.session; session != nil {
		status.Running = true
		status.Uploaded = session.up.Load()
		status.Downloaded = session.down.Load()
		status.Failures = session.failures.Load()
		status.Uptime = int64(time.Since(session.started).Seconds())
		session.mu.Lock()
		status.ActiveConnections = len(session.connections)
		session.mu.Unlock()
		status.TotalConnections = session.totalConnections.Load()
		status.DNSQueries = session.dnsQueries.Load()
		status.Rejected = session.rejected.Load()
	}
	var memory runtime.MemStats
	runtime.ReadMemStats(&memory)
	status.HeapBytes = memory.HeapAlloc
	status.Goroutines = runtime.NumGoroutine()
	encoded, _ := json.Marshal(status)
	return string(encoded)
}
