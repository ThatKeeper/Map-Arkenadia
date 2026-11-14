// @ts-check
// src/state/pendingWorkerRequests.js

/**
 * Peticiones pendientes al worker (id → promesa).
 * @type {Map<number, { res: (value: any) => void, rej: (reason?: any) => void }>}
 */
export const pendingWorkerRequests = new Map();
