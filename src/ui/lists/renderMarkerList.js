// src/ui/lists/renderMarkerList.js
import { createIconSvg } from './createIconSvg';
import { openMarkerPopup } from './openMarkerPopup';
import { getCategoryById } from '@/features/categories';
import { getVisibleMarkers } from '@/features/markers';
import { flyTo } from '@/features/navigation';
import { session, viewport } from '@/state';
import { byId, createEl } from '@/utils';

/** Redibuja la lista de marcadores (solo los de categorías visibles). */
export function renderMarkerList() {
  const ul = byId('mList');
  ul.textContent = '';
  const visible = getVisibleMarkers();
  if (!visible.length)
    ul.appendChild(
      createEl(
        'li',
        session.userData.markers.length ? 'Todos los marcadores están filtrados.' : 'Aún no hay marcadores.',
        'empty',
      ),
    );
  for (const m of visible) {
    const li = createEl('li'),
      cat = getCategoryById(m.categoria),
      b = createEl('button');
    b.append(createIconSvg(m.icono), ' ' + m.nombre);
    b.title = cat ? cat.nombre : '';
    b.onclick = () => {
      flyTo(m.x, m.y, Math.max(viewport.targetScale, viewport.fitScale * 2.5));
      openMarkerPopup(m.id);
    };
    li.appendChild(b);
    ul.appendChild(li);
  }
}
