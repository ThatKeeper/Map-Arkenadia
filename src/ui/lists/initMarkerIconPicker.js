// src/ui/lists/initMarkerIconPicker.js
import { openMarkerPopup } from './openMarkerPopup';
import { renderMarkerList } from './renderMarkerList';
import { MARKER_ICONS } from '@/config';
import { getMarkerById } from '@/features/markers';
import { saveUserData } from '@/services/storage';
import { session } from '@/state';
import { byId, createEl } from '@/utils';

/** Crea los botones de icono del editor de marcador. */
export function initMarkerIconPicker() {
  for (const [i, ic] of MARKER_ICONS.entries()) {
    const b = createEl('button', ic[0]);
    b.dataset.i = i;
    b.setAttribute('aria-label', 'Icono ' + (i + 1));
    b.onclick = () => {
      const m = getMarkerById(session.selectedMarkerId);
      if (!m) return;
      m.i = i;
      saveUserData();
      renderMarkerList();
      openMarkerPopup(m.id);
    };
    byId('pIcons').appendChild(b);
  }
}
