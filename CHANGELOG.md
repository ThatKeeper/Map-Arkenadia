# Cambios

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
