import { $, $$, clamp01, prefersReducedMotion, type Cleanup } from "./util";

/**
 * Teardown scene: a pinned, scroll-driven exploded view.
 *
 * The section is `height: calc(100svh + 250svh)` with a sticky inner pin. As you scroll, `tp`
 * (target progress, 0..1) is eased toward `s` (smoothed progress) each frame; `draw(s)` then:
 *   - spreads five composited isometric plates apart (spread envelope `e`),
 *   - lifts the active plate toward the viewer and dims the others behind opaque veils (`g`, `f`),
 *   - moves the tag labels with their plates,
 *   - switches the text card (one at a time) and positions it next to the active plate on wide screens.
 * Scrolling back up reverses everything. With prefers-reduced-motion the section is static
 * (`anat-live` is removed, every layer is drawn at full spread, all cards are stacked).
 *
 * Geometry is in the SVG's 470x410 design units, scaled by `u = host width / 470`.
 * CY[] are the plates' resting vertical centres in those units.
 */
export function initTeardown(): Cleanup {
  const sec = $("#anatomy");
  const host = $("#an");
  const stage = $("#an-stage");
  if (!sec || !host || !stage) return () => {};

  const RM = prefersReducedMotion();
  const cards = $$(".an-card", sec);
  const tags = $$(".an-tag", sec);
  const hint = $("#an-hint");
  const CY = [64, 134, 204, 274, 344];
  const wide = window.matchMedia("(min-width:900px)");
  const pl = [0, 1, 2, 3, 4].map((k) => $<SVGSVGElement>(`.pl[data-k="${k}"]`, sec)!);
  const veil = pl.map((l) => $<SVGPolygonElement>(".veil", l)!);

  const pinned = !RM;
  // The server renders `anat-live` (so there is no layout jump on hydration); reduced motion drops it.
  sec.classList.toggle("anat-live", pinned);

  const m = { top: 0, total: 1, u: 1, st: 600, hostTop: 0, ch: [] as number[] };
  let tp = 0;
  let s = pinned ? 0 : 1;
  let raf = 0;
  let last = 0;
  let near = true;
  let lastA = -9;

  const ease = (t: number) => t * t * (3 - 2 * t);

  function measure() {
    const y = window.scrollY || window.pageYOffset;
    const r = sec!.getBoundingClientRect();
    m.top = r.top + y;
    m.total = Math.max(1, (sec as HTMLElement).offsetHeight - window.innerHeight);
    const sr = stage!.getBoundingClientRect();
    const hr = host!.getBoundingClientRect();
    m.u = (host!.clientWidth || 470) / 470;
    m.st = sr.height || 600;
    m.hostTop = hr.top - sr.top;
    m.ch = cards.map((c) => c.offsetHeight);
    tp = pinned ? clamp01(((window.scrollY || 0) - m.top) / m.total) : 1;
    if (!pinned) s = 1;
    kick();
  }
  function onScroll() {
    if (!pinned) return;
    tp = clamp01(((window.scrollY || window.pageYOffset) - m.top) / m.total);
    kick();
  }
  function kick() {
    if (!raf && near) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  }
  function frame(t: number) {
    raf = 0;
    const dt = last ? Math.min(64, t - last) : 16;
    last = t;
    if (pinned) {
      s += (tp - s) * (1 - Math.exp(-dt / 110));
      if (Math.abs(tp - s) < 0.0004) s = tp;
    }
    draw(s);
    if (pinned && s !== tp && near) raf = requestAnimationFrame(frame);
    else last = 0;
  }
  function draw(p: number) {
    const u = m.u;
    const wd = wide.matches;
    const g = pinned ? ease(clamp01((p - 0.05) / 0.08)) : 0; // how far the stack has been pulled apart and dimmed
    const e = pinned ? ease(clamp01((p - 0.02) / 0.1)) : 1; // spread
    const c = (p - 0.12) / 0.22; // continuous layer index
    const availH = wd ? m.st - 30 : m.st * 0.52;
    const rest = 70 * u;
    const target = Math.max(rest, Math.min(160 * u, availH / 5.3));
    const extra = (target - rest) * e;
    const a = !pinned ? -1 : p < 0.1 ? -1 : Math.max(0, Math.min(4, Math.round(c)));
    const oy: number[] = [];
    for (let L = 0; L < 5; L++) {
      const f = pinned ? ease(clamp01(1 - Math.abs(c - L) / 0.85)) : 0;
      const lift = f * g;
      oy[L] = (L - 2) * extra;
      pl[L].style.transform =
        `translate3d(${(28 * lift * u).toFixed(2)}px,${(oy[L] - 6 * lift * u).toFixed(2)}px,0)`;
      veil[L].style.opacity = (0.74 * g * (1 - f)).toFixed(3);
      const x = (396 + 14) * u + 28 * lift * u;
      const y = CY[L] * u + oy[L];
      tags[L].style.transform =
        `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translateY(-50%)`;
      tags[L].style.opacity = (1 - 0.65 * g * (1 - f)).toFixed(3);
    }
    if (a !== lastA) {
      lastA = a;
      for (let k = 0; k < 5; k++) tags[k].style.color = a === k ? "var(--accent)" : "var(--ink)";
      if (pinned) {
        cards.forEach((cd) => {
          const i = Number(cd.getAttribute("data-i"));
          const on = a < 0 ? i === -1 : i === a;
          cd.classList.toggle("on", on);
          // Cards that are not showing are transparent but still in the DOM (screen readers can read them).
          // Keep their buttons out of the tab order so keyboard focus never lands on something invisible.
          cd.querySelectorAll<HTMLElement>("button").forEach((b) => {
            b.tabIndex = on ? 0 : -1;
          });
        });
      }
    }
    if (pinned) {
      if (wd) {
        const ci = a < 0 ? 0 : a + 1;
        const h = m.ch[ci] || 0;
        const cy = a < 0 ? 0 : m.hostTop + CY[a] * u + oy[a] - 6 * u;
        const yy =
          a < 0 ? Math.max(6, (m.st - h) / 2) : Math.max(6, Math.min(m.st - h - 36, cy - h * 0.28));
        cards[ci].style.setProperty("--y", `${yy.toFixed(1)}px`);
      }
      if (hint) hint.style.opacity = p < 0.04 ? "1" : "0";
    }
  }

  let io: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (es) => {
        near = es[0].isIntersecting;
        if (near) measure();
      },
      { rootMargin: "200px 0px 200px 0px" },
    );
    io.observe(sec);
  }
  let ro: ResizeObserver | null = null;
  if ("ResizeObserver" in window) {
    ro = new ResizeObserver(measure);
    ro.observe(host);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  measure();
  s = tp;
  draw(s);

  return () => {
    cancelAnimationFrame(raf);
    io?.disconnect();
    ro?.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", measure);
    window.removeEventListener("load", measure);
  };
}
