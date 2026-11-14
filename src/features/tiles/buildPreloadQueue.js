// src/features/tiles/buildPreloadQueue.js
import { fullTileRange } from './fullTileRange';
import { getTileGeometry } from './getTileGeometry';
import { hasTile } from './hasTile';
import { tileKey } from './tileKey';
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { loop, session, tileCache, tilesState, viewport } from '@/state';
import { requestFrame } from '@/ui/loop';

/** Calcula la cola de precarga según el presupuesto de memoria. */
export function buildPreloadQueue() {
  if (!loop.ready) return;
  tilesState.minLevel = Math.round(2 * Math.log2(viewport.fitScale * 0.6));
  tilesState.maxLevel = Math.round(2 * Math.log2(session.quality.maxZ));
  const budget = Math.floor(tilesState.maxTiles * (session.quality.premax ? 0.8 : 0.5)),
    cnt = (l) => {
      const r = fullTileRange(l);
      return (r[1] - r[0] + 1) * (r[3] - r[2] + 1);
    };
  let acc = 0,
    kB = tilesState.minLevel;
  for (let l = tilesState.minLevel; l <= tilesState.maxLevel; l++) {
    acc += cnt(l);
    if (acc > budget && l > tilesState.minLevel) break;
    kB = l;
  }
  const st = Math.min(Math.max(tilesState.currentLevel, tilesState.minLevel), kB),
    levels = [st];
  for (let l = st + 1; l <= kB; l++) levels.push(l);
  for (let l = st - 1; l >= tilesState.minLevel; l--) levels.push(l);
  tilesState.preloadQueue = [];
  tilesState.preloadSet = new Set();
  for (const l of levels) {
    const [a, b, c, d] = fullTileRange(l),
      T = getTileGeometry(l).Tw,
      list = [];
    for (let y = c; y <= d; y++)
      for (let x = a; x <= b; x++)
        list.push([
          l,
          x,
          y,
          (x + 0.5 - WORLD_WIDTH / 2 / T) ** 2 + (y + 0.5 - WORLD_HEIGHT / 2 / T) ** 2,
        ]);
    list.sort((p, q) => p[3] - q[3]);
    for (const e of list) {
      tilesState.preloadQueue.push(e);
      tilesState.preloadSet.add(tileKey(l, e[1], e[2]));
    }
  }
  for (const [key, t] of tileCache) t.pin = tilesState.preloadSet.has(key);
  tilesState.preloadQueue = tilesState.preloadQueue.filter((e) => !hasTile(e[0], e[1], e[2]));
  tilesState.preloadTotal = tilesState.preloadQueue.length;
  requestFrame();
}
