// @ts-check
// src/features/tiles/getViewCenterInTiles.js
import { getTileGeometry } from './getTileGeometry';
import { viewport } from '@/state';

/**
 * Centro de la vista expresado en coordenadas de tesela de un nivel.
 * @param {number} level nivel de teselas
 * @returns {[number, number]}
 */
export function getViewCenterInTiles(level) {
  const T = getTileGeometry(level).Tw;
  return [
    (-viewport.panX + viewport.width / 2) / viewport.scale / T,
    (-viewport.panY + viewport.height / 2) / viewport.scale / T,
  ];
}
