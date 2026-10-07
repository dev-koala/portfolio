import { $, type Cleanup } from "./util";

type Pt = [number, number];
type Mode = "wide" | "narrow" | "cs";

/**
 * Beacon art: bundles of parallel lines between Takoradi, Kumasi and Accra, drawn as SVG into
 * `svg` in real pixels of its container, so the cities and labels can be placed clear of the
 * text column and the big title (wide mode), or scaled down for narrow screens and the
 * case-study dialog ("cs").
 */
export function drawBeacon(svg: SVGSVGElement | null, mode?: Mode): void {
  if (!svg) return;
  const box = svg.parentElement as HTMLElement;
  const r = box.getBoundingClientRect();
  const W = Math.round(r.width) || 1000;
  const H = Math.round(r.height) || 700;
  const m: Mode = mode ?? (window.matchMedia("(min-width:900px)").matches ? "wide" : "narrow");
  let fs: number;
  let C: { k: Pt; t: Pt; a: Pt };
  let off: number;

  if (m === "wide") {
    // Draw in real pixels and keep every city and label clear of the text column and the big title.
    fs = Math.max(28, Math.min(44, W * 0.027));
    const pt = $(".beacon .ptext");
    const ti = $(".beacon .ptitle");
    const pc = $(".beacon .pcap");
    let xMax = pt ? pt.getBoundingClientRect().left - r.left - fs * 1.4 : W * 0.58;
    if (!(xMax > 260)) xMax = Math.max(260, W * 0.55);
    const yA = (pc ? pc.getBoundingClientRect().bottom - r.top : 90) + fs * 1.6;
    let yB = (ti ? ti.getBoundingClientRect().top - r.top : H * 0.62) - fs;
    yB = Math.min(yB, H - fs * 1.3);
    if (!(yB - yA >= 200)) yB = yA + 200;
    C = {
      k: [xMax * 0.5, yA + (yB - yA) * 0.04],
      t: [xMax * 0.12, yA + (yB - yA) * 0.6],
      a: [xMax * 0.58, yA + (yB - yA) * 0.96],
    };
    off = Math.max(5, W / 190);
  } else if (m === "cs") {
    fs = Math.max(14, Math.min(30, W * 0.03));
    C = { k: [W * 0.5, H * 0.24], t: [W * 0.12, H * 0.68], a: [W * 0.62, H * 0.8] };
    off = Math.max(2.5, W / 150);
  } else {
    fs = Math.max(15, Math.min(24, W * 0.042));
    C = { k: [W * 0.5, H * 0.2], t: [W * 0.12, H * 0.64], a: [W * 0.58, H * 0.86] };
    off = Math.max(2.5, W / 130);
  }

  const q = (p: Pt, r2: Pt, o: number, bend: number) => {
    const mx = (p[0] + r2[0]) / 2;
    const my = (p[1] + r2[1]) / 2;
    const dx = r2[0] - p[0];
    const dy = r2[1] - p[1];
    const len = Math.hypot(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    const b = len * bend + o;
    return `M${p[0].toFixed(1)} ${p[1].toFixed(1)}Q${(mx + nx * b).toFixed(1)} ${(my + ny * b).toFixed(1)} ${r2[0].toFixed(1)} ${r2[1].toFixed(1)}`;
  };

  let s = `<rect width="${W}" height="${H}" fill="var(--ink)"/><g stroke="#ECECE8" stroke-opacity=".05" stroke-width="1">`;
  for (let y = 0; y < H; y += 56) s += `<path d="M0 ${y}H${W}"/>`;
  s += `</g><g class="lines" stroke-width="1.2">`;
  const pairs: [Pt, Pt, number][] = [
    [C.t, C.k, 0.16],
    [C.k, C.a, 0.14],
    [C.t, C.a, 0.1],
  ];
  pairs.forEach((pr, ix) => {
    for (let i = -8; i <= 8; i++) {
      s += `<path pathLength="1" style="--i:${i + 8 + ix * 5}" d="${q(pr[0], pr[1], i * off, pr[2])}" stroke-opacity="${(0.08 + 0.34 * (1 - Math.abs(i) / 9)).toFixed(2)}"/>`;
    }
  });
  s += `</g><path class="route" style="stroke-width:${m === "wide" ? 3 : 2}px" d="${q(C.a, C.k, 0, 0.14)}"/>`;

  const city = (p: Pt, name: string) =>
    `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(fs * 0.7).toFixed(1)}" fill="none" stroke="#ECECE8" stroke-opacity=".35"/>` +
    `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(fs * 0.22).toFixed(1)}" fill="#ECECE8"/>` +
    `<text x="${(p[0] + fs * 1.1).toFixed(1)}" y="${(p[1] + fs * 0.34).toFixed(1)}" font-size="${fs.toFixed(1)}" font-weight="500" fill="#ECECE8" style="font-family:var(--display);letter-spacing:-.02em">${name}</text>`;
  s += `<g class="cty" style="--i:0">${city(C.t, "Takoradi")}</g><g class="cty" style="--i:1">${city(C.a, "Accra")}</g><g class="cty" style="--i:2">${city(C.k, "Kumasi")}</g>`;

  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.innerHTML = s;
}

/** Draws the page's Beacon art and keeps it in step with layout, breakpoint and font changes. */
export function initBeacon(): Cleanup {
  const svg = $<SVGSVGElement>("#beacon-svg");
  if (!svg) return () => {};
  const redraw = () => drawBeacon(svg);
  redraw();
  const mq = window.matchMedia("(min-width:900px)");
  mq.addEventListener("change", redraw);
  let ro: ResizeObserver | null = null;
  if ("ResizeObserver" in window && svg.parentElement) {
    ro = new ResizeObserver(redraw);
    ro.observe(svg.parentElement);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
  return () => {
    mq.removeEventListener("change", redraw);
    ro?.disconnect();
  };
}
