// src/ui/controls/bindRouteControls.js
import { saveUserData } from '@/services/storage';
import { session } from '@/state';
import { renderRouteList } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/** Conecta los controles de ruta, escala y unidad. */
export function bindRouteControls() {
  byId('rUndo').onclick = () => {
    session.userData.route.pop();
    saveUserData();
    renderRouteList();
    requestRedraw();
  };
  byId('rRev').onclick = () => {
    session.userData.route.reverse();
    saveUserData();
    renderRouteList();
    requestRedraw();
  };
  byId('rClear').onclick = () => {
    session.userData.route = [];
    saveUserData();
    renderRouteList();
    requestRedraw();
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
