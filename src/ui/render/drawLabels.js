// src/ui/render/drawLabels.js
import { drawLabel } from './drawLabel';
import { LABELS, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { dom, viewport } from '@/state';

/** Dibuja nombres de lugares y notas. */
export function drawLabels(P, vx0, vy0, vx1, vy1) {
  dom.ctx.textBaseline = 'middle';
  dom.ctx.textAlign = 'left';
  dom.ctx.lineJoin = 'round';
  for (const [t, fx, fy, k, ms, rot] of LABELS) {
    if (viewport.scale < ms) continue;
    const x = fx * WORLD_WIDTH,
      y = fy * WORLD_HEIGHT;
    if (x < vx0 - 300 || x > vx1 + 300 || y < vy0 - 100 || y > vy1 + 100) continue;
    drawLabel(P, t, x, y, k, ms, rot);
  }
}
