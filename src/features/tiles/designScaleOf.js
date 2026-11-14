// src/features/tiles/designScaleOf.js

/** Escala de diseño de un nivel de zoom k. */
export const designScaleOf = (k) => Math.pow(2, k / 2);
