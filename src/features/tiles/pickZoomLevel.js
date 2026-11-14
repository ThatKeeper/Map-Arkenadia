// src/features/tiles/pickZoomLevel.js
import { tilesState, viewport } from '@/state';

/** Elige el nivel de teselas según el zoom actual (con histéresis). */
export function pickZoomLevel() {
  const f = 2 * Math.log2(Math.max(viewport.scale, 1e-3));
  if (Math.abs(f - tilesState.currentLevel) > 0.62) tilesState.currentLevel = Math.round(f);
  return tilesState.currentLevel;
}
