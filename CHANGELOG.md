# Changelog

## Unreleased

- Prepare beta.2/build 20 with package-derived version labels, local ocean/cloud scenery and foreground ambient motion.
- Replace the tinted bottom bar with sibling-source Haze blur on Android 12+, opaque older-API/privacy fallback and Reduce transparency.
- Preserve scrolling clearance, protected-window timing and existing routing; add pixel-level blur, actual-motion and large-font layout regressions.

- Add spring-driven glass-style settings switches and official graphics-shapes VPN glyph morphing; preserve cancellation, disabled/RTL behavior and reduced motion.

- Redesign the dashboard around connection control, native URL latency and a truthful four-stage diagnostic path.
- Add custom light/dark sea palettes, tabular typography, a tinted sliding navigation capsule, grouped settings and accessible whole-row switches.
- Make dynamic wallpaper colors optional; persist Reduce effects locally and stop decorative loops outside foreground connection attempts.
- Add four UI/evidence/contrast regressions and synthetic light/dark/large-font previews; retain existing VPN/privacy coverage.

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
