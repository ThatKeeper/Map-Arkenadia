// src/ui/events/finishLabelDrag.js
import { dom, interaction } from '@/state';
import { openLabelPopup } from '@/ui/lists';

/**
 * Termina el arrastre de etiqueta; si apenas se movió, cuenta como un toque y abre su editor.
 * @param {PointerEvent} e
 */
export function finishLabelDrag(e) {
  const d = interaction.dragLabel;
  interaction.dragLabel = null;
  if (dom.view.hasPointerCapture && dom.view.hasPointerCapture(e.pointerId))
    dom.view.releasePointerCapture(e.pointerId);
  if (d && !d.moved) openLabelPopup(d.id);
}
