// Declaraciones de módulos especiales de Vite usados por la app.

declare module '*?worker&inline' {
  /** Constructor de un Web Worker empaquetado inline por Vite. */
  const WorkerConstructor: new () => Worker;
  export default WorkerConstructor;
}
