// src/ui/paint/strokeCoastlines.js
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { buildVisibleChunkPath } from '@/features/geometry';
import { build } from '@/state';

/** Traza costas y curvas de nivel. */
export function strokeCoastlines({ g, P, LW, wx0, wy0, wx1, wy1, ww, wh }) {
  g.lineJoin = 'round';
  g.lineCap = 'round';
  const big = ww * wh > 0.15 * WORLD_WIDTH * WORLD_HEIGHT,
    mg = LW(3) * 1.5 + 3,
    SP = (key) =>
      big
        ? build.geometry[key]
        : buildVisibleChunkPath(build.chunks[key], wx0 - mg, wy0 - mg, wx1 + mg, wy1 + mg);
  g.strokeStyle = `rgba(${P.ink},.2)`;
  g.lineWidth = LW(0.9);
  g.stroke(SP('m'));
  g.stroke(SP('sh'));
  g.strokeStyle = `rgba(${P.ink},.38)`;
  g.lineWidth = LW(1);
  g.stroke(SP('r1'));
  g.lineWidth = LW(0.8);
  g.stroke(SP('r2'));
  g.strokeStyle = `rgba(${P.ink},.95)`;
  g.lineWidth = LW(3);
  g.stroke(SP('land'));
}
