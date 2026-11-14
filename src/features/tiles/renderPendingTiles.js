// src/features/tiles/renderPendingTiles.js
import { collectIdleTiles } from './collectIdleTiles';
import { collectMissingTiles } from './collectMissingTiles';
import { getViewCenterInTiles } from './getViewCenterInTiles';
import { isOverviewStale } from './isOverviewStale';
import { renderOverview } from './renderOverview';
import { renderTilesWithinBudget } from './renderTilesWithinBudget';
import { selectIdleTiles } from './selectIdleTiles';
import { visibleTileRange } from './visibleTileRange';
import { build, loop, session, tilesState } from '@/state';

/** Pinta las teselas que faltan dentro de un presupuesto de tiempo; devuelve cuántas quedan. */
export function renderPendingTiles(interacting) {
  if (!loop.ready || !build.geometry) return 0;
  const t0 = performance.now(),
    k = tilesState.currentLevel;
  if (isOverviewStale()) {
    if (!interacting || tilesState.frameNo % 2 === 0) renderOverview();
    return 1;
  }
  const range = visibleTileRange(k, 0),
    [cx, cy] = getViewCenterInTiles(k),
    need = collectMissingTiles(k, range, cx, cy),
    vis = (range[1] - range[0] + 1) * (range[3] - range[2] + 1);
  tilesState.maxTiles = Math.max(session.quality.maxTiles, Math.ceil(vis * 1.6) + 6);
  if (!interacting && !need.length) need.push(...selectIdleTiles(collectIdleTiles(k, cx, cy)));
  else need.sort((p, q) => p[3] - q[3]);
  return renderTilesWithinBudget(need, interacting, t0);
}
