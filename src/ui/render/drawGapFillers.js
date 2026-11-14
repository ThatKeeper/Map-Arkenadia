// @ts-check
// src/ui/render/drawGapFillers.js
import { blit } from './blit';
import { drawTile } from './drawTile';
import { OVERVIEW_MARGIN, OVERVIEW_RESOLUTION } from '@/config';
import { tileKey, visibleTileRange } from '@/features/tiles';
import { dom, tileCache, tilesState } from '@/state';

/**
 * Dibuja capas de apoyo (vista general y teselas de niveles vecinos) recortadas a los huecos.
 * @param {number[][]} miss rectángulos de dispositivo [x0, y0, x1, y1] a rellenar
 * @param {number} k nivel actual
 * @param {number} now marca de tiempo del fotograma (ms)
 */
export function drawGapFillers(miss, k, now) {
  dom.ctx.save();
  dom.ctx.beginPath();
  for (const r of miss) dom.ctx.rect(r[0], r[1], r[2] - r[0], r[3] - r[1]);
  dom.ctx.clip();
  if (tilesState.overview) {
    tilesState.overview.last = tilesState.frameNo;
    blit(
      tilesState.overview.cv,
      -OVERVIEW_MARGIN,
      -OVERVIEW_MARGIN,
      tilesState.overview.cv.width / OVERVIEW_RESOLUTION,
      tilesState.overview.cv.height / OVERVIEW_RESOLUTION,
      1,
    );
  }
  for (const l of [k - 2, k + 1, k - 1]) {
    const [a2, b2, c2, d2] = visibleTileRange(l, 0);
    if ((b2 - a2 + 1) * (d2 - c2 + 1) > 150) continue;
    for (let y = c2; y <= d2; y++)
      for (let x = a2; x <= b2; x++) {
        const t = tileCache.get(tileKey(l, x, y));
        if (t) drawTile(t, now);
      }
  }
  dom.ctx.restore();
}
