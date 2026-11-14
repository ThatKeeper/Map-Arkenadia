// src/ui/panels/handleMapTap.js
import { showBiomeTip } from './showBiomeTip';
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { addLabel, findLabelAt } from '@/features/labels';
import { addMarker, findMarkerAt } from '@/features/markers';
import { addRoutePoint } from '@/features/route';
import { dom, session, viewport } from '@/state';
import { openLabelPopup, openMarkerPopup } from '@/ui/lists';

/** Gestiona un toque o clic simple sobre el mapa. */
export function handleMapTap(e) {
  const r = dom.view.getBoundingClientRect(),
    cx = e.clientX - r.left,
    cy = e.clientY - r.top,
    wx = (cx - viewport.panX) / viewport.scale,
    wy = (cy - viewport.panY) / viewport.scale;
  if (wx < 0 || wy < 0 || wx > WORLD_WIDTH || wy > WORLD_HEIGHT) return;
  if (session.activeTool === 'labels') {
    const hitLabel = findLabelAt(cx, cy);
    openLabelPopup(hitLabel ? hitLabel.id : addLabel(wx, wy));
    return;
  }
  const hit = findMarkerAt(cx, cy);
  if (session.activeTool === 'route') {
    addRoutePoint(hit ? { x: hit.x, y: hit.y, n: hit.nombre } : { x: Math.round(wx), y: Math.round(wy), n: '' });
    return;
  }
  if (session.activeTool === 'marker' && !hit) {
    openMarkerPopup(addMarker(wx, wy).id);
    return;
  }
  if (hit) {
    openMarkerPopup(hit.id);
    return;
  }
  showBiomeTip(cx, cy, wx, wy, true);
}
