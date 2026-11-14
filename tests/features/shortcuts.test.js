// tests/features/shortcuts.test.js
import { beforeEach, describe, expect, it } from 'vitest';
import { resetSession } from '../helpers/resetSession.js';
import { DEFAULT_SHORTCUTS } from '@/config';
import {
  bindingsEqual, findShortcutForEvent, formatBinding, getShortcutBinding, normalizeKey, resetShortcuts, setShortcutBinding,
} from '@/features/shortcuts';
import { session } from '@/state';

beforeEach(() => resetSession());

const key = (k, o = {}) => ({ key: k, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...o });

describe('atajos de teclado', () => {
  it('ningún atajo por defecto repite la combinación de otro', () => {
    for (const a of DEFAULT_SHORTCUTS)
      for (const b of DEFAULT_SHORTCUTS)
        if (a.id !== b.id)
          expect(bindingsEqual({ key: a.key, ctrl: a.ctrl, shift: a.shift }, { key: b.key, ctrl: b.ctrl, shift: b.shift })).toBe(false);
  });

  it('ids únicos y con nombre y grupo', () => {
    expect(new Set(DEFAULT_SHORTCUTS.map((s) => s.id)).size).toBe(DEFAULT_SHORTCUTS.length);
    for (const s of DEFAULT_SHORTCUTS) expect(s.nombre && s.grupo).toBeTruthy();
  });

  it('reconoce las herramientas con M, R, E, D y T', () => {
    expect(findShortcutForEvent(key('m'))).toBe('toolMarker');
    expect(findShortcutForEvent(key('M'))).toBe('toolMarker');
    expect(findShortcutForEvent(key('r'))).toBe('toolRoute');
    expect(findShortcutForEvent(key('e'))).toBe('toolLabels');
    expect(findShortcutForEvent(key('d'))).toBe('toolDraw');
    expect(findShortcutForEvent(key('t'))).toBe('toolTerritory');
    expect(findShortcutForEvent(key('d', { shiftKey: true }))).toBe('toggleDm');
  });

  it('distingue deshacer y rehacer por Mayús, y acepta Cmd como Ctrl', () => {
    expect(findShortcutForEvent(key('z', { ctrlKey: true }))).toBe('undo');
    expect(findShortcutForEvent(key('z', { metaKey: true }))).toBe('undo');
    expect(findShortcutForEvent(key('Z', { ctrlKey: true, shiftKey: true }))).toBe('redo');
    expect(findShortcutForEvent(key('y', { ctrlKey: true }))).toBe('redoAlt');
    expect(findShortcutForEvent(key('s', { ctrlKey: true }))).toBe('save');
  });

  it('zoom con + y = (y - y _), búsqueda con / y Ctrl+K, ayuda con ?', () => {
    expect(findShortcutForEvent(key('+', { shiftKey: true }))).toBe('zoomIn');
    expect(findShortcutForEvent(key('='))).toBe('zoomIn');
    expect(findShortcutForEvent(key('-'))).toBe('zoomOut');
    expect(findShortcutForEvent(key('_', { shiftKey: true }))).toBe('zoomOut');
    expect(findShortcutForEvent(key('0'))).toBe('fitAll');
    expect(findShortcutForEvent(key('/'))).toBe('search');
    expect(findShortcutForEvent(key('k', { ctrlKey: true }))).toBe('searchCtrl');
    expect(findShortcutForEvent(key('?', { shiftKey: true }))).toBe('help');
  });

  it('no activa atajos con Alt, con teclas desconocidas ni con modificadores sobrantes', () => {
    expect(findShortcutForEvent(key('m', { altKey: true }))).toBe(null);
    expect(findShortcutForEvent(key('q'))).toBe(null);
    expect(findShortcutForEvent(key('m', { ctrlKey: true }))).toBe(null);
    expect(findShortcutForEvent(key('m', { shiftKey: true }))).toBe(null);
  });

  it('normalizeKey', () => {
    expect([normalizeKey('='), normalizeKey('_'), normalizeKey('A'), normalizeKey('Escape')]).toEqual(['+', '-', 'a', 'Escape']);
  });

  it('formatBinding da un texto legible', () => {
    expect(formatBinding({ key: 'z', ctrl: true, shift: true })).toMatch(/Mayús\+Z$/);
    expect(formatBinding({ key: 'm' })).toBe('M');
    expect(formatBinding(null)).toBe('');
  });

  it('se puede reasignar un atajo y deja de valer el anterior', () => {
    expect(setShortcutBinding('toolMarker', { key: 'j' })).toEqual({ ok: true });
    expect(findShortcutForEvent(key('j'))).toBe('toolMarker');
    expect(findShortcutForEvent(key('m'))).toBe(null);
    expect(getShortcutBinding('toolMarker')).toMatchObject({ key: 'j' });
  });

  it('rechaza una combinación ya usada por otro atajo', () => {
    expect(setShortcutBinding('toolMarker', { key: 'r' })).toEqual({ ok: false, conflictId: 'toolRoute' });
    expect(setShortcutBinding('toolMarker', { key: 'z', ctrl: true })).toEqual({ ok: false, conflictId: 'undo' });
    expect(getShortcutBinding('toolMarker').key).toBe('m');
  });

  it('volver a la combinación original quita la personalización; resetShortcuts restaura todo', () => {
    setShortcutBinding('toolMarker', { key: 'j' });
    setShortcutBinding('toolMarker', { key: 'm' });
    expect(session.shortcuts.toolMarker).toBe(undefined);
    setShortcutBinding('toolRoute', { key: 'k' });
    resetShortcuts();
    expect(session.shortcuts).toEqual({});
    expect(findShortcutForEvent(key('r'))).toBe('toolRoute');
  });
});
