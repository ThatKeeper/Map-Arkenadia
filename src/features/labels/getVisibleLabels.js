// @ts-check
// src/features/labels/getVisibleLabels.js
import { getEffectiveLabels } from './getEffectiveLabels';
import { isVisibleInRole } from '@/features/roles';
import { session } from '@/state';

/** @type {{ source: unknown, role: string, list: import('../../types').EffectiveLabel[] }} */
let memo = { source: null, role: '', list: [] };

/**
 * Etiquetas que se ven en un rol (por defecto, el activo): en modo jugador no salen las del DM.
 * El resultado se reutiliza mientras no cambien las etiquetas ni el rol.
 * @param {'dm'|'jugador'} [role]
 * @returns {import('../../types').EffectiveLabel[]}
 */
export function getVisibleLabels(role = session.role) {
  const all = getEffectiveLabels();
  if (role === 'dm') return all;
  if (memo.source === all && memo.role === role) return memo.list;
  const list = all.filter((l) => isVisibleInRole(l.visibilidad, role));
  memo = { source: all, role, list };
  return list;
}
