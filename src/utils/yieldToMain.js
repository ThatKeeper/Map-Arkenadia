// src/utils/yieldToMain.js

/** Cede el hilo principal un instante (setTimeout 0). */
export const yieldToMain = () => new Promise((r) => setTimeout(r, 0));
