// @ts-check
// src/features/shortcuts/formatBinding.js

const KEY_NAMES = { ' ': 'Espacio', escape: 'Esc', arrowup: '↑', arrowdown: '↓', arrowleft: '←', arrowright: '→' };

/**
 * Texto legible de una combinación ("Ctrl+Mayús+Z").
 * @param {{ key: string, ctrl?: boolean, shift?: boolean }|null} b
 */
export function formatBinding(b) {
  if (!b) return '';
  const mac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform || '');
  const k = KEY_NAMES[b.key] || (b.key.length === 1 ? b.key.toUpperCase() : b.key);
  return [b.ctrl ? (mac ? '⌘' : 'Ctrl') : '', b.shift ? 'Mayús' : '', k].filter(Boolean).join('+');
}
