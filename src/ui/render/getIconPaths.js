// @ts-check
// src/ui/render/getIconPaths.js
import { DEFAULT_ICON_ID, INK_ICONS } from '@/config';
import { iconCache } from '@/state';

/**
 * Rutas Path2D (cuadrícula 24×24) de un icono de tinta; se construyen una vez y se reutilizan.
 * Un id desconocido usa el icono por defecto.
 * @param {string} id
 * @returns {Path2D[]}
 */
export function getIconPaths(id) {
  const icon = INK_ICONS.find((i) => i.id === id) || INK_ICONS.find((i) => i.id === DEFAULT_ICON_ID);
  const key = icon ? icon.id : DEFAULT_ICON_ID;
  let paths = iconCache.get(key);
  if (!paths) {
    paths = (icon ? icon.d : []).map((d) => new Path2D(d));
    iconCache.set(key, paths);
  }
  return paths;
}
