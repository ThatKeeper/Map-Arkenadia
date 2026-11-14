// src/ui/events/focusSearch.js
import { openDock, setTab } from '@/ui/panels';
import { byId } from '@/utils';

/** Abre el panel en «Ver» y pone el cursor en el buscador. */
export function focusSearch() {
  openDock();
  setTab('ver');
  const q = byId('q');
  q.focus();
  q.select();
}
