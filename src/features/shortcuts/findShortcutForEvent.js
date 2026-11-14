// @ts-check
// src/features/shortcuts/findShortcutForEvent.js
import { bindingFromEvent } from './bindingFromEvent';
import { bindingsEqual } from './bindingsEqual';
import { getShortcutBinding } from './getShortcutBinding';
import { DEFAULT_SHORTCUTS } from '@/config';

/**
 * Id del atajo que corresponde a una pulsación, o null. Con Alt no se activa ninguno.
 * @param {KeyboardEvent} e
 * @returns {string|null}
 */
export function findShortcutForEvent(e) {
  if (e.altKey) return null;
  const pressed = bindingFromEvent(e);
  for (const s of DEFAULT_SHORTCUTS) {
    const b = getShortcutBinding(s.id);
    if (b && bindingsEqual(pressed, b)) return s.id;
  }
  return null;
}
