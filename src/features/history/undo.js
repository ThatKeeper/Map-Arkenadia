// @ts-check
// src/features/history/undo.js
import { history } from '@/state';
import { emit } from '@/utils';

/**
 * Deshace el último comando.
 * @returns {string|null} su texto, o null si no había nada que deshacer
 */
export function undo() {
  const cmd = history.undo.pop();
  if (!cmd) return null;
  cmd.undo();
  history.redo.push(cmd);
  emit('history:changed');
  return cmd.label;
}
