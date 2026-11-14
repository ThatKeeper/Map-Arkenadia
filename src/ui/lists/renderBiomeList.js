// src/ui/lists/renderBiomeList.js
import { BIOME_LIST_ORDER, BIOME_NAMES, PALETTES } from '@/config';
import { toggleBiomeHighlight } from '@/features/biomes';
import { session, terrainClasses } from '@/state';
import { byId, createEl } from '@/utils';

/** Redibuja la lista de biomas con su porcentaje de tierra. */
export function renderBiomeList() {
  const box = byId('bList');
  if (!box) return;
  box.textContent = '';
  const h = {};
  let land = 0;
  for (let i = 0; i < terrainClasses.length; i++) {
    h[terrainClasses[i]] = (h[terrainClasses[i]] || 0) + 1;
    if (terrainClasses[i] >= 4) land++;
  }
  for (const k of BIOME_LIST_ORDER) {
    const b = createEl('button', null, 'bio'),
      sw = createEl('i'),
      nm = createEl('span', BIOME_NAMES[k]),
      pc = createEl('em', land ? ((100 * (h[k] || 0)) / land).toFixed(0) + ' %' : '');
    sw.style.background = PALETTES[session.paletteMode].b[k];
    b.setAttribute('aria-pressed', String(session.highlightedBiome === k));
    b.append(sw, nm, pc);
    b.onclick = () => toggleBiomeHighlight(k);
    box.appendChild(b);
  }
}
