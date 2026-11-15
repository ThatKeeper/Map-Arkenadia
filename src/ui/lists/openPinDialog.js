// src/ui/lists/openPinDialog.js
import { PIN_WARNING } from '@/config';
import { interaction } from '@/state';
import { byId } from '@/utils';

const TITLES = {
  unlock: 'Entrar en modo DM',
  set: 'Poner PIN del DM',
  change: 'Cambiar PIN del DM',
  remove: 'Quitar PIN del DM',
};

/**
 * Abre el diálogo de PIN en uno de sus modos: 'unlock' (pedir PIN), 'set' (poner), 'change' (cambiar) o 'remove' (quitar).
 * @param {'unlock'|'set'|'change'|'remove'} mode
 */
export function openPinDialog(mode) {
  interaction.pinMode = mode;
  byId('pinTitle').textContent = TITLES[mode];
  byId('pinWarn').textContent = PIN_WARNING;
  byId('pinCur').hidden = !(mode === 'unlock' || mode === 'change' || mode === 'remove');
  byId('pinNew').hidden = !(mode === 'set' || mode === 'change');
  byId('pinRep').hidden = !(mode === 'set' || mode === 'change');
  for (const id of ['pinCur', 'pinNew', 'pinRep']) byId(id).value = '';
  byId('pinMsg').textContent = '';
  byId('pind').hidden = false;
  (byId('pinCur').hidden ? byId('pinNew') : byId('pinCur')).focus();
}
