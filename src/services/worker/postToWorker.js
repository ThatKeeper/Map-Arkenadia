// @ts-check
// src/services/worker/postToWorker.js
import { pendingWorkerRequests, workerState } from '@/state';

/**
 * Envía un mensaje al worker y devuelve una promesa con su respuesta.
 * @param {Record<string, any>} m mensaje (se le asigna `id`)
 * @param {Transferable[]} [tr] objetos transferibles
 * @returns {Promise<any>}
 */
export function postToWorker(m, tr) {
  return new Promise((res, rej) => {
    m.id = ++workerState.lastRequestId;
    pendingWorkerRequests.set(m.id, { res, rej });
    /** @type {Worker} */ (workerState.worker).postMessage(m, tr || []);
  });
}
