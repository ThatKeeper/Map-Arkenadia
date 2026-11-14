// src/ui/events/onKeyDown.js
import { captureShortcut } from './captureShortcut';
import { runShortcut } from './runShortcut';
import { findShortcutForEvent } from '@/features/shortcuts';
import { interaction, loop, session, viewport } from '@/state';
import {
  closeCategoryPopup,
  closeHelp,
  closeLabelPopup,
  closeMarkerPopup,
} from '@/ui/lists';
import { requestRedraw } from '@/ui/loop';
import { closeDock, setTool } from '@/ui/panels';
import { byId } from '@/utils';

/** Cierra lo último que se abrió con Escape: ayuda, editores, herramienta y por fin el panel. */
function handleEscape() {
  if (!byId('helpd').hidden) closeHelp();
  else if (!byId('pop').hidden) closeMarkerPopup();
  else if (!byId('cpop').hidden) closeCategoryPopup();
  else if (!byId('lpop').hidden) closeLabelPopup();
  else if (session.activeTool) setTool(null);
  else closeDock();
}

/** Desplaza el mapa con las flechas. */
function panWithArrow(key) {
  const d = 60,
    m = { ArrowLeft: [d, 0], ArrowRight: [-d, 0], ArrowUp: [0, d], ArrowDown: [0, -d] }[key];
  if (!m) return;
  viewport.panX += m[0];
  viewport.panY += m[1];
  viewport.anchorWorldX = (viewport.anchorX - viewport.panX) / viewport.scale;
  viewport.anchorWorldY = (viewport.anchorY - viewport.panY) / viewport.scale;
  loop.lastWheel = performance.now();
  requestRedraw();
}

/** Atajos de teclado (configurables), flechas y Escape. */
export function onKeyDown(e) {
  if (interaction.captureShortcut) return captureShortcut(e);
  if (e.key === 'Escape') return handleEscape();
  const target = /** @type {HTMLElement} */ (e.target);
  const inField = !!(target && target.closest && target.closest('input,textarea,select,[contenteditable]'));
  const id = findShortcutForEvent(e);
  if (inField) {
    if (id === 'searchCtrl') {
      e.preventDefault();
      runShortcut(id);
    }
    return;
  }
  if (id) {
    e.preventDefault();
    return runShortcut(id);
  }
  if (e.key.startsWith('Arrow') && !(target.closest && target.closest('#dock,#pop,#cpop,#lpop,#helpd')))
    panWithArrow(e.key);
}
