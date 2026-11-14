// @ts-check
// src/features/route/removeLastRoutePoint.js
import { updateUserData } from '@/features/history';
import { session } from '@/state';

/** Quita el último punto de la ruta, si lo hay (se puede deshacer). */
export function removeLastRoutePoint() {
  if (session.userData.route.length)
    updateUserData('Punto de ruta quitado', ['route'], (d) => d.route.pop());
}
