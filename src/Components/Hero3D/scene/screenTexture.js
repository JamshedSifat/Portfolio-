import * as THREE from 'three';

/**
 * Procedural "code editor" screen rendered into a CanvasTexture.
 * A tiny typing animation is driven by `update(dt)`; the canvas is only
 * re-drawn when something changed so it costs ~nothing per frame.
 */

const W = 1024;
const H = 640;

const C = {
  bg: '#0b1120',
  bar: '#0f172a',
  gutter: '#1e293b',
  line: 'rgba(148,163,184,0.06)',
  text: '#cbd5e1',
  muted: '#64748b',
  key: '#c4b5fd', // keyword
  str: '#22d3ee', // string
  fn: '#818cf8', // identifiers / functions
  prop: '#93c5fd',
  num: '#fbbf24',
  comment: '#475569',
  punct: '#94a3b8',
  cursor: '#22d3ee',
};

// Pre-tokenised source (text, colour) so we don't need a tokenizer at runtime.
const LINES = [
  [['// portfolio.js', C.comment]],
  [
    ['const ', C.key],
    ['developer', C.fn],
    [' = {', C.punct],
  ],
  [
    ['  name', C.prop],
    [': ', C.punct],
    ['"Jamshed Sifat"', C.str],
    [',', C.punct],
  ],
  [
    ['  role', C.prop],
    [': ', C.punct],
    ['"Full Stack Developer"', C.str],
    [',', C.punct],
  ],
  [
    ['  stack', C.prop],
    [': [', C.punct],
    ['"React"', C.str],
    [', ', C.punct],
    ['"Django"', C.str],
    [', ', C.punct],
    ['"AI"', C.str],
    ['],', C.punct],
  ],
  [
    ['  focus', C.prop],
    [': ', C.punct],
    ['"premium web products"', C.str],
    [',', C.punct],
  ],
  [
    ['  openToWork', C.prop],
    [': ', C.punct],
    ['true', C.num],
    [',', C.punct],
  ],
  [['};', C.punct]],
  [],
  [
    ['export default ', C.key],
    ['developer', C.fn],
    [';', C.punct],
  ],
];

const TOTAL_CHARS = LINES.reduce(
  (sum, line) => sum + Math.max(1, line.reduce((s, [t]) => s + t.length, 0)),
  0
);

export function createScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  const state = {
    revealed: 0, // characters typed so far
    typeAccumulator: 0,
    cursorOn: true,
    cursorTimer: 0,
    holdTimer: 0,
    finished: false,
    dirty: true,
  };

  const font = (px, weight = 500) =>
    `${weight} ${px}px "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

  const roundRect = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const draw = () => {
    // --- chrome -------------------------------------------------------
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);

    // subtle vertical vignette for depth
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(99,102,241,0.10)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(34,211,238,0.06)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // title bar
    ctx.fillStyle = C.bar;
    ctx.fillRect(0, 0, W, 56);
    const dots = ['#f87171', '#fbbf24', '#34d399'];
    dots.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(34 + i * 26, 28, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.font = font(20, 500);
    ctx.fillStyle = C.muted;
    ctx.textBaseline = 'middle';
    ctx.fillText('portfolio.js  —  jamshed-sifat', 130, 28);

    // active tab pill
    ctx.fillStyle = 'rgba(99,102,241,0.22)';
    roundRect(W - 176, 14, 150, 28, 14);
    ctx.fill();
    ctx.fillStyle = '#a5b4fc';
    ctx.font = font(17, 600);
    ctx.fillText('● live preview', W - 158, 28);

    // gutter
    ctx.fillStyle = C.gutter;
    ctx.fillRect(0, 56, 72, H - 56 - 40);

    // --- code ---------------------------------------------------------
    const lineH = 46;
    const top = 92;
    ctx.font = font(26, 500);
    let remaining = state.revealed;
    let cursorX = 96;
    let cursorY = top;

    for (let i = 0; i < LINES.length; i++) {
      const y = top + i * lineH;
      // line number
      ctx.fillStyle = C.muted;
      ctx.textAlign = 'right';
      ctx.fillText(String(i + 1), 54, y);
      ctx.textAlign = 'left';

      if (remaining <= 0) break;

      let x = 96;
      const line = LINES[i];
      if (line.length === 0) {
        remaining -= 1;
        cursorX = x;
        cursorY = y;
        continue;
      }
      for (const [text, color] of line) {
        if (remaining <= 0) break;
        const chunk = text.slice(0, remaining);
        ctx.fillStyle = color;
        ctx.fillText(chunk, x, y);
        x += ctx.measureText(chunk).width;
        remaining -= chunk.length;
        cursorX = x;
        cursorY = y;
      }
    }

    // current line highlight
    ctx.fillStyle = C.line;
    ctx.fillRect(72, cursorY - lineH / 2, W - 72, lineH);

    // cursor
    if (state.cursorOn) {
      ctx.fillStyle = C.cursor;
      ctx.shadowColor = C.cursor;
      ctx.shadowBlur = 12;
      ctx.fillRect(cursorX + 4, cursorY - 15, 3, 30);
      ctx.shadowBlur = 0;
    }

    // status bar
    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = '#e0e7ff';
    ctx.font = font(17, 600);
    ctx.fillText('⎇ main', 20, H - 20);
    ctx.fillText('React • Django • AI', 130, H - 20);
    ctx.textAlign = 'right';
    ctx.fillText('UTF-8   JavaScript   Ln ' + (Math.min(LINES.length, 1 + (cursorY - top) / lineH) | 0), W - 20, H - 20);
    ctx.textAlign = 'left';

    texture.needsUpdate = true;
    state.dirty = false;
  };

  /** Advance the typing animation. Returns nothing; redraws when needed. */
  const update = (dt) => {
    // cursor blink
    state.cursorTimer += dt;
    if (state.cursorTimer >= 0.53) {
      state.cursorTimer = 0;
      state.cursorOn = !state.cursorOn;
      state.dirty = true;
    }

    if (!state.finished) {
      state.typeAccumulator += dt * 34; // chars per second
      const step = Math.floor(state.typeAccumulator);
      if (step > 0) {
        state.typeAccumulator -= step;
        state.revealed = Math.min(TOTAL_CHARS, state.revealed + step);
        state.dirty = true;
        if (state.revealed >= TOTAL_CHARS) state.finished = true;
      }
    } else {
      state.holdTimer += dt;
      if (state.holdTimer > 7) {
        // loop
        state.holdTimer = 0;
        state.revealed = 0;
        state.finished = false;
        state.dirty = true;
      }
    }

    if (state.dirty) draw();
  };

  draw();

  return {
    texture,
    update,
    dispose: () => texture.dispose(),
  };
}
