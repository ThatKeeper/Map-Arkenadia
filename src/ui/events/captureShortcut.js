// src/ui/events/captureShortcut.js
import { bindingFromEvent, setShortcutBinding } from '@/features/shortcuts';
import { interaction } from '@/state';
import { renderShortcutHelp } from '@/ui/lists';
import { showToast, syncShortcutTooltips } from '@/ui/panels';
import { DEFAULT_SHORTCUTS } from '@/config';

const MODIFIERS = ['control', 'shift', 'alt', 'meta', 'altgraph', 'capslock'];

/**
 * Atiende una pulsación mientras el diálogo de ayuda espera una combinación nueva.
 * @param {KeyboardEvent} e
 */
export function captureShortcut(e) {
  e.preventDefault();
  if (e.key === 'Escape') interaction.captureShortcut = null;
  else if (!MODIFIERS.includes(e.key.toLowerCase())) {
    const res = setShortcutBinding(/** @type {string} */ (interaction.captureShortcut), bindingFromEvent(e));
    if (res.ok) {
      interaction.captureShortcut = null;
      syncShortcutTooltips();
    } else {
      const other = DEFAULT_SHORTCUTS.find((s) => s.id === res.conflictId);
      showToast('Esa combinación ya la usa «' + (other ? other.nombre : '') + '»');
      return;
    }
  } else return;
  renderShortcutHelp();
}
