// @ts-check
// src/features/history/canUndo.js
import { history } from '@/state';

/** Indica si hay algo que deshacer. */
export const canUndo = () => history.undo.length > 0;
