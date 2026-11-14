// @ts-check
// src/state/build.js

/** Resultado de la construcción de geometría y capas de detalle. */
export const build = {
  // Paths de contornos del mapa
  geometry: null,
  // Capas de detalle por nivel
  items: [[], [], [], []],
  geometryQuality: 0,
  itemsKey: '',
  // Invalida construcciones obsoletas
  buildToken: 0,
  workerOk: false,
  geometryMs: 0,
  // Índices por trozos para pintar solo lo visible
  chunks: {},
};
