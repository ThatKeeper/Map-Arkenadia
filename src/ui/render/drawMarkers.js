// src/ui/render/drawMarkers.js
import { drawMarkersOn } from './drawMarkersOn';
import { getVisibleMarkers } from '@/features/markers';
import { worldToScreen } from '@/features/navigation';
import { dom, session, viewport } from '@/state';

/** Dibuja los marcadores visibles (según rol y filtro de categorías) con su icono de tinta. */
export function drawMarkers(P) {
  if (!session.viewOptions.markers) return;
  const colors = new Map(session.userData.categories.map((c) => [c.id, c.color]));
  drawMarkersOn(
    { ctx: dom.ctx, toScreen: worldToScreen, width: viewport.width, height: viewport.height },
    P,
    getVisibleMarkers(),
    colors,
    session.paletteMode,
    session.selectedMarkerId,
  );
}
