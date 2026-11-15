// @ts-check
// src/features/labels/restoreLabel.js
import { updateUserData } from '@/features/history';
import { session } from '@/state';

/**
 * Devuelve una etiqueta original a su aspecto y posición de fábrica.
 * @param {string} id "o<n>"
 */
export function restoreLabel(id) {
  if (session.role !== 'dm') return;
  updateUserData('Etiqueta restaurada', ['labels'], (d) => {
    delete d.labels.edits[id];
  });
}
