// tests/helpers/createRecorder.js
// Contexto 2D "grabador": no dibuja nada; registra cada llamada y la resume en una huella (FNV-1a).

const METHODS = new Set([
  'save', 'restore', 'scale', 'rotate', 'translate', 'transform', 'setTransform', 'resetTransform',
  'beginPath', 'closePath', 'moveTo', 'lineTo', 'bezierCurveTo', 'quadraticCurveTo', 'arc', 'arcTo',
  'ellipse', 'rect', 'roundRect', 'fill', 'stroke', 'clip', 'fillRect', 'strokeRect', 'clearRect',
  'fillText', 'strokeText', 'drawImage', 'putImageData', 'setLineDash', 'createLinearGradient',
  'createRadialGradient', 'createPattern', 'measureText', 'getImageData', 'getLineDash',
]);

const DEFAULTS = {
  globalAlpha: 1, lineWidth: 1, fillStyle: '#000000', strokeStyle: '#000000', font: '10px sans-serif',
  textAlign: 'start', textBaseline: 'alphabetic', lineJoin: 'miter', lineCap: 'butt',
  globalCompositeOperation: 'source-over', imageSmoothingEnabled: true, letterSpacing: '0px',
};

const FNV_OFFSET = 2166136261;

/** Acumulador de huella: cuenta de llamadas y hash FNV-1a. */
export function createDigest() {
  return {
    count: 0,
    hash: FNV_OFFSET,
    add(text) {
      this.count++;
      let h = this.hash;
      for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619) >>> 0;
      this.hash = h;
    },
    toJSON() {
      return { count: this.count, hash: this.hash.toString(16).padStart(8, '0') };
    },
  };
}

/** Texto estable de un argumento (números a 2 decimales, trazados con sus operaciones). */
function formatArg(v) {
  if (typeof v === 'number') return v.toFixed(2);
  if (v && typeof v.ops === 'string') return `P{${v.ops}}`;
  if (v && typeof v.nodeName === 'string') return `N${v.width}x${v.height}`;
  if (v && v.tag) return v.tag;
  return String(v);
}

/**
 * Crea un contexto 2D grabador para un canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {{ digest: ReturnType<typeof createDigest>, all?: ReturnType<typeof createDigest>, classMap?: Uint8ClampedArray, gridWidth?: number, gridHeight?: number }} opts
 */
export function createRecorder(canvas, opts) {
  const state = { ...DEFAULTS };
  const record = (sig) => {
    opts.digest.add(sig);
    if (opts.all) opts.all.add(`${canvas.width}x${canvas.height}:${sig}`);
  };
  const impl = {
    measureText: (text) => ({ width: String(text).length * 6 }),
    getImageData: (x, y, w, h) =>
      opts.classMap && w === opts.gridWidth && h === opts.gridHeight
        ? { width: w, height: h, data: opts.classMap }
        : { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) },
    createLinearGradient: () => ({ tag: 'gradL', addColorStop() {} }),
    createRadialGradient: () => ({ tag: 'gradR', addColorStop() {} }),
    createPattern: () => ({ tag: 'pattern' }),
    getLineDash: () => [],
  };
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === 'canvas') return canvas;
        if (typeof prop === 'symbol') return undefined;
        if (METHODS.has(prop))
          return (...args) => {
            record(`${prop}(${args.map(formatArg).join(',')})`);
            return impl[prop] ? impl[prop](...args) : undefined;
          };
        return state[prop];
      },
      set(_, prop, value) {
        record(`${String(prop)}=${formatArg(value)}`);
        state[prop] = value;
        return true;
      },
      has: (_, prop) => prop in state || METHODS.has(prop),
    },
  );
}
