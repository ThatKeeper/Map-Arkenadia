// @ts-check
// src/features/roles/verifyPin.js
import { hashPin } from './hashPin';
import { session } from '@/state';

/**
 * Comprueba un PIN. Sin PIN configurado, cualquier valor vale.
 * @param {string} pin
 */
export function verifyPin(pin) {
  return !session.pin || hashPin(String(pin), session.pin.salt) === session.pin.hash;
}
