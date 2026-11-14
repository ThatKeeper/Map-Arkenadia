// @ts-check
// src/features/tiles/collectMissingTiles.js
import { hasTile } from './hasTile';

/**
 * Lista las teselas visibles que faltan, con su distancia al centro (para pintar primero las centrales).
 * @param {number} k nivel de teselas
 * @param {number[]} range [x0, x1, y0, y1] rango visible
 * @param {number} cx centro de la vista (coordenadas de tesela)
 * @param {number} cy
 * @returns {number[][]} entradas [nivel, x, y, distancia²]
 */
export function collectMissingTiles(k, range, cx, cy) {
  const [a, b, c, d] = range,
    need = [];
  for (let y = c; y <= d; y++)
    for (let x = a; x <= b; x++)
      if (!hasTile(k, x, y)) need.push([k, x, y, (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2]);
  return need;
}
