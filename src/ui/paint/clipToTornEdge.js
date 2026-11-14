// src/ui/paint/clipToTornEdge.js
import { getTornPath } from './getTornPath';
import { session } from '@/state';

/** Recorta al borde del papel, con sombra si los efectos están activos. */
export function clipToTornEdge({ g, sd, rs }) {
  if (session.quality.fx) {
    g.save();
    g.shadowColor = 'rgba(0,0,0,.6)';
    g.shadowBlur = (30 * rs) / sd;
    g.shadowOffsetY = (10 * rs) / sd;
    g.fillStyle = '#000';
    g.fill(getTornPath());
    g.restore();
  }
  g.clip(getTornPath());
}
