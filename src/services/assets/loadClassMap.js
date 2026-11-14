// @ts-check
// src/services/assets/loadClassMap.js
import { CLASS_MAP_IMAGE, GRID_HEIGHT, GRID_WIDTH } from '@/config';
import { requestGeometryBuild } from '@/features/geometry';
import { terrainClasses } from '@/state';
import { renderBiomeList } from '@/ui/lists';
import { byId } from '@/utils';

/** Decodifica la imagen del mapa en clases de terreno y lanza la primera construcción. */
export function loadClassMap() {
  const im = new Image();
  im.onload = () => {
    const t = document.createElement('canvas');
    t.width = GRID_WIDTH;
    t.height = GRID_HEIGHT;
    const x = t.getContext('2d', { willReadFrequently: true });
    x.drawImage(im, 0, 0);
    const d = x.getImageData(0, 0, GRID_WIDTH, GRID_HEIGHT).data;
    for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++)
      terrainClasses[i] = Math.round(d[i * 4] / 16);
    renderBiomeList();
    setTimeout(requestGeometryBuild, 10);
  };
  im.onerror = () => {
    const l = byId('load');
    if (l) l.textContent = 'No se pudo leer el mapa';
  };
  im.src = CLASS_MAP_IMAGE;
}
