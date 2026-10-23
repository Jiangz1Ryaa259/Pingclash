// SPDX-License-Identifier: GPL-3.0-only
package mobile

import (
	"encoding/json"
	"errors"
	"strconv"
	"strings"

	"github.com/metacubex/mihomo/adapter"
	C "github.com/metacubex/mihomo/constant"
)

var protocolFields = map[string]string{
	"ss":        "password cipher plugin plugin-opts udp-over-tcp udp-over-tcp-version client-fingerprint",
	"trojan":    "password sni alpn network ws-opts grpc-opts skip-cert-verify client-fingerprint",
	"vmess":     "uuid alterId cipher tls servername alpn network ws-opts grpc-opts h2-opts http-opts packet-addr xudp packet-encoding global-padding authenticated-length skip-cert-verify client-fingerprint",
	"vless":     "uuid flow encryption tls servername alpn network ws-opts grpc-opts h2-opts http-opts reality-opts packet-addr xudp packet-encoding skip-cert-verify client-fingerprint",
	"hysteria2": "password sni alpn ports hop-interval up down obfs obfs-password skip-cert-verify",
	"tuic":      "uuid password token ip sni alpn disable-sni reduce-rtt congestion-controller udp-relay-mode skip-cert-verify heartbeat-interval request-timeout max-udp-relay-packet-size",
}
var optionFields = map[string]string{
	"ws-opts":      "path headers max-early-data early-data-header-name v2ray-http-upgrade v2ray-http-upgrade-fast-open",
	"grpc-opts":    "grpc-service-name",
	"h2-opts":      "host path",
	"http-opts":    "method path headers",
	"reality-opts": "public-key short-id",
	"plugin-opts":  "mode host path tls mux headers skip-cert-verify",
}

// Use the pinned mihomo parser for a bounded subset. Do not accept configuration
// fields that load files, launch plugins, select another proxy, or override routing.
func parseExtendedNode(text string) (C.ProxyAdapter, error) {
	return parseExtendedNodeWithDialer(text, nil)
}

func parseExtendedNodeWithDialer(text string, via C.Dialer) (C.ProxyAdapter, error) {
	invalid := errors.New("config_invalid")
	mapping, err := strictNodeObject(text)
	if err != nil {
		return nil, invalid
	}
	kind, _ := mapping["type"].(string)
	fields, ok := protocolFields[kind]
	if !ok {
		return nil, invalid
	}
	if !checkFields(mapping, "type name server port udp "+fields, 0) {
		return nil, invalid
	}
	if !secureExtendedTransport(kind, mapping) {
		return nil, invalid
	}
	if value, exists := mapping["udp"]; exists {
		flag, ok := value.(bool)
		if !ok || kind == "http" && flag || (kind == "hysteria2" || kind == "tuic") && !flag {
			return nil, invalid
		}
	}
	server, ok := mapping["server"].(string)
	if !ok || !validHost(server) {
		return nil, invalid
	}
	mapping["server"] = strings.TrimSuffix(server, ".")
	var port int
	switch value := mapping["port"].(type) {
	case json.Number:
		port, _ = strconv.Atoi(string(value))
	case string:
		port, _ = strconv.Atoi(value)
	}
	if port < 1 || port > 65535 {
		return nil, invalid
	}
	mapping["port"] = port
	name, _ := mapping["name"].(string)
	if len(name) > 512 {
		return nil, invalid
	}
	mapping["name"] = "node-01"
	for _, key := range []string{"sni", "servername"} {
		if value, exists := mapping[key]; exists {
			host, ok := value.(string)
			if !ok || host != "" && !validHost(host) {
				return nil, invalid
			}
			mapping[key] = strings.TrimSuffix(host, ".")
		}
	}
	if value, ok := mapping["plugin"].(string); ok && value != "" && value != "obfs" && value != "v2ray-plugin" {
		return nil, invalid
	}
	for _, key := range []string{"password", "username", "uuid", "token"} {
		if value, exists := mapping[key]; exists {
			stringValue, ok := value.(string)
			if !ok || len(stringValue) > 1024 {
				return nil, invalid
			}
		}
	}
	proxy, err := adapter.ParseProxy(mapping, adapter.WithDialerForAPI(via))
	if err != nil {
		return nil, invalid
	}
	return proxy, nil
}

func checkFields(mapping map[string]any, fields string, depth int) bool {
	if depth > 8 || len(mapping) > 100 {
		return false
	}
	allowed := make(map[string]bool)
	for _, key := range strings.Fields(fields) {
		allowed[key] = true
	}
	for key, value := range mapping {
		if !allowed[key] {
			return false
		}
		if key == "headers" {
			if !safeHeaders(value, false) {
				return false
			}
			continue
		}
		if childFields, exists := optionFields[key]; exists {
			child, ok := value.(map[string]any)
			if !ok {
				return false
			}
			if key == "http-opts" {
				if headers, exists := child["headers"]; exists {
					if !safeHeaders(headers, true) {
						return false
					}
					childCopy := make(map[string]any, len(child))
					for k, v := range child {
						if k != "headers" {
							childCopy[k] = v
						}
					}
					child = childCopy
				}
			}
			if !checkFields(child, childFields, depth+1) {
				return false
			}
			continue
		}
		if !safeScalar(key, value) {
			return false
		}
	}
	return true
}
