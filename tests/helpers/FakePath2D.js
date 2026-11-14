// tests/helpers/FakePath2D.js

/** Sustituto de Path2D (jsdom no lo trae): guarda las operaciones como texto para poder huellarlas. */
export class FakePath2D {
  constructor() {
    this.ops = '';
  }
  addPath(p) {
    this.ops += `+{${p && p.ops}}`;
  }
}
for (const m of [
  'moveTo', 'lineTo', 'arc', 'arcTo', 'ellipse', 'rect', 'roundRect',
  'quadraticCurveTo', 'bezierCurveTo', 'closePath',
]) {
  FakePath2D.prototype[m] = function (...a) {
    this.ops += m + a.map((v) => (typeof v === 'number' ? v.toFixed(2) : String(v))).join(',') + ';';
  };
}
