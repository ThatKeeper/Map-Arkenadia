// @ts-check
// src/features/history/applyUserDataPatch.js
import { session } from '@/state';
import { deepClone, emit } from '@/utils';

/**
 * Escribe en `session.userData` los valores de un parche (copias profundas) y avisa del cambio.
 * @param {Record<string, any>} patch clave de userData → valor
 */
export function applyUserDataPatch(patch) {
  for (const key of Object.keys(patch)) session.userData[key] = deepClone(patch[key]);
  emit('userdata:changed', { keys: Object.keys(patch) });
}
