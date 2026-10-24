# UI and interaction

The Compose interface uses a custom sea-toned light/dark `ColorScheme`, system sans-serif/CJK fonts, five type sizes and tabular numeric figures. Dynamic wallpaper color is optional on Android 12+. Shape tokens use 8 dp inputs, 14 dp content containers, 24 dp sheets and fully rounded navigation/action capsules.

## First screen

The dashboard puts connection control, the selected route and the last native Mihomo URL measurement first. Its device → DNS → node entry → web path shows the most recent diagnostic evidence for the selected node. Establishing Android's VPN interface never makes these stages pass automatically. Missing, skipped, incomplete and stale evidence remain distinct; an unclassified timeout does not invent a failed network layer.

Fast/elevated/high labels accompany green/amber/red measurements. The 150/400 ms display thresholds describe one result, not a quality guarantee. TCP reachability and URL availability remain separate measurements. Configurations, groups, detailed service/memory information and network settings remain available from their existing pages.

Related settings share neutral containers and dividers. Proxy tabs preserve the supported subscription's original order and direct members, including nested groups; appearance changes do not regroup subscriptions. The current configuration row opens existing selection controls and never activates an unconfirmed deep-link import.

## Surfaces and motion

Three local Canvas sine layers sit behind the dashboard. They require no image downloads, screen capture or blur bitmap cache. Other pages stay neutral. The navigation bar uses a 92% tinted surface, fine edge and spring-driven capsule; it deliberately uses no blur. Dragging previews the capsule, release commits one navigation change, and cancellation leaves the page unchanged. Tap and accessibility selection remain available.

The connect button has a mild 0.97 press scale, ripple and a short state transition. Decorative wave movement and outward rings run only while connecting and foreground-visible. Idle screens have no permanent looping decoration. Android animator scale, touch exploration and the in-app Reduce effects preference disable decorative motion. These preferences are persisted in existing encrypted local storage; no new permissions or telemetry are added.

Default palette tests check text contrast of at least 4.5:1 over each tinted wave combination, and switch/navigation outlines of at least 3:1. These checks do not certify every wallpaper-derived dynamic palette. Switches expose a whole-row switch role with at least a 48 dp target. Large fonts expand navigation and use a two-column diagnostic path and vertically arranged measurements; content remains scrollable.

## Verification and previews

`OceanDesignTest` covers actual palette tokens, diagnostic evidence mapping, encrypted motion preferences, system animation disabling, theme foreground inheritance, light/dark/large-font layouts and accessible controls. Existing `GlassInteractionTest` retains release/cancel, accessibility selection and cancelled power-press checks. Full VPN and privacy integration tests remain enabled.

README screenshots use synthetic emulator fixtures. Their node names, speeds, 84 ms measurement and passing path illustrate layout and are not observations of a real subscription. Screenshot capture exists only in the test APK; the production app does not collect or upload screenshots.

## Switch and connection-control motion

Settings switches now use a passive Canvas thumb inside the existing accessible 48 dp whole-row switch. Position, pressure and color use short finite spring/tween transitions; the thumb briefly stretches during travel or press, and local highlights provide a glass-like edge without captured blur. Cancellation never commits a setting. The visual mirrors in RTL, follows externally committed state and snaps when reduced effects or background visibility disables motion.

The VPN glyph uses the official AndroidX graphics-shapes 1.0.1 `Morph` between a circle and rounded rectangle. Only connection work rotates it; idle/established states have no loop. Button text contrast is checked over intermediate background colors. Material3 remains at the existing 1.3.2 version; this implementation does not depend on Material3 1.4 Expressive APIs.

`SwitchAnimationTest` checks cancelled presses, rapid reversals with a controlled frame clock, disabled input and synthetic RTL/reduced-motion layouts. The normal VPN action and connection permission flow remain unchanged.
