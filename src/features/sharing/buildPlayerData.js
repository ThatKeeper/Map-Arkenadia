// @ts-check
// src/features/sharing/buildPlayerData.js
import { SCHEMA_VERSION } from '@/config';
import { deepClone } from '@/utils';

/**
 * Datos aptos para jugadores: SOLO lo marcado como «todos». No contiene nada del DM:
 * - marcadores con visibilidad `dm` o `mio`, y la nota privada (`notaDm`) de todos ellos;
 * - etiquetas propias `dm`/`mio`; las originales que el DM oculta a los jugadores salen como «borradas»,
 *   sin su texto ni sus cambios;
 * - categorías que no usa ningún marcador exportado (podrían delatar su existencia);
 * - la ruta (es personal del DM).
 * Es una función pura: no toca el original.
 * @param {import('../../types').UserData} userData
 * @returns {import('../../types').UserData}
 */
export function buildPlayerData(userData) {
  const src = deepClone(userData);
  const markers = src.markers
    .filter((m) => m.visibilidad === 'todos')
    .map((m) => ({ ...m, notaDm: '' }));
  const used = new Set(markers.map((m) => m.categoria));
  /** @type {Record<string, import('../../types').LabelData>} */
  const edits = {};
  for (const id of Object.keys(src.labels.edits)) {
    const e = src.labels.edits[id];
    if (e.visibilidad === 'mio') continue;
    if (e.visibilidad === 'dm') edits[id] = { oculta: true, actualizado: e.actualizado || 0 };
    else edits[id] = e;
  }
  const custom = src.labels.custom.filter((c) => !c.visibilidad || c.visibilidad === 'todos');
  return {
    schemaVersion: SCHEMA_VERSION,
    categories: src.categories.filter((c) => used.has(c.id)),
    markers,
    route: [],
    labels: { edits, custom, nid: src.labels.nid },
    scale: src.scale,
    unit: src.unit,
    nid: src.nid,
  };
}
