// @ts-check
// src/features/roles/isVisibleInRole.js

/**
 * Indica si un elemento con cierta visibilidad se ve en un rol.
 * El DM ve todo. El jugador ve lo de «todos» y lo suyo («mio»), nunca lo del DM.
 * @param {string} visibilidad 'todos' | 'dm' | 'mio'
 * @param {'dm'|'jugador'} role
 */
export function isVisibleInRole(visibilidad, role) {
  if (role === 'dm') return true;
  return visibilidad !== 'dm';
}
