// src/core/computeItems.js
import { createPlacementIndex } from './createPlacementIndex';
import { scatterLevel } from './scatterLevel';

/**
 * Capas de detalle por nivel de zoom.
 * @param {number} lod Nivel máximo a generar (0..3)
 * @param {number} dens Densidad 0..1
 * @returns {Float32Array[]} un arreglo por nivel
 */
export function computeItems(lod, dens) {
  const index = createPlacementIndex();
  const result = [];
  for (let l = 0; l < 4; l++) {
    result.push(l > lod ? new Float32Array(0) : scatterLevel(l, dens, index));
  }
  return result;
}
