// @ts-check
// src/features/markers/getMarkerById.js
import { session } from '@/state';

/**
 * Marcador por id (undefined si no existe).
 * @param {number|null} id
 */
export const getMarkerById = (id) => session.userData.markers.find((m) => m.id === id);
