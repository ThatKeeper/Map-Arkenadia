// @ts-check
// src/features/categories/removeCategory.js
import { updateUserData } from '@/features/history';
import { FALLBACK_CATEGORY_ID } from '@/config';
import { session } from '@/state';

/**
 * Borra una categoría; sus marcadores pasan a otra (la de respaldo o la primera que quede).
 * No permite borrar la última.
 * @param {string} id
 * @returns {boolean} true si se borró
 */
export function removeCategory(id) {
  const cats = session.userData.categories;
  if (cats.length < 2 || !cats.some((c) => c.id === id)) return false;
  updateUserData('Categoría borrada', ['categories', 'markers'], (d) => {
    d.categories = d.categories.filter((c) => c.id !== id);
    const target = d.categories.find((c) => c.id === FALLBACK_CATEGORY_ID) || d.categories[0];
    for (const m of d.markers) if (m.categoria === id) m.categoria = target.id;
  });
  return true;
}
