// src/ui/events/doUndo.js
import { undo } from '@/features/history';
import { showToast } from '@/ui/panels';

/** Deshace la última acción y lo avisa. */
export function doUndo() {
  const label = undo();
  showToast(label ? 'Deshecho: ' + label : 'No hay nada que deshacer');
}
