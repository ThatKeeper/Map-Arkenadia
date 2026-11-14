// src/utils/prefersReducedMotion.js

/** Indica si el usuario pidió reducir el movimiento. */
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
