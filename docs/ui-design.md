# Interface and motion

The current source is 0.1.0-beta.7, build 25. Home has three sections: the hanging VPN card and uptime; configuration and rule/global/direct routing mode; and explicit website reachability checks. Traffic, memory, connections and full diagnostics remain accessible through Settings. Importing or browsing never starts website checks.

## Background and glass

On Android 13+ an AGSL shader draws procedural waves, reflected sky and moving clouds. It does not play a video or display a captured reference frame. All tabs share this root background. Android 10–12 retain the locally generated photographic mesh fallback documented in [scene assets](scene-assets.md); this is not the same real-time water renderer. Plain background mode is available.

Content and navigation are sibling layers. Haze samples the content behind the bar on API 31+, with 20 dp blur. On API 33+ a separate render node adds capsule-edge refraction and subtle dispersion to the backdrop only; text and icons stay sharp. Geometry/tint direction references FlClash v0.9.2, attributed in [NOTICE](../NOTICE.md). This is not Apple's proprietary renderer. Current pixel tests establish real blur and fallback, not identical optical output on every GPU; the refraction layer is a best-effort enhancement. Lower APIs, reduced transparency, protected windows and background lifecycle use an opaque fallback. The terminal is a separate protected activity.

## Interactions

- The session timer uses VPN state, with an animated numeric label and minute bar; it does not fabricate a start time or preserve a misleading connected duration after a failed reconnect.
- Tap operates the existing VPN action. A stationary long press begins an unrestricted drag; releasing returns the card through its physical solver. App pause/resume restarts the renderer without relying on a stale animation-frame handle.
- The theme button expands a circular reveal from its center. One transient app-window PixelCopy frame exists only in memory and is cleared on completion, protection or backgrounding; it is never saved or uploaded. Protected windows do not capture a frame. System/reduced-motion preferences suppress the transition.
- The selected navigation label expands while switching. All tabs retain accessible labels and large-font navigation clearance.
- Profiles use stable-ID cards, quota/expiry details and a three-dot menu. The add button collapses while scrolling and remains accessible. Imports remain disabled during active VPN under the existing repository guard.
- Copying a subscription is an explicit menu action: copy changes to a check, without putting the URL into feedback. The clip is marked sensitive and cleared on a best-effort basis after 60 seconds only if its ownership marker still matches; another application's clipboard is never cleared. Process death or OS clipboard restrictions can prevent expiry.
- Importing has input and review steps. Review shows the HTTPS host, then requires a final action before download/write. Errors expand inline with a short shake; editing removes stale errors. Details and profile selection use expanding content and dropdowns.

Decorative animation stops outside the foreground and respects system motion settings, touch exploration and Reduce effects. The same settings suppress shake, card motion and circular reveal. No new permissions or remote artwork are required.

## Website checks

Google uses its lightweight generate_204 URL; ChatGPT and Gemini use their public HTTPS home pages. Tests run only on demand through the selected Mihomo definition, with bounded timeouts and cancellation. An HTTP 403/429 is displayed as an HTTP response, not misclassified as an unreachable server. Reachability does not prove account access, regional availability or usable AI service. No login, body, cookies or raw response text is collected.

See [validation](security-testing.md) for measured evidence and [the card renderer](lanyard-ui.md) for source/license boundaries. No preview video is generated for this iteration.
