// @ts-check
// src/features/categories/countMarkersByCategory.js
import { session } from '@/state';

/**
 * Número de marcadores de cada categoría (id → cantidad), sin contar el filtro.
 * @returns {Record<string, number>}
 */
export function countMarkersByCategory() {
  /** @type {Record<string, number>} */
  const counts = {};
  for (const m of session.userData.markers) counts[m.categoria] = (counts[m.categoria] || 0) + 1;
  return counts;
}
