// tests/helpers/installBrowserStubs.js
// Rellena lo que jsdom no trae (canvas 2D, Path2D, Image, matchMedia, medidas de layout, punteros).
import { FakePath2D } from './FakePath2D.js';
import { createDigest, createRecorder } from './createRecorder.js';

const VIEW_WIDTH = 1024;
const VIEW_HEIGHT = 768;

/**
 * Instala los sustitutos en el entorno global.
 * @param {{ classMap?: Uint8ClampedArray, gridWidth?: number, gridHeight?: number }} [opts]
 *   `classMap`: píxeles RGBA que devolverá `getImageData` al leer la cuadrícula del mapa.
 * @returns {{ digests: Map<HTMLCanvasElement, ReturnType<typeof createDigest>>, all: ReturnType<typeof createDigest> }}
 */
export function installBrowserStubs(opts = {}) {
  const digests = new Map();
  const all = createDigest();
  const recorders = new WeakMap();

  HTMLCanvasElement.prototype.getContext = function getContext(type) {
    if (type !== '2d') return null;
    let rec = recorders.get(this);
    if (!rec) {
      const digest = createDigest();
      digests.set(this, digest);
      rec = createRecorder(this, { digest, all, ...opts });
      recorders.set(this, rec);
    }
    return rec;
  };
  HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,';

  globalThis.Path2D = FakePath2D;
  globalThis.CanvasRenderingContext2D = class CanvasRenderingContext2D {};
  globalThis.CanvasRenderingContext2D.prototype.letterSpacing = '0px';

  globalThis.Image = class FakeImage {
    set src(v) {
      this._src = v;
      setTimeout(() => this.onload && this.onload(), 0);
    }
    get src() {
      return this._src;
    }
  };

  const mql = (q) => ({
    media: q, matches: false, onchange: null,
    addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {},
    dispatchEvent: () => false,
  });
  window.matchMedia = mql;
  globalThis.matchMedia = mql;

  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => VIEW_WIDTH });
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, get: () => VIEW_HEIGHT });
  Element.prototype.getBoundingClientRect = () => ({
    x: 0, y: 0, left: 0, top: 0, right: VIEW_WIDTH, bottom: VIEW_HEIGHT,
    width: VIEW_WIDTH, height: VIEW_HEIGHT, toJSON() {},
  });
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};

  return { digests, all };
}
