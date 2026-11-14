// src/ui/events/onPointerDown.js
import { activePointers, dom, interaction } from '@/state';
import { closeDock } from '@/ui/panels';

/** Inicio de arrastre o gesto táctil. */
export function onPointerDown(e) {
  dom.view.setPointerCapture(e.pointerId);
  activePointers.set(e.pointerId, [e.clientX, e.clientY]);
  dom.view.classList.add('drag');
  interaction.lastPinchDistance = 0;
  if (innerWidth < 700) closeDock();
  if (activePointers.size === 1)
    interaction.tapCandidate = { x: e.clientX, y: e.clientY, t: performance.now(), multi: false };
  else if (interaction.tapCandidate) interaction.tapCandidate.multi = true;
}
