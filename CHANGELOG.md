# Changelog

## Unreleased

- Confirm HTTPS `clash://install-config` requests and persist imported profiles as inactive until a separate explicit selection.
- Add a detekt baseline CI gate and mark UDP-only TCP metrics as `N/A (UDP)` before testing.
- Add a 14-case public-example-derived provider corpus with explicit accepted/rejected outcomes, canary privacy regressions and strict diagnostic metadata formatting.
- Prepare next-beta release notes with provider, OEM, terminal/export and remaining feature limitations; no release asset is replaced automatically.

- Add per-subscription User-Agent and quota/expiry parsing with encrypted persistence.
- Add a bounded HTTP/HTTPS provider subset, original group membership, rule expansion, private encrypted cache and transactional refresh.
- Add direct TCP latency metrics separately from native Mihomo URLTest.
- Localize terminal startup/exit and text selection actions; retain original shell output.
- Audit all reachable Git history for signing files and add a CI history guard.
- Extend synthetic Android integration coverage to 29 tests and explicitly enable/restore Doze in the lifecycle fixture.


- Run CI on GitHub with verified metadata for clean dependency resolution; add Android 12–15 emulator integration jobs and a README status badge.
- Move app and diagnostic messages into 527 English/Chinese resource entries, including plurals; enforce translation/format parity and strict localization lint.
- Integrate Android 13+ application locales and keep language changes independent of network-setting saves.
- Show the dashboard in recent tasks, protect its snapshot on Android 13+, and retain TUN plus the foreground notification during network handoff.
- Add regression coverage for listener initialization, injected global listener directives, socket listeners, recents/notification state and network recovery.
- Fix asynchronous test timing instead of suppressing CI failures.

- Use Mihomo's native `URLTest` through the local bridge without opening a controller port.
- Batch latency state updates every 100 ms and separate graph-backed health checks from leaf-node batches.
- Require explicit acknowledgement of the app-UID terminal permission notice before creating a shell.
- Add CI configuration, Dependabot, a dependency version catalog, issue form and documentation index.
- Add the first-use terminal notice to Android resources.

## 0.1.0-beta.1

First public beta: Android VPN, supported subscriptions and original policy groups, diagnostics, parallel latency tests, local encrypted storage and a standard sh terminal.
