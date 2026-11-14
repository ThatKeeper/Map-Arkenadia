// src/ui/paint/drawRiver.js
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { session } from '@/state';

/** Dibuja el Río de Jade. */
export function drawRiver({ g, P, LW, wx0, wy0, wx1, wy1 }) {
  /* río de Jade */
  if (!(
    wx1 < 0.74 * WORLD_WIDTH ||
    wx0 > 0.95 * WORLD_WIDTH ||
    wy1 < 0.1 * WORLD_HEIGHT ||
    wy0 > 0.25 * WORLD_HEIGHT
  )) {
    g.beginPath();
    for (let i = 0; i <= 60; i++) {
      const t = i / 60,
        x = (0.76 + 0.17 * t) * WORLD_WIDTH,
        y = (0.155 + 0.015 * t) * WORLD_HEIGHT + Math.sin(t * 14) * 14;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.strokeStyle = session.paletteMode ? 'rgba(70,110,200,.7)' : 'rgba(110,135,150,.6)';
    g.lineWidth = LW(5);
    g.stroke();
    g.strokeStyle = `rgba(${P.ink},.7)`;
    g.lineWidth = LW(1.2);
    g.stroke();
  }
}
