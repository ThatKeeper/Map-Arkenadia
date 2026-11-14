// src/ui/panels/updateStatsPanel.js
import { build, loop, session, tileCache, tilesState } from '@/state';
import { byId } from '@/utils';

/** Actualiza el texto de estadísticas de rendimiento. */
export function updateStatsPanel() {
  const mb = ((tileCache.size * session.quality.tile * session.quality.tile * 4) / 1e6).toFixed(0);
  byId('stats').textContent =
    `${loop.fpsValue || '–'} fps (al mover) · calidad: ${session.tier}\nteselas ${tileCache.size}/${tilesState.maxTiles} (~${mb} MB)\nnivel ${tilesState.currentLevel} · tesela media ${tilesState.avgTileMs.toFixed(0)} ms · precarga pendiente ${tilesState.preloadQueue.length}\n${build.workerOk ? 'worker' : 'sin worker'} · geometría ${build.geometryMs} ms`;
}
