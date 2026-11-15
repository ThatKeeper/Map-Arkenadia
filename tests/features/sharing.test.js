// tests/features/sharing.test.js
import { beforeEach, describe, expect, it } from 'vitest';
import { resetSession } from '../helpers/resetSession.js';
import { PLAYER_FILE_FORMAT, SCHEMA_VERSION } from '@/config';
import {
  buildFileName, buildPlayerData, buildPlayerExport, detectFileKind, formatFileDate, mergePlayerData, summarizePlayerExport,
} from '@/features/sharing';
import { sanitizeUserData } from '@/services/storage';

beforeEach(() => resetSession());

const cats = [
  { id: 'ciudad', nombre: 'Ciudad', color: '#112233', icono: 'castillo' },
  { id: 'secreta', nombre: 'CATEGORIA_SECRETA', color: '#445566', icono: 'calavera' },
];
const mk = (id, nombre, visibilidad, extra = {}) => ({
  id, nombre, nota: '', notaDm: '', x: 10 * id, y: 5 * id, categoria: 'ciudad', icono: 'castillo', visibilidad, creado: 1, actualizado: 1, ...extra,
});

/** Datos de un DM con secretos de todo tipo. */
function dmData() {
  return sanitizeUserData({
    schemaVersion: 3,
    categories: cats,
    markers: [
      mk(1, 'Plaza publica', 'todos', { nota: 'nota publica', notaDm: 'SECRETO_NOTA_PRIVADA' }),
      mk(2, 'SECRETO_MARCADOR_DM', 'dm', { categoria: 'secreta', nota: 'SECRETO_NOTA_DM', notaDm: 'SECRETO_X' }),
      mk(3, 'SECRETO_MARCADOR_PERSONAL', 'mio'),
    ],
    route: [{ x: 1, y: 2, n: 'SECRETO_RUTA' }, { x: 3, y: 4, n: '' }],
    labels: {
      edits: {
        o1: { texto: 'SECRETO_RENOMBRE_ORIGINAL', visibilidad: 'dm', actualizado: 7 },
        o2: { texto: 'Renombrada para todos', actualizado: 8 },
        o3: { texto: 'SECRETO_PERSONAL', visibilidad: 'mio', actualizado: 9 },
      },
      custom: [
        { id: 'c1', texto: 'Etiqueta publica', x: 5, y: 5 },
        { id: 'c2', texto: 'SECRETO_ETIQUETA_DM', x: 6, y: 6, visibilidad: 'dm' },
        { id: 'c3', texto: 'SECRETO_ETIQUETA_PERSONAL', x: 7, y: 7, visibilidad: 'mio' },
      ],
      nid: 4,
    },
    scale: 3,
    unit: 'km',
  });
}

describe('exportar para jugadores (criterio de aceptación)', () => {
  it('el archivo NO contiene nada marcado como DM ni personal: ni marcadores, ni notas privadas, ni etiquetas, ni ruta, ni categorías no usadas', () => {
    const file = JSON.stringify(buildPlayerExport(dmData()));
    expect(file).not.toContain('SECRETO');
    expect(file).not.toContain('CATEGORIA_SECRETA');
    expect(file).not.toContain('Guarida');
  });

  it('sí contiene lo compartido', () => {
    const file = JSON.stringify(buildPlayerExport(dmData()));
    expect(file).toContain('Plaza publica');
    expect(file).toContain('nota publica');
    expect(file).toContain('Etiqueta publica');
    expect(file).toContain('Renombrada para todos');
    expect(file).toContain('Ciudad');
  });

  it('un marcador compartido sale sin su nota privada', () => {
    const d = buildPlayerData(dmData());
    expect(d.markers).toHaveLength(1);
    expect(d.markers[0].notaDm).toBe('');
    expect(d.markers[0].nombre).toBe('Plaza publica');
  });

  it('la etiqueta original que el DM oculta sale como «borrada», sin su texto', () => {
    const d = buildPlayerData(dmData());
    expect(d.labels.edits.o1).toEqual({ oculta: true, actualizado: 7 });
    expect(d.labels.edits.o3).toBe(undefined);
    expect(d.labels.edits.o2).toMatchObject({ texto: 'Renombrada para todos' });
    expect(d.labels.custom.map((c) => c.id)).toEqual(['c1']);
  });

  it('solo se exportan las categorías de los marcadores compartidos, y la ruta no va', () => {
    const d = buildPlayerData(dmData());
    expect(d.categories.map((c) => c.id)).toEqual(['ciudad']);
    expect(d.route).toEqual([]);
    expect([d.scale, d.unit]).toEqual([3, 'km']);
  });

  it('no modifica los datos originales', () => {
    const src = dmData();
    const before = JSON.stringify(src);
    buildPlayerExport(src);
    expect(JSON.stringify(src)).toBe(before);
  });

  it('el envoltorio identifica el formato, la versión y la fecha', () => {
    const f = buildPlayerExport(dmData(), new Date('2026-11-14T10:00:00Z'));
    expect(f.formato).toBe(PLAYER_FILE_FORMAT);
    expect(f.version).toBe(1);
    expect(f.exportado).toBe('2026-11-14T10:00:00.000Z');
    expect(f.datos.schemaVersion).toBe(SCHEMA_VERSION);
  });

  it('el resultado es idempotente y se puede volver a leer como datos válidos', () => {
    const once = buildPlayerData(dmData());
    expect(buildPlayerData(once)).toEqual(once);
    expect(sanitizeUserData(JSON.parse(JSON.stringify(once)))).toEqual(once);
  });

  it('un archivo con TODO oculto exporta un mapa vacío', () => {
    const d = buildPlayerData(sanitizeUserData({ markers: [mk(1, 'A', 'dm'), mk(2, 'B', 'mio')], route: [{ x: 1, y: 1 }] }));
    expect(d.markers).toEqual([]);
    expect(d.categories).toEqual([]);
    expect(d.route).toEqual([]);
  });

  it('el resumen previo dice qué se comparte y qué queda fuera', () => {
    const s = summarizePlayerExport(dmData());
    expect(s).toMatchObject({ markersShared: 1, markersExcluded: 2, labelsShared: 1, labelsExcluded: 2, privateNotes: 2, routeExcluded: true });
    expect(s.markerNames).toEqual(['Plaza publica']);
  });
});

describe('detectar el tipo de archivo', () => {
  it('reconoce el formato de jugadores y desenvuelve los datos', () => {
    const f = buildPlayerExport(dmData());
    expect(detectFileKind(JSON.parse(JSON.stringify(f)))).toMatchObject({ kind: 'jugadores' });
    expect(detectFileKind(f).data).toBe(f.datos);
  });

  it('cualquier otra cosa es un archivo completo', () => {
    const d = dmData();
    expect(detectFileKind(d)).toEqual({ kind: 'completo', data: d });
    expect(detectFileKind(null).kind).toBe('completo');
    expect(detectFileKind('x').kind).toBe('completo');
  });
});

describe('fusionar lo recibido con lo del jugador', () => {
  const local = () =>
    sanitizeUserData({
      categories: [cats[0]],
      markers: [mk(1, 'Plaza vieja', 'todos', { actualizado: 100, notaDm: 'mi nota local' }), mk(50, 'Mi diario', 'mio', { actualizado: 500 })],
      route: [{ x: 9, y: 9, n: 'mi ruta' }],
      nid: 51,
    });
  const incoming = (markers, extra = {}) =>
    sanitizeUserData({ categories: [cats[0]], markers, labels: { edits: {}, custom: [], nid: 1 }, scale: 3, unit: 'km', ...extra });

  it('añade lo nuevo', () => {
    const { data, report } = mergePlayerData(local(), incoming([mk(7, 'Nuevo', 'todos')]));
    expect(data.markers.map((m) => m.nombre)).toEqual(['Plaza vieja', 'Mi diario', 'Nuevo']);
    expect(report).toMatchObject({ added: 1, updated: 0, keptLocal: 0, renumbered: 0 });
  });

  it('sustituye lo compartido si lo recibido es más reciente, pero conserva la nota privada local', () => {
    const { data, report } = mergePlayerData(local(), incoming([mk(1, 'Plaza nueva', 'todos', { actualizado: 200 })]));
    expect(data.markers.find((m) => m.id === 1)).toMatchObject({ nombre: 'Plaza nueva', notaDm: 'mi nota local' });
    expect(report.updated).toBe(1);
  });

  it('conserva lo local si es más reciente, y no toca si es igual', () => {
    const r1 = mergePlayerData(local(), incoming([mk(1, 'Plaza antigua', 'todos', { actualizado: 50 })]));
    expect(r1.data.markers.find((m) => m.id === 1).nombre).toBe('Plaza vieja');
    expect(r1.report.keptLocal).toBe(1);
    const r2 = mergePlayerData(local(), incoming([mk(1, 'Otra', 'todos', { actualizado: 100 })]));
    expect(r2.data.markers.find((m) => m.id === 1).nombre).toBe('Plaza vieja');
    expect(r2.report).toMatchObject({ updated: 0, keptLocal: 0 });
  });

  it('nunca pisa un marcador propio: si el id choca, lo renumera y conserva', () => {
    const { data, report } = mergePlayerData(local(), incoming([mk(50, 'Ciudad compartida', 'todos')]));
    const mine = data.markers.find((m) => m.nombre === 'Mi diario');
    expect(mine.id).not.toBe(50);
    expect(mine.visibilidad).toBe('mio');
    expect(data.markers.find((m) => m.id === 50).nombre).toBe('Ciudad compartida');
    expect(new Set(data.markers.map((m) => m.id)).size).toBe(data.markers.length);
    expect(data.nid).toBeGreaterThan(mine.id);
    expect(report.renumbered).toBe(1);
  });

  it('no borra lo compartido que ya no llega, y no toca la ruta', () => {
    const { data } = mergePlayerData(local(), incoming([]));
    expect(data.markers).toHaveLength(2);
    expect(data.route).toEqual([{ x: 9, y: 9, n: 'mi ruta' }]);
  });

  it('añade las categorías que faltan sin pisar las que ya existen', () => {
    const mine = local();
    mine.categories[0].nombre = 'Mi nombre de Ciudad';
    const inc = incoming([mk(8, 'X', 'todos', { categoria: 'taberna' })], { categories: [{ ...cats[0], nombre: 'Otra' }, { id: 'taberna', nombre: 'Taberna', color: '#abcdef', icono: 'posada' }] });
    const { data, report } = mergePlayerData(mine, inc);
    expect(data.categories.map((c) => c.id)).toEqual(['ciudad', 'taberna']);
    expect(data.categories[0].nombre).toBe('Mi nombre de Ciudad');
    expect(report.categoriesAdded).toBe(1);
  });

  it('adopta la escala del DM solo si la tuya sigue por defecto', () => {
    expect(mergePlayerData(local(), incoming([])).data).toMatchObject({ scale: 3, unit: 'km' });
    const custom = local();
    custom.scale = 7;
    expect(mergePlayerData(custom, incoming([])).data.scale).toBe(7);
  });

  it('fusiona etiquetas por id y fecha, y renumera las propias que chocan', () => {
    const mine = local();
    mine.labels = { edits: { o2: { texto: 'Local nueva', actualizado: 90 } }, custom: [{ id: 'c1', texto: 'Mi etiqueta', x: 1, y: 1, tam: 1, rot: 0, estilo: 'x', visibilidad: 'mio', actualizado: 5 }], nid: 2 };
    const inc = incoming([], {
      labels: {
        edits: { o2: { texto: 'Recibida vieja', actualizado: 10 }, o4: { oculta: true, actualizado: 3 } },
        custom: [{ id: 'c1', texto: 'Del DM', x: 9, y: 9, actualizado: 4 }],
        nid: 2,
      },
    });
    const { data, report } = mergePlayerData(mine, inc);
    expect(data.labels.edits.o2.texto).toBe('Local nueva');
    expect(data.labels.edits.o4).toEqual({ oculta: true, actualizado: 3 });
    const own = data.labels.custom.find((c) => c.texto === 'Mi etiqueta');
    expect(own.id).not.toBe('c1');
    expect(data.labels.custom.find((c) => c.id === 'c1').texto).toBe('Del DM');
    expect(data.labels.nid).toBeGreaterThan(+own.id.slice(1));
    expect(report.keptLocal).toBe(1);
    expect(report.renumbered).toBe(1);
  });

  it('no modifica ninguno de los dos originales', () => {
    const l = local(),
      i = incoming([mk(1, 'N', 'todos', { actualizado: 999 }), mk(50, 'M', 'todos')]);
    const [bl, bi] = [JSON.stringify(l), JSON.stringify(i)];
    mergePlayerData(l, i);
    expect([JSON.stringify(l), JSON.stringify(i)]).toEqual([bl, bi]);
  });

  it('fusionar dos veces lo mismo no cambia nada la segunda vez', () => {
    const inc = incoming([mk(7, 'Nuevo', 'todos', { actualizado: 300 })]);
    const first = mergePlayerData(local(), inc).data;
    const again = mergePlayerData(first, inc);
    expect(again.data).toEqual(first);
    expect(again.report).toMatchObject({ added: 0, updated: 0 });
  });
});

describe('nombres de archivo', () => {
  it('la fecha va en hora local con ceros a la izquierda', () => {
    expect(formatFileDate(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(formatFileDate(new Date(2026, 10, 14, 23, 59))).toBe('2026-11-14');
  });
  it('buildFileName une prefijo, fecha y extensión', () => {
    expect(buildFileName('mapa-jugadores', 'json', new Date(2026, 10, 14))).toBe('mapa-jugadores-2026-11-14.json');
  });
});
