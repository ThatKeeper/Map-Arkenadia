// src/ui/panels/syncRoleUi.js
import { PIN_WARNING } from '@/config';
import { hasPin } from '@/features/roles';
import { session } from '@/state';
import { byId } from '@/utils';

/** Pone al día todo lo que depende del rol: píldora, franja roja del DM, botones y textos del PIN. */
export function syncRoleUi() {
  const dm = session.role === 'dm',
    btn = byId('roleBtn');
  document.body.classList.toggle('dm-mode', dm);
  document.body.classList.toggle('player-mode', !dm);
  btn.className = dm ? 'role-dm' : 'role-pl';
  btn.textContent = dm ? 'Modo DM' : 'Jugador';
  btn.dataset.baseTitle = dm
    ? 'Modo DM activo: se ve todo lo oculto. Pulsa para pasar a modo jugador'
    : 'Modo jugador activo. Pulsa para pasar a modo DM';
  btn.setAttribute('aria-label', btn.dataset.baseTitle);
  btn.title = btn.dataset.baseTitle;
  byId('roleBar').textContent = dm ? 'MODO DM · se ve lo oculto · no compartas pantalla' : '';
  byId('expPlayers').hidden = !dm;
  byId('catNew').hidden = !dm;
  byId('lRestore').disabled = !dm;
  byId('roleDesc').textContent = dm
    ? 'Ahora eres el DM: ves todo, incluidos los elementos y notas ocultos. Antes de compartir pantalla, pasa a modo jugador.'
    : 'Ahora eres jugador: solo ves lo permitido y solo editas lo tuyo («Solo yo»).';
  byId('roleToggle').textContent = dm ? 'Pasar a modo jugador' : 'Pasar a modo DM';
  byId('pinSet').textContent = hasPin() ? 'Cambiar PIN' : 'Poner PIN';
  byId('pinSet').disabled = !dm;
  byId('pinRemove').hidden = !hasPin();
  byId('pinRemove').disabled = !dm;
  byId('pinInfo').textContent = PIN_WARNING + (dm ? '' : ' Para cambiar el PIN, entra primero en modo DM.');
}
