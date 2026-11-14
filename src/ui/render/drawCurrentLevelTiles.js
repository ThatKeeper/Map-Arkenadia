// @ts-check
// src/ui/render/drawCurrentLevelTiles.js
import { drawTile } from './drawTile';
import { tileKey } from '@/features/tiles';
import { tileCache } from '@/state';

/**
 * Dibuja las teselas existentes del nivel actual dentro del rango visible.
 * @param {number} k nivel de teselas
 * @param {number[]} range [x0, x1, y0, y1] rango visible
 * @param {number} now marca de tiempo del fotograma (ms)
 */
export function drawCurrentLevelTiles(k, range, now) {
  const [a, b, c, d] = range;
  for (let y = c; y <= d; y++)
    for (let x = a; x <= b; x++) {
      const t = tileCache.get(tileKey(k, x, y));
      if (t) drawTile(t, now);
    }
}
