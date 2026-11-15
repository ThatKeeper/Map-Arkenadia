// tests/services/sanitizeUserData.test.js
import { describe, expect, it } from 'vitest';
import { DEFAULT_CATEGORIES, INK_ICONS, SCHEMA_VERSION, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { sanitizeUserData } from '@/services/storage';

const marker = (o = {}) => ({ x: 10, y: 20, nombre: 'Puerto', categoria: 'ciudad', icono: 'ancla', ...o });

describe('sanitizeUserData', () => {
  it('devuelve datos vacíos, versionados y con categorías por defecto ante entradas inválidas', () => {
    for (const input of [null, undefined, 5, 'texto', true, []]) {
      const d = sanitizeUserData(input);
      expect(d.schemaVersion).toBe(SCHEMA_VERSION);
      expect(d.markers).toEqual([]);
      expect(d.route).toEqual([]);
      expect(d.categories.map((c) => c.id)).toEqual(DEFAULT_CATEGORIES.map((c) => c.id));
      expect(d.labels).toEqual({ edits: {}, custom: [], nid: 1 });
      expect([d.scale, d.unit, d.nid]).toEqual([1, 'leguas', 1]);
    }
  });

  it('conserva marcadores válidos y sus ids', () => {
    const d = sanitizeUserData({ markers: [marker({ id: 5 }), marker({ id: 9, nombre: 'Faro' })] });
    expect(d.markers.map((m) => m.id)).toEqual([5, 9]);
    expect(d.markers[0]).toEqual({
      id: 5, nombre: 'Puerto', nota: '', notaDm: '', x: 10, y: 20, categoria: 'ciudad', icono: 'ancla',
      visibilidad: 'todos', creado: 0, actualizado: 0,
    });
    expect(d.nid).toBe(10);
  });

  it('reasigna ids repetidos, inválidos o ausentes sin chocar con los existentes', () => {
    const d = sanitizeUserData({ markers: [marker({ id: 3 }), marker({ id: 3 }), marker({ id: -1 }), marker()] });
    const ids = d.markers.map((m) => m.id);
    expect(new Set(ids).size).toBe(4);
    expect(ids[0]).toBe(3);
    expect(d.nid).toBe(Math.max(...ids) + 1);
  });

  it('descarta marcadores sin coordenadas finitas', () => {
    const d = sanitizeUserData({ markers: [{ x: 'a', y: 1 }, { x: 1 }, null, { x: NaN, y: 2 }, marker()] });
    expect(d.markers).toHaveLength(1);
  });

  it('limita las coordenadas al mundo', () => {
    const d = sanitizeUserData({ markers: [marker({ x: -50, y: 99999 }), marker({ x: 99999, y: -1 })] });
    expect([d.markers[0].x, d.markers[0].y]).toEqual([0, WORLD_HEIGHT]);
    expect([d.markers[1].x, d.markers[1].y]).toEqual([WORLD_WIDTH, 0]);
  });

  it('recorta textos y pone nombre por defecto', () => {
    const d = sanitizeUserData({ markers: [marker({ nombre: 'x'.repeat(100), nota: 'y'.repeat(500) }), marker({ nombre: '  ' })] });
    expect(d.markers[0].nombre).toHaveLength(40);
    expect(d.markers[0].nota).toHaveLength(200);
    expect(d.markers[1].nombre).toBe('Marcador');
  });

  it('corrige categoría desconocida (→ Nota) e icono desconocido (→ el de su categoría)', () => {
    const d = sanitizeUserData({ markers: [marker({ categoria: 'inventada', icono: 'nada' })] });
    expect(d.markers[0].categoria).toBe('nota');
    expect(d.markers[0].icono).toBe(DEFAULT_CATEGORIES.find((c) => c.id === 'nota').icono);
  });

  it('valida la visibilidad y las fechas', () => {
    const d = sanitizeUserData({
      markers: [marker({ visibilidad: 'dm', creado: 100, actualizado: 200 }), marker({ visibilidad: 'xx', creado: -5, actualizado: 'a' })],
    });
    expect([d.markers[0].visibilidad, d.markers[0].creado, d.markers[0].actualizado]).toEqual(['dm', 100, 200]);
    expect([d.markers[1].visibilidad, d.markers[1].creado, d.markers[1].actualizado]).toEqual(['todos', 0, 0]);
  });

  it('limita a 500 marcadores y 500 puntos de ruta', () => {
    const d = sanitizeUserData({
      markers: Array.from({ length: 700 }, (_, k) => marker({ x: k })),
      route: Array.from({ length: 700 }, (_, k) => ({ x: k, y: k })),
    });
    expect(d.markers).toHaveLength(500);
    expect(d.route).toHaveLength(500);
  });

  it('valida la ruta, la escala y la unidad', () => {
    const d = sanitizeUserData({ route: [{ x: 1, y: 2, n: 'A' }, { x: 'no', y: 2 }, { x: 3, y: 4 }], scale: 2.5, unit: 'km' });
    expect(d.route).toEqual([{ x: 1, y: 2, n: 'A' }, { x: 3, y: 4, n: '' }]);
    expect([d.scale, d.unit]).toEqual([2.5, 'km']);
    for (const scale of [0, -1, 1e6, NaN, '3']) expect(sanitizeUserData({ scale }).scale).toBe(1);
    expect(sanitizeUserData({ unit: 'parsecs' }).unit).toBe('leguas');
  });

  it('depura las categorías: ids únicos y limpios, color válido, icono existente', () => {
    const d = sanitizeUserData({
      categories: [
        { id: 'Mi Cat!', nombre: 'Una', color: '#ABCDEF', icono: 'faro' },
        { id: 'micat', nombre: 'Repetida', color: '#000000', icono: 'faro' },
        { id: 'otra', nombre: '', color: 'rojo', icono: 'no-existe' },
        null,
        { nombre: 'sin id' },
      ],
    });
    expect(d.categories.map((c) => c.id)).toEqual(['micat', 'otra']);
    expect(d.categories[0].color).toBe('#abcdef');
    expect(d.categories[1]).toEqual({ id: 'otra', nombre: 'Categoría', color: '#6b4a2c', icono: 'pin' });
  });

  it('conserva categorías propias y respeta marcadores que las usan', () => {
    const d = sanitizeUserData({
      categories: [{ id: 'taberna', nombre: 'Taberna', color: '#112233', icono: 'posada' }],
      markers: [marker({ categoria: 'taberna', icono: 'faro' })],
    });
    expect(d.markers[0].categoria).toBe('taberna');
    expect(d.markers[0].icono).toBe('faro');
  });

  it('depura las etiquetas del usuario', () => {
    const d = sanitizeUserData({
      labels: {
        edits: { o0: { texto: 'Nuevo', tam: 99, rot: 1, estilo: 'c', oculta: true }, o9999: { texto: 'x' }, zz: { texto: 'y' }, o1: {} },
        custom: [{ id: 'c3', texto: 'Mi isla', x: 10, y: 20 }, { id: 'c3', texto: 'dup', x: 1, y: 1 }, { id: 'c4' }, { id: 'malo', x: 1, y: 1 }],
        nid: 1,
      },
    });
    expect(Object.keys(d.labels.edits)).toEqual(['o0']);
    expect(d.labels.edits.o0).toEqual({ texto: 'Nuevo', tam: 4, rot: 1, estilo: 'c', oculta: true });
    expect(d.labels.custom).toHaveLength(1);
    expect(d.labels.custom[0]).toEqual({ id: 'c3', texto: 'Mi isla', x: 10, y: 20, tam: 1, rot: 0, estilo: 'x' });
    expect(d.labels.nid).toBe(4);
  });

  it('conserva y recorta la nota privada del DM', () => {
    const d = sanitizeUserData({ markers: [marker({ notaDm: 'z'.repeat(900) }), marker({ notaDm: 'secreto' })] });
    expect(d.markers[0].notaDm).toHaveLength(500);
    expect(d.markers[1].notaDm).toBe('secreto');
  });

  it('depura la visibilidad y la fecha de las etiquetas', () => {
    const d = sanitizeUserData({
      labels: {
        edits: { o0: { visibilidad: 'dm', actualizado: 50 }, o1: { visibilidad: 'todos' }, o2: { visibilidad: 'raro', actualizado: -1 } },
        custom: [{ id: 'c1', texto: 'A', x: 1, y: 1, visibilidad: 'mio', actualizado: 9 }],
        nid: 2,
      },
    });
    expect(d.labels.edits.o0).toEqual({ visibilidad: 'dm', actualizado: 50 });
    expect(d.labels.edits.o1).toBe(undefined);
    expect(d.labels.edits.o2).toBe(undefined);
    expect(d.labels.custom[0]).toMatchObject({ visibilidad: 'mio', actualizado: 9 });
  });

  it('es idempotente: sanitizar dos veces da lo mismo', () => {
    const once = sanitizeUserData({
      markers: [marker({ id: 2, creado: 5 })],
      route: [{ x: 1, y: 1 }],
      scale: 3,
      labels: { edits: { o2: { texto: 'Hola' } }, custom: [{ id: 'c1', texto: 'T', x: 5, y: 5 }], nid: 2 },
    });
    expect(sanitizeUserData(once)).toEqual(once);
  });

  it('carga datos de la versión anterior (v1) sin perder nada', () => {
    const d = sanitizeUserData({
      schemaVersion: 1,
      markers: [{ id: 4, x: 100, y: 200, n: 'Ciudad', i: 1, t: 'capital' }],
      route: [{ x: 1, y: 2, n: '' }],
      scale: 5,
      unit: 'millas',
      nid: 5,
    });
    expect(d.schemaVersion).toBe(3);
    expect(d.markers[0]).toMatchObject({ id: 4, nombre: 'Ciudad', nota: 'capital', x: 100, y: 200, categoria: 'ciudad', icono: 'castillo' });
    expect(d.route).toHaveLength(1);
    expect([d.scale, d.unit]).toEqual([5, 'millas']);
  });

  it('carga datos aún más antiguos (sin versión)', () => {
    const d = sanitizeUserData({ markers: [{ x: 1, y: 2, n: 'Viejo', i: 11, t: '' }] });
    expect(d.markers[0].nombre).toBe('Viejo');
    expect(INK_ICONS.some((i) => i.id === d.markers[0].icono)).toBe(true);
  });
});
