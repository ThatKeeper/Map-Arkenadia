// src/ui/events/centerOnMinimapPoint.js
import { MINI_HEIGHT, MINI_WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { centerOn } from '@/features/navigation';
import { dom } from '@/state';

/** Centra el mapa en el punto tocado del minimapa. */
export const centerOnMinimapPoint = (e) => {
  const r = dom.mini.getBoundingClientRect();
  centerOn(
    ((e.clientX - r.left) / MINI_WIDTH) * (WORLD_WIDTH + 120) - 60,
    ((e.clientY - r.top) / MINI_HEIGHT) * (WORLD_HEIGHT + 120) - 60,
  );
};
