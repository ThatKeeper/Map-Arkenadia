// src/ui/controls/bindCategoryControls.js
import { addCategory, removeCategory, showAllCategories, updateCategory } from '@/features/categories';
import { interaction } from '@/state';
import { closeCategoryPopup, openCategoryPopup } from '@/ui/lists';
import { showToast, toastWithUndo } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta el panel de categorías y su editor. */
export function bindCategoryControls() {
  byId('catAll').onclick = showAllCategories;
  byId('catNew').onclick = () => openCategoryPopup(addCategory('Nueva categoría', '#6b4a2c', 'pin'));
  byId('cName').oninput = (e) => {
    if (interaction.editingCategoryId)
      updateCategory(interaction.editingCategoryId, { nombre: e.target.value.trim() || 'Categoría' });
  };
  byId('cColor').oninput = (e) => {
    if (interaction.editingCategoryId) updateCategory(interaction.editingCategoryId, { color: e.target.value });
  };
  byId('cIconQ').oninput = () => {
    if (interaction.editingCategoryId) openCategoryPopup(interaction.editingCategoryId, true);
  };
  byId('cOk').onclick = closeCategoryPopup;
  byId('cDel').onclick = () => {
    const id = interaction.editingCategoryId;
    if (!id) return;
    if (removeCategory(id)) {
      closeCategoryPopup();
      toastWithUndo('Categoría borrada (sus marcadores pasaron a otra)');
    } else showToast('Debe quedar al menos una categoría');
  };
}
