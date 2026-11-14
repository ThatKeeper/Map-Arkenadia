// src/features/route/computeRouteStats.js
import { terrainClassAt } from '@/features/terrain';
import { session } from '@/state';

/** Calcula distancias total, por tierra y por mar de la ruta. */
export function computeRouteStats() {
  const R = session.userData.route,
    legs = [];
  let tot = 0,
    land = 0,
    sea = 0;
  for (let i = 1; i < R.length; i++) {
    const a = R[i - 1],
      b = R[i],
      d = Math.hypot(b.x - a.x, b.y - a.y),
      n = Math.max(1, Math.ceil(d / 3));
    let l = 0;
    for (let j = 0; j < n; j++) {
      const t = (j + 0.5) / n;
      if (terrainClassAt(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t) >= 4) l++;
    }
    const ld = (d * l) / n;
    legs.push({ d, land: ld, sea: d - ld });
    tot += d;
    land += ld;
    sea += d - ld;
  }
  return { legs, tot, land, sea };
}
