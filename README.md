# Mapa del Mundo Conocido (modular)

Mapa interactivo de fantasía dibujado a mano. Vite + JavaScript, sin framework. Arquitectura según la skill
`arquitectura-src-modular`: una función por archivo, barrels (`index.js`) por carpeta, alias `@/` → `src/`.

```
src/
├── main.js        # único punto de entrada
├── bootstrap/     # cacheDom, startApp
├── config/        # constantes, paletas, etiquetas, iconos, presets, versión de esquema
├── state/         # estado compartido (viewport, session, loop, tilesState, build, dom…)
├── types/         # @typedef de JSDoc (Marker, Route, Territory, Stroke, FogState…)
├── utils/         # helpers puros y bus de eventos (utils/events: on/off/emit)
├── core/          # geometría y detalles (sin DOM; lo usan el worker y el respaldo)
├── workers/       # geometry.worker.js (se empaqueta inline)
├── services/      # storage, migrations, worker, assets
├── features/      # quality, geometry, tiles, navigation, markers, route, terrain, biomes
├── ui/            # paint, render, loop, panels, lists, controls, events
└── styles/
tests/             # Vitest + jsdom (helpers/, smoke/, core/, services/, utils/)
```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm install` | instala dependencias |
| `npm run dev` | servidor de desarrollo |
| `npm run build` / `npm run preview` | compila a `dist/` / la sirve |
| `npm run lint` | ESLint (`src` y `tests`) |
| `npm run format` / `format:check` | Prettier |
| `npm test` | pruebas (Vitest) |
| `npm run test:update` | regenera las huellas de render (snapshots) |
| `npm run cycles` | busca ciclos de imports |

**Primera vez con las pruebas:** ejecuta `npm run test:update` y sube la carpeta `tests/__snapshots__/` al
repositorio. Esas huellas son la referencia para detectar cambios en lo que se dibuja.

## Publicar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub (rama `main`).
2. En **Settings → Pages → Build and deployment → Source**, elige **GitHub Actions**.
3. Cada `push` a `main` ejecuta `.github/workflows/deploy.yml`, compila y publica en
   `https://<usuario>.github.io/<repositorio>/`.

`vite.config.js` usa `base: './'` (rutas relativas), así que funciona en subruta sin configurar el nombre del
repositorio. Recomendado: ejecuta `npm install` una vez en local y sube `package-lock.json`; el flujo lo usará
(`npm ci`) para instalaciones reproducibles.

## Datos guardados

`localStorage`: `mapaDatos` (marcadores y ruta, con `schemaVersion`), `mapaVista`, `mapaCfg`. Los datos antiguos
(sin versión) se migran solos (`services/migrations/`). La migración v1 → v2 está preparada para la Fase 1.
