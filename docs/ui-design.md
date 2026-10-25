# Full-screen photographic scenery and native UI

The current source is 0.1.0-beta.4, build 22. Version labels on Home and About come from the package. The earlier illustrated sky, sun and vector waves have been removed from the scene renderer. The home power control is now a native hanging card; see [its interaction and implementation boundaries](lanyard-ui.md).

## Scene and interaction

The local surface, underwater and cloud PNGs in `drawable-nodpi` were created for this app using the built-in imagegen tool. Their original prompts and paths are recorded in [scene-assets.md](scene-assets.md). No artwork or video frames were taken from the user's reference. There is no runtime image host, weather feed, extra resolver, telemetry or new permission.

Scenery occupies the complete root behind system insets, content and navigation. On Home, scrolling drives the ocean surface/underwater crossfade and a small camera offset. Retained 16-by-28 bitmap meshes produce subtle refraction and cloud drift; no bitmap is allocated or captured each frame. This is photographic 2.5D composition, not live ocean simulation or video scrubbing. Other pages tint the scene for readable controls and retain their chosen theme.

Home uses light text, a freestanding hanging-card control and compact URL measurement. The diagnostic path and telemetry remain available below; no success, traffic or latency is synthesized. Plain background mode uses the same card and retains its themed diagnostic surface. Photos do not establish a network connection.

Foreground lifecycle, Reduce effects, system motion settings and touch exploration control decorative motion. Reduced effects also stop scroll-linked camera movement. A plain background and Reduce transparency remain available. The scene settings retain existing encrypted storage and do not change subscriptions or routes.

## Glass and privacy

The content source and navigation are siblings under `ScenicFrame`; the bar is excluded from its own source. Haze and haze-materials stay at 1.6.8 with Compose BOM 2025.06.01. Navigation uses 20 dp blur, contrasting labels and a spring-driven capsule. It is background diffusion, not Apple's optical refraction renderer.

Android 10–11, Reduce transparency and protected windows use an opaque fallback. Source sampling stops during `FLAG_SECURE` protection, including the replacement-frame delay, and when the window leaves the foreground. The terminal is in a separate activity and is outside this source. Transient app-owned graphics layers are not exported or uploaded.

Every scrolling page/grid reserves navigation clearance, including large fonts. The actual source-sampling probe checks rendered stripe pixels and opaque fallback with bounded frame polling; API 31's pre-draw invalidation is tested without relying on Espresso global idleness. An additional test drives the real dashboard's scroll action and observes the background depth state. Existing VPN, import, privacy and interaction regressions remain enabled.
