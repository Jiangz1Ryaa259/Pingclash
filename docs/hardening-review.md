# 发布前排查 / Installation-readiness review

本轮已修复：改用 Mihomo 原生 URLTest、默认 10 路并发与 5 秒超时、100 ms 合并 UI 结果、隔开自动组与普通节点批次、终端首次使用权限确认。新增 CI、Dependabot、版本目录、文档索引和问题模板。完整资源本地化、远程 providers、自动重连及其他下表缺口尚未完成；不作为已支持功能发布。

本地验证：Android 25 项、Java 28 项、Go 68 个测试函数通过；两类短时模糊测试通过。lint 为 0 错误、21 条提示，待交付源码未检出凭据。CI 尚未在 GitHub 运行；本轮没有发布新版本。范围、候选包校验值和限制见[验证记录](security-testing.md)。

This review distinguishes existing implementation, changes in the current working tree, and remaining work. A configured workflow is not evidence that GitHub Actions has already run successfully. The published beta release is not replaced by this review.

## 1. Latency

The old manual latency path used a custom HTTP transport. It now calls the pinned Mihomo `adapter.Proxy.URLTest`, the same core function used by controller endpoints. The mobile bridge does not need to expose a controller HTTP listener. URL and timeout remain configurable; default concurrency is 10 and timeout is 5 seconds. Graph-backed tests run separately from leaf batches to avoid multiplying the UI worker pool by the core health-check pool. Results are collected into a pending map and merged into StateFlow every 100 ms; proxy grid items already use stable member-name keys.

Unified delay is a process-wide Mihomo setting. The app holds it constant within a batch. Tests restore the setting between cases. Full GET diagnostics remain separate from HEAD latency results. A successful URL test is reachability evidence, not proof that all websites or node certificates were verified.

Remaining: the node cards do not yet show a separate TCP-connect metric; TCP/TLS evidence exists in layered diagnostics. TCP is not a valid reachability test for UDP-only Hysteria2/TUIC nodes. DNS prewarming during import is intentionally not enabled: import and validation stay offline. An opt-in warmup at the start of user-requested testing is still pending.

## 2. Security

Production code does not instantiate Mihomo's controller, mixed, HTTP or SOCKS listeners, or load its global listener configuration. It uses TUN plus directly constructed outbound adapters. Socket protection and network binding fail closed. There is no control listener on which to add a random API secret. If one is added later, loopback alone must not be treated as authentication. This is a code/configuration audit, not a claim that every OEM kernel has been probed for open ports.

Subscription fetch errors become fixed public messages. Native logs are disabled; diagnostic results contain fixed codes and omit endpoints/credentials. Subscription URLs are stored only in encrypted profiles and excluded from profile exports. Android backup is disabled and data-extraction exclusions cover cloud backup and device transfer. Existing tests cover encryption, tampering, redaction and separate-UID forwarding.

The terminal already runs only manually entered commands, uses no automatic history file, disables OSC 52 clipboard manipulation and closes shells on backgrounding. New first-use modal acknowledgement prevents shell creation until the app-UID/files/network permission warning is accepted. Only a non-sensitive acknowledgement boolean is persisted. A real shell can still explicitly write files or print secrets supplied by its user; it is not an isolated read-only environment.

## 3. Subscription management

| Item | Result |
| --- | --- |
| Clash YAML / JSON and Base64 URI lists | Implemented, bounded parser and rejection categories |
| Original local policy groups | Implemented for supported group types and options |
| subscription-userinfo quota / expiry | Missing |
| Custom subscription User-Agent | Missing; current downloader has a fixed generic UA |
| clash://install-config deep links | Missing; no VIEW intent handler |
| QR scanner / dedicated clipboard import | Missing; ordinary text-field paste is available |
| proxy-providers / rule-providers | Missing; provider-only inputs fail explicitly; remote rules are not silently executed |
| Pinned Mihomo version in About | Implemented: v1.19.32 |

Provider support needs bounded downloads, explicit HTTPS/redirect handling, cycle and name resolution, size/time limits, local caching and a rule model before activation. It cannot safely be implemented by simply fetching and concatenating arbitrary provider URLs.

## 4. Repository maintenance

Added a read-only-permission push/PR workflow with pinned official action SHAs, debug APK build, lint, Java verification, native tests, bounded fuzzing and reachable vulnerability scan. The workflow never uses release signing keys, uploads user data or runs pull_request_target. Dependabot covers Gradle, Go modules and Actions weekly, without auto-merge. Versions are centralized in libs.versions.toml; this refactor does not blindly upgrade eight old baseline dependencies. Dependency updates must also update and review the verification hashes.

Added .editorconfig, CHANGELOG, a privacy-aware issue form and documentation index. README screenshots use synthetic emulator data. ktlint/detekt remains pending; the existing compact Kotlin formatting needs an explicit formatting migration rather than thousands of unrelated changes mixed into the security fixes.

## 5. Tests

The initial beta already had 68 native test functions, Java diagnostic verification, and Android integration tests. Parser, legacy fields, null/type confusion, duplicate keys, nesting, malformed documents and static error-code redaction are covered. `FuzzUntrustedProfile` and `FuzzRuntimeOptions` already exist and are rerun for this review. The new URLTest path is exercised against real local AnyTLS and TLS fixtures; cancellation, untrusted target certificates and global-mode isolation are checked.

Remaining: consolidate existing fixtures into a named, sanitized compatibility corpus; add more provider-specific cases once providers are implemented. Error classification uses typed errors/call boundaries, not arbitrary raw log-string matching. OEM and physical-device validation remains separate.

## 6. Device robustness

Network-loss handling currently stops the VPN safely; it does not perform automatic Wi-Fi/cellular reconnection. Traffic notifications already update once per second. Quick Settings tile is missing. Foreground service is declared as systemExempted for an authorized VPN; always-on startup is accepted only when Android authorization exists. System VPN and battery-settings entry points are present. OEM-specific survival, Android 12–14 physical-device behavior, automatic reconnect and detailed lockdown guidance remain pending. No guarantee of surviving vendor task killers is made.

## 7. Localization

The current UI relies heavily on hardcoded Chinese strings and a hand-maintained translation map. Full strings.xml/plurals migration, locale-config and system/app language preference synchronization are **not complete**. New terminal-warning strings are Android resources in values and values-zh-rCN. Do not describe this initial resource addition as a completed localization migration. Android 13 provides a native LocaleManager API as well as AppCompat's cross-version API; a Compose ComponentActivity does not inherently require switching to XML views or AppCompatActivity.

## Sources

- [Mihomo controller APIs](https://wiki.metacubex.one/api/)
- [Pinned core URLTest](https://github.com/MetaCubeX/mihomo/blob/v1.19.32/adapter/adapter.go)
- [Android per-app languages](https://developer.android.com/guide/topics/resources/app-languages)
- [Dependabot configuration](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference)
