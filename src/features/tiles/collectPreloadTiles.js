// @ts-check
// src/features/tiles/collectPreloadTiles.js
import { hasTile } from './hasTile';
import { tilesState } from '@/state';

/**
 * Toma hasta 40 teselas de la cola de precarga (descartando las que ya existen).
 * Se marcan con un quinto valor (1) para que se pinten siempre, aunque no quede "sitio".
 * @returns {number[][]}
 */
export function collectPreloadTiles() {
  const extra = [];
  if (!tilesState.preloadQueue.length) return extra;
  tilesState.preloadQueue = tilesState.preloadQueue.filter((e) => !hasTile(e[0], e[1], e[2]));
  for (let i = 0; i < Math.min(40, tilesState.preloadQueue.length); i++)
    extra.push([
      tilesState.preloadQueue[i][0],
      tilesState.preloadQueue[i][1],
      tilesState.preloadQueue[i][2],
      2e5 + i,
      1,
    ]);
  return extra;
}
