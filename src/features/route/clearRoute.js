// @ts-check
// src/features/route/clearRoute.js
import { updateUserData } from '@/features/history';

/**
 * Borra toda la ruta (se puede deshacer).
 */
export function clearRoute() {
  updateUserData('Ruta borrada', ['route'], (d) => (d.route = []));
}
