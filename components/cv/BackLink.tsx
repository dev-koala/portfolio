"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

/**
 * "Back to portfolio". When the visitor came here from the portfolio, it goes back in history, so the
 * browser returns them to where they were on the page. Otherwise (direct visit, shared link) it does a
 * full page load of the home page, which always starts at the top with every script freshly started.
 */
export function BackLink() {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    let fromHome = false;
    try {
      const ref = new URL(document.referrer);
      fromHome = ref.origin === location.origin && ref.pathname === "/";
    } catch {}
    e.preventDefault();
    if (fromHome && history.length > 1) history.back();
    else location.assign("/");
  };
  return (
    <Link href="/" onClick={onClick}>
      ← Back to portfolio
    </Link>
  );
}
