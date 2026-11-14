// @ts-check
// src/features/tiles/collectRingTiles.js
import { hasTile } from './hasTile';
import { visibleTileRange } from './visibleTileRange';

/**
 * Teselas faltantes del anillo que rodea la vista (para que al arrastrar ya estén pintadas).
 * @param {number} k nivel actual
 * @param {number} cx centro de la vista (coordenadas de tesela)
 * @param {number} cy
 * @returns {number[][]}
 */
export function collectRingTiles(k, cx, cy) {
  const extra = [],
    [a3, b3, c3, d3] = visibleTileRange(k, 1);
  for (let y = c3; y <= d3; y++)
    for (let x = a3; x <= b3; x++)
      if (!hasTile(k, x, y))
        extra.push([k, x, y, 1e6 + (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2]);
  return extra;
}
