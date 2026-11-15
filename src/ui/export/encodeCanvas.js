// src/ui/export/encodeCanvas.js
import { buildPdf } from '@/features/export';

/**
 * Codifica un lienzo como PNG (o como PDF de una página con la imagen en JPEG).
 * @param {HTMLCanvasElement} canvas
 * @param {'png'|'pdf'} format
 * @returns {Promise<Blob>}
 */
export async function encodeCanvas(canvas, format) {
  const toBlob = (type, q) =>
    new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('No se pudo codificar la imagen'))), type, q));
  if (format === 'png') return /** @type {Promise<Blob>} */ (toBlob('image/png'));
  const jpeg = /** @type {Blob} */ (await toBlob('image/jpeg', 0.92));
  const bytes = buildPdf(new Uint8Array(await jpeg.arrayBuffer()), canvas.width, canvas.height);
  return new Blob([bytes], { type: 'application/pdf' });
}
