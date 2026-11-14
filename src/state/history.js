// @ts-check
// src/state/history.js

/**
 * Pilas de deshacer/rehacer.
 * @type {{ undo: Array<import('../types').Command>, redo: Array<import('../types').Command>, limit: number, mergeWindowMs: number }}
 */
export const history = { undo: [], redo: [], limit: 200, mergeWindowMs: 800 };
