// tests/config/inkIcons.test.js
import { describe, expect, it } from 'vitest';
import { DEFAULT_CATEGORIES, DEFAULT_ICON_ID, INK_ICONS, LABEL_STYLES, LEGACY_ICON_MAP } from '@/config';

const ids = new Set(INK_ICONS.map((i) => i.id));

describe('biblioteca de iconos', () => {
  it('hay al menos 24 iconos con id único, nombre y etiquetas', () => {
    expect(INK_ICONS.length).toBeGreaterThanOrEqual(24);
    expect(ids.size).toBe(INK_ICONS.length);
    for (const i of INK_ICONS) {
      expect(i.nombre.length).toBeGreaterThan(0);
      expect(i.tags.length).toBeGreaterThan(0);
    }
  });

  it('cada icono tiene rutas SVG bien formadas', () => {
    for (const i of INK_ICONS) {
      expect(i.d.length).toBeGreaterThan(0);
      for (const d of i.d) {
        expect(/^[Mm]/.test(d)).toBe(true);
        expect(/^[MmLlHhVvCcSsQqTtAaZz0-9eE+\-.,\s]+$/.test(d)).toBe(true);
        expect(d.includes('NaN')).toBe(false);
      }
    }
  });

  it('el icono por defecto, los de las categorías y los de la migración existen', () => {
    expect(ids.has(DEFAULT_ICON_ID)).toBe(true);
    for (const c of DEFAULT_CATEGORIES) expect(ids.has(c.icono)).toBe(true);
    for (const [icono, cat] of LEGACY_ICON_MAP) {
      expect(ids.has(icono)).toBe(true);
      expect(DEFAULT_CATEGORIES.some((c) => c.id === cat)).toBe(true);
    }
  });

  it('las categorías por defecto tienen ids únicos y colores válidos', () => {
    expect(new Set(DEFAULT_CATEGORIES.map((c) => c.id)).size).toBe(DEFAULT_CATEGORIES.length);
    for (const c of DEFAULT_CATEGORIES) expect(/^#[0-9a-f]{6}$/.test(c.color)).toBe(true);
    expect(DEFAULT_CATEGORIES.length).toBeGreaterThanOrEqual(8);
  });

  it('hay estilos de etiqueta para todos los tipos usados', () => {
    expect(LABEL_STYLES.map((s) => s[0]).sort()).toEqual(['c', 'n', 'r', 's', 'x']);
  });
});
