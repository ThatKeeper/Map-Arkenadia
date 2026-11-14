// tests/features/labels.test.js
import { beforeEach, describe, expect, it } from 'vitest';
import { resetSession } from '../helpers/resetSession.js';
import { LABELS, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { redo, undo } from '@/features/history';
import {
  addLabel, getEffectiveLabels, getLabelById, removeLabel, restoreLabel, restoreOriginalLabels, updateLabel,
} from '@/features/labels';
import { session } from '@/state';

beforeEach(() => resetSession());

describe('etiquetas editables', () => {
  it('sin cambios, las efectivas son exactamente las originales (texto, posición, tipo, rotación)', () => {
    const list = getEffectiveLabels();
    expect(list).toHaveLength(LABELS.length);
    list.forEach((l, i) => {
      const o = LABELS[i];
      expect([l.id, l.texto, l.x, l.y, l.tipo, l.minZoom, l.rot, l.tam]).toEqual([
        'o' + i, o[0], o[1] * WORLD_WIDTH, o[2] * WORLD_HEIGHT, o[3], o[4], o[5], 1,
      ]);
      expect([l.original, l.editada]).toEqual([true, false]);
    });
  });

  it('reutiliza el resultado mientras no cambien las etiquetas', () => {
    expect(getEffectiveLabels()).toBe(getEffectiveLabels());
    updateLabel('o0', { texto: 'Otro' });
    expect(getLabelById('o0').texto).toBe('Otro');
  });

  it('editar una original cambia solo lo pedido y la marca como editada', () => {
    updateLabel('o3', { texto: 'Nuevo nombre', tam: 2, rot: 0.5, estilo: 's', x: 10, y: 20 });
    expect(getLabelById('o3')).toMatchObject({ texto: 'Nuevo nombre', tam: 2, rot: 0.5, tipo: 's', x: 10, y: 20, editada: true });
    expect(getLabelById('o4').editada).toBe(false);
  });

  it('crear, editar y borrar etiquetas propias', () => {
    const id = addLabel(100.4, 200.6, 'Mi isla', 'r');
    expect(id).toBe('c1');
    expect(getLabelById(id)).toMatchObject({ texto: 'Mi isla', x: 100, y: 201, tipo: 'r', original: false, minZoom: 0 });
    expect(addLabel(1, 1)).toBe('c2');
    updateLabel(id, { texto: 'Isla Verde' });
    expect(getLabelById(id).texto).toBe('Isla Verde');
    removeLabel(id);
    expect(getLabelById(id)).toBe(undefined);
    expect(session.userData.labels.custom).toHaveLength(1);
  });

  it('borrar una original la oculta y se puede restaurar', () => {
    removeLabel('o5');
    expect(getLabelById('o5')).toBe(undefined);
    expect(getEffectiveLabels()).toHaveLength(LABELS.length - 1);
    restoreLabel('o5');
    expect(getLabelById('o5').texto).toBe(LABELS[5][0]);
  });

  it('restoreOriginalLabels deshace ediciones y borrados pero conserva las propias', () => {
    updateLabel('o1', { texto: 'X' });
    removeLabel('o2');
    addLabel(1, 1);
    expect(restoreOriginalLabels()).toBe(2);
    expect(getEffectiveLabels()).toHaveLength(LABELS.length + 1);
    expect(getLabelById('o1').texto).toBe(LABELS[1][0]);
    expect(restoreOriginalLabels()).toBe(0);
  });

  it('todo se deshace y se rehace', () => {
    updateLabel('o1', { texto: 'X' });
    removeLabel('o2');
    undo();
    expect(getLabelById('o2')).toBeTruthy();
    undo();
    expect(getLabelById('o1').texto).toBe(LABELS[1][0]);
    redo();
    expect(getLabelById('o1').texto).toBe('X');
  });

  it('los movimientos seguidos de una etiqueta se fusionan en una sola acción', () => {
    for (let i = 1; i <= 5; i++) updateLabel('o7', { x: i * 10, y: i * 10 }, 'etiqueta:o7:mover');
    expect(getLabelById('o7')).toMatchObject({ x: 50, y: 50 });
    undo();
    expect(getLabelById('o7').editada).toBe(false);
  });
});
