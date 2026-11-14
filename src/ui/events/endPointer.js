// src/ui/events/endPointer.js
import { activePointers, dom, interaction } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Fin de un puntero. */
export function endPointer(e) {
  activePointers.delete(e.pointerId);
  interaction.lastPinchDistance = 0;
  if (!activePointers.size) dom.view.classList.remove('drag');
  requestRedraw();
}
