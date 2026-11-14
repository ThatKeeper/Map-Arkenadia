// @ts-check
// src/features/route/addRoutePoint.js
import { updateUserData } from '@/features/history';

/**
 * Añade un punto al final de la ruta (se puede deshacer).
 * @param {{x: number, y: number, n?: string}} p punto (con el nombre del marcador si cae sobre uno)
 */
export function addRoutePoint(p) {
  updateUserData('Punto de ruta añadido', ['route'], (d) => d.route.push({ x: p.x, y: p.y, n: p.n || '' }));
}
