// src/ui/lists/openMarkerPopup.js
import { getMarkerById } from '@/features/markers';
import { session } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { byId } from '@/utils';

/** Abre el editor del marcador. */
export function openMarkerPopup(id) {
  const m = getMarkerById(id);
  if (!m) return;
  session.selectedMarkerId = id;
  byId('pName').value = m.n;
  byId('pNote').value = m.t;
  for (const b of byId('pIcons').children)
    b.setAttribute('aria-pressed', String(+b.dataset.i === m.i));
  byId('pop').hidden = false;
  requestRedraw();
}
