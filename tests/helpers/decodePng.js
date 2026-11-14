// tests/helpers/decodePng.js
// Decodificador PNG mínimo (8 bits, sin entrelazado) para leer el mapa de clases sin canvas real.
import { inflateSync } from 'node:zlib';

const CHANNELS = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

/** Predictor de Paeth del formato PNG. */
function paeth(a, b, c) {
  const p = a + b - c,
    pa = Math.abs(p - a),
    pb = Math.abs(p - b),
    pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

/**
 * Decodifica un PNG a píxeles RGBA.
 * @param {Uint8Array} bytes contenido del archivo PNG
 * @returns {{ width: number, height: number, data: Uint8ClampedArray }}
 */
export function decodePng(bytes) {
  const buf = Buffer.from(bytes);
  let pos = 8,
    width = 0,
    height = 0,
    depth = 0,
    colorType = 0,
    interlace = 0,
    palette = null;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos),
      type = buf.toString('ascii', pos + 4, pos + 8),
      body = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = body.readUInt32BE(0);
      height = body.readUInt32BE(4);
      depth = body[8];
      colorType = body[9];
      interlace = body[12];
    } else if (type === 'PLTE') palette = body;
    else if (type === 'IDAT') idat.push(body);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  if (depth !== 8 || interlace !== 0 || !(colorType in CHANNELS))
    throw new Error(`PNG no soportado (profundidad ${depth}, tipo ${colorType}, entrelazado ${interlace})`);
  const ch = CHANNELS[colorType],
    stride = width * ch,
    raw = inflateSync(Buffer.concat(idat)),
    px = new Uint8Array(height * stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)],
      src = y * (stride + 1) + 1,
      dst = y * stride;
    for (let i = 0; i < stride; i++) {
      const left = i >= ch ? px[dst + i - ch] : 0,
        up = y ? px[dst - stride + i] : 0,
        upLeft = y && i >= ch ? px[dst - stride + i - ch] : 0,
        v = raw[src + i];
      px[dst + i] =
        filter === 0 ? v
        : filter === 1 ? v + left
        : filter === 2 ? v + up
        : filter === 3 ? v + ((left + up) >> 1)
        : v + paeth(left, up, upLeft);
    }
  }
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const s = i * ch;
    let r, g, b, a = 255;
    if (colorType === 0) r = g = b = px[s];
    else if (colorType === 4) (r = g = b = px[s]), (a = px[s + 1]);
    else if (colorType === 2) (r = px[s]), (g = px[s + 1]), (b = px[s + 2]);
    else if (colorType === 6) (r = px[s]), (g = px[s + 1]), (b = px[s + 2]), (a = px[s + 3]);
    else (r = palette[px[s] * 3]), (g = palette[px[s] * 3 + 1]), (b = palette[px[s] * 3 + 2]);
    data.set([r, g, b, a], i * 4);
  }
  return { width, height, data };
}
