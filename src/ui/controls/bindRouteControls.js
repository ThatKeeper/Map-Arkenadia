// src/ui/controls/bindRouteControls.js
import { clearRoute, removeLastRoutePoint, reverseRoute } from '@/features/route';
import { saveUserData } from '@/services/storage';
import { session } from '@/state';
import { renderRouteList } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { toastWithUndo } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta los controles de ruta (con deshacer), escala y unidad. */
export function bindRouteControls() {
  byId('rUndo').onclick = removeLastRoutePoint;
  byId('rRev').onclick = reverseRoute;
  byId('rClear').onclick = () => {
    if (!session.userData.route.length) return;
    clearRoute();
    toastWithUndo('Ruta borrada');
  };
  byId('scale').onchange = (e) => {
    const v = parseFloat(e.target.value);
    if (v > 0 && v < 1e6) {
      session.userData.scale = v;
      saveUserData();
      renderRouteList();
      requestRedraw();
    } else e.target.value = session.userData.scale;
  };
  byId('unit').onchange = (e) => {
    session.userData.unit = e.target.value;
    saveUserData();
    renderRouteList();
    requestRedraw();
  };
}
