// src/ui/lists/openHelp.js
import { renderShortcutHelp } from './renderShortcutHelp';
import { byId } from '@/utils';

/** Abre el diálogo de atajos de teclado. */
export function openHelp() {
  renderShortcutHelp();
  byId('helpd').hidden = false;
}
