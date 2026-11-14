// src/features/route/formatDistance.js
import { session } from '@/state';

/** Da formato a una distancia según la escala del usuario. */
export const formatDistance = (v) => {
  v *= session.userData.scale;
  return v.toLocaleString('es', { maximumFractionDigits: v < 10 ? 1 : 0 });
};
