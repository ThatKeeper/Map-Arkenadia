// src/features/tiles/startPreload.js
import { buildPreloadQueue } from './buildPreloadQueue';
import { hasTile } from './hasTile';
import { renderTile } from './renderTile';
import { session, tilesState } from '@/state';
import { byId, yieldToMain } from '@/utils';

/** Precarga teselas mostrando el progreso hasta terminar u omitir. */
export async function startPreload() {
  buildPreloadQueue();
  if (!session.quality.preload || !tilesState.preloadQueue.length) return;
  const total = tilesState.preloadQueue.length,
    txt = byId('loadTxt'),
    bar = byId('bar').firstElementChild,
    sk = byId('skip');
  tilesState.skipPreload = false;
  sk.hidden = false;
  sk.onclick = () => {
    tilesState.skipPreload = true;
  };
  tilesState.noFade = true;
  let t0 = performance.now();
  while (tilesState.preloadQueue.length && !tilesState.skipPreload) {
    const e = tilesState.preloadQueue.shift();
    if (!hasTile(e[0], e[1], e[2])) renderTile(e[0], e[1], e[2]);
    if (performance.now() - t0 > 16) {
      const p = Math.round((100 * (total - tilesState.preloadQueue.length)) / total);
      txt.textContent = 'Precargando el mapa… ' + p + ' %';
      bar.style.width = p + '%';
      await yieldToMain();
      t0 = performance.now();
    }
  }
  tilesState.noFade = false;
}
