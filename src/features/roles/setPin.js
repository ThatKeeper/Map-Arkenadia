// @ts-check
// src/features/roles/setPin.js
import { createSalt } from './createSalt';
import { hashPin } from './hashPin';
import { isValidPin } from './isValidPin';
import { verifyPin } from './verifyPin';
import { savePin } from '@/services/storage';
import { session } from '@/state';

/**
 * Pone o cambia el PIN del DM. Si ya había uno, hay que dar el actual.
 * @param {string} newPin
 * @param {string} [currentPin]
 * @returns {{ ok: true } | { ok: false, reason: 'formato' | 'actual' }}
 */
export function setPin(newPin, currentPin = '') {
  if (!isValidPin(newPin)) return { ok: false, reason: 'formato' };
  if (session.pin && !verifyPin(currentPin)) return { ok: false, reason: 'actual' };
  const salt = createSalt();
  session.pin = { salt, hash: hashPin(newPin, salt) };
  savePin();
  return { ok: true };
}
