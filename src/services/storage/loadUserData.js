// @ts-check
// src/services/storage/loadUserData.js
import { sanitizeUserData } from './sanitizeUserData';
import { session } from '@/state';
import { readStoredJson } from '@/utils';

/** Carga marcadores, ruta, etiquetas y opciones de vista guardados. */
export function loadUserData() {
  session.userData = sanitizeUserData(readStoredJson('mapaDatos'));
  const saved = readStoredJson('mapaVista') || {};
  session.viewOptions = Object.assign(
    { mini: innerWidth > 700, scalebar: true, markers: true, hover: true },
    saved,
    {
      hiddenCategories: Array.isArray(saved.hiddenCategories)
        ? saved.hiddenCategories.filter((c) => typeof c === 'string').slice(0, 60)
        : [],
    },
  );
}
