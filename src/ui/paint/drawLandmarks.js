// src/ui/paint/drawLandmarks.js
import { TAU, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';

/** Dibuja los puntos de interés. */
export function drawLandmarks({ g, P, LW, wx0, wy0, wx1, wy1 }) {
  for (const [px, py] of [
    [0.505, 0.107],
    [0.159, 0.385],
    [0.789, 0.589],
    [0.49, 0.836],
    [0.056, 0.554],
  ]) {
    const x = px * WORLD_WIDTH,
      y = py * WORLD_HEIGHT;
    if (x + 24 < wx0 || x - 24 > wx1 || y + 24 < wy0 || y - 24 > wy1) continue;
    g.strokeStyle = `rgba(${P.ink},.95)`;
    g.lineWidth = LW(2.5);
    g.beginPath();
    g.arc(x, y, 13, 0, TAU);
    g.stroke();
    g.beginPath();
    g.arc(x, y, 19, 0.3, 5.5);
    g.lineWidth = LW(1);
    g.stroke();
    g.fillStyle = `rgba(${P.ink},.95)`;
    g.beginPath();
    g.arc(x, y, 5, 0, TAU);
    g.fill();
  }
}
