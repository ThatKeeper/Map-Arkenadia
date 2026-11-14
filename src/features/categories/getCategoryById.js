// @ts-check
// src/features/categories/getCategoryById.js
import { session } from '@/state';

/**
 * Categoría por id (undefined si no existe).
 * @param {string} id
 */
export const getCategoryById = (id) => session.userData.categories.find((c) => c.id === id);
