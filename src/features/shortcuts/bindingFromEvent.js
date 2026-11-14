// @ts-check
// src/features/shortcuts/bindingFromEvent.js
import { normalizeKey } from './normalizeKey';

/**
 * Combinación que representa una pulsación de teclado.
 * @param {KeyboardEvent} e
 * @returns {{ key: string, ctrl: boolean, shift: boolean }}
 */
export function bindingFromEvent(e) {
  return { key: normalizeKey(e.key), ctrl: e.ctrlKey || e.metaKey, shift: e.shiftKey };
}
