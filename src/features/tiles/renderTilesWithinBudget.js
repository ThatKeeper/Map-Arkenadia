// @ts-check
// src/features/tiles/renderTilesWithinBudget.js
import { evictTiles } from './evictTiles';
import { renderTile } from './renderTile';
import { tilesState } from '@/state';

/**
 * Pinta teselas en orden mientras quede presupuesto de tiempo (menos si el usuario interactúa).
 * @param {number[][]} need teselas a pintar, ordenadas por prioridad
 * @param {boolean} interacting hay gesto o animación en curso
 * @param {number} t0 instante de inicio del fotograma (ms)
 * @returns {number} cuántas teselas quedan por pintar
 */
export function renderTilesWithinBudget(need, interacting, t0) {
  const budget = interacting ? 5 : 14;
  let i = 0,
    n = 0;
  for (; i < need.length; i++) {
    if (i > 0 && performance.now() - t0 > budget) break;
    if (interacting && tilesState.frameNo % 2) break;
    renderTile(need[i][0], need[i][1], need[i][2]);
    n++;
  }
  if (n) evictTiles();
  return need.length - i;
}
