// @ts-check
// src/features/labels/restoreOriginalLabels.js
import { updateUserData } from '@/features/history';
import { session } from '@/state';

/**
 * Restaura todas las etiquetas originales (deshace sus ediciones y borrados); las propias se conservan.
 * @returns {number} cuántas etiquetas originales tenían cambios
 */
export function restoreOriginalLabels() {
  const n = Object.keys(session.userData.labels.edits).length;
  if (n)
    updateUserData('Etiquetas originales restauradas', ['labels'], (d) => {
      d.labels.edits = {};
    });
  return n;
}
