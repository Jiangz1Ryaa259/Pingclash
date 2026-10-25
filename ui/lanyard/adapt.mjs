import { readFile, writeFile } from 'node:fs/promises';

export async function adaptReference() {
  let source = (await readFile(new URL('./reference/Lanyard.jsx', import.meta.url), 'utf8')).replace(/\r\n/g, '\n');
  const replace = (before, after) => {
    if (source.split(before).length !== 2) throw new Error('Reference integration point changed');
    source = source.replace(before, after);
  };
  replace('  cache.set(url, promise);', `  if (cache.size >= 8) cache.delete(cache.keys().next().value);
  cache.set(url, promise);`);
  replace('      renderer.render(scene, camera);', `      renderer.render(scene, camera);
      window.__lanyardReady = canvas.clientHeight > 100 && !!images.front && !!images.back && renderer.info.render.calls > 0 && !renderer.getContext().isContextLost();
      window.__lanyardFrames = (window.__lanyardFrames || 0) + 1;`);
  replace('      backTexture.needsUpdate = true;\n      start();',
    '      backTexture.needsUpdate = true;\n      if (window.__pingclashFrame?.active) render();\n      start();');
  replace('    const tick = now => {', `    let hostedGrab = false;
    let hostedTurn = 0;
    let hostedOrigin = null;
    const syncNative = () => {
      const host = window.__pingclashFrame;
      if (!host) return;
      const desired = host.back ? Math.PI : 0;
      if (desired !== hostedTurn) {
        const up = new THREE.Vector3(0, 1, 0).applyQuaternion(sim.body.quaternion);
        sim.body.angular.addScaledVector(up, FLIP_SPIN * (desired > hostedTurn ? 1 : -1));
        sim.turn = desired;
        hostedTurn = desired;
      }
      if (!host.motion) {
        placeHanging(sim, layout, false);
        sim.turn = desired;
        sim.body.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), desired);
        const height = 2 * camera.position.z * Math.tan(FOV * Math.PI / 360);
        sim.body.position.y = height / 2 - height * (host.top + host.height / 2) / host.viewportHeight;
        const hang = sim.body.hang.clone().applyQuaternion(sim.body.quaternion).add(sim.body.position);
        for (let i = 1; i <= JOINTS; i++) sim.nodes[i].lerpVectors(sim.anchor, hang, i / JOINTS);
        return;
      }
      if (host.held) {
        if (!hostedGrab) {
          hostedGrab = true;
          hostedOrigin = sim.body.position.clone();
          sim.grab = { local: new THREE.Vector3(), rotation: sim.body.quaternion.clone(),
            from: hostedOrigin.clone(), target: hostedOrigin.clone() };
        }
        const worldHeight = 2 * camera.position.z * Math.tan(FOV * Math.PI / 360);
        sim.grab.target.copy(hostedOrigin).add(new THREE.Vector3(
          host.dx / host.viewportHeight * worldHeight, -host.dy / host.viewportHeight * worldHeight, 0));
      } else if (hostedGrab) {
        hostedGrab = false;
        sim.grab = null;
      }
    };
    const onNativeFrame = () => {
      const host = window.__pingclashFrame;
      if (!host?.active) { cancelAnimationFrame(raf); raf = 0; return; }
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
