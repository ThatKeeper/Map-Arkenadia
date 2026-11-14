// @ts-check
// src/ui/render/collectUnpaintedTileRects.js
import { deviceRect } from './deviceRect';
import { TILE_FADE_MS } from '@/config';
import { tileKey } from '@/features/tiles';
import { tileCache } from '@/state';

/**
 * Rectángulos (en píxeles del dispositivo) de las teselas que aún no existen o están en fundido.
 * @param {number} k nivel de teselas
 * @param {number[]} range [x0, x1, y0, y1] rango visible
 * @param {number} Tw lado de una tesela en el mundo
 * @param {number} now marca de tiempo del fotograma (ms)
 */
export function collectUnpaintedTileRects(k, range, Tw, now) {
  const [a, b, c, d] = range,
    miss = [];
  for (let y = c; y <= d; y++)
    for (let x = a; x <= b; x++) {
      const t = tileCache.get(tileKey(k, x, y));
      if (!t || (t.fade && now - t.t0 < TILE_FADE_MS))
        miss.push(deviceRect(x * Tw, y * Tw, Tw, Tw));
    }
  return miss;
}
