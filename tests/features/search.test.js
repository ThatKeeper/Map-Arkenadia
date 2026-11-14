// tests/features/search.test.js
import { beforeEach, describe, expect, it } from 'vitest';
import { resetSession } from '../helpers/resetSession.js';
import { addMarker, updateMarker } from '@/features/markers';
import { setCategoryHidden } from '@/features/categories';
import { updateLabel } from '@/features/labels';
import {
  findMatchRange, findPlace, getSuggestions, isFavoriteSearch, rememberSearch, scoreMatch, searchPlaces,
  toggleFavoriteSearch,
} from '@/features/search';
import { session } from '@/state';
import { normalizeText } from '@/utils';

beforeEach(() => resetSession());

const names = (q, n) => searchPlaces(q, n).map((r) => r.texto);

describe('búsqueda', () => {
  it('normalizeText ignora tildes y mayúsculas', () => {
    expect(normalizeText('Península ÁÉÍÓÚ ñ')).toBe('peninsula aeiou n');
    expect(normalizeText(null)).toBe('');
  });

  it('scoreMatch ordena: igual < empieza por < palabra < contiene', () => {
    expect(scoreMatch('mar', 'mar')).toBe(0);
    expect(scoreMatch('mar corrupto', 'mar')).toBe(1);
    expect(scoreMatch('gran mar', 'mar')).toBe(2);
    expect(scoreMatch('amarillo', 'mar')).toBe(3);
    expect(scoreMatch('rio', 'mar')).toBe(-1);
  });

  it('findMatchRange devuelve la posición en el texto original aunque tenga tildes', () => {
    expect(findMatchRange('Península Vendaval', 'peninsula')).toEqual([0, 9]);
    expect(findMatchRange('Gran Río Dorado', 'rio')).toEqual([5, 8]);
    expect(findMatchRange('abc', 'x')).toBe(null);
    expect(findMatchRange('abc', '  ')).toBe(null);
  });

  it('encuentra lugares del mapa sin distinguir tildes', () => {
    expect(names('peninsula vendaval')).toContain('Península Vendaval');
    expect(names('PENINSULA')[0]).toBe('Península Vendaval');
  });

  it('prioriza coincidencias exactas y por prefijo', () => {
    expect(names('iberit')[0]).toBe('Iberit');
    const r = names('mar', 20);
    expect(r[0].toLowerCase().startsWith('mar')).toBe(true);
  });

  it('incluye marcadores (antes que los lugares) y categorías', () => {
    updateMarker(addMarker(5, 5, 'ciudad').id, { nombre: 'Castillo Rojo' });
    const r = searchPlaces('castillo');
    expect(r[0]).toMatchObject({ tipo: 'marcador', texto: 'Castillo Rojo', detalle: 'Ciudad' });
    expect(searchPlaces('mazmorra').some((x) => x.tipo === 'categoria' && x.categoriaId === 'mazmorra')).toBe(true);
  });

  it('el filtro de categorías oculta también los marcadores en la búsqueda', () => {
    updateMarker(addMarker(5, 5, 'ciudad').id, { nombre: 'Castillo Rojo' });
    setCategoryHidden('ciudad', true);
    expect(names('castillo rojo')).toEqual([]);
    setCategoryHidden('ciudad', false);
    expect(names('castillo rojo')).toEqual(['Castillo Rojo']);
  });

  it('busca en las ediciones del usuario, no en el nombre de fábrica', () => {
    updateLabel('o3', { texto: 'Reino Nuevo' });
    expect(names('reino nuevo')).toContain('Reino Nuevo');
    expect(names('taygovar')).toEqual([]);
  });

  it('no mezcla las notas del mapa y respeta el límite', () => {
    expect(names('montanas frias')).toEqual([]);
    expect(searchPlaces('a', 5).length).toBeLessThanOrEqual(5);
    expect(searchPlaces('   ')).toEqual([]);
  });

  it('no repite resultados con el mismo texto', () => {
    addMarker(1, 1);
    addMarker(2, 2);
    updateMarker(1, { nombre: 'Faro' });
    updateMarker(2, { nombre: 'faro' });
    expect(searchPlaces('faro').filter((r) => r.tipo === 'marcador')).toHaveLength(1);
  });

  it('findPlace devuelve el primer resultado con coordenadas', () => {
    const p = findPlace('iberit');
    expect(p.texto).toBe('Iberit');
    expect(typeof p.x).toBe('number');
    expect(findPlace('zzzz')).toBe(null);
  });
});

describe('recientes y favoritos', () => {
  it('rememberSearch guarda sin repetir, lo último primero, máx. 8', () => {
    for (let i = 0; i < 10; i++) rememberSearch('b' + i);
    rememberSearch('b5');
    const r = session.searchPrefs.recientes;
    expect(r[0]).toBe('b5');
    expect(r).toHaveLength(8);
    expect(new Set(r).size).toBe(8);
    rememberSearch('   ');
    expect(session.searchPrefs.recientes[0]).toBe('b5');
  });

  it('los favoritos se alternan', () => {
    expect(toggleFavoriteSearch('Iberit')).toBe(true);
    expect(isFavoriteSearch('Iberit')).toBe(true);
    expect(toggleFavoriteSearch('Iberit')).toBe(false);
    expect(isFavoriteSearch('Iberit')).toBe(false);
  });

  it('sin texto, las sugerencias son favoritos y después recientes (sin duplicar)', () => {
    rememberSearch('uno');
    rememberSearch('dos');
    toggleFavoriteSearch('dos');
    const s = getSuggestions('');
    expect(s.map((x) => [x.texto, x.favorito])).toEqual([['dos', true], ['uno', false]]);
    expect(getSuggestions('iberit')[0].texto).toBe('Iberit');
  });
});
