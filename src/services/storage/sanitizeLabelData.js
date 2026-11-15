// @ts-check
// src/services/storage/sanitizeLabelData.js
import { LABEL_STYLES, VISIBILITIES, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { clamp, isFiniteNumber, truncate } from '@/utils';

const STYLE_IDS = new Set(LABEL_STYLES.map((s) => s[0]));
const VIS_IDS = new Set(VISIBILITIES.map((v) => v[0]));

/**
 * Depura los campos editables de una etiqueta; solo conserva los válidos.
 * @param {any} d
 * @returns {import('../../types').LabelData}
 */
export function sanitizeLabelData(d) {
  /** @type {import('../../types').LabelData} */
  const out = {};
  if (!d || typeof d !== 'object') return out;
  if (typeof d.texto === 'string') out.texto = truncate(d.texto, 60);
  if (isFiniteNumber(d.x)) out.x = clamp(d.x, 0, WORLD_WIDTH);
  if (isFiniteNumber(d.y)) out.y = clamp(d.y, 0, WORLD_HEIGHT);
  if (isFiniteNumber(d.tam)) out.tam = clamp(d.tam, 0.3, 4);
  if (isFiniteNumber(d.rot)) out.rot = clamp(d.rot, -Math.PI, Math.PI);
  if (STYLE_IDS.has(d.estilo)) out.estilo = d.estilo;
  if (d.oculta === true) out.oculta = true;
  if (VIS_IDS.has(d.visibilidad) && d.visibilidad !== 'todos') out.visibilidad = d.visibilidad;
  if (isFiniteNumber(d.actualizado) && d.actualizado >= 0) out.actualizado = d.actualizado;
  return out;
}
