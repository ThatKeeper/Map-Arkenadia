// src/ui/controls/bindSearchControls.js
import { showOnlyCategory } from '@/features/categories';
import { flyTo } from '@/features/navigation';
import { getSuggestions, rememberSearch, searchPlaces, toggleFavoriteSearch } from '@/features/search';
import { interaction } from '@/state';
import { renderSuggestions } from '@/ui/lists';
import { closeDock, showToast } from '@/ui/panels';
import { byId } from '@/utils';

/** Conecta el buscador con autocompletado (resultados, favoritos, recientes y teclado). */
export function bindSearchControls() {
  const input = byId('q');
  let results = [];
  const draw = () =>
    renderSuggestions(results, interaction.suggestIndex, input.value, choose, (t) => {
      toggleFavoriteSearch(t);
      refresh();
    });
  const refresh = () => {
    results = getSuggestions(input.value);
    interaction.suggestIndex = -1;
    draw();
  };
  const hide = () => {
    results = [];
    interaction.suggestIndex = -1;
    draw();
  };
  function choose(i) {
    const r = results[i];
    if (!r) return;
    if (r.tipo === 'historial') {
      input.value = r.texto;
      refresh();
      return run(r.texto);
    }
    input.value = r.texto;
    rememberSearch(r.texto);
    hide();
    if (r.tipo === 'categoria') {
      showOnlyCategory(r.categoriaId);
      showToast('Mostrando solo «' + r.texto + '»');
    } else {
      flyTo(r.x, r.y, r.z);
      if (innerWidth < 700) closeDock();
    }
  }
  function run(text) {
    const found = searchPlaces(text, 1)[0];
    if (!found) return showToast('No encontré ese lugar');
    results = [found];
    choose(0);
  }
  input.oninput = refresh;
  input.onfocus = refresh;
  input.onblur = () => setTimeout(hide, 120);
  input.onkeydown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!results.length) return refresh();
      const n = results.length,
        d = e.key === 'ArrowDown' ? 1 : -1;
      interaction.suggestIndex = (interaction.suggestIndex + d + n + (d < 0 && interaction.suggestIndex < 0 ? 1 : 0)) % n;
      draw();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (interaction.suggestIndex >= 0) choose(interaction.suggestIndex);
      else run(input.value);
    } else if (e.key === 'Escape' && results.length) {
      e.stopPropagation();
      hide();
    }
  };
}
