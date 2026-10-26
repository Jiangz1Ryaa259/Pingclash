# Photographic scene assets

The ocean reference was viewed in the browser. Its implementation cannot be identified from the recording alone. The current app uses locally generated photographic layers, retained Android bitmap meshes, and a scroll-driven surface/underwater crossfade. It does not claim to reproduce live ocean simulation or video frame scrubbing. No frames, website assets or fonts were copied from the reference.

The built-in imagegen tool generated the three original images below. Their original PNG bytes are bundled in `app/src/main/res/drawable-nodpi/`; there is no image download at runtime. They contain no user subscription or account data. Reduced effects and the foreground lifecycle stop decorative animation. The plain background remains available. Photo-home controls use light text with dark, readable backing; secondary pages retain the chosen app theme.

- `ocean_surface_v3.png`: photographic ocean surface.
- `ocean_depth_v3.png`: photographic underwater view.
- `clouds_v3.png`: photographic cloudscape.

## Prompts used with the built-in tool

### Underwater

Use case: photorealistic-natural. Asset type: full-screen portrait ocean background for a premium native mobile app, NOT a UI mockup. Generate a very high quality cinematic real underwater photograph, vertical 9:19 composition, full bleed. Camera is submerged about 3 metres in clear open sea looking diagonally upward toward an undulating water surface in the upper quarter, sunlight entering naturally from the upper right. Real detailed liquid surface refractions, pale gold and silver specular ripples overhead, long subtle volumetric shafts of light fading into deep midnight teal and navy towards the bottom, small naturally suspended water particles. Fine realistic photographic texture, physically plausible light transport, restrained colors, editorial luxury ocean cinematography, subtle film grain. The central and lower regions are quiet dark blue open water, providing negative space for separately rendered app controls. Entire frame is ocean water, no seabed, no land, no diver, no fish, no bubbles, no cartoon, no illustration, no vector shapes, no painted rays, no typography, no UI, no border, no watermark. The image should feel like a frame from premium live-action ocean footage, not a drawing.

### Ocean surface

Use case: photorealistic-natural. Asset type: full-screen portrait ocean photograph for a premium Android app background, NOT a UI mockup. Vertical 9:19 full-bleed composition. Camera about 25 cm above the surface of a quiet open ocean, looking across to a low far horizon at the upper quarter. Cinematic real live-action ocean footage look. Broad gently rolling dark navy and deep petrol blue swells fill the lower three quarters, detailed physically real ripples and elegant silver pale gold reflections in the upper right, blue-hour atmosphere with a subtle warm sunrise break very far to the right. The upper quarter contains atmospheric silver-blue clouds and a distant fine horizon. Refined natural color, photographic high detail, subtle film grain, no excessively dramatic storm, no turquoise cartoon colors. The lower central half is quieter dark water, enough negative space for white app text added separately. No land, no boat, no people, no buildings, no illustration, no vector waves, no stylization, no UI, no typography, no border, no watermark. Intended to crossfade into a photographic underwater view with sunlight entering from the upper right.

### Clouds

Use case: photorealistic-natural. Asset type: full bleed portrait background for a premium mobile app, no UI. Vertical 9:19 cinematic aerial photograph of real atmospheric cumulus clouds at blue hour. Beautiful fine detailed silver-blue cloud formations drifting across an open deep indigo sky, natural faint light entering from upper right, soft layered depth and atmospheric haze, real live-action editorial photography. Upper half has a few luminous cloud edges, central and lower half become quiet deep blue open sky with very subtle cloud textures, providing negative space for white app controls rendered separately. Sophisticated restrained color and natural fine grain. No landscape, no sun disk, no aircraft, no stars, no illustration, no cartoon cloud shapes, no vector art, no typography, no UI, no border, no watermark.
