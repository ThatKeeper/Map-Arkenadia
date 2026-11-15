// @ts-check
// src/features/sharing/buildPlayerExport.js
import { buildPlayerData } from './buildPlayerData';
import { PLAYER_FILE_FORMAT, PLAYER_FILE_VERSION } from '@/config';

/**
 * Archivo para jugadores: el envoltorio con formato y versión más los datos filtrados.
 * @param {import('../../types').UserData} userData
 * @param {Date} [now]
 */
export function buildPlayerExport(userData, now = new Date()) {
  return {
    formato: PLAYER_FILE_FORMAT,
    version: PLAYER_FILE_VERSION,
    exportado: now.toISOString(),
    datos: buildPlayerData(userData),
  };
}
