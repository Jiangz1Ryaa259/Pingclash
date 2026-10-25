# Next beta release notes — draft

This is a draft, not a published release or new version tag. The existing beta.1 APK has not been replaced by these source changes.

## Changes

- Beta.8/build 26 keeps Home on one page, separates the session timer from Appearance,
  and moves the circular theme transition to a settings switch. Session time survives
  network/core restarts and resets on disconnect.
- Show 2–4 website latency targets; expand for 12, testing only explicitly selected
  targets via native Mihomo URLTest with at most four concurrent probes. Latency does
  not prove account/region/unlock/HTTP-success status.

- Beta.7/build 25 keeps Home to the hanging control/uptime, configuration/routing
  mode and explicit website checks. Move telemetry and full diagnostics to Settings.
- Add full-app procedural ocean/clouds (API 33+), circular light/dark reveal,
  refractive navigation, expanded selected labels, quota cards and collapsing import FAB.
- Add copy/check feedback with sensitive, conditionally expiring clipboard content;
  two-step import review and inline validation errors. No preview video is generated.
- Remove the small dragging limits and restart renderer state after pause/resume.

- Beta.6/build 24 replaces the material approximation with the supplied Lanyard
  component's Three.js geometry, physical materials, weave normals, metal clasp
  and environment. It runs offline with no JavaScript-to-native interface;
  native Compose retains VPN actions, accessibility and long-press input.

- Beta.5/build 23 fixes the strap at the screen's top edge and requires a stationary long press before dragging. Starting VPN flips to the reverse face; stopping/failure returns to the front without treating animation as proof of connectivity. Add shader-lit satin/bevels on Android 13+ and native material fallback on older APIs.

- Beta.4/build 22 removes the dashboard button container and adds a native hanging-card control with bounded perspective dragging, spring return and a connected-face transition. Tap actions remain separate from drag/cancel; reduced motion, disabled states and large-text/RTL access are retained. No new permissions or runtime dependencies.

- Beta.3/build 21 uses full-screen local photographic ocean/cloud layers with scroll-linked immersion and native mesh motion. It is not a realtime 3D ocean or video scrubber. Assets and prompts are documented; no reference-video frames, image downloads or new permissions are included.

- Beta.2/build 20 has visible package-derived version labels, local ocean/cloud scenes and actual sibling-source navigation blur. Android 10–11, protected windows and Reduce transparency use an opaque fallback; ambient motion stops in the background or with reduced effects. Scrolling content has explicit navigation clearance.

- Replace the dashboard with a quiet sea palette, native URL readout and evidence-based device/DNS/node/web path. Add optional dynamic colors, Reduce effects, grouped settings and accessible controls. No image download or telemetry is introduced; navigation sampling stays in transient, app-owned graphics layers.

- Confirm `clash://install-config?url=...&name=...` before downloading. Show the source host, require HTTPS, reject ambiguous parameters and sanitize bounded names. Imported configurations stay inactive until a separate explicit selection, including the first profile and after restarting.
- Add a detekt baseline gate to CI. Existing style findings are recorded; new findings fail the build. CI never regenerates the baseline.
- Label TCP latency for Hysteria2/TUIC as `N/A (UDP)` before testing.
- Add offline provider compatibility fixtures and canary regression coverage for errors, diagnostic exports, encrypted storage, app logs and terminal startup.

## Known limitations — retain in the published release notes

- Android 10–12 retain the photographic mesh background, not the API 33+ procedural
  water shader. Real navigation blur needs API 31+; optical refraction needs API 33+.
  Reduced transparency/protected pages use an opaque fallback. GPU/OEM behavior varies.
- Google/ChatGPT/Gemini tests measure HTTPS reachability only, not accounts, regional
  access or full service functionality; an HTTP error response is distinguished from
  a failed connection. They run only after an explicit user action.

- The Three.js card requires a WebGL-capable Android System WebView. Unsupported
  devices use a native material fallback. GPU performance and OEM WebView variants
  still require physical-device testing. React Bits retains its MIT + Commons
  Clause license; see `NOTICE.md` and `ui/lanyard/LICENSE-ReactBits.md`.

- One local API 31 instrumentation run crashed during group layout; a full rerun of the unchanged signed app passed all 45 tests. This is retained for investigation rather than claimed fixed. See `security-testing.md` for the run-specific record.
- Providers support the bounded HTTP/HTTPS YAML/text subset in `subscriptions.md`. MRS, file/inline, arbitrary overrides, group-routed downloads and cross-source duplicate names remain unsupported. The corpus distinguishes accepted and rejected cases.
- Provider polling can be delayed by Doze or process termination. Live VPN paths change only at the next establishment/reconnect.
- Network recovery is implemented and emulator-tested. Physical OEM ROM behavior, vendor task killers and long-running Doze still need real-device verification. Do not claim universal background survival.
- QR/image scanning and Quick Settings tile remain pending. DNS prewarming is not enabled without evidence of improvement.
- URL success does not prove every destination works or establish server identity when certificate validation is skipped. TCP metrics are separate and inapplicable to UDP-only transports.
- Full configuration export and explicit terminal commands can reveal credentials; application-generated diagnostic reports have a different, redacted-output contract.
- Existing baseline findings and dependency/lint warnings remain. A clean gate means no new findings, not a warning-free codebase or security certification.

Before publishing, record the exact tested commit, current results, APK hash/signature and truthful tested-device list. Do not carry an earlier commit's CI result forward as validation of a new APK.
