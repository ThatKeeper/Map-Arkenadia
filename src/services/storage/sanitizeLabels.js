// @ts-check
// src/services/storage/sanitizeLabels.js
import { sanitizeLabelData } from './sanitizeLabelData';
import { LABELS } from '@/config';

/**
 * Depura las etiquetas del usuario: cambios sobre originales ("o<índice>") y etiquetas propias ("c<n>").
 * @param {any} input
 * @returns {import('../../types').UserLabels}
 */
export function sanitizeLabels(input) {
  /** @type {import('../../types').UserLabels} */
  const out = { edits: {}, custom: [], nid: 1 };
  if (!input || typeof input !== 'object') return out;
  if (Number.isInteger(input.nid) && input.nid > 0) out.nid = input.nid;
  if (input.edits && typeof input.edits === 'object')
    for (const id of Object.keys(input.edits)) {
      const m = /^o(\d+)$/.exec(id);
      if (!m || +m[1] >= LABELS.length) continue;
      const d = sanitizeLabelData(input.edits[id]);
      if (Object.keys(d).length) out.edits[id] = d;
    }
  if (Array.isArray(input.custom)) {
    const seen = new Set();
    for (const raw of input.custom.slice(0, 300)) {
      const m = raw && /^c(\d+)$/.exec(String(raw.id));
      if (!m || seen.has(raw.id)) continue;
      const d = sanitizeLabelData(raw);
      if (d.x === undefined || d.y === undefined) continue;
      seen.add(raw.id);
      out.nid = Math.max(out.nid, +m[1] + 1);
      out.custom.push({ estilo: 'x', tam: 1, rot: 0, ...d, id: raw.id, texto: (d.texto || '').trim() || 'Etiqueta' });
    }
  }
  return out;
}
