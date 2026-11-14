// @ts-check
// src/features/markers/getVisibleMarkers.js
import { isCategoryHidden } from '@/features/categories';
import { session } from '@/state';

/**
 * Marcadores cuya categoría no está oculta por el filtro (los que se ven en mapa, lista, minimapa y búsqueda).
 * @returns {import('../../types').Marker[]}
 */
export function getVisibleMarkers() {
  const hidden = session.viewOptions.hiddenCategories;
  return hidden.length
    ? session.userData.markers.filter((m) => !isCategoryHidden(m.categoria))
    : session.userData.markers;
}
