// @ts-check
// src/features/labels/getLabelById.js
import { getEffectiveLabels } from './getEffectiveLabels';

/**
 * Etiqueta efectiva por id (undefined si no existe o está borrada).
 * @param {string|null} id
 */
export const getLabelById = (id) => getEffectiveLabels().find((l) => l.id === id);
