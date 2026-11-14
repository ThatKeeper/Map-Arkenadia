// src/utils/supportsLetterSpacing.js

/** Indica si el canvas soporta la propiedad letterSpacing. */
export const supportsLetterSpacing = () => 'letterSpacing' in CanvasRenderingContext2D.prototype;
