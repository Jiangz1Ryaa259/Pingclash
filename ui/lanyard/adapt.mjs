import { readFile, writeFile } from 'node:fs/promises';

export async function adaptReference() {
  let source = (await readFile(new URL('./reference/Lanyard.jsx', import.meta.url), 'utf8')).replace(/\r\n/g, '\n');
  source = "import { syncHostedFace } from './hostLifecycle.mjs';\n" + source;
  const replace = (before, after) => {
    if (source.split(before).length !== 2) throw new Error('Reference integration point changed');
    source = source.replace(before, after);
  };
  replace('  cache.set(url, promise);', `  if (cache.size >= 8) cache.delete(cache.keys().next().value);
  cache.set(url, promise);`);
  replace('      let viewHeight = layout.height / clamp(s.size, 0.15, 0.9);',
    '      const hostFrame = window.__pingclashFrame;\n      let viewHeight = hostFrame?.height > 0 ? layout.height * hostFrame.viewportHeight / hostFrame.height : layout.height / clamp(s.size, 0.15, 0.9);');
  replace('      if (viewHeight * aspect < minimumWidth) viewHeight = minimumWidth / aspect;',
    '      if (!hostFrame?.height && viewHeight * aspect < minimumWidth) viewHeight = minimumWidth / aspect;');
  replace('      const cardTop = viewHeight / 2 - viewHeight * mix(0.12, 0.42, clamp(s.strapLength, 0, 1));',
    '      const cardTop = viewHeight / 2 - viewHeight * (hostFrame?.height > 0 ? hostFrame.top / hostFrame.viewportHeight : mix(0.12, 0.42, clamp(s.strapLength, 0, 1)));');
  replace('      const anchorX = ((ANCHORS[s.anchor] ?? 0.5) - 0.5) * viewWidth;',
    '      const anchorX = ((hostFrame?.height > 0 ? hostFrame.centerX / hostFrame.viewportWidth : ANCHORS[s.anchor] ?? 0.5) - 0.5) * viewWidth;');
  replace('      const framingKey = `${layoutKey}|${s.size}|${s.anchor}|${s.strapLength}|${view.width}|${view.height}`;',
    '      const framingKey = `${layoutKey}|${s.size}|${s.anchor}|${s.strapLength}|${view.width}|${view.height}|${window.__pingclashFrame?.height}|${window.__pingclashFrame?.top}|${window.__pingclashFrame?.centerX}`;');
  replace('      backTexture.needsUpdate = true;\n      start();',
    '      backTexture.needsUpdate = true;\n      window.__lanyardPaintedPhase = window.__lanyardTexturePhases?.get(images.front?.src) || \"\";\n      if (window.__pingclashFrame?.active) render();\n      start();');
  // A reset must restore the authoritative native face, including the twist
  // accumulator. Otherwise a resize or numerical recovery leaves the front
  // visible while the host still believes it already flipped to the back.
  replace('  sim.twistRaw = 0;\n  sim.calm = 0;', `  sim.twistRaw = 0;
  const host = window.__pingclashFrame;
  if (host) {
    const desired = host.back ? Math.PI : 0;
    body.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), desired);
    body.previousQuaternion.copy(body.quaternion);
    sim.turn = desired; sim.twist = desired; sim.twistRaw = desired;
  }
  sim.calm = 0;`);
  replace('      renderer.render(scene, camera);', `      renderer.render(scene, camera);
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(sim.body.quaternion);
      window.__lanyardPose = { normalZ: normal.z, turn: sim.turn, twist: sim.twist, held: !!sim.grab };
      window.__lanyardReady = canvas.clientHeight > 100 && !!images.front && !!images.back && renderer.info.render.calls > 0 && !renderer.getContext().isContextLost();
      window.__lanyardRenderedEpoch = window.__pingclashFrame?.epoch ?? -1;
      window.__lanyardRenderedResume = window.__pingclashFrame?.resume ?? -1;
      window.__lanyardFlipCount = hostedFace.flips;
      window.__lanyardFrames = (window.__lanyardFrames || 0) + 1;`);
  replace('    const tick = now => {', `    let hostedGrab = false;
    const hostedFace = { turn: null, resume: -1, flips: 0 };
    let hostedOrigin = null;
    let nativeRest = 0;
    let restoringBand = false;
    const syncNative = () => {
      const host = window.__pingclashFrame;
      if (!host) return;
      syncHostedFace(sim, host, hostedFace, THREE, FLIP_SPIN);
      if (!host.motion) {
        const desired = host.back ? Math.PI : 0;
        placeHanging(sim, layout, false);
        sim.turn = desired;
        sim.body.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), desired);
        sim.body.previousQuaternion.copy(sim.body.quaternion);
        sim.twist = desired; sim.twistRaw = desired;
        const height = 2 * camera.position.z * Math.tan(FOV * Math.PI / 360);
        sim.body.position.y = height / 2 - height * (host.top + host.height / 2) / host.viewportHeight;
        const hang = sim.body.hang.clone().applyQuaternion(sim.body.quaternion).add(sim.body.position);
        for (let i = 1; i <= JOINTS; i++) sim.nodes[i].lerpVectors(sim.anchor, hang, i / JOINTS);
        return;
      }
      if (host.held) {
        if (!hostedGrab) {
          hostedGrab = true;
          nativeRest = sim.rest;
          restoringBand = false;
          hostedOrigin = sim.body.position.clone();
          sim.grab = { local: new THREE.Vector3(), rotation: sim.body.quaternion.clone(),
            from: hostedOrigin.clone(), target: hostedOrigin.clone() };
        }
        const worldHeight = 2 * camera.position.z * Math.tan(FOV * Math.PI / 360);
        sim.grab.target.copy(hostedOrigin).add(new THREE.Vector3(
          host.dx / host.viewportHeight * worldHeight, -host.dy / host.viewportHeight * worldHeight, 0));
        const hang = sim.body.hang.clone().applyQuaternion(sim.body.quaternion).add(sim.grab.target);
        sim.rest = Math.max(nativeRest, sim.anchor.distanceTo(hang) / JOINTS);
      } else if (hostedGrab) {
        hostedGrab = false;
        sim.grab = null;
        restoringBand = true;
      }
      if (restoringBand) {
        sim.rest += (nativeRest - sim.rest) * .18;
        if (Math.abs(sim.rest - nativeRest) < .001) { sim.rest = nativeRest; restoringBand = false; }
      }
    };
    const onNativeFrame = () => {
      const host = window.__pingclashFrame;
      cancelAnimationFrame(raf); raf = 0;
      if (!host?.active) {
        if (hostedGrab) { hostedGrab = false; sim.grab = null; restoringBand = true; }
        return;
      }
      syncNative(); render();
      if (!host.motion) { syncNative(); render(); return; }
      start();
    };
    window.addEventListener('pingclash-frame', onNativeFrame);

    const tick = now => {`);
  replace('      if (!alive) return;', '      if (!alive || document.hidden || window.__pingclashFrame?.active === false) return;');
  replace('      const current = physics();', '      syncNative();\n      const current = physics();');
  replace('      stepSimulation(sim, dt, current, time);', '      if (window.__pingclashFrame?.motion !== false) stepSimulation(sim, dt, current, time);');
  replace("      document.removeEventListener('visibilitychange', onVisibility);", `      window.removeEventListener('pingclash-frame', onNativeFrame);
      window.__lanyardReady = false;
      document.removeEventListener('visibilitychange', onVisibility);`);
  await writeFile(new URL('./src/Lanyard.jsx', import.meta.url),
    '// React Bits Lanyard; license: ../LICENSE-ReactBits.md. Android host adaptations: adapt.mjs.\n' + source);
  return source;
}
