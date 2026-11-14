// src/ui/lists/closeLabelPopup.js
import { session } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/** Cierra el editor de etiqueta. */
export function closeLabelPopup() {
  byId('lpop').hidden = true;
  session.selectedLabelId = null;
  requestRedraw();
}
