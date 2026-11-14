// @ts-check
// src/features/labels/getEffectiveLabels.js
import { LABELS, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { session } from '@/state';

/** @type {{ source: object|null, list: import('../../types').EffectiveLabel[] }} */
let memo = { source: null, list: [] };

/**
 * Etiquetas listas para dibujar: las originales con los cambios del usuario (sin las borradas)
 * y las etiquetas propias. El resultado se reutiliza mientras `userData.labels` no cambie.
 * @returns {import('../../types').EffectiveLabel[]}
 */
export function getEffectiveLabels() {
  const labels = session.userData.labels;
  if (memo.source === labels) return memo.list;
  /** @type {import('../../types').EffectiveLabel[]} */
  const list = [];
  LABELS.forEach((raw, i) => {
    const l = /** @type {[string, number, number, string, number, number]} */ (raw),
      id = 'o' + i,
      e = labels.edits[id] || {};
    if (e.oculta) return;
    list.push({
      id,
      texto: e.texto !== undefined ? e.texto : l[0],
      x: e.x !== undefined ? e.x : l[1] * WORLD_WIDTH,
      y: e.y !== undefined ? e.y : l[2] * WORLD_HEIGHT,
      tipo: e.estilo || l[3],
      minZoom: l[4],
      rot: e.rot !== undefined ? e.rot : l[5],
      tam: e.tam !== undefined ? e.tam : 1,
      original: true,
      editada: id in labels.edits,
    });
  });
  for (const c of labels.custom)
    list.push({
      id: /** @type {string} */ (c.id),
      texto: c.texto || '',
      x: /** @type {number} */ (c.x),
      y: /** @type {number} */ (c.y),
      tipo: c.estilo || 'x',
      minZoom: 0,
      rot: c.rot || 0,
      tam: c.tam || 1,
      original: false,
      editada: false,
    });
  memo = { source: labels, list };
  return list;
}
