// src/ui/render/drawOverlay.js
import { drawCompassRose } from './drawCompassRose';
import { drawMapTitle } from './drawMapTitle';

/** Dibuja título y rosa de los vientos. */
export function drawOverlay(P, vx0, vy0, vx1, vy1) {
  drawMapTitle(P, vx0, vy0, vx1, vy1);
  drawCompassRose(P, vx0, vy0, vx1, vy1);
}
