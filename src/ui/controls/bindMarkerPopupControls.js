// src/ui/controls/bindMarkerPopupControls.js
import { getMarkerById } from '@/features/markers';
import { flyTo } from '@/features/navigation';
import { saveUserData } from '@/services/storage';
import { session, viewport } from '@/state';
import { closeMarkerPopup, renderMarkerList } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/** Conecta el editor de marcador. */
export function bindMarkerPopupControls() {
  byId('pName').oninput = (e) => {
    const m = getMarkerById(session.selectedMarkerId);
    if (!m) return;
    m.n = e.target.value || 'Marcador';
    saveUserData();
    renderMarkerList();
    requestRedraw();
  };
  byId('pNote').oninput = (e) => {
    const m = getMarkerById(session.selectedMarkerId);
    if (!m) return;
    m.t = e.target.value;
    saveUserData();
  };
  byId('pOk').onclick = closeMarkerPopup;
  byId('pGo').onclick = () => {
    const m = getMarkerById(session.selectedMarkerId);
    if (m) flyTo(m.x, m.y, Math.max(viewport.targetScale, viewport.fitScale * 2.5));
  };
  byId('pDel').onclick = () => {
    session.userData.markers = session.userData.markers.filter(
      (m) => m.id !== session.selectedMarkerId,
    );
    saveUserData();
    renderMarkerList();
    closeMarkerPopup();
  };
}
