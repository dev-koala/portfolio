"use client";

import { useEffect } from "react";
import { initPage } from "@/lib/enhance";
import { TOAST_EVENT } from "./Toast";

/**
 * Renders nothing. Starts the page-level scripts (reveal, teardown scene, work motion, parallax, Beacon
 * drawing) once the page has hydrated, and routes clicks on placeholder links (`a[data-ph]`) to the toast.
 * The sections themselves are server-rendered; these scripts only add classes, inline transforms and the
 * Beacon SVG contents, none of which React manages.
 */
export function Enhance() {
  useEffect(() => {
    const cleanup = initPage();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[data-ph]");
      if (a) {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent(TOAST_EVENT, { detail: `Placeholder: ${a.getAttribute("data-ph")}.` }),
        );
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cleanup();
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
