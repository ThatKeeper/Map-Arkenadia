// src/features/tiles/acquireTileCanvas.js
import { session, tilesState } from '@/state';

/** Obtiene un canvas de tesela del pool o crea uno nuevo. */
export function acquireTileCanvas() {
  return (
    tilesState.pool.pop() ||
    (() => {
      const c = document.createElement('canvas');
      c.width = c.height = session.quality.tile;
      return c;
    })()
  );
}
