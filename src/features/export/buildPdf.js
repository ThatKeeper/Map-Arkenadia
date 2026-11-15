// @ts-check
// src/features/export/buildPdf.js

/**
 * Construye un PDF de una página que contiene una imagen JPEG (sin librerías).
 * La página mantiene la proporción de la imagen con el lado largo de 842 pt (A4 apaisado).
 * @param {Uint8Array} jpeg bytes del JPEG
 * @param {number} imgW ancho de la imagen (px)
 * @param {number} imgH alto de la imagen (px)
 * @returns {Uint8Array}
 */
export function buildPdf(jpeg, imgW, imgH) {
  const long = 842,
    pw = imgW >= imgH ? long : Math.round((long * imgW) / imgH),
    ph = imgW >= imgH ? Math.round((long * imgH) / imgW) : long;
  const enc = new TextEncoder();
  /** @type {Uint8Array[]} */
  const parts = [];
  /** @type {number[]} */
  const offsets = [];
  let length = 0;
  const push = (/** @type {Uint8Array|string} */ x) => {
    const b = typeof x === 'string' ? enc.encode(x) : x;
    parts.push(b);
    length += b.length;
  };
  const object = (n, body) => {
    offsets[n] = length;
    push(`${n} 0 obj\n${body}\nendobj\n`);
  };
  push('%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n');
  object(1, '<< /Type /Catalog /Pages 2 0 R >>');
  object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`);
  const content = `q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`;
  object(4, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  offsets[5] = length;
  push(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
  push(jpeg);
  push('\nendstream\nendobj\n');
  const xref = length;
  push('xref\n0 6\n0000000000 65535 f \n');
  for (let n = 1; n <= 5; n++) push(String(offsets[n]).padStart(10, '0') + ' 00000 n \n');
  push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  const out = new Uint8Array(length);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}
