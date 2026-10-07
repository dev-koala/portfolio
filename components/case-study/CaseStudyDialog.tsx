"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { projects } from "@/data/projects";
import { drawBeacon } from "@/lib/enhance/beacon";
import { Toast } from "@/components/Toast";
import { CaseStudy } from "./CaseStudy";

/** Clone the project's drawing from the page into the dialog's `#cs-art` host. */
function fillArt(i: number) {
  const host = document.getElementById("cs-art");
  const src = document.querySelector(`.proj[data-i="${i}"] [data-art]`);
  if (!host) return;
  host.replaceChildren();
  if (!src) return;
  const c = src.cloneNode(true) as HTMLElement;
  c.removeAttribute("data-art");
  c.querySelectorAll("[id]").forEach((el) => {
    if (el.id === "beacon-svg") el.removeAttribute("id");
  });
  c.querySelectorAll<HTMLElement>("[data-par]").forEach((el) => {
    el.removeAttribute("data-par");
    el.style.transform = "none";
  });
  host.appendChild(c);
  const beaconSvg = host.querySelector<SVGSVGElement>(".a-beacon svg");
  if (beaconSvg) drawBeacon(beaconSvg, "cs");
}

/**
 * The case-study overlay: a native modal <dialog> (focus trap, Escape and top-layer for free).
 *
 * Opening: any element with `data-open="<project index>"` (title buttons, teardown "Seen in" buttons,
 * More work rows, the "Next project" button) is caught by one delegated click listener.
 * The drawing: instead of re-rendering the art, the project's `[data-art]` node is cloned from the page
 * into `#cs-art`. The clone drops `data-art`, the Beacon `id`, and any parallax offset. Beacon's SVG is
 * then redrawn in "cs" mode for the dialog's size.
 * Focus returns to the element that opened it (not for "Next project", which stays inside the dialog).
 */
export function CaseStudyDialog() {
  const dlg = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const d = dlg.current!;
    const onClick = (e: MouseEvent) => {
      const o = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-open]");
      if (!o) return;
      const i = Number(o.getAttribute("data-open"));
      if (!Number.isFinite(i) || !projects[i]) return;
      if (!o.closest(".cs-next")) lastFocus.current = o;
      flushSync(() => setIdx(i));
      if (!d.open) d.showModal();
      fillArt(i); // after showModal, so the Beacon drawing can measure the visible dialog
      d.scrollTop = 0;
      document.body.classList.add("lock");
    };
    const onClose = () => {
      document.body.classList.remove("lock");
      lastFocus.current?.focus?.();
    };
    document.addEventListener("click", onClick);
    d.addEventListener("close", onClose);
    return () => {
      document.removeEventListener("click", onClick);
      d.removeEventListener("close", onClose);
    };
  }, []);

  return (
    <dialog className="cs" id="cs" aria-labelledby="cs-title" ref={dlg}>
      <div id="cs-body">
        <CaseStudy p={projects[idx]} onClose={() => dlg.current?.close()} />
      </div>
      <Toast scope="dialog" />
    </dialog>
  );
}
