# Interface and motion

The current source is 0.1.0-beta.9, build 27. Home has three sections on one fixed screen: the hanging VPN card (with an activity-owned timer above the page); configuration and rule/global/direct routing mode; and 2–4 explicit website latency tiles. The card adapts to the available height, with a compact native face on small screens. Landscape places the three sections side by side. Home has no vertical scroll container. Traffic, memory, connections and full diagnostics remain accessible through Settings. Importing or browsing never starts website checks.

## Background and glass

On Android 13+ an AGSL shader draws procedural waves, reflected sky and moving clouds. It does not play a video or display a captured reference frame. All tabs share this root background. Android 10–12 retain the locally generated photographic mesh fallback documented in [scene assets](scene-assets.md); this is not the same real-time water renderer. Plain background mode is available.

Content and navigation are sibling layers. Haze samples the content behind the bar on API 31+, with 20 dp blur. On API 33+ a separate render node adds capsule-edge refraction and subtle dispersion to the backdrop only; text and icons stay sharp. Geometry/tint direction references FlClash v0.9.2, attributed in [NOTICE](../NOTICE.md). This is not Apple's proprietary renderer. Current pixel tests establish real blur and fallback, not identical optical output on every GPU; the refraction layer is a best-effort enhancement. Lower APIs, reduced transparency, protected windows and background lifecycle use an opaque fallback. The terminal is a separate protected activity.

## Interactions

- The independent timer strip uses this VPN session’s monotonic start, not the core lifetime. It continues across network handoffs and reconnect waits, resets after disconnect, and stops ticking outside the foreground. Tap it to expand the inline Home/Disconnect operation card; it is never a promise of continuous Internet access.
- Tap operates the existing VPN action. A stationary long press begins an unrestricted drag; releasing returns the card through its physical solver. App pause/resume restarts the renderer without relying on a stale animation-frame handle.
- Appearance settings contain a dark-mode switch and a Follow system chip; no theme control sits beside the home timer. The switch expands a circular reveal from its own center. One transient app-window PixelCopy frame exists only in memory and is cleared on completion, protection or backgrounding; it is never saved or uploaded. Protected windows do not capture a frame. System/reduced-motion preferences suppress the transition.
- The selected navigation label expands while switching. All tabs retain accessible labels and large-font navigation clearance.
- Profiles use stable-ID cards, quota/expiry details and a three-dot menu. The add button collapses while scrolling and remains accessible. Imports remain disabled during active VPN under the existing repository guard.
- Copying a subscription is an explicit menu action: copy changes to a check, without putting the URL into feedback. The clip is marked sensitive and cleared on a best-effort basis after 60 seconds only if its ownership marker still matches; another application's clipboard is never cleared. Process death or OS clipboard restrictions can prevent expiry.
- Importing has input and review steps. Review shows the HTTPS host, then requires a final action before download/write. Errors expand inline with a short shake; editing removes stale errors. Details and profile selection use expanding content and dropdowns.

Decorative animation stops outside the foreground and respects system motion settings, touch exploration and Reduce effects. The same settings suppress shake, card motion and circular reveal. No new permissions or remote artwork are required.

## Website latency

The FlClash v0.9.2 service card/provider is the reference for a short home list and an expanded sheet, attributed in [NOTICE](../NOTICE.md). On a tall normal-font screen the four defaults are Google, ChatGPT, Gemini and YouTube. Small screens or large fonts show Google and ChatGPT. More opens the complete list: those four, GitHub, Claude, Cloudflare, Netflix, Spotify, Discord, Telegram and Bilibili. Opening the sheet is local only. Tap one tile/row to test it, the home lightning icon to test shown targets, or Test all in the sheet to explicitly test the full list.

All requests use the existing Mihomo URLTest bridge and the selected unified-delay setting, with at most four concurrent runs and bounded timeout/cancellation. Google/YouTube use lightweight generate_204 targets; other targets use fixed public HTTPS endpoints and HEAD, without response bodies, cookies, accounts or IP/region lookup. The Cloudflare trace body is not read. Unknown target IDs cannot become arbitrary URLs. Changing nodes/configurations or the VPN phase/session cancels and clears old results; measurements expire after 60 seconds. This is a selected-node probe that works even with VPN off, not a check of another UID's TUN route. The compact panel states that distinction explicitly.

A measured HTTP response is not an account, regional, unlock or HTTP-success check: an error-page response may still yield a latency value. Full diagnostics remain separate. Results are memory-only and no website is automatically tested by opening Home or More.

See [validation](security-testing.md) for measured evidence and [the card renderer](lanyard-ui.md) for source/license boundaries. No preview video is generated for this iteration.

## Top session strip

Elapsed time lives above every main tab while a VPN session is active (and on Home
when idle). It is not a countdown and has no pause or automatic-disconnect function.
Leaving Home widens the capsule horizontally. Tapping opens an inline operation card
with Home and Disconnect. After 4.5 seconds with no interaction it collapses to a
small time capsule. A tab change or backgrounding closes expanded actions; returning
recomputes elapsed time from the unchanged monotonic session start. Page content
reserves space for the top capsule, while its temporary action card overlays content.
Only actual user actions control the VPN; card animation is not connection evidence.
