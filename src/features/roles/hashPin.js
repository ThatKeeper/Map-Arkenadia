// @ts-check
// src/features/roles/hashPin.js
import { sha256Hex } from './sha256Hex';

/**
 * Hash de un PIN con sal (1000 vueltas de SHA-256). Es una protección ligera, no seguridad real.
 * @param {string} pin
 * @param {string} salt
 */
export function hashPin(pin, salt) {
  let h = sha256Hex(`${salt}:${pin}`);
  for (let i = 0; i < 1000; i++) h = sha256Hex(h + salt);
  return h;
}
