// tests/features/history.test.js
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetSession } from '../helpers/resetSession.js';
import { canRedo, canUndo, clearHistory, executeCommand, redo, undo, updateUserData } from '@/features/history';
import { history, session } from '@/state';
import { on } from '@/utils';

let clock, nowSpy;

beforeEach(() => {
  resetSession();
  clock = 1000;
  nowSpy = vi.spyOn(performance, 'now').mockImplementation(() => clock);
});
afterEach(() => nowSpy.mockRestore());

/** Comando de prueba que suma a un contador. */
const add = (state, n, groupKey) => ({
  label: 'sumar ' + n,
  groupKey,
  do: () => (state.v += n),
  undo: () => (state.v -= n),
});

describe('historial (deshacer / rehacer)', () => {
  it('ejecuta, deshace y rehace comandos', () => {
    const s = { v: 0 };
    executeCommand(add(s, 5));
    executeCommand(add(s, 2));
    expect(s.v).toBe(7);
    expect(undo()).toBe('sumar 2');
    expect(s.v).toBe(5);
    expect(redo()).toBe('sumar 2');
    expect(s.v).toBe(7);
  });

  it('undo y redo devuelven null si no hay nada', () => {
    expect(undo()).toBe(null);
    expect(redo()).toBe(null);
    expect([canUndo(), canRedo()]).toEqual([false, false]);
  });

  it('un comando nuevo vacía la pila de rehacer', () => {
    const s = { v: 0 };
    executeCommand(add(s, 1));
    undo();
    expect(canRedo()).toBe(true);
    executeCommand(add(s, 10));
    expect(canRedo()).toBe(false);
  });

  it('fusiona comandos seguidos con la misma groupKey: un deshacer revierte toda la serie', () => {
    // Como los comandos reales, estos fijan un valor (no suman): así la fusión es válida.
    const s = { v: 0 };
    const set = (to) => {
      const prev = s.v;
      return { label: 'mover', groupKey: 'arrastre', do: () => (s.v = to), undo: () => (s.v = prev) };
    };
    executeCommand(set(1));
    clock += 100;
    executeCommand(set(2));
    clock += 100;
    executeCommand(set(3));
    expect(s.v).toBe(3);
    expect(history.undo).toHaveLength(1);
    undo();
    expect(s.v).toBe(0);
    redo();
    expect(s.v).toBe(3);
  });

  it('no fusiona si pasó demasiado tiempo o cambia la groupKey', () => {
    const s = { v: 0 };
    executeCommand(add(s, 1, 'g'));
    clock += history.mergeWindowMs + 1;
    executeCommand(add(s, 1, 'g'));
    executeCommand(add(s, 1, 'otra'));
    executeCommand(add(s, 1));
    expect(history.undo).toHaveLength(4);
  });

  it('limita la pila a 200 comandos', () => {
    const s = { v: 0 };
    for (let i = 0; i < 230; i++) executeCommand(add(s, 1));
    expect(history.undo).toHaveLength(200);
  });

  it('clearHistory vacía ambas pilas', () => {
    const s = { v: 0 };
    executeCommand(add(s, 1));
    undo();
    clearHistory();
    expect([canUndo(), canRedo()]).toEqual([false, false]);
  });

  it('avisa con el evento history:changed', () => {
    let n = 0;
    const off = on('history:changed', () => n++);
    const s = { v: 0 };
    executeCommand(add(s, 1));
    undo();
    redo();
    off();
    expect(n).toBe(3);
  });

  it('updateUserData cambia userData, se deshace y se rehace sin alias de objetos', () => {
    const seen = [];
    const off = on('userdata:changed', (p) => seen.push(p.keys.join()));
    updateUserData('ruta', ['route'], (d) => d.route.push({ x: 1, y: 2, n: '' }));
    expect(session.userData.route).toHaveLength(1);
    const ref = session.userData.route;
    undo();
    expect(session.userData.route).toHaveLength(0);
    redo();
    expect(session.userData.route).toEqual([{ x: 1, y: 2, n: '' }]);
    expect(session.userData.route).not.toBe(ref);
    off();
    expect(seen).toEqual(['route', 'route', 'route']);
  });

  it('updateUserData devuelve el valor de la función de cambio', () => {
    expect(updateUserData('x', ['route'], () => 42)).toBe(42);
  });
});
