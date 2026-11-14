// tests/helpers/installFakeClock.js

/**
 * Reloj determinista: congela `performance.now`/`Date.now` y sustituye `requestAnimationFrame`
 * por una cola que se vacía a mano con `flushFrames`. Debe instalarse ANTES de importar la app.
 * @returns {{ flushFrames: (max?: number, stepMs?: number) => number, advance: (ms: number) => void, now: () => number, restore: () => void }}
 */
export function installFakeClock() {
  let t = performance.now();
  const queue = [];
  let nextId = 0;
  const saved = {
    perfNow: performance.now,
    dateNow: Date.now,
    raf: globalThis.requestAnimationFrame,
    caf: globalThis.cancelAnimationFrame,
  };
  const base = Date.now();
  performance.now = () => t;
  Date.now = () => base + t;
  const raf = (cb) => {
    queue.push(cb);
    return ++nextId;
  };
  globalThis.requestAnimationFrame = raf;
  globalThis.cancelAnimationFrame = () => {};
  if (typeof window !== 'undefined') {
    window.requestAnimationFrame = raf;
    window.cancelAnimationFrame = () => {};
  }
  return {
    now: () => t,
    advance: (ms) => {
      t += ms;
    },
    flushFrames(max = 400, stepMs = 16) {
      let n = 0;
      while (queue.length && n < max) {
        t += stepMs;
        for (const cb of queue.splice(0)) cb(t);
        n++;
      }
      return n;
    },
    restore() {
      performance.now = saved.perfNow;
      Date.now = saved.dateNow;
      globalThis.requestAnimationFrame = saved.raf;
      globalThis.cancelAnimationFrame = saved.caf;
    },
  };
}
