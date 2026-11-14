// @ts-check
// src/features/route/reverseRoute.js
import { updateUserData } from '@/features/history';

/**
 * Invierte el sentido de la ruta (se puede deshacer).
 */
export function reverseRoute() {
  updateUserData('Ruta invertida', ['route'], (d) => d.route.reverse());
}
