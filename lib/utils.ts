import type { CSSProperties } from "react";

/** Inline style that sets the stagger index `--d` read by the reveal CSS (delay = --d * 90ms). */
export const d = (n: number): CSSProperties => ({ "--d": n }) as CSSProperties;

/** Inline style for an arbitrary custom property. */
export const cssVar = (name: `--${string}`, value: string | number): CSSProperties =>
  ({ [name]: value }) as CSSProperties;
