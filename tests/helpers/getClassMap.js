// tests/helpers/getClassMap.js
import { decodePng } from './decodePng.js';
import { CLASS_MAP_IMAGE, GRID_HEIGHT, GRID_WIDTH } from '@/config';

/**
 * Decodifica la imagen real del mapa y devuelve sus píxeles RGBA y las clases de terreno
 * (canal rojo ÷ 16, igual que `loadClassMap`).
 */
export function getClassMap() {
  const b64 = CLASS_MAP_IMAGE.replace(/^data:image\/png;base64,/, '');
  const { width, height, data } = decodePng(Buffer.from(b64, 'base64'));
  if (width !== GRID_WIDTH || height !== GRID_HEIGHT)
    throw new Error(`La imagen del mapa mide ${width}×${height}, se esperaba ${GRID_WIDTH}×${GRID_HEIGHT}`);
  const classes = new Uint8Array(width * height);
  for (let i = 0; i < classes.length; i++) classes[i] = Math.round(data[i * 4] / 16);
  return { rgba: data, classes };
}
