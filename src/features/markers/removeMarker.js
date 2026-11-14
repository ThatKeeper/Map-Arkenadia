// @ts-check
// src/features/markers/removeMarker.js
import { updateUserData } from '@/features/history';

/**
 * Borra un marcador (se puede deshacer).
 * @param {number} id
 */
export function removeMarker(id) {
  updateUserData('Marcador borrado', ['markers'], (d) => {
    d.markers = d.markers.filter((m) => m.id !== id);
  });
}
