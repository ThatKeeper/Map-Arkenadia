// src/features/tiles/evictTiles.js
import { tileCache, tilesState } from '@/state';

/** Libera teselas lejanas o poco usadas hasta caber en el presupuesto. */
export function evictTiles() {
  const hard = Math.ceil(tilesState.maxTiles * 1.15);
  let guard = 0;
  while (tileCache.size > tilesState.maxTiles && guard++ < 12) {
    let ok = null,
      sc = -1;
    for (const [key, t] of tileCache) {
      if (t.last >= tilesState.frameNo - 1) continue;
      if (t.pin && tileCache.size <= hard) continue;
      const v =
        (t.pin ? 0 : 1e7) +
        Math.abs(t.k - tilesState.currentLevel) * 1e4 +
        (tilesState.frameNo - t.last);
      if (v > sc) {
        sc = v;
        ok = key;
      }
    }
    if (!ok) break;
    const t = tileCache.get(ok);
    tileCache.delete(ok);
    if (tilesState.pool.length < 12) tilesState.pool.push(t.cv);
  }
}
