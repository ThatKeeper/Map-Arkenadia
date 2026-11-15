// @ts-check
// src/features/sharing/mergePlayerData.js
import { deepClone } from '@/utils';

/**
 * @typedef {Object} MergeReport
 * @property {number} added Elementos nuevos
 * @property {number} updated Elementos que se sustituyeron por una versión más reciente
 * @property {number} keptLocal Elementos en los que se conservó el tuyo por ser más reciente
 * @property {number} renumbered Elementos tuyos a los que hubo que cambiar el id para no pisar uno compartido
 * @property {number} categoriesAdded
 */

/**
 * Fusiona lo que envía el DM (`incoming`, ya filtrado) con los datos del jugador (`local`) sin pisar sus notas:
 * - Los elementos propios del jugador («mio») nunca se sobrescriben; si su id choca con uno compartido, se renumera.
 * - Un elemento compartido que ya existe (mismo id) se sustituye solo si el recibido es más reciente
 *   (`actualizado`); si el local es más reciente se conserva. Si son iguales, no se toca.
 * - Lo compartido que el DM ya no envíe no se borra.
 * - La ruta del jugador no se toca. La escala y la unidad del DM se adoptan solo si las tuyas siguen por defecto.
 * No modifica ninguno de los dos originales.
 * @param {import('../../types').UserData} local
 * @param {import('../../types').UserData} incoming
 * @returns {{ data: import('../../types').UserData, report: MergeReport }}
 */
export function mergePlayerData(local, incoming) {
  const data = deepClone(local);
  const inc = deepClone(incoming);
  /** @type {MergeReport} */
  const report = { added: 0, updated: 0, keptLocal: 0, renumbered: 0, categoriesAdded: 0 };

  const haveCat = new Set(data.categories.map((c) => c.id));
  for (const c of inc.categories)
    if (!haveCat.has(c.id)) {
      data.categories.push(c);
      report.categoriesAdded++;
    }

  let nid = Math.max(data.nid, inc.nid, ...data.markers.map((m) => m.id + 1), ...inc.markers.map((m) => m.id + 1));
  const incIds = new Set(inc.markers.map((m) => m.id));
  for (const m of data.markers)
    if (m.visibilidad === 'mio' && incIds.has(m.id)) {
      m.id = nid++;
      report.renumbered++;
    }
  for (const m of inc.markers) {
    const i = data.markers.findIndex((x) => x.id === m.id);
    if (i < 0) {
      data.markers.push(m);
      report.added++;
    } else if (m.actualizado > data.markers[i].actualizado) {
      // Se conserva la nota privada local: lo recibido nunca trae notas del DM.
      data.markers[i] = { ...m, notaDm: data.markers[i].notaDm };
      report.updated++;
    } else if (m.actualizado < data.markers[i].actualizado) report.keptLocal++;
  }
  data.nid = nid;

  for (const id of Object.keys(inc.labels.edits)) {
    const e = inc.labels.edits[id],
      cur = data.labels.edits[id];
    if (!cur) {
      data.labels.edits[id] = e;
      report.added++;
    } else if ((e.actualizado || 0) > (cur.actualizado || 0)) {
      data.labels.edits[id] = e;
      report.updated++;
    } else if ((e.actualizado || 0) < (cur.actualizado || 0)) report.keptLocal++;
  }
  let lnid = Math.max(data.labels.nid, inc.labels.nid);
  const incLabelIds = new Set(inc.labels.custom.map((c) => c.id));
  for (const c of data.labels.custom)
    if (c.visibilidad === 'mio' && incLabelIds.has(c.id)) {
      c.id = 'c' + lnid++;
      report.renumbered++;
    }
  for (const c of inc.labels.custom) {
    const i = data.labels.custom.findIndex((x) => x.id === c.id);
    if (i < 0) {
      data.labels.custom.push(c);
      report.added++;
    } else if ((c.actualizado || 0) > (data.labels.custom[i].actualizado || 0)) {
      data.labels.custom[i] = c;
      report.updated++;
    } else if ((c.actualizado || 0) < (data.labels.custom[i].actualizado || 0)) report.keptLocal++;
  }
  data.labels.nid = Math.max(lnid, ...data.labels.custom.map((c) => +String(c.id).slice(1) + 1));

  if (data.scale === 1 && data.unit === 'leguas') {
    data.scale = inc.scale;
    data.unit = inc.unit;
  }
  return { data, report };
}
