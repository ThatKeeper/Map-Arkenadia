// src/ui/controls/bindMarkerListControls.js
import { saveUserData } from '@/services/storage';
import { session } from '@/state';
import { closeMarkerPopup, renderMarkerList } from '@/ui/lists';
import { byId } from '@/utils';

/** Conecta el botón de borrar marcadores. */
export function bindMarkerListControls() {
  byId('mClear').onclick = () => {
    if (session.userData.markers.length && confirm('¿Borrar todos los marcadores?')) {
      session.userData.markers = [];
      saveUserData();
      renderMarkerList();
      closeMarkerPopup();
    }
  };
}
