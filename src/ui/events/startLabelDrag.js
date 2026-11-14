// src/ui/events/startLabelDrag.js
import { findLabelAt } from '@/features/labels';
import { dom, interaction, session, viewport } from '@/state';

/**
 * Si con la herramienta de etiquetas se pulsa sobre una etiqueta, empieza a arrastrarla.
 * @param {PointerEvent} e
 * @returns {boolean} true si se empezó un arrastre de etiqueta
 */
export function startLabelDrag(e) {
  if (session.activeTool !== 'labels') return false;
  const r = dom.view.getBoundingClientRect(),
    cx = e.clientX - r.left,
    cy = e.clientY - r.top,
    l = findLabelAt(cx, cy);
  if (!l) return false;
  dom.view.setPointerCapture(e.pointerId);
  interaction.dragLabel = {
    id: l.id,
    dx: l.x - (cx - viewport.panX) / viewport.scale,
    dy: l.y - (cy - viewport.panY) / viewport.scale,
    sx: e.clientX,
    sy: e.clientY,
    moved: false,
  };
  return true;
}
