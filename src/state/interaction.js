// @ts-check
// src/state/interaction.js

/** Estado de gestos, temporizadores y arrastres. */
export const interaction = {
  toastTimer: 0,
  lastPinchDistance: 0,
  tapCandidate: null,
  tipTimer: 0,
  miniDragging: false,
  // Arrastre de una etiqueta: { id, dx, dy, sx, sy, moved } (dx/dy: desfase en el mundo; sx/sy: inicio en pantalla)
  dragLabel: null,
  // Atajo que espera una nueva combinación en el diálogo de ayuda
  captureShortcut: null,
  // Categoría abierta en su editor
  editingCategoryId: null,
};
