// src/features/tiles/fullTileRange.js
import { getTileGeometry } from './getTileGeometry';
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';

/** Rango de teselas que cubre todo el mundo en un nivel. */
export const fullTileRange = (l) => {
  const T = getTileGeometry(l).Tw;
  return [
    Math.floor(-40 / T),
    Math.floor((WORLD_WIDTH + 40) / T),
    Math.floor(-40 / T),
    Math.floor((WORLD_HEIGHT + 40) / T),
  ];
};
