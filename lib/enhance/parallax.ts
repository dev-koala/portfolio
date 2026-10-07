import { $$, prefersReducedMotion, type Cleanup } from "./util";

/** Gentle parallax on elements marked `data-par="<factor>"`, clamped to 6% of their host's height. */
export function initParallax(): Cleanup {
  if (prefersReducedMotion()) return () => {};
  const pars = $$("[data-par]");
  if (!pars.length) return () => {};
  let ticking = false;
  const run = () => {
    const vh = window.innerHeight;
    pars.forEach((el) => {
      const host = el.parentElement;
      if (!host) return;
      const r = host.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const mid = r.top + r.height / 2;
      const off = (mid - vh / 2) * parseFloat(el.getAttribute("data-par") || "0");
      const lim = r.height * 0.06;
      el.style.transform = `translate3d(0,${Math.max(-lim, Math.min(lim, off)).toFixed(1)}px,0)`;
    });
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(run);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", run);
  run();
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", run);
  };
}
