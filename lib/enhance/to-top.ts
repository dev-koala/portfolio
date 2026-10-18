import { $, prefersReducedMotion, type Cleanup } from "./util";

/**
 * "Back to top" button (`.to-top`, rendered on every page from the layout). Shown once the visitor has
 * scrolled one viewport down. Clicking scrolls to the top without adding a hash to the URL; without
 * scripts it is a plain link to `#main`.
 */
export function initToTop(): Cleanup {
  const btn = $<HTMLAnchorElement>(".to-top");
  if (!btn) return () => {};
  let ticking = false;
  const run = () => {
    btn.classList.toggle("show", window.scrollY > window.innerHeight);
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(run);
    }
  };
  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    btn.blur();
  };
  run();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  btn.addEventListener("click", onClick);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    btn.removeEventListener("click", onClick);
    btn.classList.remove("show");
  };
}
