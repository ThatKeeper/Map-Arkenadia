// src/ui/panels/updateHistoryButtons.js
import { canRedo, canUndo } from '@/features/history';
import { byId } from '@/utils';

/** Activa o desactiva los botones de deshacer y rehacer según las pilas. */
export function updateHistoryButtons() {
  byId('undo').disabled = !canUndo();
  byId('redo').disabled = !canRedo();
}
