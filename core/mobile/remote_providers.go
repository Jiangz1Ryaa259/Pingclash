// SPDX-License-Identifier: GPL-3.0-only
package mobile

// This bridge only parses and expands data. Android owns HTTPS, encrypted
// caches, deadlines and refresh scheduling; no Mihomo global service is started.
import (
	"encoding/json"
	"errors"
	"io"
	"net/netip"
	"net/url"
	"regexp"
	"sort"
	"strconv"
	"strings"

	"go.yaml.in/yaml/v3"
)

type remoteSpec struct {
	ID        string            `json:"id"`
	Kind      string            `json:"kind"`
	Index     int               `json:"index"`
	URL       string            `json:"url"`
	Interval  int               `json:"interval"`
	Headers   map[string]string `json:"headers"`
	Name      string            `json:"name"`
	Behavior  string            `json:"behavior,omitempty"`
	Format    string            `json:"format,omitempty"`
	Filter    string            `json:"filter,omitempty"`
	SizeLimit int               `json:"sizeLimit,omitempty"`
}
type remoteFailure struct {
	index      int
	kind, code string
}

func (e *remoteFailure) Error() string { return e.code }
func remoteResult(value any) string    { b, _ := json.Marshal(value); return string(b) }
func remoteError(e error) string {
	f := &remoteFailure{0, "", "provider_invalid"}
	errors.As(e, &f)
	return remoteResult(map[string]any{"state": "failed", "index": f.index, "kind": f.kind, "code": f.code})
}
func remoteYAML(text string) (any, error) {
	if len(text) == 0 || len(text) > 2*1024*1024 || strings.Count(text, "\n") > 50000 {
		return nil, errors.New("provider_payload")
	}
	punct := 0
	for _, c := range text {
		if strings.ContainsRune("\n[]{}:,", c) {
			punct++
			if punct > 50000 {
				return nil, errors.New("provider_payload")
			}
		}
	}
	d := yaml.NewDecoder(strings.NewReader(normalizeJSONStringTokens(text)))
	var n yaml.Node
	if d.Decode(&n) != nil || len(n.Content) != 1 || d.Decode(new(yaml.Node)) != io.EOF {
		return nil, errors.New("provider_payload")
	}
	count := 0
	if !safeYAML(&n, 0, &count) {
		return nil, errors.New("provider_payload")
	}
	var v any
	if n.Decode(&v) != nil {
		return nil, errors.New("provider_payload")
	}
	return v, nil
}
func remotePlan(text string) (map[string]any, []remoteSpec, error) {
	text, _ = unwrapSubscription(text)
	v, e := remoteYAML(text)
	if e != nil {
		return nil, nil, e
	}
	root, ok := v.(map[string]any)
	if !ok {
		return nil, nil, nil
	}
	specs := []remoteSpec{}
	for _, kind := range []string{"proxy", "rule"} {
		raw, exists := root[kind+"-providers"]
		if !exists {
			continue
		}
		providers, ok := raw.(map[string]any)
		if !ok || len(providers) > 16 {
			return nil, nil, errors.New("provider_invalid")
		}
		names := []string{}
		for name := range providers {
			names = append(names, name)
		}
		sort.Strings(names)
		for _, name := range names {
			s := remoteSpec{ID: kind + ":" + name, Kind: kind, Name: name, Index: len(specs) + 1, Interval: 3600, Format: "yaml", Headers: map[string]string{}}
			bad := func() (map[string]any, []remoteSpec, error) {
				return nil, nil, &remoteFailure{s.Index, kind, "provider_invalid"}
			}
			m, ok := providers[name].(map[string]any)
			if !ok || len(name) == 0 || len(name) > 512 || hasControl(name) || m["type"] != "http" {
				return bad()
			}
			for k, val := range m {
				switch k {
				case "type", "url", "path", "interval", "header":
				case "behavior", "format":
					if kind != "rule" {
						return bad()
					}
				case "filter":
					if kind != "proxy" {
						return bad()
					}
					s.Filter, ok = val.(string)
					if !ok || len(s.Filter) > 1024 {
						return bad()
					}
					if _, e := regexp.Compile(s.Filter); e != nil {
						return bad()
					}
				case "health-check":
					if kind != "proxy" {
						return bad()
					}
					if _, ok := val.(map[string]any); !ok {
						return bad()
					}
				case "proxy":
					if val != "DIRECT" && val != "" {
						return bad()
					}
				case "size-limit":
					b, _ := json.Marshal(val)
					n, e := strconv.Atoi(string(b))
					if e != nil || n < 0 || n > 2*1024*1024 {
						return bad()
					}
					s.SizeLimit = n
				default:
					return bad()
				}
			}
			s.URL, ok = m["url"].(string)
			u, e := url.Parse(s.URL)
			if !ok || e != nil || len(s.URL) > 4096 || u.Scheme != "https" || u.Hostname() == "" || u.User != nil || u.Fragment != "" || hasControl(s.URL) {
				return bad()
			}
			if port := u.Port(); port != "" {
				n, e := strconv.Atoi(port)
				if e != nil || n < 1 || n > 65535 {
					return bad()
				}
			}
			if val, exists := m["interval"]; exists {
				b, _ := json.Marshal(val)
				n, e := strconv.Atoi(string(b))
				if e != nil || n < 60 || n > 604800 {
					return bad()
				}
				s.Interval = n
			}
			if val, exists := m["header"]; exists {
				h, ok := val.(map[string]any)
				if !ok || len(h) > 16 {
					return bad()
				}
				seenHeaders := map[string]bool{}
				for key, val := range h {
					lower := strings.ToLower(key)
					if seenHeaders[lower] {
						return bad()
					}
					seenHeaders[lower] = true
					if !regexp.MustCompile(`^[A-Za-z0-9-]{1,64}$`).MatchString(key) {
						return bad()
					}
					switch strings.ToLower(key) {
					case "host", "connection", "content-length", "transfer-encoding", "cookie", "proxy-authorization":
						return bad()
					}
					values, ok := val.([]any)
					if !ok || len(values) != 1 {
						return bad()
					}
					str, ok := values[0].(string)
					if !ok || len(str) > 2048 || hasControl(str) {
						return bad()
					}
					s.Headers[key] = str
				}
			}
			if kind == "rule" {
				s.Behavior, _ = m["behavior"].(string)
				if s.Behavior != "domain" && s.Behavior != "ipcidr" && s.Behavior != "classical" {
					return bad()
				}
				if v, ok := m["format"]; ok {
					s.Format, _ = v.(string)
				}
				if s.Format != "yaml" && s.Format != "text" {
					return bad()
				}
			}
			specs = append(specs, s)
			if len(specs) > 16 {
				return bad()
			}
		}
	}
	return root, specs, nil
}

// PlanRemoteProviders returns PRIVATE URLs and headers. Never log this value.
func PlanRemoteProviders(text string) (result string) {
	defer func() {
		if recover() != nil {
			result = remoteError(errors.New("provider_invalid"))
		}
	}()
	unwrapped, _ := unwrapSubscription(text)
	if looksLikeShareList(unwrapped) {
		return remoteResult(map[string]any{"state": "passed", "providers": []remoteSpec{}})
	}
	_, specs, e := remotePlan(text)
	if e != nil {
		return remoteError(e)
	}
	return remoteResult(map[string]any{"state": "passed", "providers": specs})
}

// ResolveRemoteProviders expands only the explicitly supplied provider bodies.
// No URL or caller-controlled path is opened. Failure returns a safe ordinal.
func ResolveRemoteProviders(text, bodiesJSON string) (result string) {
	defer func() {
		if recover() != nil {
			result = remoteError(errors.New("provider_payload"))
		}
	}()
	root, specs, e := remotePlan(text)
	if e != nil {
		return remoteError(e)
	}
	if len(specs) == 0 {
		return remoteResult(map[string]any{"state": "passed", "content": text})
	}
	if len(bodiesJSON) > 3*1024*1024 {
		return remoteError(errors.New("provider_payload"))
	}
	var bodies map[string]string
	if json.Unmarshal([]byte(bodiesJSON), &bodies) != nil {
		return remoteError(errors.New("provider_payload"))
	}
	nodes, _ := root["proxies"].([]any)
	nodes = append([]any{}, nodes...)
	members := map[string][]any{}
	ruleLists := map[string][]string{}
	seen := map[string]bool{}
	for _, raw := range nodes {
		if m, ok := raw.(map[string]any); ok {
			n, _ := m["name"].(string)
			seen[n] = true
		}
	}
	for _, s := range specs {
		bad := func() string { return remoteError(&remoteFailure{s.Index, s.Kind, "provider_payload"}) }
		body, ok := bodies[s.ID]
		if !ok {
			return bad()
		}
		if s.SizeLimit > 0 && len(body) > s.SizeLimit {
			return bad()
		}
		if s.Kind == "proxy" {
			v, e := remoteYAML(body)
			if e != nil {
				return bad()
			}
			m, ok := v.(map[string]any)
			if !ok {
				return bad()
			}
			list, ok := m["proxies"].([]any)
			if !ok || len(list) == 0 {
				return bad()
			}
			members[s.Name] = []any{}
			filter, _ := regexp.Compile(s.Filter)
			for _, raw := range list {
				n, ok := raw.(map[string]any)
				if !ok {
					return bad()
				}
				name, ok := n["name"].(string)
				if !ok || name == "" || len(name) > 512 || hasControl(name) {
					return bad()
				}
				if s.Filter != "" && !filter.MatchString(name) {
					continue
				}
				if seen[name] {
					return bad()
				}
				seen[name] = true
				nodes = append(nodes, n)
				members[s.Name] = append(members[s.Name], name)
				if len(nodes) > 500 {
					return bad()
				}
			}
		} else {
			var entries []any
			if s.Format == "yaml" {
				v, e := remoteYAML(body)
				if e != nil {
					return bad()
				}
				m, ok := v.(map[string]any)
				if !ok {
					return bad()
				}
				entries, ok = m["payload"].([]any)
				if !ok {
					return bad()
				}
			} else {
				if len(body) > 2*1024*1024 {
					return bad()
				}
				for _, line := range strings.Split(body, "\n") {
					line = strings.TrimSpace(line)
					if line != "" && !strings.HasPrefix(line, "#") {
						entries = append(entries, line)
					}
				}
			}
			if len(entries) > 2000 {
				return bad()
			}
			for _, raw := range entries {
				line, ok := raw.(string)
				if !ok || len(line) > 1024 || hasControl(line) {
					return bad()
				}
				switch s.Behavior {
				case "domain":
					kind := "DOMAIN"
					if strings.HasPrefix(line, "+.") {
						kind = "DOMAIN-SUFFIX"
						line = line[2:]
					} else if strings.HasPrefix(line, ".") {
						return bad()
					} else if strings.Contains(line, "*") {
						return bad()
					}
					line = kind + "," + line
				case "ipcidr":
					p, e := netip.ParsePrefix(line)
					if e != nil {
						return bad()
					}
					kind := "IP-CIDR"
					if p.Addr().Is6() {
						kind = "IP-CIDR6"
					}
					line = kind + "," + line
				case "classical":
					parts := strings.Split(line, ",")
					if len(parts) != 2 && !(len(parts) == 3 && parts[2] == "no-resolve" && (parts[0] == "IP-CIDR" || parts[0] == "IP-CIDR6")) {
						return bad()
					}
				}
				probe := line + ",REJECT"
				if strings.HasSuffix(line, ",no-resolve") {
					probe = strings.TrimSuffix(line, ",no-resolve") + ",REJECT,no-resolve"
				}
				if _, _, code := compileRules([]string{probe}); code != "" {
					return bad()
				}
				ruleLists[s.Name] = append(ruleLists[s.Name], line)
			}
		}
	}
	groups, _ := root["proxy-groups"].([]any)
	for _, raw := range groups {
		g, ok := raw.(map[string]any)
		if !ok {
			continue
		}
		list, _ := g["proxies"].([]any)
		list = append([]any{}, list...)
		// A group's filter applies to provider-derived members, but must not
		// remove explicitly named nested policy groups such as an auto selector.
		filterRaw, _ := g["filter"].(string)
		filters := []*regexp.Regexp{}
		for _, pattern := range strings.Split(filterRaw, "`") {
			if pattern == "" {
				continue
			}
			if len(pattern) > 4096 {
				return remoteError(errors.New("provider_payload"))
			}
			r, e := regexp.Compile(pattern)
			if e != nil {
				return remoteError(errors.New("provider_payload"))
			}
			filters = append(filters, r)
		}
		appendProvider := func(values []any) {
			for _, value := range values {
				name, _ := value.(string)
				keep := len(filters) == 0
				for _, filter := range filters {
					if filter.MatchString(name) {
						keep = true
						break
					}
				}
				if keep {
					list = append(list, value)
				}
			}
		}
		use, exists := g["use"]
		if exists {
			u, ok := use.([]any)
			if !ok {
				return remoteError(errors.New("provider_payload"))
			}
			for _, raw := range u {
				name, ok := raw.(string)
				m, exists := members[name]
				if !ok || !exists {
					return remoteError(errors.New("provider_payload"))
				}
				appendProvider(m)
			}
		}
		if g["include-all-providers"] == true {
			for _, s := range specs {
				if s.Kind == "proxy" {
					appendProvider(members[s.Name])
				}
			}
		}
		g["proxies"] = list
		delete(g, "use")
		delete(g, "include-all-providers")
	}
	rawRules, _ := root["rules"].([]any)
	rules := []any{}
	for _, raw := range rawRules {
		line, ok := raw.(string)
		if !ok {
			return remoteError(errors.New("provider_payload"))
		}
		parts := strings.Split(line, ",")
		for i := range parts {
			parts[i] = strings.TrimSpace(parts[i])
		}
		if parts[0] != "RULE-SET" {
			rules = append(rules, line)
		} else {
			if len(parts) < 3 || len(parts) > 4 || len(parts) == 4 && parts[3] != "no-resolve" {
				return remoteError(errors.New("provider_payload"))
			}
			list, exists := ruleLists[parts[1]]
			if !exists {
				return remoteError(errors.New("provider_payload"))
			}
			for _, r := range list {
				suffix := ""
				if (len(parts) == 4 || strings.HasSuffix(r, ",no-resolve")) && strings.HasPrefix(r, "IP-CIDR") {
					suffix = ",no-resolve"
				}
				r = strings.TrimSuffix(r, ",no-resolve")
				rules = append(rules, r+","+parts[2]+suffix)
			}
		}
		if len(rules) > 2000 {
			return remoteError(errors.New("provider_payload"))
		}
	}
	root["proxies"] = nodes
	root["rules"] = rules
	delete(root, "proxy-providers")
	delete(root, "rule-providers")
	b, e := json.Marshal(root)
	if e != nil || len(b) > 2*1024*1024 {
		return remoteError(errors.New("provider_payload"))
	}
	return remoteResult(map[string]any{"state": "passed", "content": string(b)})
}
