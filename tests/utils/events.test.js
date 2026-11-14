// tests/utils/events.test.js
import { describe, expect, it, vi } from 'vitest';
import { emit, off, on } from '@/utils';

describe('bus de eventos', () => {
  it('entrega el payload a los suscriptores en orden', () => {
    const calls = [];
    const u1 = on('t:orden', (p) => calls.push(['a', p]));
    const u2 = on('t:orden', (p) => calls.push(['b', p]));
    expect(emit('t:orden', 7)).toBe(2);
    expect(calls).toEqual([['a', 7], ['b', 7]]);
    u1();
    u2();
  });

  it('on devuelve una función que cancela la suscripción', () => {
    const fn = vi.fn();
    const unsubscribe = on('t:cancelar', fn);
    emit('t:cancelar');
    unsubscribe();
    emit('t:cancelar');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('off no falla si el evento o el manejador no existen', () => {
    expect(() => off('t:nada', () => {})).not.toThrow();
    on('t:otro', () => {});
    expect(() => off('t:otro', () => {})).not.toThrow();
  });

  it('emit sin suscriptores devuelve 0', () => {
    expect(emit('t:sin-nadie', 1)).toBe(0);
  });

  it('un manejador que falla no impide que los demás se ejecuten', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const ok = vi.fn();
    const u1 = on('t:error', () => {
      throw new Error('fallo de prueba');
    });
    const u2 = on('t:error', ok);
    emit('t:error', 1);
    expect(ok).toHaveBeenCalledWith(1);
    expect(spy).toHaveBeenCalled();
    u1();
    u2();
    spy.mockRestore();
  });

  it('se puede cancelar la suscripción dentro de un manejador sin saltarse a otros', () => {
    const calls = [];
    const u1 = on('t:mutar', () => {
      calls.push('a');
      u1();
    });
    const u2 = on('t:mutar', () => calls.push('b'));
    emit('t:mutar');
    emit('t:mutar');
    expect(calls).toEqual(['a', 'b', 'b']);
    u2();
  });
});
