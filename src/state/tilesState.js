// @ts-check
// src/state/tilesState.js

/** Estado del sistema de teselas y la precarga. */
export const tilesState = {
  pool: [],
  // Se incrementa para invalidar teselas antiguas
  generation: 1,
  frameNo: 0,
  maxTiles: 100,
  // Nivel de teselas en uso
  currentLevel: 0,
  noFade: true,
  overview: null,
  overviewStale: true,
  avgTileMs: 8,
  // Teselas pendientes de precarga
  preloadQueue: [],
  preloadSet: new Set(),
  preloadTotal: 0,
  minLevel: -6,
  maxLevel: 6,
  skipPreload: false,
};
