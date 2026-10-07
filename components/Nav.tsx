"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

/** Section ids that have a link in the nav, used to set aria-current. */
const LINKABLE = site.nav.map((n) => n.href.slice(1));

/**
 * Fixed header: brand, a "current section" readout (e.g. "01 Selected work"), primary links,
 * and an "Index" button that opens a full-screen menu on narrow screens.
 *
 * Current section = the last `[data-sec]` element whose top has passed 38% of the viewport height;
 * at the very bottom of the page it is always the last section (Contact).
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [label, setLabel] = useState("");
  const [current, setCurrent] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstOpen = useRef(true);

  useEffect(() => {
    const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-sec]"));
    let tick = false;
    const update = () => {
      tick = false;
      setScrolled(window.scrollY > 40);
      const line = window.innerHeight * 0.38;
      let cur: HTMLElement | null = null;
      let lk: string | null = null;
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      secs.forEach((s) => {
        if (s.getBoundingClientRect().top <= line) {
          cur = s;
          if (LINKABLE.includes(s.id)) lk = s.id;
        }
      });
      if (atEnd) {
        cur = secs[secs.length - 1];
        lk = "contact";
      }
      setLabel(cur ? ((cur as HTMLElement).getAttribute("data-sec") ?? "") : "");
      setCurrent(lk);
    };
    const queue = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenu(false);
    document.body.classList.remove("lock");
    if (restoreFocus) openRef.current?.focus();
  }, []);

  // Lock scroll, move focus, trap Tab and close on Escape while the menu is open.
  useEffect(() => {
    if (!menu) {
      firstOpen.current = true;
      return;
    }
    document.body.classList.add("lock");
    if (firstOpen.current) {
      menuRef.current?.querySelector<HTMLElement>("nav a")?.focus();
      firstOpen.current = false;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu(true);
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const f = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    const mq = window.matchMedia("(min-width:760px)");
    const onMq = (m: MediaQueryListEvent) => {
      if (m.matches) closeMenu(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [menu, closeMenu]);

  const m = label.match(/^(\d+)\s+(.*)$/);

  return (
    <>
      <header className={`nav${scrolled ? " s" : ""}`} id="nav">
        <div className="nav-in">
          <a className="brand" href="#top" aria-label={`${site.name}, back to top`}>
            {site.name}
          </a>
          <p className="now" id="now" aria-hidden="true">
            {m ? (
              <>
                <span className="n">{m[1]}</span>
                {m[2]}
              </>
            ) : (
              label
            )}
          </p>
          <nav className="links" aria-label="Primary">
            {site.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={current === n.href.slice(1) ? "true" : "false"}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            className="idx"
            id="menu-open"
            type="button"
            aria-expanded={menu}
            aria-controls="menu"
            ref={openRef}
            onClick={() => setMenu(true)}
          >
            Index
          </button>
        </div>
      </header>

      <div
        className="menu"
        id="menu"
        hidden={!menu}
        role="dialog"
        aria-modal="true"
        aria-label="Index"
        ref={menuRef}
      >
        <div className="menu-top">
          <span className="brand">{site.name}</span>
          <button className="idx" id="menu-close" type="button" onClick={() => closeMenu(true)}>
            Close
          </button>
        </div>
        <nav aria-label="Mobile">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => closeMenu(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <p className="menu-foot">{site.title}</p>
      </div>
    </>
  );
}
