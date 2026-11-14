// @ts-check
// src/ui/paint/buildDetailPaths.js
import { addDetailItemToPaths } from './addDetailItemToPaths';
import { findFirstVisibleItem } from './findFirstVisibleItem';
import { LOD_SPACING } from '@/config';

/**
 * Construye los trazados de los elementos de un nivel que caen dentro de la región visible.
 * @param {Float32Array} items lista plana de un nivel de detalle
 * @param {number} level nivel de detalle
 * @param {number} se escala efectiva de dibujo
 * @param {number} x0 región visible (mundo)
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 */
export function buildDetailPaths(items, level, se, x0, y0, x1, y1) {
  const n = items.length >> 2,
    m = LOD_SPACING[level] + 30,
    paths = { PM: new Path2D(), PT: new Path2D(), PL: new Path2D(), PD: new Path2D() };
  for (let i = findFirstVisibleItem(items, n, y0 - m); i < n; i++) {
    const t = items[i * 4],
      x = items[i * 4 + 1],
      y = items[i * 4 + 2],
      z = items[i * 4 + 3];
    if (y > y1 + m) break;
    if (x < x0 - 30 || x > x1 + 30) continue;
    addDetailItemToPaths(paths, t, x, y, z, se);
  }
  return paths;
}
