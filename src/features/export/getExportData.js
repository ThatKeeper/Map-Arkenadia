// @ts-check
// src/features/export/getExportData.js
import { getVisibleLabels } from '@/features/labels';
import { getVisibleMarkers } from '@/features/markers';
import { session } from '@/state';

/**
 * Qué datos entran en la imagen según las casillas y la versión elegida.
 * - Versión «jugadores» (o rol jugador): sin nada del DM y sin la ruta del DM.
 * - En modo jugador la ruta es la tuya, así que sí puede ir.
 * Los marcadores respetan el filtro de categorías, igual que en pantalla.
 * @param {{ markers: boolean, route: boolean, labels: boolean, version: 'completa'|'jugadores' }} options
 */
export function getExportData(options) {
  const role = session.role === 'jugador' || options.version === 'jugadores' ? 'jugador' : 'dm';
  const routeAllowed = session.role === 'jugador' || options.version === 'completa';
  return {
    role,
    markers: options.markers ? getVisibleMarkers(role) : [],
    labels: options.labels ? getVisibleLabels(role) : [],
    route: options.route && routeAllowed ? session.userData.route : [],
  };
}
