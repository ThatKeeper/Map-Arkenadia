// @ts-check
// src/features/labels/removeLabel.js
import { getLabelById } from './getLabelById';
import { updateUserData } from '@/features/history';
import { canEditVisibility } from '@/features/roles';

/**
 * Borra una etiqueta (se puede deshacer). Las originales se ocultan, así que se pueden restaurar.
 * En modo jugador solo se pueden borrar las propias («mio»).
 * @param {string} id
 */
export function removeLabel(id) {
  const l = getLabelById(id);
  if (l && !canEditVisibility(l.visibilidad)) return;
  updateUserData('Etiqueta borrada', ['labels'], (d) => {
    if (id[0] === 'o') d.labels.edits[id] = { ...d.labels.edits[id], oculta: true, actualizado: Date.now() };
    else d.labels.custom = d.labels.custom.filter((c) => c.id !== id);
  });
}
