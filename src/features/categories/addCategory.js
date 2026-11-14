// @ts-check
// src/features/categories/addCategory.js
import { updateUserData } from '@/features/history';

/**
 * Crea una categoría con un id único derivado del nombre.
 * @param {string} nombre
 * @param {string} color #rrggbb
 * @param {string} icono id de icono
 * @returns {string} id de la nueva categoría
 */
export function addCategory(nombre, color, icono) {
  return updateUserData('Categoría creada', ['categories'], (d) => {
    const base =
      nombre
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 18) || 'cat';
    let id = base,
      n = 2;
    while (d.categories.some((c) => c.id === id)) id = `${base}-${n++}`;
    d.categories.push({ id, nombre, color, icono });
    return id;
  });
}
