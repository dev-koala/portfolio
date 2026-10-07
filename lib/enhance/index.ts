import type { Cleanup } from "./util";
import { initReveal } from "./reveal";
import { initTeardown } from "./teardown";
import { initWorkMotion } from "./work-motion";
import { initParallax } from "./parallax";
import { initBeacon } from "./beacon";
import { initCursors } from "./cursors";

/** Starts every page-level enhancement and returns one cleanup. Called once from components/Enhance.tsx. */
export function initPage(): Cleanup {
  const cleanups = [
    initBeacon(),
    initReveal(),
    initTeardown(),
    initWorkMotion(),
    initParallax(),
    initCursors(),
  ];
  return () => cleanups.forEach((c) => c());
}
