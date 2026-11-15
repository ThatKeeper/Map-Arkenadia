// @ts-check
// src/features/labels/updateLabel.js
import { updateUserData } from '@/features/history';
import { canEditVisibility } from '@/features/roles';
import { getLabelById } from './getLabelById';

/**
 * Cambia texto, posición, tamaño, rotación o estilo de una etiqueta (se puede deshacer;
 * los cambios seguidos del mismo campo, como arrastrar, se fusionan).
 * @param {string} id "o<n>" (original) o "c<n>" (propia)
 * @param {Partial<import('../../types').LabelData>} patch
 * @param {string} [groupKey]
 */
export function updateLabel(id, patch, groupKey) {
  const l = getLabelById(id);
  if (l && !canEditVisibility(l.visibilidad)) return;
  updateUserData(
    'Etiqueta editada',
    ['labels'],
    (d) => {
      const stamp = { actualizado: Date.now() };
      if (id[0] === 'o') d.labels.edits[id] = { ...d.labels.edits[id], ...patch, ...stamp };
      else {
        const c = d.labels.custom.find((x) => x.id === id);
        if (c) Object.assign(c, patch, stamp);
      }
    },
    groupKey || `etiqueta:${id}:${Object.keys(patch).join(',')}`,
  );
}
