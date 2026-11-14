// src/ui/lists/closeCategoryPopup.js
import { interaction } from '@/state';
import { byId } from '@/utils';

/** Cierra el editor de categoría. */
export function closeCategoryPopup() {
  byId('cpop').hidden = true;
  byId('cIconQ').value = '';
  interaction.editingCategoryId = null;
}
