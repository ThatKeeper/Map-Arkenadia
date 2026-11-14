// src/ui/render/worldToMiniY.js
import { MINI_HEIGHT, WORLD_HEIGHT } from '@/config';

/** Coordenada Y del mundo en el minimapa. */
export const worldToMiniY = (y) => ((y + 60) / (WORLD_HEIGHT + 120)) * MINI_HEIGHT;
