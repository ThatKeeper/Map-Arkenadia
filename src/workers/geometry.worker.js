// src/workers/geometry.worker.js
// Punto de entrada del Web Worker: calcula geometría y detalles sin tocar el DOM.
import { initCore, computeGeometry, computeItems } from '@/core';

/** Agrega a la lista de transferencia los buffers de un contorno. */
function collectGeometryBuffers(geo, transfer) {
  for (const key in geo) {
    if (key === 'b') {
      for (const biome in geo.b) transfer.push(geo.b[biome].pts.buffer, geo.b[biome].lens.buffer);
    } else {
      transfer.push(geo[key].pts.buffer, geo[key].lens.buffer);
    }
  }
}

onmessage = async (e) => {
  const m = e.data;
  try {
    if (m.cmd === 'init') {
      initCore(m.cls);
      postMessage({ id: m.id });
      return;
    }
    const t = Date.now();
    const result = { id: m.id };
    const transfer = [];
    if (m.cmd === 'geo') {
      result.geo = await computeGeometry(m.geoQ);
      collectGeometryBuffers(result.geo, transfer);
    }
    result.items = computeItems(m.lod, m.dens);
    for (const a of result.items) transfer.push(a.buffer);
    result.ms = Date.now() - t;
    postMessage(result, transfer);
  } catch (err) {
    postMessage({ id: m.id, error: String((err && err.message) || err) });
  }
};
