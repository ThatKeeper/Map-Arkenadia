// @ts-check
// src/features/roles/setRole.js
import { saveRole } from '@/services/storage';
import { session } from '@/state';
import { emit } from '@/utils';

/**
 * Cambia el rol activo, lo guarda y avisa con `role:changed`. No pide PIN: para eso, `switchToDm`.
 * @param {'dm'|'jugador'} role
 */
export function setRole(role) {
  if (session.role === role) return;
  session.role = role;
  saveRole();
  emit('role:changed', { role });
}
