// src/ui/paint/buildTornPath.js
import { WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { createRng } from '@/utils';

/** Construye el borde irregular del papel roto. */
export function buildTornPath() {
  const torn = new Path2D();
  {
    const rn = createRng(3),
      J = () => rn() * 16;
    let f = true;
    const add = (x, y) => {
      f ? torn.moveTo(x, y) : torn.lineTo(x, y);
      f = false;
    };
    for (let x = 0; x <= WORLD_WIDTH; x += 30) add(x, J());
    for (let y = 0; y <= WORLD_HEIGHT; y += 30) add(WORLD_WIDTH - J(), y);
    for (let x = WORLD_WIDTH; x >= 0; x -= 30) add(x, WORLD_HEIGHT - J());
    for (let y = WORLD_HEIGHT; y >= 0; y -= 30) add(J(), y);
    torn.closePath();
  }
  return torn;
}
