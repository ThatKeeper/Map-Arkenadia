// src/ui/paint/screenLineWidth.js
import { viewport } from '@/state';

/** Grosor de línea de pantalla que compensa el zoom actual. */
export const screenLineWidth = (w) => w * Math.pow(viewport.scale, -0.7);
