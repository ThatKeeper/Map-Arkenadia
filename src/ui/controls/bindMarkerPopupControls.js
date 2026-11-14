// src/ui/controls/bindMarkerPopupControls.js
import { changeMarkerCategory, getMarkerById, removeMarker, updateMarker } from '@/features/markers';
import { flyTo } from '@/features/navigation';
import { session, viewport } from '@/state';
import { closeMarkerPopup } from '@/ui/lists';
import { toastWithUndo } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta el editor de marcador (cada cambio es una acción que se puede deshacer). */
export function bindMarkerPopupControls() {
  const current = () => getMarkerById(session.selectedMarkerId);
  byId('pName').oninput = (e) => {
    const m = current();
    if (m) updateMarker(m.id, { nombre: e.target.value || 'Marcador' });
  };
  byId('pNote').oninput = (e) => {
    const m = current();
    if (m) updateMarker(m.id, { nota: e.target.value });
  };
  byId('pCat').onchange = (e) => {
    const m = current();
    if (m) changeMarkerCategory(m.id, e.target.value);
  };
  byId('pVis').onchange = (e) => {
    const m = current();
    if (m) updateMarker(m.id, { visibilidad: e.target.value });
  };
  byId('pOk').onclick = closeMarkerPopup;
  byId('pGo').onclick = () => {
    const m = current();
    if (m) flyTo(m.x, m.y, Math.max(viewport.targetScale, viewport.fitScale * 2.5));
  };
  byId('pDel').onclick = () => {
    const m = current();
    if (!m) return;
    removeMarker(m.id);
    closeMarkerPopup();
    toastWithUndo('Marcador borrado');
  };
}
