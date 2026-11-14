// src/ui/panels/showBiomeTip.js
import { BIOME_NAMES } from '@/config';
import { terrainClassAt } from '@/features/terrain';
import { interaction, viewport } from '@/state';
import { byId } from '@/utils';

/** Muestra el bioma y coordenadas junto al cursor. */
export function showBiomeTip(cx, cy, wx, wy, timed) {
  const t = byId('tip'),
    b = BIOME_NAMES[terrainClassAt(wx, wy)];
  t.textContent = b + ' · ' + Math.round(wx) + ', ' + Math.round(wy);
  t.hidden = false;
  const r = t.getBoundingClientRect(),
    x = Math.min(cx + 16, viewport.width - r.width - 8),
    y = Math.min(cy + 18, viewport.height - r.height - 8);
  t.style.left = Math.max(8, x) + 'px';
  t.style.top = Math.max(8, y) + 'px';
  clearTimeout(interaction.tipTimer);
  if (timed) interaction.tipTimer = setTimeout(() => (t.hidden = true), 2600);
}
