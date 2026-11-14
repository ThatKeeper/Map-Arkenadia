// src/ui/paint/fillTerrain.js
import { BIOME_PAINT_ORDER } from '@/config';
import { build } from '@/state';

/** Rellena mar, aguas someras, tierra y biomas. */
export function fillTerrain({ g, P, wx0, wy0, ww, wh }) {
  const Fl = (p, c) => {
    g.fillStyle = c;
    g.fill(p, 'evenodd');
  };
  g.fillStyle = P.deep;
  g.fillRect(wx0 - 2, wy0 - 2, ww + 4, wh + 4);
  Fl(build.geometry.m, P.mid);
  Fl(build.geometry.sh, P.sh);
  Fl(build.geometry.lt, P.lt);
  Fl(build.geometry.land, P.land);
  g.save();
  g.clip(build.geometry.land, 'evenodd');
  for (const k of BIOME_PAINT_ORDER) Fl(build.geometry.b[k], P.b[k]);
  g.restore();
}
