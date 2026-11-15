// src/ui/lists/submitPinDialog.js
import { closePinDialog } from './closePinDialog';
import { PIN_MAX_LENGTH, PIN_MIN_LENGTH } from '@/config';
import { removePin, setPin, switchToDm } from '@/features/roles';
import { interaction } from '@/state';
import { showToast, syncRoleUi } from '@/ui/panels';
import { byId } from '@/utils';

/** Procesa «Aceptar» del diálogo de PIN según su modo y muestra el resultado. */
export function submitPinDialog() {
  const mode = interaction.pinMode,
    cur = byId('pinCur').value,
    next = byId('pinNew').value,
    rep = byId('pinRep').value,
    msg = (t) => (byId('pinMsg').textContent = t);
  if (mode === 'unlock') {
    const r = switchToDm(cur);
    if (!r.ok) return msg(r.reason === 'pin' ? 'Escribe el PIN.' : 'PIN incorrecto.');
    closePinDialog();
    return;
  }
  if (mode === 'remove') {
    if (!removePin(cur).ok) return msg('PIN actual incorrecto.');
    closePinDialog();
    syncRoleUi();
    return showToast('PIN quitado');
  }
  if (next !== rep) return msg('Los dos PIN nuevos no coinciden.');
  const r = setPin(next, cur);
  if (!r.ok)
    return msg(r.reason === 'formato' ? `El PIN debe tener entre ${PIN_MIN_LENGTH} y ${PIN_MAX_LENGTH} cifras.` : 'PIN actual incorrecto.');
  closePinDialog();
  syncRoleUi();
  showToast(mode === 'set' ? 'PIN puesto. Recuerda: es una protección ligera' : 'PIN cambiado');
}
