// src/ui/controls/bindHoverTip.js
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { findMarkerAt } from '@/features/markers';
import { activePointers, dom, loop, session, viewport } from '@/state';
import { hideBiomeTip, showBiomeTip } from '@/ui/panels';

/** Conecta la etiqueta de bioma bajo el cursor. */
export function bindHoverTip() {
  dom.view.addEventListener('pointermove', (e) => {
    if (
      e.pointerType !== 'mouse' ||
      activePointers.size ||
      !session.viewOptions.hover ||
      !loop.ready ||
      session.activeTool
    ) {
      if (activePointers.size) hideBiomeTip();
      return;
    }
    const r = dom.view.getBoundingClientRect(),
      cx = e.clientX - r.left,
      cy = e.clientY - r.top,
      wx = (cx - viewport.panX) / viewport.scale,
      wy = (cy - viewport.panY) / viewport.scale;
    if (wx < 0 || wy < 0 || wx > WORLD_WIDTH || wy > WORLD_HEIGHT || findMarkerAt(cx, cy)) {
      hideBiomeTip();
      return;
    }
    showBiomeTip(cx, cy, wx, wy, false);
  });
  dom.view.addEventListener('pointerleave', hideBiomeTip);
}
