// @ts-check
// src/features/markers/clearMarkers.js
import { updateUserData } from '@/features/history';
import { session } from '@/state';

/**
 * Borra todos los marcadores (se puede deshacer).
 * @returns {number} cuántos se borraron
 */
export function clearMarkers() {
  const n = session.userData.markers.length;
  if (n) updateUserData('Marcadores borrados', ['markers'], (d) => (d.markers = []));
  return n;
}
