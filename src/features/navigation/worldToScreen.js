// src/features/navigation/worldToScreen.js
import { viewport } from '@/state';

/** Convierte coordenadas del mundo a pantalla. */
export const worldToScreen = (x, y) => [
  x * viewport.scale + viewport.panX,
  y * viewport.scale + viewport.panY,
];
