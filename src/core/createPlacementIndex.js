// src/core/createPlacementIndex.js

const CELL = 24;
const OVERLAP_LIMIT = 0.72;
const ROW_STRIDE = 4096;

/**
 * Índice espacial de huellas ya colocadas.
 * `free(f, t)` indica si una huella no choca con otra; `add(f, t)` la registra.
 * Las olas (tipo 7) solo compiten entre sí.
 */
export function createPlacementIndex() {
  const grid = new Map();
  const ex = [];
  const ey = [];
  const erx = [];
  const ery = [];
  const et = [];

  const free = (f, t) => {
    const [cx, cy, rx, ry] = f;
    const i0 = Math.floor((cx - rx - 20) / CELL);
    const i1 = Math.floor((cx + rx + 20) / CELL);
    const j0 = Math.floor((cy - ry - 14) / CELL);
    const j1 = Math.floor((cy + ry + 14) / CELL);
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const a = grid.get(j * ROW_STRIDE + i);
        if (!a) continue;
        for (const id of a) {
          if ((t === 7) !== (et[id] === 7)) continue;
          const dx = (cx - ex[id]) / (rx + erx[id]);
          const dy = (cy - ey[id]) / (ry + ery[id]);
          if (dx * dx + dy * dy < OVERLAP_LIMIT) return false;
        }
      }
    }
    return true;
  };

  const add = (f, t) => {
    const id = ex.length;
    ex.push(f[0]);
    ey.push(f[1]);
    erx.push(f[2]);
    ery.push(f[3]);
    et.push(t);
    const key = Math.floor(f[1] / CELL) * ROW_STRIDE + Math.floor(f[0] / CELL);
    let a = grid.get(key);
    if (!a) grid.set(key, (a = []));
    a.push(id);
  };

  return { free, add };
}
