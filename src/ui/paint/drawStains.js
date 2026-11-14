// src/ui/paint/drawStains.js
import { STAINS } from '@/config';
import { session } from '@/state';

/** Dibuja manchas de papel envejecido. */
export function drawStains({ g, wx0, wy0, wx1, wy1 }) {
  if (session.quality.fx)
    for (const [x, y, r, d] of STAINS) {
      if (x + r < wx0 || x - r > wx1 || y + r < wy0 || y - r > wy1) continue;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, d ? 'rgba(150,105,55,.12)' : 'rgba(255,240,200,.1)');
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr;
      g.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
}
