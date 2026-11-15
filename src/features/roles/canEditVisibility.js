// @ts-check
// src/features/roles/canEditVisibility.js
import { session } from '@/state';

/**
 * Indica si, en el rol activo, se puede editar un elemento con esa visibilidad.
 * El DM edita todo; el jugador solo lo suyo («mio»): lo compartido por el DM es de solo lectura.
 * @param {string} visibilidad
 * @param {'dm'|'jugador'} [role]
 */
export function canEditVisibility(visibilidad, role = session.role) {
  return role === 'dm' || visibilidad === 'mio';
}
