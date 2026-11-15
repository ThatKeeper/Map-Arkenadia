// @ts-check
// src/features/markers/updateMarker.js
import { getMarkerById } from './getMarkerById';
import { updateUserData } from '@/features/history';
import { canEditVisibility } from '@/features/roles';
import { session } from '@/state';

/**
 * Edita campos de un marcador (acción que se puede deshacer; las ediciones seguidas del mismo campo se fusionan).
 * En modo jugador solo se editan los propios («mio»), y no se pueden cambiar su visibilidad ni la nota del DM.
 * @param {number} id
 * @param {Partial<import('../../types').Marker>} patch
 * @param {string} [groupKey] por defecto, el id del marcador y los campos tocados
 * @returns {boolean} false si no se permitió el cambio
 */
export function updateMarker(id, patch, groupKey) {
  const m = getMarkerById(id);
  if (!m || !canEditVisibility(m.visibilidad)) return false;
  if (session.role !== 'dm' && ('visibilidad' in patch || 'notaDm' in patch)) return false;
  updateUserData(
    'Marcador editado',
    ['markers'],
    (d) => {
      const x = d.markers.find((k) => k.id === id);
      if (x) Object.assign(x, patch, { actualizado: Date.now() });
    },
    groupKey || `marcador:${id}:${Object.keys(patch).join(',')}`,
  );
  return true;
}
