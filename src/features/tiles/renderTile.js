// src/features/tiles/renderTile.js
import { acquireTileCanvas } from './acquireTileCanvas';
import { getTileGeometry } from './getTileGeometry';
import { tileKey } from './tileKey';
import { session, tileCache, tilesState } from '@/state';
import { paintWorldRegion } from '@/ui/paint';

/** Pinta una tesela y la guarda en la caché. */
export function renderTile(k, x, y) {
  const t0 = performance.now(),
    { sd, rs, Tw } = getTileGeometry(k),
    key = tileKey(k, x, y),
    old = tileCache.get(key),
    c = acquireTileCanvas();
  paintWorldRegion(
    c.getContext('2d', { alpha: false }),
    x * Tw,
    y * Tw,
    Tw,
    Tw,
    sd,
    rs,
    x * session.quality.tile,
    y * session.quality.tile,
    false,
  );
  if (old) tilesState.pool.push(old.cv);
  tileCache.set(key, {
    cv: c,
    k,
    x,
    y,
    gen: tilesState.generation,
    t0: performance.now(),
    last: tilesState.frameNo,
    fade: session.quality.smooth && !tilesState.noFade,
    pin: tilesState.preloadSet.has(key),
  });
  tilesState.avgTileMs = tilesState.avgTileMs * 0.8 + (performance.now() - t0) * 0.2;
}
