// src/ui/panels/closeDock.js
import { byId } from '@/utils';

/** Cierra el panel de herramientas. */
export function closeDock() {
  byId('dock').hidden = true;
  byId('mnu').setAttribute('aria-expanded', 'false');
}
