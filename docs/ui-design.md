# Scenery, glass and interaction

The current source is 0.1.0-beta.2, build 20. Both the home header and About page read the package version/build instead of a hardcoded label. Earlier beta.1 previews shared build 19; their small control changes were difficult to distinguish.

## Backgrounds

Home defaults to an illustrated ocean: sky, sun/moon, drifting cloud silhouettes, a horizon, reflections and moving wave crests. Clouds and a plain background are alternate choices in Settings → Language and appearance. Artwork is local Canvas geometry, not a downloaded image or weather feed. Retained paths are reused, and animated state is read in the drawing phase.

Ambient scenery now moves while the home page is foreground-visible, including while disconnected. Reduce effects, Android animator settings, touch exploration and leaving the foreground stop decorative movement. This intentionally replaces the earlier connecting-only animation. Other pages use neutral surfaces. Scenery and Reduce transparency are persisted with existing encrypted settings, without changing subscription or routing state.

## Real glass

`ScenicFrame` hosts the source content and navigation as siblings. The source fills the screen and the navigation overlays it; the navigation itself is excluded from the source. Each scrolling page/grid receives bottom content padding for the navigation height and system inset, so its final action remains reachable while intermediate rows can pass underneath the glass.

Haze and haze-materials are pinned to 1.6.8, with Compose BOM 2025.06.01 (UI/runtime/foundation 1.8.3; Material3 remains 1.3.2). The older 1.5.4 default disabled blur on API 31; the 1.6 compatibility implementation restores it with pre-draw invalidation. See the [pinned Android implementation](https://github.com/chrisbanes/haze/blob/1.6.8/haze/src/androidMain/kotlin/dev/chrisbanes/haze/HazeEffectNode.android.kt). Navigation uses a 20 dp blur and light/dark tints, with a thin highlight and a spring-driven selection capsule. Labels use high-contrast black/white. This is background blur, not Apple's refraction renderer.

Android 10–11, Reduce transparency and protected windows use a fully opaque fallback. `SecurePage` disables source sampling while protection is active, including the existing replacement-frame delay. Haze's source is detached in the background. The terminal is a separate activity with no shared navigation/source, so its AndroidView does not enter this effect.

Sampling uses transient app-owned graphics layers; production code does not invoke screen-capture APIs, save sampled pixels or upload them. New libraries add no telemetry, image service or permission. Existing backup, storage and sensitive-window rules remain in place.

## Controls and evidence

The dashboard still separates native URL latency from TCP reachability. Its device/DNS/node/web path reflects the selected node's last diagnostic evidence; VPN establishment does not mark unmeasured stages successful. Unknown timeouts remain incomplete. Semantic status colors are paired with text.

Switches retain a single accessible whole-row action, cancellation and disabled/RTL behavior. The VPN glyph uses official graphics-shapes Morph; only working states rotate. Reduced motion applies to both controls. Type uses system sans-serif/CJK fallback and tabular figures.

`ScenicGlassTest` / `FrameGlassProbe` sample a controlled stripe source through the actual rendered bar: a real blur must remove high-frequency detail while remaining visibly translucent. It also checks the opaque fallback, protected-window source shutdown, large-font final-action clearance, actual idle-frame changes and frozen reduced-motion frames. Other UI, privacy and VPN regressions remain enabled. Tests/screenshots/video use only dedicated cleared AVDs and synthetic or empty configurations; they are not observations of a personal subscription.

The real-render probe advances frames and polls with a five-second deadline instead of requiring Espresso global idleness. API 31 Haze deliberately invalidates on pre-draw; other Espresso functional fixtures on that API use Reduce transparency, while this dedicated probe keeps real blur enabled and checks actual pixels. The older-API fallback is tested separately.
