// src/ui/paint/paintWorldRegion.js
import { clipToTornEdge } from './clipToTornEdge';
import { drawBiomeHighlight } from './drawBiomeHighlight';
import { drawLandmarks } from './drawLandmarks';
import { drawPaperGrain } from './drawPaperGrain';
import { drawRiver } from './drawRiver';
import { drawStains } from './drawStains';
import { drawTerrainDetails } from './drawTerrainDetails';
import { drawVignetteAndFrame } from './drawVignetteAndFrame';
import { drawWhirlpool } from './drawWhirlpool';
import { fillTerrain } from './fillTerrain';
import { strokeCoastlines } from './strokeCoastlines';
import { PALETTES, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { session } from '@/state';

/** Pinta una región del mundo en un canvas (base de teselas y vista general). */
export function paintWorldRegion(g, wx0, wy0, ww, wh, sd, rs, pox, poy, ov) {
  const P = PALETTES[session.paletteMode],
    LW = (w) => w * Math.pow(sd, -0.7),
    wx1 = wx0 + ww,
    wy1 = wy0 + wh;
  const r = { g, P, LW, wx0, wy0, wx1, wy1, ww, wh, sd, rs, pox, poy, ov };
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalAlpha = 1;
  g.fillStyle = '#1d130b';
  g.fillRect(0, 0, g.canvas.width, g.canvas.height);
  g.setTransform(rs, 0, 0, rs, -wx0 * rs, -wy0 * rs);
  g.save();
  if (wx0 < 24 || wy0 < 24 || wx1 > WORLD_WIDTH - 24 || wy1 > WORLD_HEIGHT - 24) clipToTornEdge(r);
  fillTerrain(r);
  strokeCoastlines(r);
  if (session.quality.details) drawTerrainDetails(g, P, sd, LW, wx0, wy0, wx1, wy1);
  drawRiver(r);
  drawWhirlpool(r);
  drawLandmarks(r);
  drawBiomeHighlight(r);
  drawStains(r);
  drawVignetteAndFrame(r);
  drawPaperGrain(r);
  g.restore();
}
