// src/ui/controls/bindHelpControls.js
import { resetShortcuts } from '@/features/shortcuts';
import { interaction } from '@/state';
import { closeHelp, openHelp, renderShortcutHelp } from '@/ui/lists';
import { syncShortcutTooltips } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta el botón «?» y el diálogo de atajos (cambiar, restaurar, cerrar). */
export function bindHelpControls() {
  byId('helpBtn').onclick = openHelp;
  byId('helpOk').onclick = closeHelp;
  byId('helpReset').onclick = () => {
    resetShortcuts();
    interaction.captureShortcut = null;
    renderShortcutHelp();
    syncShortcutTooltips();
  };
  byId('helpList').onclick = (e) => {
    const b = e.target.closest('button[data-id]');
    if (!b) return;
    interaction.captureShortcut = interaction.captureShortcut === b.dataset.id ? null : b.dataset.id;
    renderShortcutHelp();
  };
  syncShortcutTooltips();
}
