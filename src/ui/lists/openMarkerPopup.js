// src/ui/lists/openMarkerPopup.js
import { renderIconGrid } from './renderIconGrid';
import { getMarkerById, getKnownMarkerNames, updateMarker } from '@/features/markers';
import { session } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { byId, createEl } from '@/utils';

/**
 * Abre (o refresca) el editor del marcador. Los campos con el foco no se tocan,
 * para no interrumpir lo que el usuario está escribiendo.
 * @param {number} id
 * @param {boolean} [onlyIcons] solo repinta la cuadrícula de iconos
 */
export function openMarkerPopup(id, onlyIcons = false) {
  const m = getMarkerById(id);
  if (!m) return;
  session.selectedMarkerId = id;
  const focused = document.activeElement;
  renderIconGrid(byId('pIcons'), byId('pIconQ').value, m.icono, (icono) =>
    updateMarker(id, { icono }, `marcador:${id}:icono`),
  );
  if (!onlyIcons) {
    if (focused !== byId('pName')) byId('pName').value = m.nombre;
    if (focused !== byId('pNote')) byId('pNote').value = m.nota;
    const sel = byId('pCat');
    sel.textContent = '';
    for (const c of session.userData.categories) {
      const o = createEl('option', c.nombre);
      o.value = c.id;
      sel.appendChild(o);
    }
    sel.value = m.categoria;
    byId('pVis').value = m.visibilidad;
    const dl = byId('pNames');
    dl.textContent = '';
    for (const n of getKnownMarkerNames()) {
      const o = document.createElement('option');
      o.value = n;
      dl.appendChild(o);
    }
  }
  byId('pop').hidden = false;
  requestRedraw();
}
