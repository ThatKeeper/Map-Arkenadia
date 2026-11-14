// @ts-check
// src/features/tiles/collectIdleTiles.js
import { collectNeighborLevelTiles } from './collectNeighborLevelTiles';
import { collectPreloadTiles } from './collectPreloadTiles';
import { collectRingTiles } from './collectRingTiles';

/**
 * Teselas "de reposo" a pintar cuando no hay gestos ni faltan visibles, ordenadas por prioridad:
 * niveles contiguos, cola de precarga y anillo exterior.
 * @param {number} k nivel actual
 * @param {number} cx centro de la vista (coordenadas de tesela)
 * @param {number} cy
 * @returns {number[][]}
 */
export function collectIdleTiles(k, cx, cy) {
  const extra = [
    ...collectNeighborLevelTiles(k),
    ...collectPreloadTiles(),
    ...collectRingTiles(k, cx, cy),
  ];
  extra.sort((p, q) => p[3] - q[3]);
  return extra;
}
