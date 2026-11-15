// @ts-check
// src/features/search/searchPlaces.js
import { scoreMatch } from './scoreMatch';
import { getCategoryById } from '@/features/categories';
import { getVisibleLabels } from '@/features/labels';
import { getVisibleMarkers } from '@/features/markers';
import { session, viewport } from '@/state';
import { normalizeText } from '@/utils';

/**
 * @typedef {Object} SearchResult
 * @property {'marcador'|'lugar'|'categoria'|'historial'} tipo
 * @property {string} texto
 * @property {string} detalle
 * @property {number} [x]
 * @property {number} [y]
 * @property {number} [z]
 * @property {string} [color]
 * @property {string} [icono]
 * @property {string} [categoriaId]
 * @property {boolean} [favorito]
 */

const TYPE_ORDER = { marcador: 0, categoria: 1, lugar: 2, historial: 3 };

/**
 * Busca marcadores (solo de categorías visibles), lugares del mapa (con sus ediciones) y categorías.
 * No distingue tildes ni mayúsculas; ordena por calidad de la coincidencia.
 * @param {string} query
 * @param {number} [limit]
 * @returns {SearchResult[]}
 */
export function searchPlaces(query, limit = 8) {
  const q = normalizeText(query).trim();
  if (!q) return [];
  /** @type {Array<SearchResult & { score: number }>} */
  const found = [];
  const push = (entry) => {
    const score = scoreMatch(normalizeText(entry.texto), q);
    if (score >= 0) found.push({ ...entry, score });
  };
  for (const m of getVisibleMarkers()) {
    const cat = getCategoryById(m.categoria);
    push({ tipo: 'marcador', texto: m.nombre, detalle: cat ? cat.nombre : 'Marcador', x: m.x, y: m.y,
      z: viewport.fitScale * 2.5, color: cat && cat.color, icono: m.icono });
  }
  for (const l of getVisibleLabels())
    if (l.tipo !== 'n')
      push({ tipo: 'lugar', texto: l.texto, detalle: 'Lugar del mapa', x: l.x, y: l.y,
        z: viewport.fitScale * (l.tipo === 'c' ? 1.8 : 3.2) });
  for (const c of session.userData.categories)
    push({ tipo: 'categoria', texto: c.nombre, detalle: 'Categoría · mostrar solo esta',
      color: c.color, icono: c.icono, categoriaId: c.id });
  const seen = new Set();
  return found
    .sort(
      (a, b) =>
        a.score - b.score ||
        TYPE_ORDER[a.tipo] - TYPE_ORDER[b.tipo] ||
        a.texto.localeCompare(b.texto, 'es'),
    )
    .filter((r) => {
      const key = r.tipo + '|' + normalizeText(r.texto);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit)
    .map(({ score, ...r }) => r);
}
