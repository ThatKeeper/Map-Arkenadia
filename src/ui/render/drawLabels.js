// src/ui/render/drawLabels.js
import { drawLabelsOn } from './drawLabelsOn';
import { getVisibleLabels } from '@/features/labels';
import { dom, session, viewport } from '@/state';

/** Dibuja nombres de lugares y notas (los visibles para el rol, con los cambios del usuario). */
export function drawLabels(P, vx0, vy0, vx1, vy1) {
  const editing = session.activeTool === 'labels';
  drawLabelsOn(dom.ctx, P, getVisibleLabels(), viewport.scale, [vx0, vy0, vx1, vy1], editing ? session.selectedLabelId : null);
}
