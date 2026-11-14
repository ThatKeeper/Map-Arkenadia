// @ts-check
// src/features/categories/setCategoryHidden.js
import { setHiddenCategories } from './setHiddenCategories';
import { session } from '@/state';

/**
 * Oculta o muestra una categoría.
 * @param {string} id
 * @param {boolean} hidden
 */
export function setCategoryHidden(id, hidden) {
  const rest = session.viewOptions.hiddenCategories.filter((c) => c !== id);
  setHiddenCategories(hidden ? [...rest, id] : rest);
}
