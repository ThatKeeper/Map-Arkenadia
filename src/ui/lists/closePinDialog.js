// src/ui/lists/closePinDialog.js
import { interaction } from '@/state';
import { byId } from '@/utils';

/** Cierra el diálogo de PIN y borra lo escrito. */
export function closePinDialog() {
  interaction.pinMode = null;
  for (const id of ['pinCur', 'pinNew', 'pinRep']) byId(id).value = '';
  byId('pind').hidden = true;
}
