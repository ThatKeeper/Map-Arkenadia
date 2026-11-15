// src/ui/panels/requestRoleSwitch.js
import { hasPin, setRole, switchToDm } from '@/features/roles';
import { session } from '@/state';
import { openPinDialog } from '@/ui/lists';

/** Alterna entre modo DM y jugador. Para entrar como DM pide el PIN si hay uno. */
export function requestRoleSwitch() {
  if (session.role === 'dm') return setRole('jugador');
  if (hasPin()) return openPinDialog('unlock');
  switchToDm();
}
