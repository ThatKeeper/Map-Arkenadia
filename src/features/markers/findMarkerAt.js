// src/features/markers/findMarkerAt.js
import { worldToScreen } from '@/features/navigation';
import { session } from '@/state';

/** Devuelve el marcador bajo un punto de pantalla, si lo hay. */
export function findMarkerAt(cx, cy) {
  let best = null,
    bd = 22;
  if (!session.viewOptions.markers) return null;
  for (const m of session.userData.markers) {
    const [x, y] = worldToScreen(m.x, m.y),
      d = Math.hypot(cx - x, cy - (y - 16));
    if (d < bd) {
      bd = d;
      best = m;
    }
  }
  return best;
}
