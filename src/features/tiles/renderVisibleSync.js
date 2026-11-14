// src/features/tiles/renderVisibleSync.js
import { pickZoomLevel } from './pickZoomLevel';
import { renderOverview } from './renderOverview';
import { renderTile } from './renderTile';
import { visibleTileRange } from './visibleTileRange';
import { loop, tilesState } from '@/state';

/** Pinta de golpe todo lo visible, sin fundidos (primer pintado o cambio estructural). */
export function renderVisibleSync() {
  /* primer pintado o cambio estructural: todo lo visible de golpe, sin fundidos */
  tilesState.noFade = true;
  tilesState.overviewStale = true;
  renderOverview();
  const k = pickZoomLevel(),
    [a, b, c, d] = visibleTileRange(k, 0);
  for (let y = c; y <= d; y++) for (let x = a; x <= b; x++) renderTile(k, x, y);
  tilesState.noFade = false;
  loop.dirty = true;
}
