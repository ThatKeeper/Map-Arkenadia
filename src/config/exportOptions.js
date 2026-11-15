// src/config/exportOptions.js

/** Factores de resolución ofrecidos al exportar la imagen. */
export const EXPORT_FACTORS = [1, 2, 4];

/** Píxeles máximos de la imagen exportada (límite seguro de memoria). */
export const EXPORT_MAX_PIXELS_DESKTOP = 36e6;
export const EXPORT_MAX_PIXELS_MOBILE = 12e6;

/** Zoom de partida (px por unidad del mundo) del mapa completo al 1x. */
export const EXPORT_FULL_BASE_ZOOM = 0.5;

/** Píxeles máximos de cada franja que se pinta de una vez (para no bloquear la interfaz). */
export const EXPORT_STRIP_PIXELS = 0.8e6;

/** Lado de una celda de la cuadrícula del mapa (unidades del mundo). */
export const EXPORT_GRID_STEP = 100;

/** Opciones por defecto de la exportación de imagen. */
export const DEFAULT_EXPORT_OPTIONS = {
  scope: 'full',
  factor: 2,
  format: 'png',
  version: 'completa',
  markers: true,
  route: true,
  labels: true,
  grid: false,
  fog: false,
  legend: true,
  scalebar: true,
};
