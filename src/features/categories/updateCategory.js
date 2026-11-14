// @ts-check
// src/features/categories/updateCategory.js
import { updateUserData } from '@/features/history';

/**
 * Cambia nombre, color o icono de una categoría.
 * @param {string} id
 * @param {Partial<{nombre: string, color: string, icono: string}>} patch
 */
export function updateCategory(id, patch) {
  updateUserData(
    'Categoría editada',
    ['categories'],
    (d) => {
      const c = d.categories.find((x) => x.id === id);
      if (c) Object.assign(c, patch);
    },
    'categoria:' + id,
  );
}
