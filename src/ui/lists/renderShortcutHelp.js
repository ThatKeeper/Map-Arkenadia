// src/ui/lists/renderShortcutHelp.js
import { DEFAULT_SHORTCUTS } from '@/config';
import { formatBinding, getShortcutBinding } from '@/features/shortcuts';
import { interaction } from '@/state';
import { byId, createEl } from '@/utils';

/** Pinta la lista de atajos agrupada, con botón «Cambiar» (la fila en captura espera una tecla). */
export function renderShortcutHelp() {
  const box = byId('helpList');
  box.textContent = '';
  let group = '';
  for (const s of DEFAULT_SHORTCUTS) {
    if (s.grupo !== group) {
      group = s.grupo;
      box.appendChild(createEl('div', group, 'help-group'));
    }
    const off = s.disponible === false,
      row = createEl('div', null, 'help-row' + (off ? ' off' : '')),
      capturing = interaction.captureShortcut === s.id,
      kbd = createEl('kbd', capturing ? 'Pulsa una tecla…' : formatBinding(getShortcutBinding(s.id))),
      change = createEl('button', capturing ? 'Cancelar' : 'Cambiar');
    change.dataset.id = s.id;
    change.type = 'button';
    row.append(createEl('span', s.nombre + (off ? ' (próximamente)' : '')), kbd, change);
    box.appendChild(row);
  }
}
