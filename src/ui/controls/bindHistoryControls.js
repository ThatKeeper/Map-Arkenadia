// src/ui/controls/bindHistoryControls.js
import { doRedo, doUndo } from '@/ui/events';
import { refreshAfterFilterChange, refreshAfterUserDataChange, updateHistoryButtons } from '@/ui/panels';
import { byId, on } from '@/utils';

/** Conecta deshacer/rehacer y reacciona a los eventos de datos, filtros e historial. */
export function bindHistoryControls() {
  byId('undo').onclick = doUndo;
  byId('redo').onclick = doRedo;
  on('userdata:changed', refreshAfterUserDataChange);
  on('filters:changed', refreshAfterFilterChange);
  on('history:changed', updateHistoryButtons);
  updateHistoryButtons();
}
