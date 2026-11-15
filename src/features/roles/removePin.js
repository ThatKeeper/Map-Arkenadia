// @ts-check
// src/features/roles/removePin.js
import { verifyPin } from './verifyPin';
import { savePin } from '@/services/storage';
import { session } from '@/state';

/**
 * Quita el PIN del DM (hay que dar el actual).
 * @param {string} currentPin
 * @returns {{ ok: boolean }}
 */
export function removePin(currentPin) {
  if (!verifyPin(currentPin)) return { ok: false };
  session.pin = null;
  savePin();
  return { ok: true };
}
