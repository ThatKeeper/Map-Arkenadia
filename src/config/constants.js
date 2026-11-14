// src/config/constants.js

/** Ancho del mundo en unidades de mapa. */
export const WORLD_WIDTH = 2400;

/** Alto del mundo en unidades de mapa. */
export const WORLD_HEIGHT = 1848;

/** Ancho de la cuadrícula de clases de terreno. */
export const GRID_WIDTH = 600;

/** Alto de la cuadrícula de clases de terreno. */
export const GRID_HEIGHT = 462;

/** Vuelta completa en radianes. */
export const TAU = Math.PI * 2;

/** Orden en que se pintan los biomas. */
export const BIOME_PAINT_ORDER = [6, 7, 8, 10, 11, 4, 5, 9];

/** Zoom a partir del cual aparece cada nivel de detalle. */
export const LOD_SCALE_THRESHOLDS = [0, 1, 2.2, 4.2];

/** Separación de la cuadrícula de cada nivel de detalle. */
export const LOD_SPACING = [16, 8, 4.4, 2.6];

/** Factor de grosor de trazo por nivel de detalle. */
export const LOD_STROKE_SCALE = [1, 0.7, 0.5, 0.35];

/** Duración del fundido de una tesela nueva (ms). */
export const TILE_FADE_MS = 170;

/** Resolución de la vista general respecto al mundo. */
export const OVERVIEW_RESOLUTION = 0.4;

/** Margen de la vista general alrededor del mundo. */
export const OVERVIEW_MARGIN = 60;

/** Ancho del minimapa (px). */
export const MINI_WIDTH = 176;

/** Alto del minimapa (px), proporcional al mundo con margen. */
export const MINI_HEIGHT = Math.round((MINI_WIDTH * (WORLD_HEIGHT + 120)) / (WORLD_WIDTH + 120));
