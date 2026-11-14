// @ts-check
// src/features/route/removeRoutePoint.js
import { updateUserData } from '@/features/history';

/**
 * Quita un punto de la ruta (se puede deshacer).
 * @param {number} i posición del punto
 */
export function removeRoutePoint(i) {
  updateUserData('Punto de ruta quitado', ['route'], (d) => d.route.splice(i, 1));
}
