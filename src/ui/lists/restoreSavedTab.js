// src/ui/lists/restoreSavedTab.js
import { setTab } from '@/ui/panels';

/** Restaura la última pestaña abierta. */
export function restoreSavedTab() {
  let t0 = 'ver';
  try {
    t0 = sessionStorage.getItem('mapaTab') || 'ver';
  } catch (e) {}
  setTab(t0);
}
