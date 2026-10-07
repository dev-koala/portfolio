import { $$, prefersReducedMotion, type Cleanup } from "./util";

/**
 * Selected work: each drawing builds itself when its project scrolls in (`.go` on `.proj`),
 * and the VoltGH and Dolphins drawings respond lightly to the pointer (--mx / --my in -1..1).
 * All the visual work is in CSS; this only toggles the class and the two custom properties.
 */
export function initWorkMotion(): Cleanup {
  const cleanups: Cleanup[] = [];
  const projs = $$("#work .proj");
  if (!projs.length) return () => {};
  const RM = prefersReducedMotion();

  if (RM || !("IntersectionObserver" in window)) {
    projs.forEach((el) => el.classList.add("go"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("go");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    projs.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());
  }

  if (!RM && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    $$("#work .a-volt,#work .a-dol").forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        el.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
      };
      const leave = () => {
        el.style.setProperty("--mx", "0");
        el.style.setProperty("--my", "0");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });
  }
  return () => cleanups.forEach((c) => c());
}
