// @ts-check
// src/features/categories/setHiddenCategories.js
import { saveViewOptions } from '@/services/storage';
import { session } from '@/state';
import { emit } from '@/utils';

/**
 * Fija la lista de categorías ocultas, la guarda y avisa a mapa, lista, minimapa y búsqueda.
 * @param {string[]} ids
 */
export function setHiddenCategories(ids) {
  session.viewOptions.hiddenCategories = [...new Set(ids)];
  saveViewOptions();
  emit('filters:changed');
}
