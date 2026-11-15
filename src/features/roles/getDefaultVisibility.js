// @ts-check
// src/features/roles/getDefaultVisibility.js
import { session } from '@/state';

/**
 * Visibilidad de lo que se crea ahora: «todos» si eres DM, «mio» si eres jugador.
 * @param {'dm'|'jugador'} [role]
 * @returns {'todos'|'mio'}
 */
export const getDefaultVisibility = (role = session.role) => (role === 'dm' ? 'todos' : 'mio');
