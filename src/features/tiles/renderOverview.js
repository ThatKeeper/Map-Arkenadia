// src/features/tiles/renderOverview.js
import { OVERVIEW_MARGIN, OVERVIEW_RESOLUTION, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { tilesState } from '@/state';
import { paintWorldRegion } from '@/ui/paint';

/** Pinta la vista general de todo el mapa (para huecos y minimapa). */
export function renderOverview() {
  const cw = Math.ceil((WORLD_WIDTH + 2 * OVERVIEW_MARGIN) * OVERVIEW_RESOLUTION),
    ch = Math.ceil((WORLD_HEIGHT + 2 * OVERVIEW_MARGIN) * OVERVIEW_RESOLUTION);
  if (!tilesState.overview) {
    tilesState.overview = { cv: document.createElement('canvas'), gen: 0 };
    tilesState.overview.cv.width = cw;
    tilesState.overview.cv.height = ch;
  }
  paintWorldRegion(
    tilesState.overview.cv.getContext('2d', { alpha: false }),
    -OVERVIEW_MARGIN,
    -OVERVIEW_MARGIN,
    cw / OVERVIEW_RESOLUTION,
    ch / OVERVIEW_RESOLUTION,
    OVERVIEW_RESOLUTION,
    OVERVIEW_RESOLUTION,
    0,
    0,
    true,
  );
  tilesState.overview.gen = tilesState.generation;
  tilesState.overviewStale = false;
}
