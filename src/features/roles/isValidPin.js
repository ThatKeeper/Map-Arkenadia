// @ts-check
// src/features/roles/isValidPin.js
import { PIN_MAX_LENGTH, PIN_MIN_LENGTH } from '@/config';

/**
 * Un PIN válido son entre 4 y 8 cifras.
 * @param {unknown} pin
 */
export const isValidPin = (pin) =>
  typeof pin === 'string' && new RegExp(`^\\d{${PIN_MIN_LENGTH},${PIN_MAX_LENGTH}}$`).test(pin);
