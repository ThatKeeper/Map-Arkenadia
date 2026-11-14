// @ts-check
// src/features/geometry/reportBuildError.js
import { byId } from '@/utils';

/**
 * Registra un fallo de construcción y lo muestra en la pantalla de carga.
 * @param {unknown} err
 */
export function reportBuildError(err) {
  console.error(err);
  const l = byId('load');
  if (l) l.textContent = 'No se pudo construir el mapa';
}
