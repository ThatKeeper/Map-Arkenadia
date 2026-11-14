// @ts-check
// src/features/tiles/selectIdleTiles.js
import { tileCache, tilesState } from '@/state';

/**
 * Elige de las teselas de reposo las que caben en la caché (la precarga se acepta siempre).
 * @param {number[][]} extra teselas candidatas, ya ordenadas
 * @returns {number[][]}
 */
export function selectIdleTiles(extra) {
  const chosen = [];
  let room = Math.floor(tilesState.maxTiles * 0.9) - tileCache.size;
  for (const e of extra) {
    if (e[4] === 1 || room > 0) {
      chosen.push(e);
      if (e[4] !== 1) room--;
    }
  }
  return chosen;
}
