// src/core/traceLoop.js

/** Recorre un lazo de aristas desde `start`, marcándolas como visitadas. Devuelve [x,y,x,y…]. */
export function traceLoop(start, B) {
  const { PX, PY, A1, A2, vis } = B;
  const notVisited = (e) => e >= 0 && !vis[e];
  const pts = [];
  let cur = start;
  while (cur >= 0) {
    vis[cur] = 1;
    pts.push(PX[cur], PY[cur]);
    cur = notVisited(A1[cur]) ? A1[cur] : notVisited(A2[cur]) ? A2[cur] : -1;
  }
  return pts;
}
