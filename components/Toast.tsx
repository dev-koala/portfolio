"use client";

import { useEffect, useRef, useState } from "react";

/** Fire a toast from anywhere: `window.dispatchEvent(new CustomEvent("cq:toast", { detail: "..." }))`. */
export const TOAST_EVENT = "cq:toast";

/**
 * Small status message. Two instances exist: `scope="page"` at the root, and `scope="dialog"` inside
 * the case-study <dialog>. A modal dialog sits in the browser's top layer above everything, so a toast
 * in the page would be hidden behind it; whichever instance matches the current state shows the message.
 */
export function Toast({ scope }: { scope: "page" | "dialog" }) {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const on = (e: Event) => {
      const dialogOpen = !!document.querySelector("dialog[open]");
      if ((scope === "dialog") !== dialogOpen) return;
      setMsg(String((e as CustomEvent).detail ?? ""));
      setShow(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setShow(false), 2600);
    };
    window.addEventListener(TOAST_EVENT, on);
    return () => {
      window.removeEventListener(TOAST_EVENT, on);
      clearTimeout(timer.current);
    };
  }, [scope]);

  return (
    <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
      {msg}
    </div>
  );
}
