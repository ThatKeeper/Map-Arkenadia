// @ts-check
// src/features/markers/getKnownMarkerNames.js
import { isVisibleInRole } from '@/features/roles';
import { session } from '@/state';

/**
 * Nombres de marcador ya usados que el rol activo puede ver (sin repetir y sin los genéricos «Marcador N»),
 * para autocompletar. En modo jugador no salen los de marcadores del DM.
 * @returns {string[]}
 */
export function getKnownMarkerNames() {
  const out = new Set();
  for (const m of session.userData.markers)
    if (isVisibleInRole(m.visibilidad, session.role) && m.nombre && !/^Marcador( \d+)?$/.test(m.nombre)) out.add(m.nombre);
  return [...out].sort((a, b) => a.localeCompare(b, 'es'));
}
