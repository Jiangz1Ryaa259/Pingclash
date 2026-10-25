# Changelog

## Unreleased

- Beta.8/build 26 makes Home one non-scrolling page with responsive card sizing,
  an independent expandable timer strip and compact configuration/mode controls.
- Move the light/dark control to Appearance as a switch with a circular reveal from
  the switch center; retain Follow system and protected/reduced-motion fallbacks.
- Show 2–4 website latency tiles with an expanded 12-target panel. Use native Mihomo
  URLTest, explicit target selection, at most four concurrent probes and cancellation.
- Keep the VPN session timer across core/network restarts using a monotonic start;
  reset after disconnect. Add no-scroll/large-font, selected-target and reconnect tests.

- Beta.7/build 25 reduces Home to its hanging VPN control/uptime, profile/routing mode
  and explicit Google/ChatGPT/Gemini checks. Detailed diagnostics and telemetry remain in Settings.
- Remove small drag clamps; preserve tap versus stationary long-press semantics and
  restart the offline renderer after activity pause/resume.
- Add procedural ocean/cloud shaders across tabs on API 33+, circular theme reveal,
  refractive navigation, selected-label expansion and reduced-motion/privacy fallbacks.
- Replace profile blocks with selectable quota/expiry cards, a scroll-collapsing import
  button, menus and sensitive clipboard copy/check feedback with conditional expiry.
- Add a two-step import review, bounded input validation, expanding details and inline
  error feedback. Downloads and writes require the final import action.
- Reconfigure explicitly selected routing mode while retaining the VPN TUN; other
  settings and profile mutations keep their existing active-VPN guards.
- Pin the CI emulator build after the previous runner's emulator process exited;
  preserve the full integration suite and report results per exact source revision.

- Beta.6/build 24 integrates the supplied React Bits Lanyard geometry, PBR materials,
  woven normal map, metal hardware, environment and physics in an isolated offline
  Three.js renderer. Native Compose retains actions, long-press input and accessibility.
- Preserve the upstream license and source; add fidelity, bundle integrity and actual
  WebView rendering/isolation tests. No renderer network access or profile data bridge.

- Beta.5/build 23 anchors the lanyard at the screen's top edge, separates stationary long-press dragging from taps/swipes, and flips as VPN starts or stops.
- Add light/dark satin faces, shader-lit bevels and reflections on Android 13+, native material fallback on older APIs, and regression coverage for anchor tracking and on/off transitions.

- Beta.4/build 22 replaces the dashboard power-button container with a native hanging card: woven strap, metallic clasp, perspective drag, spring return and connected-face transition.
- Keep tap actions separate from drag/cancel gestures; retain reduced motion, disabled states, accessibility and large-text support. No new runtime dependencies or permissions.

- Beta.3/build 21 replaces illustrated scenery with local photographic ocean and cloud assets, native mesh motion and a scroll-linked underwater transition.
- Simplify the photographic home layout, retain clear connection evidence, and add a dashboard immersion regression test.

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
