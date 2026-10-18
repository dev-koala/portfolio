import { $, type Cleanup } from "./util";

/** Shows the "Back to top" button (`.to-top`) once the hero has scrolled out of view. */
export function initToTop(): Cleanup {
  const btn = $(".to-top");
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
  run();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    btn.classList.remove("show");
  };
}
