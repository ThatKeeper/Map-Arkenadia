// src/ui/lists/initMarkerIconPicker.js
import { openMarkerPopup } from './openMarkerPopup';
import { VISIBILITIES } from '@/config';
import { getMarkerById } from '@/features/markers';
import { session } from '@/state';
import { byId, createEl } from '@/utils';

/** Prepara el editor de marcador: opciones de visibilidad y búsqueda de iconos. */
export function initMarkerIconPicker() {
  for (const [id, nombre] of VISIBILITIES) {
    const o = createEl('option', nombre);
    o.value = id;
    byId('pVis').appendChild(o);
  }
  byId('pIconQ').oninput = () => {
    const m = getMarkerById(session.selectedMarkerId);
    if (m) openMarkerPopup(m.id, true);
  };
}
