import { $, $$, prefersReducedMotion, type Cleanup } from "./util";

/**
 * Hero canvas: the three role lines are labelled cursors that drift around the dot grid.
 * They start as a tidy stack (also the no-JS / reduced-motion layout), then wander between waypoints.
 * Waypoints are fractions of the free space (x, y) so they survive any canvas size.
 */
const PATHS: Array<Array<[number, number]>> = [
  [
    [0.1, 0.08],
    [0.9, 0.42],
    [0.3, 0.94],
    [1, 0.2],
  ],
  [
    [0.95, 0.1],
    [0.2, 0.5],
    [0.8, 0.9],
    [0.05, 0.28],
    [0.6, 0.62],
  ],
  [
    [0.5, 0.45],
    [0.05, 0.9],
    [0.9, 0.7],
    [0.4, 0.12],
    [1, 0.5],
  ],
  [
    [0.8, 0.8],
    [0.25, 0.2],
    [0.7, 0.38],
    [0.1, 0.72],
    [0.55, 0.98],
  ],
];
const STEP_MS = 3600;
const STAGGER_MS = [2400, 3100, 3800, 4500];
const REST_GAP = 8;
const NARROW = 420;

export function initCursors(): Cleanup {
  const cv = $<HTMLElement>(".canvas[data-cv]");
  const zone = cv && $<HTMLElement>(".roles", cv);
  if (!cv || !zone || prefersReducedMotion()) return () => {};
  const items = $$<HTMLElement>(".cur", zone);
  const idx = items.map(() => -1); // -1 = resting in the stack
  const timers: number[] = [];
  let visible = true;

  type Box = { l: number; t: number; w: number; h: number };
  const boxes: Box[] = items.map(() => ({ l: 0, t: 0, w: 0, h: 0 }));
  const hits = (a: Box, b: Box) =>
    a.l < b.l + b.w + 8 && a.l + a.w + 8 > b.l && a.t < b.t + b.h + 8 && a.t + a.h + 8 > b.t;

  const place = (i: number) => {
    const el = items[i];
    const W = zone.clientWidth;
    const H = zone.clientHeight;
    const w = Math.min(el.offsetWidth, W);
    const h = el.offsetHeight;
    const freeW = Math.max(0, W - w);
    const freeH = Math.max(0, H - h);
    let left: number;
    let top: number;
    if (idx[i] < 0) {
      left = freeW;
      top = Math.min(freeH, i * (h + REST_GAP));
    } else {
      const path = PATHS[i % PATHS.length];
      const [fx, fy] = path[idx[i] % path.length];
      left = fx * freeW;
      // Narrow canvas: one lane per cursor so labels never stack on each other.
      top = W < NARROW ? (i / Math.max(1, items.length - 1)) * freeH : fy * freeH;
    }
    // Nudge down (wrapping) until clear of the other cursors' targets.
    const me = boxes[i];
    me.l = left;
    me.t = top;
    me.w = w;
    me.h = h;
    const lane = W < NARROW;
    for (let n = 0; n < (lane ? 0 : 6); n++) {
      me.t = top;
      if (!boxes.some((o, k) => k !== i && o.w && hits(me, o))) break;
      top = top + h + 8 > freeH ? 0 : top + h + 8;
    }
    me.t = top;
    el.style.left = `${left.toFixed(1)}px`;
    el.style.top = `${top.toFixed(1)}px`;
  };

  const placeAll = () => items.forEach((_, i) => place(i));
  placeAll();
  const show = window.setTimeout(() => cv.classList.add("on"), 700);
  timers.push(show);

  const tick = (i: number) => {
    if (visible && !document.hidden) {
      idx[i] += 1;
      place(i);
    }
    timers[i + 1] = window.setTimeout(() => tick(i), STEP_MS);
  };
  items.forEach((_, i) => {
    timers[i + 1] = window.setTimeout(() => tick(i), STAGGER_MS[i % STAGGER_MS.length]);
  });

  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
  io.observe(cv);
  window.addEventListener("resize", placeAll);
  return () => {
    timers.forEach((t) => window.clearTimeout(t));
    io.disconnect();
    window.removeEventListener("resize", placeAll);
    cv.classList.remove("on");
  };
}
