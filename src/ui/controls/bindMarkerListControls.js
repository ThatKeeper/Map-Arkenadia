// src/ui/controls/bindMarkerListControls.js
import { clearMarkers } from '@/features/markers';
import { session } from '@/state';
import { closeMarkerPopup } from '@/ui/lists';
import { toastWithUndo } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta el botón de borrar marcadores (con confirmación y opción de deshacer). */
export function bindMarkerListControls() {
  byId('mClear').onclick = () => {
    if (session.userData.markers.length && confirm('¿Borrar todos los marcadores?')) {
      clearMarkers();
      closeMarkerPopup();
      toastWithUndo('Marcadores borrados');
    }
  };
}
