// @ts-check
// src/ui/render/getLabelFont.js

/**
 * Cadena CSS de fuente para una etiqueta.
 * @param {string} kind tipo de etiqueta
 * @param {number} size tamaño en px
 */
export function getLabelFont(kind, size) {
  return kind === 'c'
    ? `${size}px "IM Fell English SC",serif`
    : kind === 's'
      ? `italic 500 ${size}px Caveat,cursive`
      : `500 ${size}px Caveat,cursive`;
}
