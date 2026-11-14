// @ts-check
// src/features/history/redo.js
import { history } from '@/state';
import { emit } from '@/utils';

/**
 * Rehace el último comando deshecho.
 * @returns {string|null} su texto, o null si no había nada que rehacer
 */
export function redo() {
  const cmd = history.redo.pop();
  if (!cmd) return null;
  cmd.do();
  history.undo.push(cmd);
  emit('history:changed');
  return cmd.label;
}
