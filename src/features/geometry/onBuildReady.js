// @ts-check
// src/features/geometry/onBuildReady.js
import { buildPreloadQueue, renderVisibleSync, startPreload } from '@/features/tiles';
import { loop, tilesState } from '@/state';
import { byId } from '@/utils';

/**
 * Tras guardar una construcción: la primera vez pinta lo visible, precarga y quita la pantalla de carga;
 * las siguientes invalidan las teselas y reconstruyen la cola de precarga.
 */
export async function onBuildReady() {
  if (!loop.ready) {
    loop.ready = true;
    renderVisibleSync();
    await startPreload();
    const l = byId('load');
    if (l) l.remove();
  } else {
    tilesState.generation++;
    tilesState.overviewStale = true;
    buildPreloadQueue();
  }
}
