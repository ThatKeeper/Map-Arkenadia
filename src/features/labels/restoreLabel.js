// @ts-check
// src/features/labels/restoreLabel.js
import { updateUserData } from '@/features/history';

/**
 * Devuelve una etiqueta original a su aspecto y posición de fábrica.
 * @param {string} id "o<n>"
 */
export function restoreLabel(id) {
  updateUserData('Etiqueta restaurada', ['labels'], (d) => {
    delete d.labels.edits[id];
  });
}
