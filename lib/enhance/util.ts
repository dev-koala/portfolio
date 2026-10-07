/** Small DOM helpers shared by the enhancement scripts. */
export const $ = <T extends Element = HTMLElement>(
  sel: string,
  root: ParentNode = document,
): T | null => root.querySelector<T>(sel);

export const $$ = <T extends Element = HTMLElement>(
  sel: string,
  root: ParentNode = document,
): T[] => Array.from(root.querySelectorAll<T>(sel));

export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Every init function returns a cleanup so React Strict Mode (dev) can mount, unmount and mount again safely. */
export type Cleanup = () => void;
