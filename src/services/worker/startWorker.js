// @ts-check
// src/services/worker/startWorker.js
import GeometryWorker from '@/workers/geometry.worker.js?worker&inline';
import { build, pendingWorkerRequests, workerState } from '@/state';

/** Crea el Web Worker de geometría; si falla, se usará el hilo principal. */
export function startWorker() {
  try {
    workerState.worker = new GeometryWorker();
    workerState.worker.onmessage = (e) => {
      const r = pendingWorkerRequests.get(e.data.id);
      if (r) {
        pendingWorkerRequests.delete(e.data.id);
        e.data.error ? r.rej(new Error(e.data.error)) : r.res(e.data);
      }
    };
    workerState.worker.onerror = () => {
      workerState.worker = null;
      build.workerOk = false;
      for (const [, r] of pendingWorkerRequests) r.rej(new Error('worker'));
      pendingWorkerRequests.clear();
    };
    build.workerOk = true;
  } catch (e) {
    workerState.worker = null;
    build.workerOk = false;
  }
}
