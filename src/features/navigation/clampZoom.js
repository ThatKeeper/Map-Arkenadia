// src/features/navigation/clampZoom.js
import { session, viewport } from '@/state';

/** Limita un zoom entre el mínimo (ver todo) y el máximo de calidad. */
export const clampZoom = (z) =>
  Math.max(viewport.fitScale * 0.6, Math.min(session.quality.maxZ, z));
