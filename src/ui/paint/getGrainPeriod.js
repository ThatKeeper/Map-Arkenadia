// src/ui/paint/getGrainPeriod.js
import { getGrainPattern } from './getGrainPattern';
import { renderCache, session } from '@/state';

/** Período en píxeles del patrón de grano. */
export const getGrainPeriod = () => (getGrainPattern(session.quality.dpr), renderCache.grainPeriod);
