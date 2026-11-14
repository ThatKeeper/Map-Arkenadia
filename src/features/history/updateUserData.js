// @ts-check
// src/features/history/updateUserData.js
import { applyUserDataPatch } from './applyUserDataPatch';
import { executeCommand } from './executeCommand';
import { session } from '@/state';
import { deepClone } from '@/utils';

/**
 * Cambia partes de `userData` como una acción que se puede deshacer y rehacer.
 * `mutate` recibe un borrador con copias de las claves indicadas y lo modifica; puede devolver un valor.
 * @template T
 * @param {string} label texto de la acción ("Marcador borrado")
 * @param {string[]} keys claves de userData que se tocan
 * @param {(draft: Record<string, any>) => T} mutate
 * @param {string} [groupKey] para fusionar acciones continuas (arrastres, teclear)
 * @returns {T}
 */
export function updateUserData(label, keys, mutate, groupKey) {
  /** @type {Record<string, any>} */
  const prev = {};
  /** @type {Record<string, any>} */
  const next = {};
  for (const k of keys) {
    prev[k] = deepClone(session.userData[k]);
    next[k] = deepClone(session.userData[k]);
  }
  const result = mutate(next);
  executeCommand({
    label,
    groupKey,
    do: () => applyUserDataPatch(next),
    undo: () => applyUserDataPatch(prev),
  });
  return result;
}
