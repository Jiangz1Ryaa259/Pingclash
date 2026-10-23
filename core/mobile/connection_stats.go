// SPDX-License-Identifier: GPL-3.0-only
package mobile

import (
	"encoding/json"
	M "github.com/metacubex/sing/common/metadata"
	"io"
	"sync"
	"sync/atomic"
	"time"
)

type countWriter struct {
	writer      io.Writer
	total, flow *atomic.Int64
}

func (w countWriter) Write(p []byte) (int, error) {
	n, e := w.writer.Write(p)
	w.total.Add(int64(n))
	w.flow.Add(int64(n))
	return n, e
}

type connectionRecord struct {
	id                          uint64
	network, route, destination string
	started                     time.Time
	closer                      io.Closer
	up, down                    atomic.Int64
}
type flowCloser struct {
	mu     sync.Mutex
	closed bool
	items  []io.Closer
}

func (f *flowCloser) add(c io.Closer) {
	f.mu.Lock()
	if f.closed {
		f.mu.Unlock()
		_ = c.Close()
		return
	}
	f.items = append(f.items, c)
	f.mu.Unlock()
}
func (f *flowCloser) Close() error {
	f.mu.Lock()
	if f.closed {
		f.mu.Unlock()
		return nil
	}
	f.closed = true
	items := f.items
	f.items = nil
	f.mu.Unlock()
	for _, c := range items {
		_ = c.Close()
	}
	return nil
}

func (s *vpnSession) openRecord(network, route string, destination M.Socksaddr, closer io.Closer) (*connectionRecord, bool) {
	display := ""
	if s.options.InspectConnections {
		display = destination.String()
		if host := s.hostFor(destination.Addr); host != "" {
			display = host + " (" + display + ")"
		}
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.ctx.Err() != nil || len(s.connections) >= s.options.MaxConnections {
		return nil, false
	}
	f := &flowCloser{}
	f.add(closer)
	r := &connectionRecord{id: s.serial.Add(1), network: network, route: route, started: time.Now(), closer: f}
	if s.options.InspectConnections {
		r.destination = display
	} else if route != "DIRECT" && route != "REJECT" {
		r.route = "PROXY"
	}
	s.connections[r.id] = r
	s.totalConnections.Add(1)
	return r, true
}
func (s *vpnSession) endRecord(id uint64) { s.mu.Lock(); delete(s.connections, id); s.mu.Unlock() }

// The snapshot is never persisted or logged. Targets are absent unless explicitly enabled.
func VPNConnections() string {
	vpnState.Lock()
	defer vpnState.Unlock()
	rows := []map[string]any{}
	if s := vpnState.session; s != nil {
		s.mu.Lock()
		defer s.mu.Unlock()
		for _, r := range s.connections {
			rows = append(rows, map[string]any{"id": r.id, "network": r.network, "route": r.route, "destination": r.destination, "seconds": int64(time.Since(r.started).Seconds()), "uploaded": r.up.Load(), "downloaded": r.down.Load()})
		}
	}
	b, _ := json.Marshal(rows)
	return string(b)
}

// ID 0 closes all current flows, without changing policy or opening new listeners.
func CloseVPNConnection(id int64) {
	vpnState.Lock()
	defer vpnState.Unlock()
	if id < 0 {
		return
	}
	if s := vpnState.session; s != nil {
		closers := []io.Closer{}
		s.mu.Lock()
		for key, r := range s.connections {
			if id == 0 || uint64(id) == key {
				closers = append(closers, r.closer)
			}
		}
		s.mu.Unlock()
		for _, c := range closers {
			_ = c.Close()
		}
	}
}
