// src/ui/lists/renderCategoryList.js
import { createIconSvg } from './createIconSvg';
import { openCategoryPopup } from './openCategoryPopup';
import { countMarkersByCategory, isCategoryHidden, setCategoryHidden, showOnlyCategory } from '@/features/categories';
import { session } from '@/state';
import { byId, createEl } from '@/utils';

/** Redibuja el panel de categorías: casilla de visibilidad, color, nombre, cantidad, «solo» y editar. */
export function renderCategoryList() {
  const box = byId('catList');
  if (!box) return;
  box.textContent = '';
  const counts = countMarkersByCategory();
  for (const c of session.userData.categories) {
    const row = createEl('div', null, 'cat'),
      cb = createEl('input'),
      sw = createEl('span', null, 'sw'),
      nm = createEl('span', c.nombre, 'nm'),
      n = createEl('em', String(counts[c.id] || 0)),
      only = createEl('button', 'Solo'),
      edit = createEl('button', '✎');
    cb.type = 'checkbox';
    cb.checked = !isCategoryHidden(c.id);
    cb.setAttribute('aria-label', 'Mostrar ' + c.nombre);
    cb.onchange = () => setCategoryHidden(c.id, !cb.checked);
    sw.style.background = c.color;
    sw.appendChild(createIconSvg(c.icono));
    only.title = 'Mostrar solo ' + c.nombre;
    only.onclick = () => showOnlyCategory(c.id);
    edit.setAttribute('aria-label', 'Editar ' + c.nombre);
    edit.onclick = () => openCategoryPopup(c.id);
    row.append(cb, sw, nm, n, only, edit);
    box.appendChild(row);
  }
}
