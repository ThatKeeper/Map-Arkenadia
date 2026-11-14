// @ts-check
// src/features/tiles/collectNeighborLevelTiles.js
import { getViewCenterInTiles } from './getViewCenterInTiles';
import { hasTile } from './hasTile';
import { visibleTileRange } from './visibleTileRange';
import { tilesState } from '@/state';

/**
 * Teselas faltantes de los niveles contiguos (k+1 y k−1), para que el zoom no muestre huecos.
 * @param {number} k nivel actual
 * @returns {number[][]}
 */
export function collectNeighborLevelTiles(k) {
  const extra = [];
  for (const l of [k + 1, k - 1]) {
    if (l > tilesState.maxLevel || l < tilesState.minLevel) continue;
    const [a2, b2, c2, d2] = visibleTileRange(l, 0);
    if ((b2 - a2 + 1) * (d2 - c2 + 1) > 60) continue;
    const [cx2, cy2] = getViewCenterInTiles(l);
    for (let y = c2; y <= d2; y++)
      for (let x = a2; x <= b2; x++)
        if (!hasTile(l, x, y))
          extra.push([l, x, y, 1e5 + (x + 0.5 - cx2) ** 2 + (y + 0.5 - cy2) ** 2]);
  }
  return extra;
}
