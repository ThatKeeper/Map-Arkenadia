// @ts-check
// src/ui/lists/renderIconGrid.js
import { createIconSvg } from './createIconSvg';
import { INK_ICONS } from '@/config';
import { createEl, normalizeText } from '@/utils';

/**
 * Rellena una cuadrícula de iconos filtrada por una búsqueda (nombre o etiquetas).
 * @param {HTMLElement} box contenedor
 * @param {string} query texto de búsqueda
 * @param {string} selectedId icono marcado
 * @param {(id: string) => void} onPick se llama al elegir un icono
 */
export function renderIconGrid(box, query, selectedId, onPick) {
  box.textContent = '';
  const q = normalizeText(query).trim();
  const list = INK_ICONS.filter(
    (i) => !q || normalizeText(i.nombre + ' ' + i.tags.join(' ')).includes(q),
  );
  if (!list.length) box.appendChild(createEl('span', 'Ningún icono coincide.', 'none'));
  for (const icon of list) {
    const b = createEl('button');
    b.type = 'button';
    b.dataset.icon = icon.id;
    b.title = icon.nombre;
    b.setAttribute('role', 'option');
    b.setAttribute('aria-label', icon.nombre);
    b.setAttribute('aria-pressed', String(icon.id === selectedId));
    b.appendChild(createIconSvg(icon.id));
    b.onclick = () => onPick(icon.id);
    box.appendChild(b);
  }
}
