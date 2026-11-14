// src/ui/events/doRedo.js
import { redo } from '@/features/history';
import { showToast } from '@/ui/panels';

/** Rehace la última acción deshecha y lo avisa. */
export function doRedo() {
  const label = redo();
  showToast(label ? 'Rehecho: ' + label : 'No hay nada que rehacer');
}
