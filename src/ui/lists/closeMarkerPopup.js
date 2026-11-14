// src/ui/lists/closeMarkerPopup.js
import { session } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/** Cierra el editor de marcador. */
export function closeMarkerPopup() {
  byId('pop').hidden = true;
  session.selectedMarkerId = null;
  requestRedraw();
}
