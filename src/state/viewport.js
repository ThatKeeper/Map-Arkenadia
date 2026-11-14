// @ts-check
// src/state/viewport.js

/** Vista del mapa: zoom, desplazamiento y tamaño de pantalla. */
export const viewport = {
  // Zoom actual
  scale: 1,
  // Desplazamiento X en pantalla
  panX: 0,
  // Desplazamiento Y en pantalla
  panY: 0,
  // Zoom objetivo (animado)
  targetScale: 1,
  anchorX: 0,
  anchorY: 0,
  targetAnchorX: 0,
  targetAnchorY: 0,
  // Punto del mundo anclado (X)
  anchorWorldX: 0,
  // Punto del mundo anclado (Y)
  anchorWorldY: 0,
  // Zoom que muestra todo el mapa
  fitScale: 1,
  // Ancho de la vista (px)
  width: 1,
  // Alto de la vista (px)
  height: 1,
};
