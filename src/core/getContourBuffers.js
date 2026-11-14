// src/core/getContourBuffers.js
import { coreState } from './coreState';

/** Buffers reutilizables para marching squares, cacheados por tamaño N. */
export function getContourBuffers(N) {
  let B = coreState.bufs[N];
  if (!B) {
    coreState.bufs[N] = B = {
      PX: new Float32Array(N),
      PY: new Float32Array(N),
      A1: new Int32Array(N),
      A2: new Int32Array(N),
      vis: new Uint8Array(N),
    };
  }
  return B;
}
