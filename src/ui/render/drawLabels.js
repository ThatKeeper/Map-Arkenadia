// src/ui/render/drawLabels.js
import { drawLabel } from './drawLabel';
import { getEffectiveLabels } from '@/features/labels';
import { dom, session, viewport } from '@/state';

/** Dibuja nombres de lugares y notas (originales con los cambios del usuario, y propias). */
export function drawLabels(P, vx0, vy0, vx1, vy1) {
  dom.ctx.textBaseline = 'middle';
  dom.ctx.textAlign = 'left';
  dom.ctx.lineJoin = 'round';
  const editing = session.activeTool === 'labels';
  for (const l of getEffectiveLabels()) {
    if (viewport.scale < l.minZoom) continue;
    if (l.x < vx0 - 300 || l.x > vx1 + 300 || l.y < vy0 - 100 || l.y > vy1 + 100) continue;
    const selected = editing && l.id === session.selectedLabelId ? l : undefined;
    drawLabel(P, l.texto, l.x, l.y, l.tipo, l.minZoom, l.rot, selected, l.tam);
  }
}
