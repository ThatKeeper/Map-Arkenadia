// @ts-check
// src/features/markers/getVisibleMarkers.js
import { isCategoryHidden } from '@/features/categories';
import { isVisibleInRole } from '@/features/roles';
import { session } from '@/state';

/**
 * Marcadores que se ven: los permitidos para el rol (en modo jugador no salen los del DM) y cuya
 * categoría no está oculta por el filtro. Es lo que muestran mapa, lista, minimapa y búsqueda.
 * @param {'dm'|'jugador'} [role] por defecto, el rol activo
 * @returns {import('../../types').Marker[]}
 */
export function getVisibleMarkers(role = session.role) {
  const hidden = session.viewOptions.hiddenCategories;
  return session.userData.markers.filter(
    (m) => isVisibleInRole(m.visibilidad, role) && (!hidden.length || !isCategoryHidden(m.categoria)),
  );
}
