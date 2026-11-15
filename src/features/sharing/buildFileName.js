// @ts-check
// src/features/sharing/buildFileName.js
import { formatFileDate } from './formatFileDate';

/**
 * Nombre de archivo con fecha, p. ej. `mapa-jugadores-2026-11-14.json`.
 * @param {string} prefix
 * @param {string} ext sin punto
 * @param {Date} [d]
 */
export const buildFileName = (prefix, ext, d = new Date()) => `${prefix}-${formatFileDate(d)}.${ext}`;
