// @ts-check
// src/state/workerState.js

/**
 * Estado de la comunicación con el worker de geometría.
 * `worker` es null si no hay worker (o falló) y se usa el hilo principal.
 * @type {{ worker: (Worker & { _init?: boolean }) | null, lastRequestId: number, localCoreReady: boolean, queue: Promise<void> }}
 */
export const workerState = {
  worker: null,
  lastRequestId: 0,
  localCoreReady: false,
  queue: Promise.resolve(),
};
