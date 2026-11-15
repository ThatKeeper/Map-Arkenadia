// @ts-check
// src/features/categories/countMarkersByCategory.js
import { isVisibleInRole } from '@/features/roles';
import { session } from '@/state';

/**
 * Número de marcadores de cada categoría (id → cantidad) que el rol activo puede ver
 * (no cuenta el filtro de categorías, así «Solo» muestra cuántos hay).
 * @returns {Record<string, number>}
 */
export function countMarkersByCategory() {
  /** @type {Record<string, number>} */
  const counts = {};
  for (const m of session.userData.markers)
    if (isVisibleInRole(m.visibilidad, session.role)) counts[m.categoria] = (counts[m.categoria] || 0) + 1;
  return counts;
}
