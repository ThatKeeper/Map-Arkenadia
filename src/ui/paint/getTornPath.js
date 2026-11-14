// src/ui/paint/getTornPath.js
import { buildTornPath } from './buildTornPath';
import { renderCache } from '@/state';

/** Devuelve (y cachea) el borde irregular del papel. */
export const getTornPath = () => renderCache.tornPath || (renderCache.tornPath = buildTornPath());
