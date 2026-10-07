import { $, $$, type Cleanup } from "./util";

/**
 * Reveal-on-scroll. Elements with `.rv` or `.fd` get `.in` when they enter the viewport;
 * the CSS (guarded by the `.js` class and prefers-reduced-motion) does the actual animation.
 * The hero heading gets `.in` after two frames so the entrance plays on load.
 */
export function initReveal(): Cleanup {
  const els = $$(".rv,.fd");
  let io: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io?.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io!.observe(el));
  } else {
    els.forEach((el) => el.classList.add("in"));
  }
  let r1 = 0;
  let r2 = 0;
  r1 = requestAnimationFrame(() => {
    r2 = requestAnimationFrame(() => $("#hero-h")?.classList.add("in"));
  });
  return () => {
    io?.disconnect();
    cancelAnimationFrame(r1);
    cancelAnimationFrame(r2);
  };
}
