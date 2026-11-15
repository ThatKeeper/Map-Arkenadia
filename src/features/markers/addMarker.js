// @ts-check
// src/features/markers/addMarker.js
import { FALLBACK_CATEGORY_ID } from '@/config';
import { isCategoryHidden, setCategoryHidden } from '@/features/categories';
import { updateUserData } from '@/features/history';
import { getDefaultVisibility } from '@/features/roles';
import { session } from '@/state';

/**
 * Crea un marcador en (x,y) como acción que se puede deshacer. Usa el icono de su categoría
 * (por defecto «Nota»); si esa categoría estaba oculta, la vuelve a mostrar para que se vea.
 * @param {number} x
 * @param {number} y
 * @param {string} [categoryId]
 * @returns {import('../../types').Marker} el marcador creado
 */
export function addMarker(x, y, categoryId) {
  const cats = session.userData.categories;
  const cat =
    cats.find((c) => c.id === categoryId) ||
    cats.find((c) => c.id === FALLBACK_CATEGORY_ID) ||
    cats[0];
  const now = Date.now();
  const id = session.userData.nid;
  updateUserData('Marcador creado', ['markers', 'nid'], (d) => {
    d.markers.push({
      id,
      nombre: 'Marcador ' + (d.markers.length + 1),
      nota: '',
      x: Math.round(x),
      y: Math.round(y),
      categoria: cat.id,
      icono: cat.icono,
      notaDm: '',
      visibilidad: getDefaultVisibility(),
      creado: now,
      actualizado: now,
    });
    d.nid = id + 1;
  });
  if (isCategoryHidden(cat.id)) setCategoryHidden(cat.id, false);
  return /** @type {import('../../types').Marker} */ (session.userData.markers.find((m) => m.id === id));
}
