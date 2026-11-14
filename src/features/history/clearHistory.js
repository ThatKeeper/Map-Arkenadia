// @ts-check
// src/features/history/clearHistory.js
import { history } from '@/state';
import { emit } from '@/utils';

/** Vacía las pilas de deshacer y rehacer (p. ej. tras importar datos). */
export function clearHistory() {
  history.undo.length = 0;
  history.redo.length = 0;
  emit('history:changed');
}
