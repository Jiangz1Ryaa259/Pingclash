# Next beta release notes — draft

This is a draft, not a published release or new version tag. The existing beta.1 APK has not been replaced by these source changes.

## Changes

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

- One local API 31 instrumentation run crashed during group layout; a full rerun of the unchanged signed app passed all 45 tests. This is retained for investigation rather than claimed fixed. See `security-testing.md` for the run-specific record.
- Providers support the bounded HTTP/HTTPS YAML/text subset in `subscriptions.md`. MRS, file/inline, arbitrary overrides, group-routed downloads and cross-source duplicate names remain unsupported. The corpus distinguishes accepted and rejected cases.
- Provider polling can be delayed by Doze or process termination. Live VPN paths change only at the next establishment/reconnect.
- Network recovery is implemented and emulator-tested. Physical OEM ROM behavior, vendor task killers and long-running Doze still need real-device verification. Do not claim universal background survival.
- QR/image scanning and Quick Settings tile remain pending. DNS prewarming is not enabled without evidence of improvement.
- URL success does not prove every destination works or establish server identity when certificate validation is skipped. TCP metrics are separate and inapplicable to UDP-only transports.
- Full configuration export and explicit terminal commands can reveal credentials; application-generated diagnostic reports have a different, redacted-output contract.
- Existing baseline findings and dependency/lint warnings remain. A clean gate means no new findings, not a warning-free codebase or security certification.

Before publishing, record the exact tested commit, current results, APK hash/signature and truthful tested-device list. Do not carry an earlier commit's CI result forward as validation of a new APK.
