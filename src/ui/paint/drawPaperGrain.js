// src/ui/paint/drawPaperGrain.js
import { getGrainPattern } from './getGrainPattern';
import { getGrainPeriod } from './getGrainPeriod';
import { session } from '@/state';

/** Superpone la textura de grano de papel. */
export function drawPaperGrain({ g, pox, poy, ov }) {
  if (session.quality.paper && !ov) {
    const per = getGrainPeriod(),
      pat = getGrainPattern(session.quality.dpr);
    g.setTransform(1, 0, 0, 1, -(pox % per), -(poy % per));
    g.fillStyle = pat;
    g.fillRect(0, 0, g.canvas.width + per, g.canvas.height + per);
  }
}
