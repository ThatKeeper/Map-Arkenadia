// src/config/markerCategories.js

/**
 * Categorías de marcador por defecto: { id, nombre, color, icono }.
 * El usuario puede editarlas, añadir otras o borrarlas (se guardan en `userData.categories`).
 */
export const DEFAULT_CATEGORIES = [
  { id: 'ciudad', nombre: 'Ciudad', color: '#6b4a2c', icono: 'castillo' },
  { id: 'base', nombre: 'Base / Campamento', color: '#c0561a', icono: 'tienda' },
  { id: 'mazmorra', nombre: 'Mazmorra', color: '#4a3a5c', icono: 'mazmorra' },
  { id: 'bestia', nombre: 'Bestia / Criatura', color: '#7a2a2a', icono: 'bestia' },
  { id: 'mision', nombre: 'Misión', color: '#b08a1a', icono: 'mision' },
  { id: 'peligro', nombre: 'Peligro', color: '#a02020', icono: 'peligro' },
  { id: 'tesoro', nombre: 'Tesoro', color: '#2a7a74', icono: 'cofre' },
  { id: 'nota', nombre: 'Nota', color: '#b3402a', icono: 'pin' },
];

/** Categoría a la que van los marcadores sin categoría válida. */
export const FALLBACK_CATEGORY_ID = 'nota';

/** Visibilidades posibles de un elemento (la Fase 2 las usará para el modo DM/jugador). */
export const VISIBILITIES = [
  ['todos', 'Todos'],
  ['dm', 'Solo el DM'],
  ['mio', 'Solo yo'],
];

/** Correspondencia de los iconos antiguos (por posición) con icono y categoría nuevos. */
export const LEGACY_ICON_MAP = [
  ['pin', 'nota'], // 📍
  ['castillo', 'ciudad'], // 🏰
  ['barco', 'nota'], // ⛵
  ['espadas', 'peligro'], // ⚔️
  ['gema', 'tesoro'], // 💎
  ['bosque', 'nota'], // 🌲
  ['montana', 'nota'], // 🏔️
  ['calavera', 'peligro'], // ☠️
  ['estrella', 'mision'], // ⭐
  ['fuego', 'base'], // 🔥
  ['aldea', 'ciudad'], // 🏘️
  ['pregunta', 'nota'], // ❓
];

/** Estilos de etiqueta: [tipo interno, nombre]. */
export const LABEL_STYLES = [
  ['c', 'Reino / región'],
  ['r', 'Zona (río, desierto…)'],
  ['s', 'Mar'],
  ['x', 'Lugar menor'],
  ['n', 'Nota'],
];
