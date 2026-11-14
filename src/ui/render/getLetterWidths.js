// src/ui/render/getLetterWidths.js
import { dom, letterWidthCache } from '@/state';

/** Anchos de cada letra (cacheados) para el texto con espaciado. */
export function getLetterWidths(t, k) {
  const key = k + t;
  let r = letterWidthCache.get(key);
  if (r) return r;
  dom.ctx.font = k === 'c' ? '100px "IM Fell English SC",serif' : 'italic 500 100px Caveat,cursive';
  const w = [...t].map((ch) => dom.ctx.measureText(ch).width / 100);
  r = { w, sum: w.reduce((a, b) => a + b, 0), n: w.length };
  letterWidthCache.set(key, r);
  return r;
}
