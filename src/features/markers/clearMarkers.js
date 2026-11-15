// @ts-check
// src/features/markers/clearMarkers.js
import { updateUserData } from '@/features/history';
import { canEditVisibility } from '@/features/roles';
import { session } from '@/state';

/**
 * Borra los marcadores que el rol activo puede editar (el DM, todos; el jugador, solo los suyos). Se puede deshacer.
 * @returns {number} cuántos se borraron
 */
export function clearMarkers() {
  const n = session.userData.markers.filter((m) => canEditVisibility(m.visibilidad)).length;
  if (n)
    updateUserData('Marcadores borrados', ['markers'], (d) => {
      d.markers = d.markers.filter((m) => !canEditVisibility(m.visibilidad));
    });
  return n;
}
