// @ts-check
// src/features/labels/removeLabel.js
import { updateUserData } from '@/features/history';

/**
 * Borra una etiqueta (se puede deshacer). Las originales se ocultan, así que se pueden restaurar.
 * @param {string} id
 */
export function removeLabel(id) {
  updateUserData('Etiqueta borrada', ['labels'], (d) => {
    if (id[0] === 'o') d.labels.edits[id] = { ...d.labels.edits[id], oculta: true };
    else d.labels.custom = d.labels.custom.filter((c) => c.id !== id);
  });
}
