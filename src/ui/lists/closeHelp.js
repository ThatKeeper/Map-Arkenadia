// src/ui/lists/closeHelp.js
import { interaction } from '@/state';
import { byId } from '@/utils';

/** Cierra el diálogo de atajos (y cancela una captura en curso). */
export function closeHelp() {
  interaction.captureShortcut = null;
  byId('helpd').hidden = true;
}
