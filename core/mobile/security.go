// SPDX-License-Identifier: GPL-3.0-only
package mobile

import (
	"encoding/json"
	"errors"
	"io"
	"strings"
	"unicode"
	"unicode/utf8"
)

// Decode before handing input to struct decoders or mihomo's weakly typed parser.
// Duplicate names, case aliases, nulls and container type confusion must not gain
// different meanings at the two sides of that boundary.
func strictNodeObject(text string) (map[string]any, error) {
	invalid := errors.New("config_invalid")
	if len(text) == 0 || len(text) > 96*1024 || !utf8.ValidString(text) {
		return nil, invalid
	}
	decoder := json.NewDecoder(strings.NewReader(text))
	decoder.UseNumber()
	count := 0
	var read func(int) (any, error)
	read = func(depth int) (any, error) {
		count++
		if depth > 8 || count > 4096 {
			return nil, invalid
		}
		token, err := decoder.Token()
		if err != nil {
			return nil, invalid
		}
		switch value := token.(type) {
		case json.Delim:
			switch value {
			case '{':
				object := make(map[string]any)
				for decoder.More() {
					keyToken, err := decoder.Token()
					key, ok := keyToken.(string)
					if err != nil || !ok || len(key) > 128 || len(object) >= 100 {
						return nil, invalid
					}
					if _, exists := object[key]; exists {
						return nil, invalid
					}
					child, err := read(depth + 1)
					if err != nil {
						return nil, invalid
					}
					object[key] = child
				}
				end, err := decoder.Token()
				if err != nil || end != json.Delim('}') {
					return nil, invalid
				}
				return object, nil
			case '[':
				array := make([]any, 0)
				for decoder.More() {
					if len(array) >= 32 {
						return nil, invalid
					}
					child, err := read(depth + 1)
					if err != nil {
						return nil, invalid
					}
					array = append(array, child)
				}
				end, err := decoder.Token()
				if err != nil || end != json.Delim(']') {
					return nil, invalid
				}
				return array, nil
			}
		case string:
			if len(value) > 16384 {
				return nil, invalid
			}
			return value, nil
		case nil, bool, json.Number:
			return value, nil
		}
		return nil, invalid
	}
	value, err := read(0)
	object, ok := value.(map[string]any)
	if err != nil || !ok {
		return nil, invalid
	}
	if _, err := decoder.Token(); err != io.EOF {
		return nil, invalid
	}
	// Mihomo treats absent/null HY2 bandwidth as automatic congestion control.
	// Keep this exception at the root and protocol-specific; credentials, TLS
	// switches and nested containers must still reject null/type confusion.
	if object["type"] == "hysteria2" {
		for _, key := range []string{"up", "down"} {
			if object[key] == nil {
				delete(object, key)
			}
		}
	}
	var nonNull func(any) bool
	nonNull = func(v any) bool {
		if v == nil {
			return false
		}
		switch x := v.(type) {
		case map[string]any:
			for _, child := range x {
				if !nonNull(child) {
					return false
				}
			}
		case []any:
			for _, child := range x {
				if !nonNull(child) {
					return false
				}
			}
		}
		return true
	}
	if !nonNull(object) {
		return nil, invalid
	}
	return object, nil
}

func hasControl(text string) bool {
	return strings.IndexFunc(text, func(r rune) bool { return unicode.IsControl(r) || unicode.Is(unicode.Cf, r) }) >= 0
}

func httpToken(text string) bool {
	if text == "" || len(text) > 128 {
		return false
	}
	for _, r := range text {
		if !(r >= 'a' && r <= 'z' || r >= 'A' && r <= 'Z' || r >= '0' && r <= '9' || strings.ContainsRune("!#$%&'*+-.^_`|~", r)) {
			return false
		}
	}
	return true
}

func safeHeaders(value any, listValues bool) bool {
	headers, ok := value.(map[string]any)
	if !ok || len(headers) > 32 {
		return false
	}
	seen := make(map[string]bool)
	total := 0
	for key, value := range headers {
		lower := strings.ToLower(key)
		if !httpToken(key) || seen[lower] {
			return false
		}
		seen[lower] = true
		values := []any{value}
		if listValues {
			var ok bool
			values, ok = value.([]any)
			if !ok || len(values) > 16 {
				return false
			}
		}
		for _, value := range values {
			text, ok := value.(string)
			if !ok || len(text) > 4096 || hasControl(text) {
				return false
			}
			total += len(key) + len(text) + 4
			if total > 8192 {
				return false
			}
		}
	}
	return true
}

func safeScalar(key string, value any) bool {
	if strings.Contains(" udp tls disable-reuse skip-cert-verify udp-over-tcp packet-addr xudp global-padding authenticated-length disable-sni reduce-rtt mux v2ray-http-upgrade v2ray-http-upgrade-fast-open ", " "+key+" ") {
		flag, ok := value.(bool)
		return ok && (key != "disable-sni" && key != "reduce-rtt" || !flag)
	}
	if strings.Contains(" port alterId udp-over-tcp-version hop-interval heartbeat-interval request-timeout max-udp-relay-packet-size max-early-data idle-session-check-interval idle-session-timeout min-idle-session ", " "+key+" ") {
		number, ok := value.(json.Number)
		if !ok && key == "port" {
			text, stringOK := value.(string)
			if stringOK {
				number, ok = json.Number(text), true
			}
		}
		if !ok {
			return false
		}
		integer, err := number.Int64()
		if err != nil || integer < 0 || integer > 65535 {
			return false
		}
		return key != "max-early-data" || integer <= 8192
	}
	if key == "alpn" || key == "path" || key == "host" {
		if array, ok := value.([]any); ok {
			if len(array) > 16 {
				return false
			}
			for _, item := range array {
				text, ok := item.(string)
				if !ok || hasControl(text) || len(text) > 4096 || key == "alpn" && (len(text) == 0 || len(text) > 255) {
					return false
				}
			}
			return true
		}
		if key == "alpn" {
			return false
		}
	}
	if key == "up" || key == "down" {
		if number, ok := value.(json.Number); ok {
			n, err := number.Int64()
			return err == nil && n >= 0 && n <= 1000000
		}
	}
	text, ok := value.(string)
	if !ok {
		return false
	}
	if key == "password" || key == "username" || key == "token" || key == "obfs-password" {
		return len(text) <= 1024
	}
	if hasControl(text) {
		return false
	}
	if key == "method" || key == "early-data-header-name" {
		return httpToken(text)
	}
	return len(text) <= 4096
}

func secureExtendedTransport(kind string, mapping map[string]any) bool {
	switch kind {
	case "vless":
		// VLESS carries neither encryption nor server authentication on its own.
		return mapping["tls"] == true
	case "vmess":
		cipher, _ := mapping["cipher"].(string)
		if cipher != "" && cipher != "auto" && cipher != "aes-128-gcm" && cipher != "chacha20-poly1305" {
			return false
		}
		if id, exists := mapping["alterId"]; exists {
			return id == json.Number("0")
		}
	case "ss":
		cipher, _ := mapping["cipher"].(string)
		return strings.Contains(" aes-128-gcm aes-192-gcm aes-256-gcm chacha20-ietf-poly1305 xchacha20-ietf-poly1305 2022-blake3-aes-128-gcm 2022-blake3-aes-256-gcm 2022-blake3-chacha20-poly1305 ", " "+cipher+" ") && cipher != ""
	}
	return true
}
