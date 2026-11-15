// src/ui/lists/openMarkerPopup.js
import { renderIconGrid } from './renderIconGrid';
import { canEditVisibility } from '@/features/roles';
import { getKnownMarkerNames, getMarkerById, updateMarker } from '@/features/markers';
import { session } from '@/state';
import { requestRedraw } from '@/ui/loop';
import { byId, createEl } from '@/utils';

/**
 * Abre (o refresca) el editor del marcador. Los campos con el foco no se tocan,
 * para no interrumpir lo que el usuario está escribiendo.
 * En modo jugador, lo compartido por el DM es de solo lectura y nunca se ve la nota privada.
 * @param {number} id
 * @param {boolean} [onlyIcons] solo repinta la cuadrícula de iconos
 */
export function openMarkerPopup(id, onlyIcons = false) {
  const m = getMarkerById(id);
  if (!m) return;
  session.selectedMarkerId = id;
  const focused = document.activeElement,
    editable = canEditVisibility(m.visibilidad),
    dm = session.role === 'dm';
  renderIconGrid(byId('pIcons'), byId('pIconQ').value, m.icono, (icono) => {
    if (editable) updateMarker(id, { icono }, `marcador:${id}:icono`);
  });
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
    byId('pNoteDm').hidden = !dm;
    if (dm && focused !== byId('pNoteDm')) byId('pNoteDm').value = m.notaDm;
  }
  for (const f of ['pName', 'pNote', 'pCat', 'pNoteDm']) byId(f).disabled = !editable;
  byId('pVis').disabled = !dm;
  byId('pDel').hidden = !editable;
  byId('pLock').hidden = editable;
  byId('pop').hidden = false;
  requestRedraw();
}
