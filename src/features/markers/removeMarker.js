// @ts-check
// src/features/markers/removeMarker.js
import { getMarkerById } from './getMarkerById';
import { updateUserData } from '@/features/history';
import { canEditVisibility } from '@/features/roles';

/**
 * Borra un marcador (se puede deshacer). En modo jugador solo los propios.
 * @param {number} id
 * @returns {boolean} false si no se permitió
 */
export function removeMarker(id) {
  const m = getMarkerById(id);
  if (!m || !canEditVisibility(m.visibilidad)) return false;
  updateUserData('Marcador borrado', ['markers'], (d) => {
    d.markers = d.markers.filter((k) => k.id !== id);
  });
  return true;
}
