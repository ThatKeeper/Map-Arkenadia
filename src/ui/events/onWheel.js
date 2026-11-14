// src/ui/events/onWheel.js
import { clampZoom, setZoomAnchor } from '@/features/navigation';
import { dom, loop, viewport } from '@/state';
import { requestRedraw } from '@/ui/loop';

/** Zoom con la rueda del ratón. */
export function onWheel(e) {
  e.preventDefault();
  loop.lastWheel = performance.now();
  const r = dom.view.getBoundingClientRect(),
    dy = e.deltaY * (e.deltaMode === 1 ? 33 : 1);
  viewport.targetScale = clampZoom(
    viewport.targetScale * Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0015)),
  );
  setZoomAnchor(e.clientX - r.left, e.clientY - r.top);
  requestRedraw();
}
