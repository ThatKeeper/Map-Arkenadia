// tests/services/sanitizeUserData.test.js
import { describe, expect, it } from 'vitest';
import { MARKER_ICONS, SCHEMA_VERSION, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { sanitizeUserData } from '@/services/storage';

describe('sanitizeUserData', () => {
  it('devuelve datos vacíos y versionados ante entradas inválidas', () => {
    for (const input of [null, undefined, 5, 'texto', true, []]) {
      expect(sanitizeUserData(input)).toEqual({
        schemaVersion: SCHEMA_VERSION,
        markers: [],
        route: [],
        scale: 1,
        unit: 'leguas',
        nid: 1,
      });
    }
  });

  it('conserva marcadores válidos y reasigna ids correlativos', () => {
    const d = sanitizeUserData({
      markers: [
        { id: 99, x: 10, y: 20, n: 'Puerto', i: 1, t: 'nota' },
        { id: 99, x: 30, y: 40, n: 'Faro', i: 0, t: '' },
      ],
    });
    expect(d.markers.map((m) => m.id)).toEqual([1, 2]);
    expect(d.markers[0]).toEqual({ id: 1, x: 10, y: 20, n: 'Puerto', i: 1, t: 'nota' });
    expect(d.nid).toBe(3);
  });

  it('descarta marcadores sin coordenadas finitas', () => {
    const d = sanitizeUserData({
      markers: [{ x: 'a', y: 1 }, { x: 1 }, null, { x: NaN, y: 2 }, { x: 5, y: 6 }],
    });
    expect(d.markers).toHaveLength(1);
    expect(d.markers[0].x).toBe(5);
  });

  it('limita las coordenadas al mundo', () => {
    const d = sanitizeUserData({ markers: [{ x: -50, y: 99999 }, { x: 99999, y: -1 }] });
    expect(d.markers[0].x).toBe(0);
    expect(d.markers[0].y).toBe(WORLD_HEIGHT);
    expect(d.markers[1].x).toBe(WORLD_WIDTH);
    expect(d.markers[1].y).toBe(0);
  });

  it('recorta textos, pone nombre por defecto y corrige iconos fuera de rango', () => {
    const d = sanitizeUserData({
      markers: [
        { x: 1, y: 1, n: 'x'.repeat(100), t: 'y'.repeat(500), i: 9999 },
        { x: 2, y: 2, n: '', i: -3 },
      ],
    });
    expect(d.markers[0].n).toHaveLength(40);
    expect(d.markers[0].t).toHaveLength(200);
    expect(d.markers[0].i).toBe(0);
    expect(d.markers[1].n).toBe('Marcador');
    expect(d.markers[1].i).toBe(0);
    expect(MARKER_ICONS.length).toBeGreaterThan(1);
  });

  it('acepta un icono válido', () => {
    const d = sanitizeUserData({ markers: [{ x: 1, y: 1, i: 1 }] });
    expect(d.markers[0].i).toBe(1);
  });

  it('limita a 500 marcadores y 500 puntos de ruta', () => {
    const markers = Array.from({ length: 700 }, (_, k) => ({ x: k, y: k }));
    const route = Array.from({ length: 700 }, (_, k) => ({ x: k, y: k }));
    const d = sanitizeUserData({ markers, route });
    expect(d.markers).toHaveLength(500);
    expect(d.route).toHaveLength(500);
  });

  it('valida la ruta, la escala y la unidad', () => {
    const d = sanitizeUserData({
      route: [{ x: 1, y: 2, n: 'A' }, { x: 'no', y: 2 }, { x: 3, y: 4 }],
      scale: 2.5,
      unit: 'leguas',
    });
    expect(d.route).toEqual([{ x: 1, y: 2, n: 'A' }, { x: 3, y: 4, n: '' }]);
    expect(d.scale).toBe(2.5);
    expect(d.unit).toBe('leguas');
  });

  it('ignora escala y unidad inválidas', () => {
    for (const scale of [0, -1, 1e6, NaN, '3']) expect(sanitizeUserData({ scale }).scale).toBe(1);
    expect(sanitizeUserData({ unit: 'parsecs' }).unit).toBe('leguas');
  });

  it('es idempotente: sanitizar dos veces da lo mismo', () => {
    const once = sanitizeUserData({
      markers: [{ x: 10, y: 10, n: 'A', i: 1, t: 'x' }],
      route: [{ x: 1, y: 1 }],
      scale: 3,
    });
    expect(sanitizeUserData(once)).toEqual(once);
  });

  it('carga datos de la versión anterior (sin schemaVersion) sin perder nada', () => {
    const v0 = {
      markers: [{ id: 4, x: 100, y: 200, n: 'Ciudad', i: 0, t: 'capital' }],
      route: [{ x: 1, y: 2, n: '' }],
      scale: 5,
      unit: 'leguas',
      nid: 5,
    };
    const d = sanitizeUserData(v0);
    expect(d.schemaVersion).toBe(SCHEMA_VERSION);
    expect(d.markers).toHaveLength(1);
    expect(d.markers[0].n).toBe('Ciudad');
    expect(d.markers[0].t).toBe('capital');
    expect(d.route).toHaveLength(1);
    expect(d.scale).toBe(5);
  });
});
