# Next beta release notes — draft

This is a draft, not a published release or new version tag. The existing beta.1 APK has not been replaced by these source changes.

## Changes

- Replace the dashboard with a quiet sea palette, native URL readout and evidence-based device/DNS/node/web path. Add optional dynamic colors, Reduce effects, grouped settings and accessible controls. No image download, captured blur or telemetry is introduced.

- Confirm `clash://install-config?url=...&name=...` before downloading. Show the source host, require HTTPS, reject ambiguous parameters and sanitize bounded names. Imported configurations stay inactive until a separate explicit selection, including the first profile and after restarting.
- Add a detekt baseline gate to CI. Existing style findings are recorded; new findings fail the build. CI never regenerates the baseline.
- Label TCP latency for Hysteria2/TUIC as `N/A (UDP)` before testing.
- Add offline provider compatibility fixtures and canary regression coverage for errors, diagnostic exports, encrypted storage, app logs and terminal startup.

## Known limitations — retain in the published release notes

- Providers support the bounded HTTP/HTTPS YAML/text subset in `subscriptions.md`. MRS, file/inline, arbitrary overrides, group-routed downloads and cross-source duplicate names remain unsupported. The corpus distinguishes accepted and rejected cases.
- Provider polling can be delayed by Doze or process termination. Live VPN paths change only at the next establishment/reconnect.
- Network recovery is implemented and emulator-tested. Physical OEM ROM behavior, vendor task killers and long-running Doze still need real-device verification. Do not claim universal background survival.
- QR/image scanning and Quick Settings tile remain pending. DNS prewarming is not enabled without evidence of improvement.
- URL success does not prove every destination works or establish server identity when certificate validation is skipped. TCP metrics are separate and inapplicable to UDP-only transports.
- Full configuration export and explicit terminal commands can reveal credentials; application-generated diagnostic reports have a different, redacted-output contract.
- Existing baseline findings and dependency/lint warnings remain. A clean gate means no new findings, not a warning-free codebase or security certification.

Before publishing, record the exact tested commit, current results, APK hash/signature and truthful tested-device list. Do not carry an earlier commit's CI result forward as validation of a new APK.
