// src/ui/paint/drawBiomeHighlight.js
import { build, session } from '@/state';

/** Oscurece todo salvo el bioma resaltado. */
export function drawBiomeHighlight({ g, wx0, wy0, ww, wh }) {
  if (session.highlightedBiome !== null && build.geometry.b[session.highlightedBiome]) {
    const hp = new Path2D();
    hp.rect(wx0 - 2, wy0 - 2, ww + 4, wh + 4);
    hp.addPath(build.geometry.b[session.highlightedBiome]);
    g.fillStyle = 'rgba(22,12,4,.55)';
    g.fill(hp, 'evenodd');
  }
}
