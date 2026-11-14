// @ts-check
// src/state/loop.js

/** Estado del bucle de animación y medición de rendimiento. */
export const loop = {
  dirty: true,
  ready: false,
  // Marca de tiempo del último fotograma
  lastTickTime: performance.now(),
  // Hay teselas en fundido
  fading: false,
  rafId: 0,
  lastWheel: -1e9,
  // Contador de fotogramas lentos (modo Auto)
  slowFrames: 0,
  fpsFrames: 0,
  fpsTime: 0,
  fpsValue: 0,
  lastStatsTime: 0,
  lastFrameTime: 0,
};
