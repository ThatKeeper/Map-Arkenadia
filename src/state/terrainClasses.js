// @ts-check
// src/state/terrainClasses.js
import { GRID_HEIGHT, GRID_WIDTH } from '@/config';

/** Clase de terreno (0..11) de cada celda de la cuadrícula. */
export const terrainClasses = new Uint8Array(GRID_WIDTH * GRID_HEIGHT);
