# Cambios

## Fase 2 — roles y exportación
- **Modo DM / jugador** con interruptor visible (píldora en la barra, `Shift+D`). El modo DM se distingue con
  una franja roja, un marco rojo y el aviso «no compartas pantalla»; el jugador no muestra nada del DM.
- **Visibilidad** `todos` / `dm` / `mio` en marcadores y etiquetas. El jugador solo ve «todos» y lo suyo, y solo
  edita lo suyo; lo compartido por el DM es de solo lectura. Lo que crea un jugador es «Solo yo».
- **Nota privada del DM** en cada marcador (nunca se ve en modo jugador ni se exporta).
- Esquema **v3** (`notaDm`; etiquetas con `visibilidad` y `actualizado`) con migración desde v0, v1 y v2.
- **PIN opcional** del modo DM (hash SHA-256 con sal, 4–8 cifras). Con PIN se arranca siempre como jugador.
  La interfaz avisa de que es protección ligera en el navegador, no seguridad real.
- **Exportar para jugadores**: archivo `mapa-jugadores-AAAA-MM-DD.json` con SOLO lo marcado «todos» (sin notas
  privadas, marcadores/etiquetas del DM, categorías no usadas ni la ruta), con resumen previo para confirmar.
- **Importar en modo jugador** fusiona sin pisar lo propio: resolución por id y fecha, renumera los ids propios
  que chocan, conserva lo más reciente, descarta lo del DM si llega un archivo completo y es deshacible.
- **Exportar imagen** (PNG o PDF): vista actual o mapa completo; 1x/2x/4x con límite seguro de memoria y aviso;
  marcadores, ruta, etiquetas, cuadrícula (A, B… / 1, 2…), leyenda por categorías y barra de escala. Se pinta por
  franjas cediendo el hilo entre ellas (la interfaz no se bloquea) y se puede cancelar. En modo DM pregunta si
  exportar la versión completa o la «vista de jugadores». El nombre lleva la fecha.
- El contador de ids (`nid`) ya no baja al sanear, para no reutilizar ids compartidos.

## Fase 1 — marcadores, etiquetas y búsqueda
- Esquema de datos **v2** (`schemaVersion: 2`) con migración automática desde v1 y desde datos sin versión.
  Marcador: `id, nombre, nota, x, y, categoria, icono, visibilidad, creado, actualizado`.
- **Categorías** editables (8 por defecto): casilla de visibilidad, «solo esta», «mostrar todas», contadores,
  crear/renombrar/recolorear/cambiar icono/borrar. El filtro afecta al mapa, la lista, el minimapa y la búsqueda
  y se recuerda (`mapaVista`).
- **27 iconos de tinta** (SVG, sin emojis ni fuentes) con búsqueda por nombre; en mapa, minimapa y paneles.
- **Deshacer / rehacer** (`features/history`): Ctrl+Z, Ctrl+Mayús+Z / Ctrl+Y y botones; fusiona acciones
  continuas (teclear, arrastrar); aviso «Deshacer» al borrar.
- **Etiquetas editables**: texto, posición (arrastrar), tamaño, giro y estilo; crear, borrar y restaurar
  originales. Con el estado inicial se dibujan exactamente igual que antes.
- **Buscador con autocompletado**: sin tildes ni mayúsculas, coincidencia resaltada, favoritos y recientes,
  marcadores + lugares + categorías, teclado (↑ ↓ Enter Esc).
- **Atajos configurables**: M R E D T, + − 0, / y Ctrl+K, P, Ctrl+Z…, `?` abre la ayuda y permite cambiarlos;
  los tooltips los muestran. D, T, Mayús+D y F quedan reservados para fases futuras (emiten `shortcut:<id>`).
- Autocompletado del nombre del marcador con los nombres ya usados.

## Fase 0 — red de seguridad técnica
- Compatible con GitHub Pages (`base: './'` + flujo de despliegue).
- Pruebas con Vitest + jsdom: arnés de humo con huellas de render, pruebas del núcleo, `sanitizeUserData`, migraciones y bus de eventos.
- `schemaVersion` en `userData` y sistema de migraciones (`services/migrations/`); v2 preparada.
- Refactor de `drawTerrainDetails`, `renderPendingTiles`, `onAnimationFrame`, `drawLabels`, `requestGeometryBuild` y `drawTileLayers` en funciones pequeñas (render idéntico).
- Prettier, ESLint ampliado, `// @ts-check` en `state/`, `services/` y funciones nuevas, `types/` con `@typedef`.
- Bus de eventos `utils/events` (`on`/`off`/`emit`).
