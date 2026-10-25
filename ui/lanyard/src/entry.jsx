// SPDX-License-Identifier: GPL-3.0-only
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';

const state = { active: false, motion: true, held: false, back: false, dx: 0, dy: 0,
  viewportHeight: 800, viewportWidth: 360, centerX: 180, top: 180, height: 266, fontScale: 1,
  phase: 'idle', label: '', status: '' };
window.__pingclashFrame = state;
let configure;
let previousKey = '';

function paintCard(back) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = back ? '#14292d' : '#f6f6f2';
  ctx.fillRect(0, 0, 1024, 1440);
  ctx.fillStyle = back ? '#eaf1f0' : '#17242a';
  ctx.font = '500 76px sans-serif';
  ctx.fillText('PingClash', 112, 240);
  ctx.strokeStyle = back ? '#a5d9cf' : '#26373d';
  ctx.lineWidth = 14; ctx.lineCap = 'round';
  ctx.beginPath();
  if (back) { ctx.moveTo(438, 600); ctx.lineTo(492, 654); ctx.lineTo(598, 544); }
  else { ctx.arc(512, 610, 82, -Math.PI * .35, Math.PI * 1.35); }
  ctx.stroke();
  if (!back) { ctx.beginPath(); ctx.moveTo(512, 504); ctx.lineTo(512, 600); ctx.stroke(); }
  ctx.textAlign = 'center';
  const text = (value, y, size, maxRows = 3) => {
    ctx.font = `500 ${size * Math.min(state.fontScale, 1.8)}px sans-serif`;
    const words = [...value]; let line = ''; const rows = [];
    for (const c of words) {
      if (ctx.measureText(line + c).width > 800) { rows.push(line); line = c; }
      else line += c;
    }
    rows.push(line);
    rows.slice(0, maxRows).forEach((row, i) => ctx.fillText(row, 512, y + i * size * state.fontScale * 1.25));
  };
  text(state.status, 850, 62);
  ctx.globalAlpha = .2; ctx.fillRect(112, 1110, 800, 2); ctx.globalAlpha = 1;
  text(state.label, 1190, 58, 2);
  return canvas.toDataURL('image/png');
}

function options() {
  const size = Math.max(.15, Math.min(.6, state.height / state.viewportHeight));
  const fraction = state.top / state.viewportHeight;
  return { size, strapLength: Math.max(0, Math.min(1, (fraction - .12) / .3)),
    frontImage: paintCard(false), backImage: paintCard(true), cardColor: '#ffffff',
    finish: 'glossy', orientation: 'portrait', anchor: 'center', cornerRadius: .3,
    strapColor: '#111111', strapWidth: .65, metal: 'silver', gravity: 1, damping: .5,
    elasticity: .5, breeze: 0, intro: false, interactive: false };
}

function App() {
  const [props, setProps] = useState(options());
  configure = setProps;
  return <Lanyard {...props} />;
}

window.PingClashScene = Object.freeze({
  frame(data) {
    if (!data || typeof data !== 'object') return;
    for (const key of ['viewportHeight', 'viewportWidth', 'centerX', 'top', 'height', 'fontScale', 'dx', 'dy']) {
      if (Number.isFinite(data[key])) state[key] = Math.max(-10000, Math.min(10000, data[key]));
    }
    for (const key of ['active', 'motion', 'held', 'back']) state[key] = data[key] === true;
    for (const key of ['phase', 'label', 'status']) {
      if (typeof data[key] === 'string') state[key] = data[key].slice(0, 120);
    }
    // Android may initialize an offscreen WebView with a zero CSS vh. Use the
    // measured native aspect ratio until/after its first visible compositor frame.
    const height = Math.max(1, window.innerWidth * state.viewportHeight / Math.max(1, state.viewportWidth));
    for (const element of [document.documentElement, document.body, document.getElementById('root')]) {
      element.style.height = `${height}px`;
    }
    const key = [state.viewportHeight, state.viewportWidth, state.centerX, state.top, state.height,
      state.fontScale, state.phase, state.label, state.status].join('|');
    if (key !== previousKey && configure) { previousKey = key; configure(options()); }
    window.dispatchEvent(new Event('pingclash-frame'));
  },
  status() {
    return { ready: window.__lanyardReady === true, frames: window.__lanyardFrames || 0,
      active: state.active, engine: 'three', roughness: .42, clearcoat: 1,
      metalness: 1, metalRoughness: .16, weaveNormal: .7,
      pose: window.__lanyardPose || null };
  }
});
createRoot(document.getElementById('root')).render(<App />);
