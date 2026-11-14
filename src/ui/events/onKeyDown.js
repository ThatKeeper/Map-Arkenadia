// src/ui/events/onKeyDown.js
import { resetView, zoomBy } from '@/features/navigation';
import { loop, session, viewport } from '@/state';
import { closeMarkerPopup } from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { closeDock, setTool } from '@/ui/panels';
import { byId } from '@/utils';

/** Atajos de teclado (zoom, flechas, Escape). */
export function onKeyDown(e) {
  if (e.key === 'Escape') {
    if (!byId('pop').hidden) closeMarkerPopup();
    else if (session.activeTool) setTool(null);
    else closeDock();
    return;
  }
  if (e.target.closest && e.target.closest('#dock,#pop')) return;
  if (e.key === '+' || e.key === '=') zoomBy(1.3);
  else if (e.key === '-' || e.key === '_') zoomBy(1 / 1.3);
  else if (e.key === '0') resetView();
  else if (e.key.startsWith('Arrow')) {
    const d = 60,
      m = { ArrowLeft: [d, 0], ArrowRight: [-d, 0], ArrowUp: [0, d], ArrowDown: [0, -d] }[e.key];
    if (m) {
      viewport.panX += m[0];
      viewport.panY += m[1];
      viewport.anchorWorldX = (viewport.anchorX - viewport.panX) / viewport.scale;
      viewport.anchorWorldY = (viewport.anchorY - viewport.panY) / viewport.scale;
      loop.lastWheel = performance.now();
      requestRedraw();
    }
  }
}
