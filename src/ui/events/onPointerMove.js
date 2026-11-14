// src/ui/events/onPointerMove.js
import { moveLabelDrag } from './moveLabelDrag';
import { clampZoom, setZoomAnchor } from '@/features/navigation';
import { activePointers, dom, interaction, viewport } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Arrastre con un puntero o pellizco con dos. */
export function onPointerMove(e) {
  if (interaction.dragLabel) return moveLabelDrag(e);
  if (!activePointers.has(e.pointerId)) return;
  const o = activePointers.get(e.pointerId);
  if (activePointers.size === 1) {
    viewport.panX += e.clientX - o[0];
    viewport.panY += e.clientY - o[1];
    activePointers.set(e.pointerId, [e.clientX, e.clientY]);
    viewport.anchorWorldX = (viewport.anchorX - viewport.panX) / viewport.scale;
    viewport.anchorWorldY = (viewport.anchorY - viewport.panY) / viewport.scale;
    requestRedraw();
  } else {
    activePointers.set(e.pointerId, [e.clientX, e.clientY]);
    const [a, b] = [...activePointers.values()],
      d = Math.hypot(a[0] - b[0], a[1] - b[1]),
      r = dom.view.getBoundingClientRect();
    if (interaction.lastPinchDistance) {
      viewport.targetScale = clampZoom((viewport.targetScale * d) / interaction.lastPinchDistance);
      setZoomAnchor((a[0] + b[0]) / 2 - r.left, (a[1] + b[1]) / 2 - r.top);
    }
    interaction.lastPinchDistance = d;
    requestRedraw();
  }
}
