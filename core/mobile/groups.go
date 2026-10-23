// SPDX-License-Identifier: GPL-3.0-only
package mobile

import (
	"encoding/json"
	"errors"
	C "github.com/metacubex/mihomo/constant"
	"strconv"
	"strings"
	"sync"
)

type ownedChain struct {
	C.ProxyAdapter
	children []C.ProxyAdapter
	once     sync.Once
}

func (p *ownedChain) Close() error {
	p.once.Do(func() {
		_ = p.ProxyAdapter.Close()
		for _, child := range p.children {
			_ = child.Close()
		}
	})
	return nil
}

type importedGroup struct {
	Name        string   `json:"name"`
	Type        string   `json:"type"`
	Proxies     []string `json:"proxies"`
	Selected    string   `json:"selected"`
	Supported   bool     `json:"supported"`
	Reason      string   `json:"reason,omitempty"`
	Unavailable int      `json:"unavailable,omitempty"`
}
type importGraph struct {
	nodes       map[string]map[string]any
	duplicate   map[string]bool
	groups      map[string]importedGroup
	options     map[string]map[string]any
	work        int
	unavailable map[string]bool
}

// Keep the public error code stable; expose only a fixed, private-data-free
// category to the importer. Never attach a member name or parser error string.
type groupFailure struct{ reason string }

func (e *groupFailure) Error() string { return "proxy_chain" }

// Intrinsic node validation does not resolve its dialer, open a socket, or run a
// health check. A malformed known leaf may be quarantined in an automatic pool;
// missing names, ambiguous names and route cycles are never treated as leaves.
func (g *importGraph) nodeUnavailable(name string) bool {
	if bad, checked := g.unavailable[name]; checked {
		return bad
	}
	n, exists := g.nodes[name]
	if !exists {
		return false
	}
	m := normalizedImportNode(n)
	delete(m, "dialer-proxy")
	b, err := json.Marshal(m)
	if err == nil {
		p, e := parseNode(string(b))
		err = e
		if p != nil {
			_ = p.Close()
		}
	}
	if g.unavailable == nil {
		g.unavailable = map[string]bool{}
	}
	g.unavailable[name] = err != nil
	return err != nil
}

func normalizedImportNode(input map[string]any) map[string]any {
	m := make(map[string]any, len(input))
	for k, v := range input {
		m[k] = v
	}
	for _, key := range []string{"tfo", "mptcp", "fast-open"} {
		if m[key] == false {
			delete(m, key)
		}
	}
	removeUnusedVLESSFields(m)
	if m["type"] == "hysteria2" {
		for _, key := range []string{"up", "down"} {
			if m[key] == nil {
				delete(m, key)
			}
		}
	}
	if value, ok := m["port"].(string); ok {
		if port, err := strconv.Atoi(value); err == nil {
			m["port"] = port
		}
	}
	if v, exists := m["dialer-proxy"]; exists && v == "" {
		delete(m, "dialer-proxy")
	}
	return m
}

func newImportGraph(candidates []any, root any, profile *importedProfile) *importGraph {
	g := &importGraph{nodes: map[string]map[string]any{}, duplicate: map[string]bool{}, groups: map[string]importedGroup{}, options: map[string]map[string]any{}}
	hasDialer := false
	for _, candidate := range candidates {
		if node, ok := candidate.(map[string]any); ok {
			m := normalizedImportNode(node)
			name, _ := m["name"].(string)
			if name != "" {
				if name == "DIRECT" || name == "REJECT" || name == "COMPATIBLE" {
					g.duplicate[name] = true
				}
				if _, exists := g.nodes[name]; exists {
					g.duplicate[name] = true
				}
				g.nodes[name] = m
			}
			if _, exists := m["dialer-proxy"]; exists {
				hasDialer = true
			}
		}
	}
	object, ok := root.(map[string]any)
	if !ok {
		return g
	}
	rawGroups, declared := object["proxy-groups"]
	profile.GroupsDeclared = declared
	list, validList := rawGroups.([]any)
	if declared && !validList {
		profile.GroupsUnsupported++
	}
	picks, _ := object["pingclash-selections"].(map[string]any)
	if len(list) > 64 {
		list = nil
		profile.GroupsUnsupported++
	}
	for _, raw := range list {
		m, ok := raw.(map[string]any)
		if !ok {
			profile.GroupsUnsupported++
			continue
		}
		name, _ := m["name"].(string)
		kind, _ := m["type"].(string)
		options, reason := normalizeGroup(m, candidates)
		members, ok := options["proxies"].([]any)
		if name == "" || len(name) > 512 || hasControl(name) || !ok || len(members) == 0 || len(members) > 500 {
			profile.GroupsUnsupported++
			continue
		}
		group := importedGroup{Name: name, Type: kind, Proxies: []string{}, Supported: reason == "", Reason: reason}
		for _, v := range members {
			s, ok := v.(string)
			if !ok || s == "" || len(s) > 512 || hasControl(s) {
				group.Supported = false
				continue
			}
			group.Proxies = append(group.Proxies, s)
		}
		if len(group.Proxies) == 0 {
			profile.GroupsUnsupported++
			continue
		}
		group.Selected = group.Proxies[0]
		if value, ok := m["default-selected"].(string); ok && value != "" {
			group.Selected = value
		}
		if value, exists := picks[name]; exists {
			if s, ok := value.(string); ok {
				group.Selected = s
			} else {
				group.Supported = false
			}
		}
		found := false
		for _, member := range group.Proxies {
			if member == group.Selected {
				found = true
			}
		}
		if !found {
			group.Selected = group.Proxies[0]
		}
		if kind != "select" {
			if pick, ok := picks[name].(string); !ok || pick == "" || !found {
				group.Selected = ""
			}
		}
		if _, exists := g.nodes[name]; exists {
			g.duplicate[name] = true
		}
		if name == "DIRECT" || name == "REJECT" || name == "COMPATIBLE" {
			g.duplicate[name] = true
		}
		if _, exists := g.groups[name]; exists {
			g.duplicate[name] = true
		}
		g.groups[name] = group
		g.options[name] = options
		profile.Groups = append(profile.Groups, group)
		if !group.Supported {
			profile.GroupsUnsupported++
		}
	}
	_, hasRules := object["rules"]
	if declared || hasDialer || hasRules {
		definition := map[string]any{"proxies": candidates}
		if declared {
			// Retain the declaration even when unsupported. The client must not
			// mistake an invalid/over-limit group list for a node-only subscription.
			definition["proxy-groups"] = rawGroups
		}
		selected := map[string]any{}
		for _, group := range profile.Groups {
			selected[group.Name] = group.Selected
		}
		definition["pingclash-selections"] = selected
		encoded, _ := json.Marshal(definition)
		profile.Definition = string(encoded)
	}
	return g
}

func (g *importGraph) config(mapping map[string]any) (string, error) {
	m := normalizedImportNode(mapping)
	if _, exists := m["dialer-chain"]; exists {
		return "", errors.New("unsupported_fields")
	}
	name, _ := m["name"].(string)
	chain, err := g.nodeChain(m, map[string]bool{"p:" + name: true}, 0)
	if err != nil {
		return "", err
	}
	delete(m, "dialer-proxy")
	if len(chain) > 0 {
		m["dialer-chain"] = chain
	}
	encoded, _ := json.Marshal(m)
	if len(encoded) > 96*1024 {
		return "", errors.New("proxy_chain")
	}
	return string(encoded), nil
}
func (g *importGraph) nodeChain(m map[string]any, seen map[string]bool, depth int) ([]string, error) {
	value, exists := m["dialer-proxy"]
	if !exists {
		return nil, nil
	}
	ref, ok := value.(string)
	if !ok {
		return nil, errors.New("unsupported_fields")
	}
	return g.resolve(ref, seen, depth+1)
}
func (g *importGraph) resolve(ref string, seen map[string]bool, depth int) ([]string, error) {
	invalid := errors.New("proxy_chain")
	if depth > 8 || g.duplicate[ref] {
		return nil, invalid
	}
	if ref == "DIRECT" {
		return nil, nil
	}
	if group, exists := g.groups[ref]; exists {
		key := "g:" + ref
		if seen[key] || !group.Supported || group.Type != "select" || g.options[ref]["disable-udp"] == true {
			return nil, invalid
		}
		seen[key] = true
		defer delete(seen, key)
		return g.resolve(group.Selected, seen, depth+1)
	}
	m, exists := g.nodes[ref]
	if !exists {
		return nil, invalid
	}
	key := "p:" + ref
	if seen[key] {
		return nil, invalid
	}
	seen[key] = true
	defer delete(seen, key)
	if _, exists := m["dialer-chain"]; exists {
		return nil, invalid
	}
	chain, err := g.nodeChain(m, seen, depth)
	if err != nil {
		return nil, err
	}
	node := normalizedImportNode(m)
	delete(node, "dialer-proxy")
	encoded, _ := json.Marshal(node)
	if len(chain) >= 7 || len(encoded) > 16384 || strings.TrimSpace(string(encoded)) == "" {
		return nil, invalid
	}
	return append([]string{string(encoded)}, chain...), nil
}
