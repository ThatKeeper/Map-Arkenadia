// @ts-check
// src/services/storage/loadShortcuts.js
import { DEFAULT_SHORTCUTS } from '@/config';
import { session } from '@/state';
import { readStoredJson } from '@/utils';

/** Carga los atajos personalizados (solo los de atajos conocidos y con tecla válida). */
export function loadShortcuts() {
  const j = readStoredJson('mapaAtajos') || {};
  const ids = new Set(DEFAULT_SHORTCUTS.map((s) => s.id));
  /** @type {typeof session.shortcuts} */
  const out = {};
  for (const id of Object.keys(j)) {
    const b = j[id];
    if (ids.has(id) && b && typeof b.key === 'string' && b.key.length >= 1 && b.key.length <= 12)
      out[id] = { key: b.key.toLowerCase(), ctrl: !!b.ctrl, shift: !!b.shift };
  }
  session.shortcuts = out;
}
