// src/ui/controls/bindMinimapEvents.js
import { dom, interaction } from '@/state';
import { centerOnMinimapPoint } from '@/ui/events';

/** Conecta el arrastre sobre el minimapa. */
export function bindMinimapEvents() {
  dom.mini.addEventListener('pointerdown', (e) => {
    interaction.miniDragging = true;
    dom.mini.setPointerCapture(e.pointerId);
    centerOnMinimapPoint(e);
  });
  dom.mini.addEventListener('pointermove', (e) => {
    if (interaction.miniDragging) centerOnMinimapPoint(e);
  });
  dom.mini.addEventListener('pointerup', () => (interaction.miniDragging = false));
  dom.mini.addEventListener('pointercancel', () => (interaction.miniDragging = false));
}
