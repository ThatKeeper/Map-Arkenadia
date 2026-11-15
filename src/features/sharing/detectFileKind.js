// @ts-check
// src/features/sharing/detectFileKind.js
import { PLAYER_FILE_FORMAT } from '@/config';

/**
 * Tipo de un archivo de datos ya leído: 'jugadores' (exportado para jugadores) o 'completo'.
 * @param {any} json
 * @returns {{ kind: 'jugadores' | 'completo', data: any }}
 */
export function detectFileKind(json) {
  if (json && typeof json === 'object' && json.formato === PLAYER_FILE_FORMAT)
    return { kind: 'jugadores', data: json.datos };
  return { kind: 'completo', data: json };
}
