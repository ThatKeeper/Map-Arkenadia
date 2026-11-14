// src/ui/lists/renderMarkerList.js
import { openMarkerPopup } from './openMarkerPopup';
import { LABELS, MARKER_ICONS } from '@/config';
import { flyTo } from '@/features/navigation';
import { session, viewport } from '@/state';
import { byId, createEl } from '@/utils';

/** Redibuja la lista de marcadores y las sugerencias de búsqueda. */
export function renderMarkerList() {
  const ul = byId('mList');
  ul.textContent = '';
  if (!session.userData.markers.length)
    ul.appendChild(createEl('li', 'Aún no hay marcadores.', 'empty'));
  for (const m of session.userData.markers) {
    const li = createEl('li'),
      b = createEl('button', MARKER_ICONS[m.i][0] + ' ' + m.n);
    b.onclick = () => {
      flyTo(m.x, m.y, Math.max(viewport.targetScale, viewport.fitScale * 2.5));
      openMarkerPopup(m.id);
    };
    li.appendChild(b);
    ul.appendChild(li);
  }
  const dl = byId('places');
  dl.textContent = '';
  const seen = new Set();
  for (const l of LABELS)
    if (l[3] !== 'n' && !seen.has(l[0])) {
      seen.add(l[0]);
      const o = document.createElement('option');
      o.value = l[0];
      dl.appendChild(o);
    }
  for (const m of session.userData.markers)
    if (!seen.has(m.n)) {
      seen.add(m.n);
      const o = document.createElement('option');
      o.value = m.n;
      dl.appendChild(o);
    }
}
