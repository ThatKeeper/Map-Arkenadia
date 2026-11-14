// src/features/navigation/findPlace.js
import { LABELS, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { session, viewport } from '@/state';

/** Busca un lugar o marcador por nombre (exacto o parcial). */
export function findPlace(q) {
  q = q.trim().toLowerCase();
  if (!q) return null;
  let ex = null,
    pa = null;
  const all = [
    ...session.userData.markers.map((m) => ({
      n: m.n,
      x: m.x,
      y: m.y,
      z: viewport.fitScale * 2.5,
    })),
    ...LABELS.filter((l) => l[3] !== 'n').map((l) => ({
      n: l[0],
      x: l[1] * WORLD_WIDTH,
      y: l[2] * WORLD_HEIGHT,
      z: viewport.fitScale * (l[3] === 'c' ? 1.8 : 3.2),
    })),
  ];
  for (const p of all) {
    const n = p.n.toLowerCase();
    if (n === q) {
      ex = p;
      break;
    }
    if (!pa && n.includes(q)) pa = p;
  }
  return ex || pa;
}
