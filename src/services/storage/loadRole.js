// @ts-check
// src/services/storage/loadRole.js
import { DEFAULT_ROLE, ROLES } from '@/config';
import { session } from '@/state';
import { readStoredJson } from '@/utils';

/**
 * Carga el rol y el PIN guardados. Si hay PIN, siempre se arranca como jugador:
 * así abrir la página no enseña la vista del DM sin conocerlo.
 */
export function loadRole() {
  const pin = readStoredJson('mapaPin');
  session.pin =
    pin && typeof pin.salt === 'string' && typeof pin.hash === 'string' ? { salt: pin.salt, hash: pin.hash } : null;
  let saved = DEFAULT_ROLE;
  try {
    const r = localStorage.getItem('mapaRol');
    if (r && ROLES.includes(r)) saved = r;
  } catch (e) {}
  session.role = /** @type {'dm'|'jugador'} */ (session.pin ? 'jugador' : saved);
}
