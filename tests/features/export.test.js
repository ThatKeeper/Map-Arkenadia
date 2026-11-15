// tests/features/export.test.js
import { beforeEach, describe, expect, it } from 'vitest';
import { resetSession } from '../helpers/resetSession.js';
import { EXPORT_FACTORS, EXPORT_MAX_PIXELS_DESKTOP, EXPORT_MAX_PIXELS_MOBILE, EXPORT_STRIP_PIXELS, WORLD_HEIGHT, WORLD_WIDTH } from '@/config';
import { buildPdf, computeExportSize, getColumnLabel, getExportData, getLegendEntries, planExportStrips } from '@/features/export';
import { addLabel, updateLabel } from '@/features/labels';
import { addMarker, updateMarker } from '@/features/markers';
import { addRoutePoint } from '@/features/route';
import { setRole } from '@/features/roles';

beforeEach(() => resetSession());

const view = { scale: 0.5, width: 1280, height: 800, panX: 100, panY: 50 };
const size = (o) => computeExportSize({ maxPixels: EXPORT_MAX_PIXELS_DESKTOP, view, ...o });

describe('tamaño de la imagen', () => {
  it('mapa completo: 1x = 1200 px de ancho; 2x = tamaño natural', () => {
    expect(size({ scope: 'full', factor: 1 })).toMatchObject({ width: 1200, height: 924, ppu: 0.5, zoom: 0.5, clamped: false });
    expect(size({ scope: 'full', factor: 2 })).toMatchObject({ width: 2400, height: 1848, ppu: 1, zoom: 1 });
    expect(size({ scope: 'full', factor: 4 })).toMatchObject({ width: 4800, height: 3696, ppu: 2 });
    expect(size({ scope: 'full', factor: 2 }).region).toEqual({ x: 0, y: 0, w: WORLD_WIDTH, h: WORLD_HEIGHT });
  });

  it('vista actual: 1x = tamaño en pantalla, con la región del mundo que se ve', () => {
    const s = size({ scope: 'view', factor: 1 });
    expect([s.width, s.height]).toEqual([1280, 800]);
    expect(s.region).toEqual({ x: -200, y: -100, w: 2560, h: 1600 });
    expect(s.zoom).toBe(0.5);
    expect(size({ scope: 'view', factor: 2 })).toMatchObject({ width: 2560, height: 1600, ppu: 1, zoom: 0.5, k: 2 });
  });

  it('respeta el límite de memoria reduciendo el factor y avisando', () => {
    const s = computeExportSize({ scope: 'full', factor: 4, maxPixels: EXPORT_MAX_PIXELS_MOBILE, view });
    expect(s.pixels).toBeLessThanOrEqual(EXPORT_MAX_PIXELS_MOBILE);
    expect(s.clamped).toBe(true);
    expect(s.k).toBeLessThan(4);
    expect(s.requestedFactor).toBe(4);
    expect(s.width * s.height).toBe(s.pixels);
  });

  it('un factor que cabe no se toca', () => {
    for (const f of EXPORT_FACTORS) {
      const s = size({ scope: 'full', factor: f });
      expect([s.clamped, s.k]).toEqual([false, f]);
    }
  });

  it('una pantalla enorme a 4x se reduce, nunca devuelve un tamaño vacío', () => {
    const s = computeExportSize({ scope: 'view', factor: 4, maxPixels: 36e6, view: { scale: 1, width: 7680, height: 4320, panX: 0, panY: 0 } });
    expect(s.clamped).toBe(true);
    expect(s.pixels).toBeLessThanOrEqual(36e6);
    expect(s.width).toBeGreaterThan(0);
  });

  it('el límite de móvil es menor que el de escritorio', () => {
    expect(EXPORT_MAX_PIXELS_MOBILE).toBeLessThan(EXPORT_MAX_PIXELS_DESKTOP);
  });
});

describe('franjas', () => {
  it('cubren toda la altura sin huecos ni solapes', () => {
    const strips = planExportStrips(4800, 3696, EXPORT_STRIP_PIXELS);
    let y = 0;
    for (const s of strips) {
      expect(s.y).toBe(y);
      y += s.h;
    }
    expect(y).toBe(3696);
  });

  it('cada franja respeta el máximo de píxeles (salvo una fila ancha) y hay varias para imágenes grandes', () => {
    const strips = planExportStrips(4800, 3696, EXPORT_STRIP_PIXELS);
    for (const s of strips) expect(s.h * 4800).toBeLessThanOrEqual(EXPORT_STRIP_PIXELS);
    expect(strips.length).toBeGreaterThan(10);
  });

  it('una imagen pequeña cabe en una franja; una más ancha que el máximo usa filas sueltas', () => {
    expect(planExportStrips(100, 100, EXPORT_STRIP_PIXELS)).toEqual([{ y: 0, h: 100 }]);
    expect(planExportStrips(EXPORT_STRIP_PIXELS * 2, 3, EXPORT_STRIP_PIXELS)).toHaveLength(3);
  });
});

describe('cuadrícula y leyenda', () => {
  it('los rótulos de columna siguen A…Z, AA, AB…', () => {
    expect([0, 1, 25, 26, 27, 51, 52, 701, 702].map(getColumnLabel)).toEqual(['A', 'B', 'Z', 'AA', 'AB', 'AZ', 'BA', 'ZZ', 'AAA']);
  });

  it('la leyenda lista las categorías con marcadores, en el orden del catálogo', () => {
    const cats = [{ id: 'a', nombre: 'A', color: '#111111', icono: 'pin' }, { id: 'b', nombre: 'B', color: '#222222', icono: 'pin' }, { id: 'c', nombre: 'C', color: '#333333', icono: 'pin' }];
    const ms = [{ categoria: 'c' }, { categoria: 'a' }, { categoria: 'c' }];
    expect(getLegendEntries(cats, ms).map((e) => [e.id, e.cantidad])).toEqual([['a', 1], ['c', 2]]);
    expect(getLegendEntries(cats, [])).toEqual([]);
  });
});

describe('qué datos entran en la imagen', () => {
  const opts = (o = {}) => ({ markers: true, route: true, labels: true, version: 'completa', ...o });

  function seed() {
    const a = addMarker(1, 1, 'ciudad'),
      b = addMarker(2, 2, 'peligro');
    updateMarker(a.id, { nombre: 'Publico' });
    updateMarker(b.id, { nombre: 'Secreto', visibilidad: 'dm' });
    const l = addLabel(5, 5, 'Etiqueta DM');
    updateLabel(l, { visibilidad: 'dm' });
    addRoutePoint({ x: 1, y: 1 });
  }

  it('versión completa en modo DM: todo, con la ruta', () => {
    seed();
    const d = getExportData(opts());
    expect(d.role).toBe('dm');
    expect(d.markers.map((m) => m.nombre)).toEqual(['Publico', 'Secreto']);
    expect(d.labels.some((l) => l.texto === 'Etiqueta DM')).toBe(true);
    expect(d.route).toHaveLength(1);
  });

  it('«vista de jugadores» desde modo DM: sin nada del DM y sin su ruta', () => {
    seed();
    const d = getExportData(opts({ version: 'jugadores' }));
    expect(d.role).toBe('jugador');
    expect(d.markers.map((m) => m.nombre)).toEqual(['Publico']);
    expect(d.labels.some((l) => l.texto === 'Etiqueta DM')).toBe(false);
    expect(d.route).toEqual([]);
  });

  it('en modo jugador se respeta lo oculto aunque se pida la versión completa; la ruta es la suya', () => {
    seed();
    setRole('jugador');
    const d = getExportData(opts());
    expect(d.role).toBe('jugador');
    expect(d.markers.map((m) => m.nombre)).toEqual(['Publico']);
    expect(d.route).toHaveLength(1);
  });

  it('las casillas desactivadas dejan fuera esa capa', () => {
    seed();
    const d = getExportData(opts({ markers: false, route: false, labels: false }));
    expect([d.markers, d.labels, d.route]).toEqual([[], [], []]);
  });
});

describe('PDF', () => {
  const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4, 0xff, 0xd9]);
  const text = (b) => new TextDecoder('latin1').decode(b);

  it('tiene cabecera, fin y una sola página con la imagen', () => {
    const t = text(buildPdf(jpeg, 1200, 924));
    expect(t.startsWith('%PDF-1.4')).toBe(true);
    expect(t.trimEnd().endsWith('%%EOF')).toBe(true);
    expect(t).toContain('/Count 1');
    expect(t).toContain('/Filter /DCTDecode');
    expect(t).toContain('/Width 1200 /Height 924');
  });

  it('la tabla xref apunta exactamente a cada objeto', () => {
    const bytes = buildPdf(jpeg, 800, 600),
      t = text(bytes),
      start = +/startxref\n(\d+)/.exec(t)[1];
    expect(t.slice(start, start + 4)).toBe('xref');
    const entries = t.slice(start).split('\n').slice(3, 8);
    entries.forEach((e, i) => {
      const off = +e.slice(0, 10);
      expect(t.slice(off, off + 7)).toBe(`${i + 1} 0 obj`);
    });
  });

  it('el JPEG va intacto dentro del flujo y la longitud declarada coincide', () => {
    const bytes = buildPdf(jpeg, 10, 10),
      t = text(bytes),
      at = t.indexOf('stream\n', t.indexOf('/DCTDecode')) + 7;
    expect(Array.from(bytes.slice(at, at + jpeg.length))).toEqual(Array.from(jpeg));
    expect(t).toContain(`/Length ${jpeg.length}`);
  });

  it('la página conserva la proporción (lado largo 842 pt)', () => {
    expect(text(buildPdf(jpeg, 1000, 500))).toContain('/MediaBox [0 0 842 421]');
    expect(text(buildPdf(jpeg, 500, 1000))).toContain('/MediaBox [0 0 421 842]');
  });
});
