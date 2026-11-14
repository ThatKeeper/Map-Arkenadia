// @ts-check
// src/features/markers/updateMarker.js
import { updateUserData } from '@/features/history';

/**
 * Edita campos de un marcador (acción que se puede deshacer; las ediciones seguidas del mismo campo se fusionan).
 * @param {number} id
 * @param {Partial<import('../../types').Marker>} patch
 * @param {string} [groupKey] por defecto, el id del marcador y los campos tocados
 */
export function updateMarker(id, patch, groupKey) {
  updateUserData(
    'Marcador editado',
    ['markers'],
    (d) => {
      const m = d.markers.find((x) => x.id === id);
      if (m) Object.assign(m, patch, { actualizado: Date.now() });
    },
    groupKey || `marcador:${id}:${Object.keys(patch).join(',')}`,
  );
}
