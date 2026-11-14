// src/core/initCore.js
import { coreState } from './coreState';

/** Entrega al núcleo la cuadrícula de clases de terreno (Uint8Array GRID_WIDTH×GRID_HEIGHT). */
export function initCore(cls) {
  coreState.CLS = cls;
}
