// src/ui/panels/handleMapTap.js
import { showBiomeTip } from './showBiomeTip';
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { addMarker, findMarkerAt } from '@/features/markers';
import { saveUserData } from '@/services/storage';
import { dom, session, viewport } from '@/state';
import { openMarkerPopup, renderRouteList } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';

/** Gestiona un toque o clic simple sobre el mapa. */
export function handleMapTap(e) {
  const r = dom.view.getBoundingClientRect(),
    cx = e.clientX - r.left,
    cy = e.clientY - r.top,
    wx = (cx - viewport.panX) / viewport.scale,
    wy = (cy - viewport.panY) / viewport.scale;
  if (wx < 0 || wy < 0 || wx > WORLD_WIDTH || wy > WORLD_HEIGHT) return;
  const hit = findMarkerAt(cx, cy);
  if (session.activeTool === 'route') {
    session.userData.route.push(
      hit ? { x: hit.x, y: hit.y, n: hit.n } : { x: Math.round(wx), y: Math.round(wy), n: '' },
    );
    saveUserData();
    renderRouteList();
    requestRedraw();
    return;
  }
  if (session.activeTool === 'marker' && !hit) {
    addMarker(wx, wy);
    return;
  }
  if (hit) {
    openMarkerPopup(hit.id);
    return;
  }
  showBiomeTip(cx, cy, wx, wy, true);
}
