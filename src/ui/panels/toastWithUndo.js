// src/ui/panels/toastWithUndo.js
import { showToast } from './showToast';
import { undo } from '@/features/history';

/**
 * Aviso de una acción destructiva con botón «Deshacer».
 * @param {string} msg
 */
export function toastWithUndo(msg) {
  showToast(msg, { label: 'Deshacer', onClick: () => undo() });
}
