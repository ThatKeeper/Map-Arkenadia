# Cambios

## Fase 0 — red de seguridad técnica
- Compatible con GitHub Pages (`base: './'` + flujo de despliegue).
- Pruebas con Vitest + jsdom: arnés de humo con huellas de render, pruebas del núcleo, `sanitizeUserData`, migraciones y bus de eventos.
- `schemaVersion` en `userData` y sistema de migraciones (`services/migrations/`); v2 preparada.
- Refactor de `drawTerrainDetails`, `renderPendingTiles`, `onAnimationFrame`, `drawLabels`, `requestGeometryBuild` y `drawTileLayers` en funciones pequeñas (render idéntico).
- Prettier, ESLint ampliado, `// @ts-check` en `state/`, `services/` y funciones nuevas, `types/` con `@typedef`.
- Bus de eventos `utils/events` (`on`/`off`/`emit`).
