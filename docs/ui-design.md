# Interface and motion

The current source is 0.1.2-preview.3, build 33. Home has three sections on one fixed screen: the hanging VPN card (with an activity-owned timer above the page); configuration and rule/global/direct routing mode; and 2–4 explicit website latency tiles. The card adapts to the available height, with a minimal native action while the offline renderer loads. Landscape places the three sections side by side. Home has no vertical scroll container. Traffic, memory, connections and full diagnostics remain accessible through Settings. Importing or browsing never starts website checks.

## Background and glass

On Android 13+ an AGSL shader draws procedural waves, reflected sky and moving clouds. It does not play a video or display a captured reference frame. All tabs share this root background. Android 10–12 retain the locally generated photographic mesh fallback documented in [scene assets](scene-assets.md); this is not the same real-time water renderer. Plain background mode is available.

Content and navigation are sibling layers. Android 13+ uses the actual pinned
Backdrop 1.0.4 source module for GPU source capture, color controls, blur, rounded
lens refraction, highlights and inner/outer shadows. The bar material is recorded once without foreground labels. A separate local
layer records accent labels; the selected capsule samples their combination.
At rest the capsule has no refraction; press/drag introduces the lens.
API 31/32 keep Haze 1.6.8 blur. Older APIs, Reduce transparency, protected windows
and background lifecycle detach captures and draw a solid fallback. The terminal
is a separate protected activity. No production screenshot file or CPU bitmap is
created by this navigation renderer.

Historical material comparison (beta.11, superseded below):

| Material | Previous implementation | Beta.11 |
| --- | --- | --- |
| Source and optics | Haze in two material layers plus a custom shader | One source; upstream Backdrop capture/lens/highlight pipeline |
| Light/dark tint | 60% / 66% | 12% white / 22% dark |
| Selector | Flat fill and heavy outline | Independent refracted capsule; spring following and press stretch |
| Foreground | Relied on a thick material | Crisp original vectors and thin two-tone text/icon contours |
| Controls | Distributed constants | `NavigationGlassStyle` and shared contour tokens |

The actual Backdrop source, version/commit, Apache-2.0 license and four Kotlin/
Compose compatibility shims are preserved under `third-party/backdrop`. The
upstream optical shaders and algorithms are hash-verified. `LiquidBottomTabs`
and FlClash v0.9.2 inform interaction/layout; no Flutter migration, upstream demo
APK, fonts or artwork is included. This is an Android implementation with measured
pixel behavior, not a claim of identical Apple rendering or performance on all GPUs.
Harmony-style particles and other light-effect additions are outside this iteration.

## Interactions

- The independent timer strip uses this VPN session’s monotonic start, not the core lifetime. It continues across network handoffs and reconnect waits, resets after disconnect, and stops ticking outside the foreground. Tap it to expand the inline Home/Disconnect operation card; it is never a promise of continuous Internet access.
- Tap operates the existing VPN action. A stationary long press begins an unrestricted drag; releasing returns the card through its physical solver. App pause/resume restarts the renderer without relying on a stale animation-frame handle.
- Appearance settings contain a dark-mode switch and a Follow system chip; no theme control sits beside the home timer. The switch expands a circular reveal from its own center. One transient app-window PixelCopy frame exists only in memory and is cleared on completion, protection or backgrounding; it is never saved or uploaded. Protected windows do not capture a frame. System/reduced-motion preferences suppress the transition.
- All four navigation labels remain visible in a fixed layout. A moving accent layer follows the capsule; large-font navigation retains its clearance.
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

## Bottom navigation code map (beta.11)

- `app/src/main/java/dev/pingclash/app/BottomNavigationBar.kt`: complete navigation layout, one interactive tab row, fixed labels, accent source and selector placement. Extracted from `GlassUi.kt`; default Material indication is disabled to avoid a second pressed-state layer.
- `app/src/main/java/dev/pingclash/app/NavGlassMaterial.kt`: Backdrop lens, blur, highlight and shadows. Selector deformation now uses Backdrop's own layer transform; Haze and solid fallbacks explicitly clip to the capsule.
- `app/src/main/java/dev/pingclash/app/NavigationGlassStyle.kt`: bar tint, refraction, highlights, inner shadow, normal/accent label colors and the soft readability veil.
- `app/src/main/java/dev/pingclash/app/NavigationDrag.kt`: pointer press/release/cancel state, drag selection, and background reset.
- `app/src/main/java/dev/pingclash/app/ScenicFrame.kt`: sibling content-source and navigation composition, protected-window and API fallbacks.
- `third-party/backdrop`: pinned upstream optical implementation; optical shaders are unchanged.

The lanyard WebView remains mounted after the first Home visit. Leaving Home pauses
its animation without destroying its renderer. Owner tokens prevent an outgoing
AnimatedContent slot from detaching the incoming control. A frame generation and
painted-phase acknowledgment keep obsolete face textures hidden until the current
VPN state is drawn. The former native imitation card/clasp has been removed; a
small native action remains usable during loading or renderer failure.

Ordinary pages now allow system task previews. SecurePage temporarily disables task
screenshots while protected content owns the window, restoring the ordinary policy
after replacement frames. This does not change service lifetime or OEM task policy.

## Quiet Home re-entry (0.1.2-preview.1)

Normal tab return retains the WebView, physical pose, textures and last valid slot
geometry. Receiving a fresh renderer acknowledgment is separate from showing an
already-painted healthy scene. Detaching a native Home slot never substitutes a
zero-height layout. Home uses a short fade instead of moving its persistent 3D
anchor through the page slide transition.

A resume generation is reconciled once before drawing. Initial connected state,
offscreen phase changes and unfinished flips are aligned quietly; an actual visible
front/back state change still adds one physical impulse. Duplicate host frames do
not repeat it. Native recovery checks run independently of JavaScript callbacks:
missing acknowledgments cause at most two frame retries, two seconds apart, then
the usable native action replaces the unhealthy renderer. Ordinary re-entry never
reloads the scene. This is recovery behavior, not a guarantee about every OEM/GPU.

Bottom navigation remains in `BottomNavigationBar.kt`; its optical material,
parameters and gesture code are unchanged in this iteration. Page-transition changes
are in `AppScreens.kt`. Host ownership/visibility are in `LanyardThreeState.kt`,
`LanyardThreeView.kt` and `LanyardPowerControl.kt`; the bounded recovery policy is
`LanyardRecovery.kt`. Offline reconciliation is in `ui/lanyard/src/hostLifecycle.mjs`,
with adapter wiring in `ui/lanyard/adapt.mjs`.

## Policy-group measurement scheduling (0.1.2-preview.2)

`ProxyDelayPlan.kt` expands requested groups for measurement only, preserving the stored subscription graph and UI order. Directly requested nodes enter first; direct leaf members precede nested-group expansion. Overlapping groups share one native Mihomo URL test per unique leaf in the batch (at most 500 targets, eight group levels and 10,000 traversal operations). Invalid cycles and unsupported dependencies are not replaced with DIRECT.

The configured pool (default 10, maximum 16) runs independent nodes before graph-backed nodes. A real dialer chain retains its profile and runs separately because native automatic-group initialization already fans out; complex chained checks can still be slower. Node results are shared with nested tabs through result aliases and published at 100 ms intervals. Cancellation stops active probes and clears queued/running states.

Group cards show completed/total members and reachable count, not an invented single-route millisecond value. These summaries describe the current batch and target only; they do not prove the selected group route or system VPN works. Full route diagnosis remains a separate action. TCP measurements remain separate.

The complete bottom navigation remains in `app/src/main/java/dev/pingclash/app/BottomNavigationBar.kt` (`BottomNavigationBar`, line 53). This change does not modify its layout, optical material, gestures or selection animation; proxy measurement labels are in `ProxyScreen.kt`.

## Press-driven navigation lens (0.1.2-preview.3)

The pinned [LiquidBottomTabs sample](https://github.com/Kyant0/AndroidLiquidGlass/blob/1.0.4/catalog/src/main/java/com/kyant/backdrop/catalog/components/LiquidBottomTabs.kt) informs the layered sampling and moving accent approach. The original Backdrop implementation remains unchanged.

`BottomNavigationBar.kt` records the finished toolbar material once, without labels, then records a separate invisible accent-label row. The selector samples their combined backdrop rather than sharp page pixels. Its own output is excluded from both sources. The normal row alone owns click/Tab semantics; both rows share a fixed glyph/label layout. No screenshots, CPU bitmap readback, permissions or remote sources are added.

`NavGlassMaterial.kt` uses no selector refraction at rest. During press/drag it ramps a 10/14 dp lens with depth and chromatic aberration, boosts highlight/inner shadow and enlarges both axes. `NavigationMotion.kt` uses Animatable springs, bounded velocity stretch and draw/layer reads of animation values. Normal tab changes do not read animated position/pressure in composition. Reduced motion snaps position and suppresses decorative deformation.

`NavigationGlassStyle.kt` uses a 14/18 dp bar rim, 1 dp highlight and 0.11 inner-shadow alpha. Light/dark base tints are 0.28/0.32; a separate soft vertical veil is strongest under labels (0.58/0.72) and fades at the rim. This is a deliberate theme-based readability treatment, not automatic analysis of user screen pixels. Normal and accent label contrast is checked over the synthetic wave palettes plus black/white backgrounds. There are no letter or glyph outlines.

Selector coordinates use an absolute top-left anchor, absoluteOffset and one logical-to-physical mirror. Drag deltas reverse once in RTL. The actual rendered center is tested against its tab, including 2x text, physical drag/cancel and exactly four accessible tabs. API 31/32 retain Haze and a matching clipped accent mask; API 29/30, Reduce transparency and protected/background windows use the solid fallback. Only the optical backend refracts.
