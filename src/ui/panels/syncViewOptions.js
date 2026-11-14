// src/ui/panels/syncViewOptions.js
import { dom, session } from '@/state';

/** Sincroniza las casillas de vista y la visibilidad del minimapa. */
export function syncViewOptions() {
  dom.mini.hidden = !session.viewOptions.mini;
  for (const i of document.querySelectorAll('#dock input[data-v]'))
    i.checked = !!session.viewOptions[i.dataset.v];
}
