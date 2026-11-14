// src/ui/paint/drawVignetteAndFrame.js
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';

/** Dibuja viñeta y marco del mapa. */
export function drawVignetteAndFrame({ g, P, LW, wx0, wy0, ww, wh }) {
  const vg = g.createRadialGradient(
    WORLD_WIDTH / 2,
    WORLD_HEIGHT / 2,
    WORLD_HEIGHT * 0.45,
    WORLD_WIDTH / 2,
    WORLD_HEIGHT / 2,
    WORLD_WIDTH * 0.62,
  );
  vg.addColorStop(0, 'rgba(80,50,20,0)');
  vg.addColorStop(1, `rgba(80,50,20,${P.vig})`);
  g.fillStyle = vg;
  g.fillRect(wx0, wy0, ww, wh);
  g.strokeStyle = `rgba(${P.ink},.85)`;
  g.lineWidth = LW(3);
  g.strokeRect(34, 34, WORLD_WIDTH - 68, WORLD_HEIGHT - 68);
  g.lineWidth = LW(1.2);
  g.strokeRect(44, 44, WORLD_WIDTH - 88, WORLD_HEIGHT - 88);
}
