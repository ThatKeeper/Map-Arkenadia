// src/features/terrain/terrainClassAt.js
import { GRID_HEIGHT, GRID_WIDTH } from '@/config';
import { terrainClasses } from '@/state';

/** Clase de terreno en una posición del mundo. */
export const terrainClassAt = (x, y) =>
  terrainClasses[
    Math.min(GRID_HEIGHT - 1, Math.max(0, (y / 4) | 0)) * GRID_WIDTH +
      Math.min(GRID_WIDTH - 1, Math.max(0, (x / 4) | 0))
  ];
