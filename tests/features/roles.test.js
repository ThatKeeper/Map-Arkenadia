// tests/features/roles.test.js
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resetSession } from '../helpers/resetSession.js';
import { removeCategory, updateCategory, getCategoryById, countMarkersByCategory } from '@/features/categories';
import { redo, undo } from '@/features/history';
import { addLabel, getEffectiveLabels, getVisibleLabels, removeLabel, restoreOriginalLabels, updateLabel } from '@/features/labels';
import { addMarker, clearMarkers, getKnownMarkerNames, getMarkerById, getVisibleMarkers, removeMarker, updateMarker } from '@/features/markers';
import {
  canEditVisibility, getDefaultVisibility, hasPin, hashPin, isValidPin, isVisibleInRole, removePin, setPin, setRole,
  sha256Hex, switchToDm, verifyPin,
} from '@/features/roles';
import { session } from '@/state';
import { on } from '@/utils';

beforeEach(() => resetSession());

/** Tres marcadores: uno por cada visibilidad. */
function seed() {
  const a = addMarker(1, 1, 'ciudad'),
    b = addMarker(2, 2, 'peligro'),
    c = addMarker(3, 3, 'nota');
  updateMarker(a.id, { nombre: 'Publico', visibilidad: 'todos' });
  updateMarker(b.id, { nombre: 'Secreto', visibilidad: 'dm', notaDm: 'solo DM' });
  updateMarker(c.id, { nombre: 'Personal', visibilidad: 'mio' });
  return { a: a.id, b: b.id, c: c.id };
}

describe('SHA-256 y PIN', () => {
  it('SHA-256 cumple los vectores de prueba estándar', () => {
    expect(sha256Hex('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    expect(sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    expect(sha256Hex('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq')).toBe(
      '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1',
    );
    expect(sha256Hex('á')).toBe(sha256Hex('á'));
    expect(sha256Hex('x'.repeat(1000))).toHaveLength(64);
  });

  it('hashPin es determinista y depende de la sal y del PIN', () => {
    expect(hashPin('1234', 'sal')).toBe(hashPin('1234', 'sal'));
    expect(hashPin('1234', 'sal')).not.toBe(hashPin('1234', 'otra'));
    expect(hashPin('1234', 'sal')).not.toBe(hashPin('1235', 'sal'));
    expect(hashPin('1234', 'sal')).toHaveLength(64);
  });

  it('un PIN válido son 4 a 8 cifras', () => {
    for (const ok of ['1234', '12345678', '0000']) expect(isValidPin(ok)).toBe(true);
    for (const bad of ['123', '123456789', 'abcd', '12 34', '', 1234, null]) expect(isValidPin(bad)).toBe(false);
  });

  it('poner, comprobar, cambiar y quitar el PIN', () => {
    expect(hasPin()).toBe(false);
    expect(verifyPin('lo que sea')).toBe(true);
    expect(setPin('12', '')).toEqual({ ok: false, reason: 'formato' });
    expect(setPin('1234')).toEqual({ ok: true });
    expect(hasPin()).toBe(true);
    expect(verifyPin('1234')).toBe(true);
    expect(verifyPin('1235')).toBe(false);
    expect(JSON.stringify(session.pin)).not.toContain('1234');
    expect(setPin('5678', 'mal')).toEqual({ ok: false, reason: 'actual' });
    expect(setPin('5678', '1234')).toEqual({ ok: true });
    expect(verifyPin('5678')).toBe(true);
    expect(removePin('0000').ok).toBe(false);
    expect(removePin('5678').ok).toBe(true);
    expect(hasPin()).toBe(false);
  });

  it('cada vez se genera una sal distinta', () => {
    setPin('1234');
    const first = session.pin.salt;
    setPin('1234', '1234');
    expect(session.pin.salt).not.toBe(first);
  });
});

describe('cambio de rol', () => {
  it('setRole cambia, avisa con role:changed y no repite si no cambia', () => {
    const seen = [];
    const off = on('role:changed', (p) => seen.push(p.role));
    setRole('jugador');
    setRole('jugador');
    setRole('dm');
    off();
    expect(seen).toEqual(['jugador', 'dm']);
  });

  it('sin PIN se entra en modo DM directamente', () => {
    setRole('jugador');
    expect(switchToDm()).toEqual({ ok: true });
    expect(session.role).toBe('dm');
  });

  it('con PIN hay que darlo, y uno incorrecto no cambia nada', () => {
    setPin('1234');
    setRole('jugador');
    expect(switchToDm()).toEqual({ ok: false, reason: 'pin' });
    expect(switchToDm('0000')).toEqual({ ok: false, reason: 'incorrecto' });
    expect(session.role).toBe('jugador');
    expect(switchToDm('1234')).toEqual({ ok: true });
    expect(session.role).toBe('dm');
  });
});

describe('visibilidad', () => {
  it('matriz de qué se ve en cada rol', () => {
    expect(['todos', 'dm', 'mio'].map((v) => isVisibleInRole(v, 'dm'))).toEqual([true, true, true]);
    expect(['todos', 'dm', 'mio'].map((v) => isVisibleInRole(v, 'jugador'))).toEqual([true, false, true]);
  });

  it('el DM edita todo; el jugador solo lo suyo', () => {
    expect(['todos', 'dm', 'mio'].map((v) => canEditVisibility(v, 'dm'))).toEqual([true, true, true]);
    expect(['todos', 'dm', 'mio'].map((v) => canEditVisibility(v, 'jugador'))).toEqual([false, false, true]);
  });

  it('lo que se crea es «todos» para el DM y «mio» para el jugador', () => {
    expect(getDefaultVisibility('dm')).toBe('todos');
    expect(getDefaultVisibility('jugador')).toBe('mio');
    expect(addMarker(1, 1).visibilidad).toBe('todos');
    setRole('jugador');
    expect(addMarker(2, 2).visibilidad).toBe('mio');
    expect(getLabelOf(addLabel(5, 5)).visibilidad).toBe('mio');
  });

  it('los marcadores visibles dependen del rol', () => {
    seed();
    expect(getVisibleMarkers().map((m) => m.nombre)).toEqual(['Publico', 'Secreto', 'Personal']);
    setRole('jugador');
    expect(getVisibleMarkers().map((m) => m.nombre)).toEqual(['Publico', 'Personal']);
    expect(getVisibleMarkers('dm')).toHaveLength(3);
  });

  it('en modo jugador no se cuentan ni se sugieren los marcadores del DM', () => {
    seed();
    expect(countMarkersByCategory().peligro).toBe(1);
    expect(getKnownMarkerNames()).toContain('Secreto');
    setRole('jugador');
    expect(countMarkersByCategory().peligro).toBe(undefined);
    expect(getKnownMarkerNames()).toEqual(['Personal', 'Publico']);
  });

  it('las etiquetas visibles dependen del rol (incluidas las originales ocultas por el DM)', () => {
    updateLabel('o3', { visibilidad: 'dm' });
    const id = addLabel(10, 10, 'Oculta');
    updateLabel(id, { visibilidad: 'dm' });
    const all = getEffectiveLabels().length;
    expect(getVisibleLabels()).toHaveLength(all);
    setRole('jugador');
    expect(getVisibleLabels()).toHaveLength(all - 2);
    expect(getVisibleLabels().some((l) => l.id === 'o3' || l.id === id)).toBe(false);
    setRole('dm');
    expect(getVisibleLabels()).toHaveLength(all);
  });
});

const getLabelOf = (id) => getEffectiveLabels().find((l) => l.id === id);

describe('permisos de edición del jugador', () => {
  it('no puede editar ni borrar lo compartido ni lo del DM, pero sí lo suyo', () => {
    const { a, c } = seed();
    setRole('jugador');
    expect(updateMarker(a, { nombre: 'Hackeado' })).toBe(false);
    expect(removeMarker(a)).toBe(false);
    expect(getMarkerById(a).nombre).toBe('Publico');
    expect(updateMarker(c, { nombre: 'Mi diario' })).toBe(true);
    expect(removeMarker(c)).toBe(true);
  });

  it('no puede cambiar la visibilidad ni la nota privada, ni siquiera de lo suyo', () => {
    const { c } = seed();
    setRole('jugador');
    expect(updateMarker(c, { visibilidad: 'todos' })).toBe(false);
    expect(updateMarker(c, { notaDm: 'x' })).toBe(false);
    expect(getMarkerById(c).visibilidad).toBe('mio');
  });

  it('borrar todos solo borra los suyos', () => {
    seed();
    setRole('jugador');
    expect(clearMarkers()).toBe(1);
    setRole('dm');
    expect(session.userData.markers.map((m) => m.nombre)).toEqual(['Publico', 'Secreto']);
  });

  it('no puede editar el catálogo de categorías ni restaurar etiquetas', () => {
    setRole('jugador');
    updateCategory('ciudad', { nombre: 'X' });
    expect(getCategoryById('ciudad').nombre).toBe('Ciudad');
    expect(removeCategory('ciudad')).toBe(false);
    updateLabel('o1', { texto: 'X' });
    expect(getEffectiveLabels().find((l) => l.id === 'o1').texto).not.toBe('X');
    removeLabel('o1');
    expect(getEffectiveLabels().some((l) => l.id === 'o1')).toBe(true);
    expect(restoreOriginalLabels()).toBe(0);
  });

  it('el DM puede todo y los cambios siguen siendo deshacibles', () => {
    const { a } = seed();
    updateMarker(a, { nombre: 'Nuevo nombre' });
    expect(getMarkerById(a).nombre).toBe('Nuevo nombre');
    undo();
    expect(getMarkerById(a).nombre).toBe('Publico');
    redo();
    expect(getMarkerById(a).nombre).toBe('Nuevo nombre');
    expect(vi.fn().mock.calls).toHaveLength(0);
  });
});
