// src/ui/lists/openCategoryPopup.js
import { renderIconGrid } from './renderIconGrid';
import { getCategoryById, updateCategory } from '@/features/categories';
import { interaction } from '@/state';
import { byId } from '@/utils';

/**
 * Abre (o refresca) el editor de una categoría. Los campos con el foco no se tocan.
 * @param {string} id
 * @param {boolean} [onlyIcons] solo repinta la cuadrícula de iconos
 */
export function openCategoryPopup(id, onlyIcons = false) {
  const c = getCategoryById(id);
  if (!c) return;
  interaction.editingCategoryId = id;
  const focused = document.activeElement;
  renderIconGrid(byId('cIcons'), byId('cIconQ').value, c.icono, (icono) => updateCategory(id, { icono }));
  if (!onlyIcons) {
    if (focused !== byId('cName')) byId('cName').value = c.nombre;
    byId('cColor').value = c.color;
  }
  byId('cpop').hidden = false;
}
