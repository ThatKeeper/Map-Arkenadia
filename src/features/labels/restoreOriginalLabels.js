// @ts-check
// src/features/labels/restoreOriginalLabels.js
import { updateUserData } from '@/features/history';
import { session } from '@/state';

// Solo el DM restaura las originales (en modo jugador no hace nada).

/**
 * Restaura todas las etiquetas originales (deshace sus ediciones y borrados); las propias se conservan.
 * @returns {number} cuántas etiquetas originales tenían cambios
 */
export function restoreOriginalLabels() {
  if (session.role !== 'dm') return 0;
  const n = Object.keys(session.userData.labels.edits).length;
  if (n)
    updateUserData('Etiquetas originales restauradas', ['labels'], (d) => {
      d.labels.edits = {};
    });
  return n;
}
