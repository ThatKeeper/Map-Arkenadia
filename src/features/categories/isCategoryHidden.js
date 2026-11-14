// @ts-check
// src/features/categories/isCategoryHidden.js
import { session } from '@/state';

/**
 * Indica si una categoría está oculta por el filtro.
 * @param {string} id
 */
export const isCategoryHidden = (id) => session.viewOptions.hiddenCategories.includes(id);
