// @ts-check
// src/features/shortcuts/setShortcutBinding.js
import { bindingsEqual } from './bindingsEqual';
import { getShortcutBinding } from './getShortcutBinding';
import { DEFAULT_SHORTCUTS } from '@/config';
import { saveShortcuts } from '@/services/storage';
import { session } from '@/state';

/**
 * Cambia la combinación de un atajo. Rechaza combinaciones ya usadas por otro atajo.
 * @param {string} id
 * @param {{ key: string, ctrl?: boolean, shift?: boolean }} binding
 * @returns {{ ok: true } | { ok: false, conflictId: string }}
 */
export function setShortcutBinding(id, binding) {
  for (const s of DEFAULT_SHORTCUTS) {
    if (s.id === id) continue;
    const other = getShortcutBinding(s.id);
    if (other && bindingsEqual(binding, other)) return { ok: false, conflictId: s.id };
  }
  const def = DEFAULT_SHORTCUTS.find((s) => s.id === id);
  if (def && bindingsEqual(binding, { key: def.key, ctrl: def.ctrl, shift: def.shift })) delete session.shortcuts[id];
  else session.shortcuts[id] = { key: binding.key, ctrl: !!binding.ctrl, shift: !!binding.shift };
  saveShortcuts();
  return { ok: true };
}
