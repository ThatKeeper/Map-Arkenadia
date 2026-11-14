// @ts-check
// src/features/markers/getKnownMarkerNames.js
import { session } from '@/state';

/**
 * Nombres de marcador ya usados (sin repetir y sin los genéricos «Marcador N»), para autocompletar.
 * @returns {string[]}
 */
export function getKnownMarkerNames() {
  const out = new Set();
  for (const m of session.userData.markers)
    if (m.nombre && !/^Marcador( \d+)?$/.test(m.nombre)) out.add(m.nombre);
  return [...out].sort((a, b) => a.localeCompare(b, 'es'));
}
