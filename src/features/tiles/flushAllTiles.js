// src/features/tiles/flushAllTiles.js
import { tileCache, tilesState } from '@/state';

/** Vacía teselas, vista general y colas de precarga. */
export function flushAllTiles() {
  tileCache.clear();
  tilesState.pool = [];
  tilesState.overview = null;
  tilesState.overviewStale = true;
  tilesState.preloadQueue = [];
  tilesState.preloadSet = new Set();
}
