// src/ui/render/worldToMiniX.js
import { MINI_WIDTH, WORLD_WIDTH } from '@/config';

/** Coordenada X del mundo en el minimapa. */
export const worldToMiniX = (x) => ((x + 60) / (WORLD_WIDTH + 120)) * MINI_WIDTH;
