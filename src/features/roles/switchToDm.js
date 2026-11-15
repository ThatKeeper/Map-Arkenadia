// @ts-check
// src/features/roles/switchToDm.js
import { setRole } from './setRole';
import { verifyPin } from './verifyPin';
import { session } from '@/state';

/**
 * Pasa a modo DM. Si hay PIN, hay que darlo.
 * @param {string} [pin]
 * @returns {{ ok: true } | { ok: false, reason: 'pin' | 'incorrecto' }}
 */
export function switchToDm(pin) {
  if (session.pin) {
    if (pin === undefined || pin === '') return { ok: false, reason: 'pin' };
    if (!verifyPin(pin)) return { ok: false, reason: 'incorrecto' };
  }
  setRole('dm');
  return { ok: true };
}
