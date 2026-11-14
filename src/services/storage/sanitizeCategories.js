// @ts-check
// src/services/storage/sanitizeCategories.js
import { DEFAULT_CATEGORIES, DEFAULT_ICON_ID, INK_ICONS } from '@/config';
import { truncate } from '@/utils';

const ICON_IDS = new Set(INK_ICONS.map((i) => i.id));

/**
 * Depura el catálogo de categorías (ids únicos y válidos, color #rrggbb, icono existente).
 * Si no queda ninguna, devuelve las de por defecto.
 * @param {any} input
 * @returns {import('../../types').Category[]}
 */
export function sanitizeCategories(input) {
  /** @type {import('../../types').Category[]} */
  const out = [];
  const seen = new Set();
  if (Array.isArray(input))
    for (const c of input.slice(0, 40)) {
      if (!c || typeof c !== 'object') continue;
      const id = String(c.id == null ? '' : c.id)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '')
        .slice(0, 24);
      if (!id || seen.has(id)) continue;
      seen.add(id);
      out.push({
        id,
        nombre: truncate(c.nombre, 30).trim() || 'Categoría',
        color: /^#[0-9a-fA-F]{6}$/.test(c.color) ? c.color.toLowerCase() : '#6b4a2c',
        icono: ICON_IDS.has(c.icono) ? c.icono : DEFAULT_ICON_ID,
      });
    }
  return out.length ? out : DEFAULT_CATEGORIES.map((c) => ({ ...c }));
}
