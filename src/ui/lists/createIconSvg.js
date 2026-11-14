// @ts-check
// src/ui/lists/createIconSvg.js
import { DEFAULT_ICON_ID, INK_ICONS } from '@/config';

const NS = 'http://www.w3.org/2000/svg';

/**
 * Crea un <svg> con un icono de tinta (hereda el color del texto con `currentColor`).
 * @param {string} id id del icono
 * @returns {SVGSVGElement}
 */
export function createIconSvg(id) {
  const icon = INK_ICONS.find((i) => i.id === id) || INK_ICONS.find((i) => i.id === DEFAULT_ICON_ID);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.7');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  for (const d of icon ? icon.d : []) {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d);
    svg.appendChild(p);
  }
  return svg;
}
