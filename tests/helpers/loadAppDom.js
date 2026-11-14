// tests/helpers/loadAppDom.js
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Vuelca en `document.body` el cuerpo real de `index.html` (sin los scripts). */
export function loadAppDom() {
  const html = readFileSync(fileURLToPath(new URL('../../index.html', import.meta.url)), 'utf8');
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script').forEach((s) => s.remove());
  document.body.innerHTML = doc.body.innerHTML;
}
