# Next beta release notes — draft

This is a draft, not a published release or new version tag. The existing beta.1 APK has not been replaced by these source changes.

## Changes

- Beta.10/build 28 uses pinned Backdrop 1.0.4 source for actual glass capture and
  refraction on API 33+, with Haze on API 31/32 and solid privacy/legacy fallback.
  Light/dark tint is 18%/28%; the selected tab is a separate spring-driven lens.
  Thin local foreground contours preserve contrast without making the whole bar opaque.
  Source algorithms and all four compatibility shims are checked against pinned hashes.
  Pixel tests distinguish real rim refraction from simply making the background blurry.
- Beta.9/build 27 adds the top elapsed-time capsule: it widens when leaving Home,
  expands to Home/Disconnect actions on tap and collapses after 4.5 seconds idle.
  Restore lanyard face/twist after resets and lifecycle changes. Label selected-node
  URL latency separately from VPN route verification; clear it on session changes
  and expire it after 60 seconds. No timer countdown or automatic disconnect is added.
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

## Beta.11 local candidate

Old native imitation card/clasp removal, persistent offline renderer lifetime,
frame/painted-phase acknowledgment, ordinary task-preview restoration, legacy
capsule clipping and pressed-layer removal are implemented. Local signed APK:
API 35 64/64; API 31 and 29 focused 16/16 each. Physical OEM/GPU behavior remains
unverified. No newer Release/tag has been published; source CI must be assessed
at its own exact revision.

## 0.1.2-preview.1 local candidate

Keep the painted 3D card and valid layout on ordinary Home returns. Quietly align
hidden state changes or unfinished flips; visible connect/disconnect changes
retain the physical animation. Retry missing frame/resume acknowledgments twice,
then retain a usable native action. Local signed API 35 regression: 65/65;
offline renderer cases: 25/25. Physical OEM/GPU behavior remains unverified.
The published 0.1.1 Release is not replaced and no new Release/tag is created.

## 0.1.2-preview.2 local candidate

Replace group-first serial URL checks with a bounded unique-member plan. Preserve
the official subscription graph and measure independent nodes first. Nested groups
share member results and show progress/reachable summaries, not route latency.
Real chained checks remain graph-backed and may still take longer; they no longer
delay the first independent-node results. The bottom navigation is unchanged.
The published 0.1.1 Release is unchanged; this is a local preview, not a new Release.

## 0.1.2-preview.3 local candidate

Navigation now uses a press-driven selector lens over the finished toolbar plus
an accent-label layer, fixed visible labels and one interactive row. Correct RTL
anchoring, two-axis growth, bounded velocity stretch and draw-phase state reads
are included. Legacy devices retain clipped accent feedback with Haze/solid
materials. The stable 0.1.1 Release remains unchanged. Optical-driver and real
OEM validation limitations must remain explicit in any later release notes.

## 0.1.2-preview.4 local candidate

Retain the preview.3 glass appearance while removing drag-time spring chasing
and animated layout offsets. Follow the finger directly, settle with a spring
after release and reuse the legacy mask Path. A controlled frame-following
regression covers both directions; physical device frame-rate validation remains
unperformed. Stable 0.1.1 is unchanged.

## 0.1.2-preview.5 local candidate

Use the external usage guide instead of in-app tutorial paragraphs. Unify the four
main title styles, move tools into settings chevron rows, and animate details from
the right while retaining sensitive-window protection through exit. Retire the
custom command console; the standard terminal and concise safety consent remain.
Glass navigation is unchanged. Stable 0.1.1 remains unchanged.

## 0.1.2-preview.6 local candidate

Remaining profile and auxiliary-diagnostic slogans, old version labels and
repeated telemetry/privacy paragraphs are removed from the app. Settings and
profile selection have clearer accessible roles and keyboard targets. Numeric
limits appear only on errors; probe steps appear when they exist. Full usage
and interaction rationale stay in repository Markdown. Physical OEM/background
behavior, public-network performance and unsupported provider formats remain
known limitations; this local candidate does not replace stable 0.1.1.
