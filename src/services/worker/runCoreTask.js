// @ts-check
// src/services/worker/runCoreTask.js
import { computeGeometry, computeItems, initCore } from '@/core';
import { postToWorker } from './postToWorker';
import { build, terrainClasses, workerState } from '@/state';
import { yieldToMain } from '@/utils';

/**
 * Ejecuta una tarea del núcleo en el worker, o en el hilo principal si no hay worker.
 * @param {Record<string, any>} m tarea (`cmd`: 'geo' | 'items', `geoQ`, `lod`, `dens`)
 * @returns {Promise<any>}
 */
export async function runCoreTask(m) {
  if (workerState.worker) {
    try {
      if (!workerState.worker._init) {
        workerState.worker._init = true;
        await postToWorker({ cmd: 'init', cls: terrainClasses.slice() });
      }
      return await postToWorker(m);
    } catch (e) {
      workerState.worker = null;
      build.workerOk = false;
    }
  }
  if (!workerState.localCoreReady) {
    initCore(terrainClasses);
    workerState.localCoreReady = true;
  }
  const t = Date.now(),
    r = {};
  if (m.cmd === 'geo') r.geo = await computeGeometry(m.geoQ, yieldToMain);
  r.items = computeItems(m.lod, m.dens);
  r.ms = Date.now() - t;
  return r;
}
