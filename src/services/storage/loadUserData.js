// @ts-check
// src/services/storage/loadUserData.js
import { sanitizeUserData } from './sanitizeUserData';
import { session } from '@/state';
import { readStoredJson } from '@/utils';

/** Carga marcadores, ruta y opciones de vista guardados. */
export function loadUserData() {
  session.userData = sanitizeUserData(readStoredJson('mapaDatos'));
  session.viewOptions = Object.assign(
    { mini: innerWidth > 700, scalebar: true, markers: true, hover: true },
    readStoredJson('mapaVista') || {},
  );
}
