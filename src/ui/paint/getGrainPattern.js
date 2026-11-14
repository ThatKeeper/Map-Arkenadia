// src/ui/paint/getGrainPattern.js
import { dom, renderCache } from '@/state';
import { createRng } from '@/utils';

/** Patrón de grano de papel (se regenera si cambia la densidad de píxeles). */
export function getGrainPattern(dpr) {
  if (renderCache.grainPattern && renderCache.grainDpr === dpr) return renderCache.grainPattern;
  const per = Math.round(256 * dpr),
    g = document.createElement('canvas');
  g.width = g.height = per;
  const q = g.getContext('2d'),
    rn = createRng(8);
  for (let i = 0; i < 1400; i++) {
    q.fillStyle = rn() < 0.5 ? 'rgba(110,75,35,.07)' : 'rgba(255,245,215,.09)';
    q.fillRect(rn() * per, rn() * per, (1 + rn() * 2) * dpr, (1 + rn() * 2) * dpr);
  }
  renderCache.grainPeriod = per;
  renderCache.grainDpr = dpr;
  return (renderCache.grainPattern = dom.ctx.createPattern(g, 'repeat'));
}
