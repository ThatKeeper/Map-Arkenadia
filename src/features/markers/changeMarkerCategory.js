// @ts-check
// src/features/markers/changeMarkerCategory.js
import { getCategoryById } from '@/features/categories';
import { updateMarker } from './updateMarker';
import { getMarkerById } from './getMarkerById';

/**
 * Cambia la categoría de un marcador. Si conservaba el icono por defecto de la categoría anterior,
 * pasa al icono por defecto de la nueva.
 * @param {number} id
 * @param {string} categoryId
 */
export function changeMarkerCategory(id, categoryId) {
  const m = getMarkerById(id);
  const next = getCategoryById(categoryId);
  if (!m || !next) return;
  const prev = getCategoryById(m.categoria);
  /** @type {Partial<import('../../types').Marker>} */
  const patch = { categoria: categoryId };
  if (prev && m.icono === prev.icono) patch.icono = next.icono;
  updateMarker(id, patch, `marcador:${id}:categoria`);
}
