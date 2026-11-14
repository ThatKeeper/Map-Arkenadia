// src/features/markers/getMarkerById.js
import { session } from '@/state';

/** Devuelve el marcador con ese id. */
export const getMarkerById = (id) => session.userData.markers.find((m) => m.id === id);
