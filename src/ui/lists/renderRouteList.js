// src/ui/lists/renderRouteList.js
import { flyTo } from '@/features/navigation';
import { computeRouteStats, formatDistance } from '@/features/route';
import { saveUserData } from '@/services/storage';
import { session, viewport } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { byId, createEl } from '@/utils';

/** Redibuja la lista de puntos de la ruta y su resumen. */
export function renderRouteList() {
  const R = session.userData.route,
    st = computeRouteStats(),
    ul = byId('rList');
  ul.textContent = '';
  let cum = 0;
  R.forEach((p, i) => {
    if (i) cum += st.legs[i - 1].d;
    const li = createEl('li'),
      b = createEl(
        'button',
        i +
          1 +
          '. ' +
          (p.n || 'Punto') +
          (i ? '  +' + formatDistance(st.legs[i - 1].d) + ' · ' + formatDistance(cum) : ''),
      );
    b.onclick = () => flyTo(p.x, p.y, Math.max(viewport.targetScale, viewport.fitScale * 2));
    const x = createEl('button', '✕');
    x.setAttribute('aria-label', 'Quitar punto ' + (i + 1));
    x.onclick = () => {
      R.splice(i, 1);
      saveUserData();
      renderRouteList();
      requestRedraw();
    };
    li.append(b, x);
    ul.appendChild(li);
  });
  byId('rSum').textContent =
    R.length > 1
      ? 'Total: ' +
        formatDistance(st.tot) +
        ' ' +
        session.userData.unit +
        ' · tierra ' +
        formatDistance(st.land) +
        ' · mar ' +
        formatDistance(st.sea)
      : R.length
        ? 'Añade otro punto para medir.'
        : 'Añade al menos dos puntos.';
  byId('scale').value = session.userData.scale;
  byId('unit').value = session.userData.unit;
}
