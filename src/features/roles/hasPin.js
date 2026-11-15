// @ts-check
// src/features/roles/hasPin.js
import { session } from '@/state';

/** Indica si hay un PIN de DM configurado. */
export const hasPin = () => !!session.pin;
