// @ts-check
// src/features/history/canRedo.js
import { history } from '@/state';

/** Indica si hay algo que rehacer. */
export const canRedo = () => history.redo.length > 0;
