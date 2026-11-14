// @ts-check
// src/features/categories/showOnlyCategory.js
import { setHiddenCategories } from './setHiddenCategories';
import { session } from '@/state';

/**
 * Muestra solo una categoría (oculta todas las demás).
 * @param {string} id
 */
export function showOnlyCategory(id) {
  setHiddenCategories(session.userData.categories.filter((c) => c.id !== id).map((c) => c.id));
}
