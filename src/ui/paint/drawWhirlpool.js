// src/ui/paint/drawWhirlpool.js
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';

/** Dibuja el remolino del Mar Corrupto. */
export function drawWhirlpool({ g, LW, wx0, wy0, wx1, wy1 }) {
  if (!(
    wx1 < 0.44 * WORLD_WIDTH ||
    wx0 > 0.54 * WORLD_WIDTH ||
    wy1 < 0.44 * WORLD_HEIGHT ||
    wy0 > 0.56 * WORLD_HEIGHT
  )) {
    g.beginPath();
    for (let a = 0; a < 30; a += 0.1) {
      const r = 6 + a * 3.6,
        x = 0.492 * WORLD_WIDTH + Math.cos(a) * r * 1.1,
        y = 0.499 * WORLD_HEIGHT + Math.sin(a) * r * 0.8;
      a ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.strokeStyle = 'rgba(120,40,60,.6)';
    g.lineWidth = LW(2);
    g.stroke();
  }
}
