// @ts-check
// src/state/session.js

/**
 * Estado de la sesión: configuración, calidad, herramienta activa y datos del usuario.
 * Algunos campos valen `null` hasta que el arranque los rellena (`loadSettings`, `computeQuality`…).
 * @type {import('../types').Session}
 */
export const session = {
  // Configuración del usuario
  settings: { q: 'auto', stats: false },
  // Nivel de calidad actual
  // @ts-ignore se rellena en loadSettings
  tier: null,
  // Parámetros de calidad efectivos
  // @ts-ignore se rellena en computeQuality
  quality: null,
  // Bioma resaltado
  highlightedBiome: null,
  // 0 = pergamino, 1 = color
  paletteMode: 0,
  // Marcadores, ruta, escala y unidad
  // @ts-ignore se rellena en loadUserData
  userData: null,
  // Opciones de vista (minimapa, escala, marcadores…)
  // @ts-ignore se rellena en loadUserData
  viewOptions: null,
  // 'marker' | 'route' | null
  activeTool: null,
  // Marcador abierto en el editor
  selectedMarkerId: null,
};
