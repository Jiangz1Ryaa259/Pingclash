# Provider compatibility corpus

Android downloads HTTPS source bodies; `core/mobile/remote_providers.go` parses and expands them into a bounded local graph. Outbound adapters and rule compilation use Mihomo, but the app does **not** pass provider cache files to Mihomo's global provider registry. MRS support is not automatically available. Subscription `path` fields are ignored; originals and bodies remain in authenticated encrypted private storage.

The offline corpus is in `core/mobile/testdata/provider-compatibility/`. Its manifest records the source URL and SHA-256 of Mihomo v1.19.32's public `docs/config.yaml`. Examples were minimized and adapted to the mobile bridge with `.invalid` endpoints, reserved IP networks and synthetic canaries. These are public example-derived scenarios, **not collected or validated user subscriptions**. Additional sanitized service-specific layouts still need review before inclusion.

`TestProviderCompatibilityCorpus` checks planning, expansion, import, exact group members and rule-mode runtime validation offline. Rejection cases assert fixed errors without canaries. A rejection records a limitation, not successful compatibility.

| Fixture | Expected result |
| --- | --- |
| http-proxy-filtered | Import; retain explicit group hierarchy and provider membership filter |
| rule-domain | Import YAML domain rules in order |
| rule-ipcidr | Import text IPv4/IPv6 CIDR rules in order |
| rule-classical | Import supported classical YAML rules in order |
| local-nodes-and-official-order | Import without providers; retain official members |
| inline-proxy / inline-rule | Reject; inline provider implementation pending |
| file-proxy | Reject; no subscription-controlled local file access |
| provider-override | Reject; arbitrary override pending |
| group-download | Reject; chosen-proxy source download pending |
| insecure-source | Reject HTTP download URL |
| mrs-rule | Reject; no MRS decoder wired to this bridge |
| malformed-provider-body | Reject malformed source body |
| duplicate-source-members | Reject ambiguous duplicate names across sources |

Run `go test ./mobile -run TestProviderCompatibilityCorpus` from `core/`, or the normal native verification script. Current scope: **14 scenarios, 5 accepted and 9 rejected**. All 14 test cases passing does not mean all 14 configurations import successfully.

Before adding formats, preserve encrypted storage, ignored caller paths, bounded decoding, transactional refresh, original group order and safe failure messages. See [subscriptions](subscriptions.md) for size and refresh limits.
