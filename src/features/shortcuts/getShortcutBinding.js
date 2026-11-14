// @ts-check
// src/features/shortcuts/getShortcutBinding.js
import { DEFAULT_SHORTCUTS } from '@/config';
import { session } from '@/state';

/**
 * Combinación activa de un atajo: la personalizada o la de por defecto.
 * @param {string} id
 * @returns {{ key: string, ctrl?: boolean, shift?: boolean }|null}
 */
export function getShortcutBinding(id) {
  if (session.shortcuts[id]) return session.shortcuts[id];
  const d = DEFAULT_SHORTCUTS.find((s) => s.id === id);
  return d ? { key: d.key, ctrl: !!d.ctrl, shift: !!d.shift } : null;
}
