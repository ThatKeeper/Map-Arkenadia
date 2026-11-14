// @ts-check
// src/features/history/executeCommand.js
import { history } from '@/state';
import { emit } from '@/utils';

/**
 * Ejecuta un comando y lo apunta en la pila de deshacer.
 * Si trae `groupKey` igual al del comando anterior y es reciente (p. ej. un arrastre o teclear un nombre),
 * se fusionan: deshacer vuelve al estado previo al primero de la serie.
 * @param {import('../../types').Command} cmd
 */
export function executeCommand(cmd) {
  cmd.do();
  const now = performance.now();
  const last = history.undo[history.undo.length - 1];
  if (
    cmd.groupKey &&
    last &&
    last.groupKey === cmd.groupKey &&
    now - (last.t || 0) <= history.mergeWindowMs
  ) {
    last.do = cmd.do;
    last.label = cmd.label;
    last.t = now;
  } else {
    history.undo.push({ ...cmd, t: now });
    if (history.undo.length > history.limit) history.undo.shift();
  }
  history.redo.length = 0;
  emit('history:changed');
}
