# 发布前排查 / Installation-readiness review

本轮已修复：改用 Mihomo 原生 URLTest、默认 10 路并发与 5 秒超时、100 ms 合并 UI 结果、隔开自动组与普通节点批次、终端首次使用权限确认。新增 CI、Dependabot、版本目录、文档索引和问题模板。后续已加入应用与诊断文本资源、系统应用语言、自动重连和最近任务修正。本轮进一步实现自定义 UA、配额显示、独立 TCP 指标和 HTTP providers 受限首版；剩余兼容范围见下表及 subscriptions.md。

最近本地 debug 验证：Android 26 项、Java 28 项、Go 70 个测试函数通过。原生测试连续三轮通过，两个时序相关测试连续 20 轮通过。GitHub 首次完整通过记录：提交 5f2470e 的 Actions 运行 39995451294；本地化/后台后续修改另行验证，本轮不替换已发布资产。范围、候选包校验值和限制见[验证记录](security-testing.md)。

This review distinguishes existing implementation, changes in the current working tree, and remaining work. A configured workflow is not evidence that GitHub Actions has already run successfully. The published beta release is not replaced by this review.

## 1. Latency

The old manual latency path used a custom HTTP transport. It now calls the pinned Mihomo `adapter.Proxy.URLTest`, the same core function used by controller endpoints. The mobile bridge does not need to expose a controller HTTP listener. URL and timeout remain configurable; default concurrency is 10 and timeout is 5 seconds. Graph-backed tests run separately from leaf batches to avoid multiplying the UI worker pool by the core health-check pool. Results are collected into a pending map and merged into StateFlow every 100 ms; proxy grid items already use stable member-name keys.

Unified delay is a process-wide Mihomo setting. The app holds it constant within a batch. Tests restore the setting between cases. Full GET diagnostics remain separate from HEAD latency results. A successful URL test is reachability evidence, not proof that all websites or node certificates were verified.

Node cards now show separate direct TCP-connect metrics, with explicit testing through the proxy menu or card. TCP/TLS evidence also exists in layered diagnostics. TCP is not a valid reachability test for UDP-only Hysteria2/TUIC nodes. DNS prewarming during import is intentionally not enabled: node-only parsing/validation stay offline; an explicit HTTP provider import downloads its declared sources. An opt-in warmup at the start of user-requested testing is still pending.

## 2. Security

Production code does not instantiate Mihomo's controller, mixed, HTTP or SOCKS listeners, or load its global listener configuration. It uses TUN plus directly constructed outbound adapters. Socket protection and network binding fail closed. There is no control listener on which to add a random API secret or return HTTP 401. Regression checks instead prohibit mobile listener/global-config initialization, strip global listener directives from imported runtime definitions, and compare app-UID TCP acceptors before/after VPN startup in the controlled emulator. A future controller must add authentication tests before this architecture guard is changed. If one is added later, loopback alone must not be treated as authentication. This is a code/configuration audit, not a claim that every OEM kernel has been probed for open ports.

Subscription fetch errors become fixed public messages. Native logs are disabled; diagnostic results contain fixed codes and omit endpoints/credentials. Subscription URLs are stored only in encrypted profiles and excluded from profile exports. Android backup is disabled and data-extraction exclusions cover cloud backup and device transfer. Existing tests cover encryption, tampering, redaction and separate-UID forwarding.

The terminal already runs only manually entered commands, uses no automatic history file, disables OSC 52 clipboard manipulation and closes shells on backgrounding. New first-use modal acknowledgement prevents shell creation until the app-UID/files/network permission warning is accepted. Only a non-sensitive acknowledgement boolean is persisted. A real shell can still explicitly write files or print secrets supplied by its user; it is not an isolated read-only environment.

## 3. Subscription management

| Item | Result |
| --- | --- |
| Clash YAML / JSON and Base64 URI lists | Implemented, bounded parser and rejection categories |
| Original local policy groups | Implemented for supported group types and options |
| subscription-userinfo quota / expiry | Implemented: bounded header parsing, used/remaining/expiry and unknown handling |
| Custom subscription User-Agent | Implemented per subscription; printable ASCII validation; encrypted persistence |
| clash://install-config deep links | Missing; no VIEW intent handler |
| QR scanner / dedicated clipboard import | Missing; ordinary text-field paste is available |
| proxy-providers / rule-providers | Initial HTTP/HTTPS subset implemented with encrypted cache, interval polling, atomic refresh and safe errors; see subscriptions.md |
| Pinned Mihomo version in About | Implemented: v1.19.32 |

The initial provider scope and remaining compatibility limits are documented in subscriptions.md. Failed refreshes preserve the previous snapshot; changed caches take effect at the next VPN establishment. QR/image import is deliberately deferred.

## 4. Repository maintenance

Added a read-only-permission push/PR workflow with pinned action SHAs, debug APK build, lint, Java verification, native tests, bounded fuzzing and reachable vulnerability scan. The first clean GitHub run passed after adding three publisher-checksummed Maven metadata entries and fixing asynchronous test fixtures. Android 12–15 emulator integration jobs are also configured; their results must be checked per commit. The workflow never uses release signing keys, uploads user data or runs pull_request_target. Dependabot covers Gradle, Go modules and Actions weekly, without auto-merge. Versions are centralized in libs.versions.toml; this refactor does not blindly upgrade eight old baseline dependencies. Dependency updates must also update and review the verification hashes.

Added .editorconfig, CHANGELOG, a privacy-aware issue form and documentation index. README screenshots use synthetic emulator data. ktlint/detekt remains pending; the existing compact Kotlin formatting needs an explicit formatting migration rather than thousands of unrelated changes mixed into the security fixes.

## 5. Tests

The initial beta had 68 native test functions; two listener-policy regressions and three remote-provider regressions bring the current count to 73. It also had Java diagnostic verification and Android integration tests. Parser, legacy fields, null/type confusion, duplicate keys, nesting, malformed documents and static error-code redaction are covered. `FuzzUntrustedProfile`, `FuzzRuntimeOptions` and `FuzzRemoteProviders` exist and are rerun for this review. The new URLTest path is exercised against real local AnyTLS and TLS fixtures; cancellation, untrusted target certificates and global-mode isolation are checked.

Remaining: consolidate existing fixtures into a named, sanitized compatibility corpus; broaden provider format/compatibility coverage beyond the first HTTP subset. Error classification uses typed errors/call boundaries, not arbitrary raw log-string matching. OEM and physical-device validation remains separate.

## 6. Device robustness

Automatic reconnection now stops old outbound sockets, keeps the original TUN open and waits for the current usable non-VPN network. A 26th Android test disables Wi-Fi/cellular, verifies TUN/foreground notification retention, restores connectivity and verifies proxy access without new permission. Explicit disconnect, permission revocation or invalid configuration stops recovery. Traffic notifications already update once per second. Quick Settings tile is missing. Foreground service is declared as systemExempted for an authorized VPN; always-on startup is accepted only when Android authorization exists. System VPN and battery-settings entry points are present. OEM-specific survival and Android 12–14 physical-device validation remain pending. Generic always-on/lockdown and notification guidance is in background-vpn.md. The dashboard is no longer excluded from recents; its snapshot is disabled on Android 13+. No guarantee of surviving vendor task killers is made.

## 7. Localization

App-owned messages and diagnostic evidence now use 553 paired English/Chinese Android resource entries, including plurals. Diagnostic enums resolve labels at display time; reports use the actual app version. Android 13+ uses LocaleManager with locale-config and system preference synchronization; older Android uses an observable resource context. Both languages are packaged, so language switching requires no Play Services download. Terminal notices, startup failures and process-exit messages use the same resource resolver; copy/paste/more menus now include Simplified Chinese. Raw Android/program output remains unchanged.

MissingTranslation and HardcodedText are lint errors. A separate CI guard checks resource keys, format placeholders and hardcoded app/Compose messages. Shell output, user node/group names and third-party terminal command output are not translated. ktlint/detekt remains separate work.

## Latency retry tradeoff

Cancel is already available for a batch and individual runs use core cancellation. A mandatory 2.5-second pass followed by 5-second retries would raise the all-failed 200-node/10-worker worst case from about 100 to 150 seconds, plus overhead. That two-pass strategy is not enabled by default; an optional fast mode needs its own UI/progress contract. Native URLTest, bounded workers and 100 ms result batches remain the implemented path.

## Sources

- [Mihomo controller APIs](https://wiki.metacubex.one/api/)
- [Pinned core URLTest](https://github.com/MetaCubeX/mihomo/blob/v1.19.32/adapter/adapter.go)
- [Android per-app languages](https://developer.android.com/guide/topics/resources/app-languages)
- [Dependabot configuration](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference)
