// src/ui/panels/openDock.js
import { byId } from '@/utils';

/** Abre el panel de herramientas. */
export function openDock() {
  byId('dock').hidden = false;
  byId('mnu').setAttribute('aria-expanded', 'true');
}
