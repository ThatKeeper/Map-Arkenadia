// src/ui/lists/renderSuggestions.js
import { createIconSvg } from './createIconSvg';
import { findMatchRange, isFavoriteSearch } from '@/features/search';
import { byId, createEl } from '@/utils';

/**
 * Pinta la lista de sugerencias del buscador, resaltando la coincidencia.
 * @param {Array<import('@/features/search').SearchResult>} results
 * @param {number} active índice resaltado (−1 ninguno)
 * @param {string} query texto escrito
 * @param {(index: number) => void} onChoose al elegir una sugerencia
 * @param {(text: string) => void} onStar al pulsar la estrella de favorito
 */
export function renderSuggestions(results, active, query, onChoose, onStar) {
  const ul = byId('sugg'),
    input = byId('q');
  ul.textContent = '';
  ul.hidden = !results.length;
  input.setAttribute('aria-expanded', String(results.length > 0));
  input.setAttribute('aria-activedescendant', active >= 0 ? 'sg-' + active : '');
  results.forEach((r, i) => {
    const li = createEl('li'),
      body = createEl('div', null, 'sg-body'),
      name = createEl('span'),
      range = findMatchRange(r.texto, query);
    li.id = 'sg-' + i;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', String(i === active));
    if (range) {
      const mark = createEl('mark', r.texto.slice(range[0], range[1]));
      name.append(r.texto.slice(0, range[0]), mark, r.texto.slice(range[1]));
    } else name.textContent = r.texto;
    body.append(name, createEl('small', r.detalle));
    if (r.icono) {
      const ic = createIconSvg(r.icono);
      if (r.color) ic.style.color = r.color;
      li.appendChild(ic);
    }
    li.appendChild(body);
    const star = createEl('button', isFavoriteSearch(r.texto) ? '★' : '☆', 'sg-star');
    star.type = 'button';
    star.setAttribute('aria-label', 'Favorito: ' + r.texto);
    star.onmousedown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onStar(r.texto);
    };
    li.appendChild(star);
    li.onmousedown = (e) => {
      e.preventDefault();
      onChoose(i);
    };
    ul.appendChild(li);
  });
}
