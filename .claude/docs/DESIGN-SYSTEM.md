# Design system ("Theme 3": editorial light paper)

One idea: a printed, editorial page. Big tight grotesque type, hairline rules, a serif for reading text, and a
**single accent colour** used sparingly. Nothing decorative that is not carrying meaning.

## Tokens (`:root` in `app/globals.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#ECECE8` | page background, text on dark |
| `--paper2` | `#E0E0DA` | secondary surface (Volt art, Currently building band, hover fills) |
| `--paper3` | `#CFCFC8` | tertiary (skeleton bars, tier 1, borders on mockups) |
| `--ink` | `#0F1012` | text, rules, dark sections (Beacon, Contact) |
| `--ink2` | `#17181B` | spare near-black |
| `--muted` | `#46484D` | secondary text |
| `--faint` | `#62646A` | tertiary text, dashed placeholder borders |
| `--rule` | `rgba(15,16,18,.22)` | hairline rules |
| `--accent` | `#2536FF` | the one accent: numbers, highlights, route lines, CTA buttons, focus ring |
| `--accent-lt` | `#8E98FF` | accent on dark backgrounds |
| `--display` | Familjen Grotesk (variable) | headings, UI |
| `--serif` | Newsreader (variable, optical size) | lead paragraphs, long reading text |
| `--gx` | `max(clamp(20px,4.2vw,72px), (100vw − 1760px)/2)` | horizontal gutter; also keeps content ≤ 1760px wide |
| `--gap` | `clamp(12px,2vw,32px)` | grid column gap |
| `--ease` | `cubic-bezier(.2,.7,.1,1)` | the one easing curve used everywhere |

Contrast (WCAG ratios, computed): ink on paper 16.1:1 · muted on paper 7.7:1 · faint on paper 5.0:1 · accent on paper 5.8:1 · white on accent 6.9:1 · accent-lt on ink 7.3:1.
One known borderline: `--faint` on `--paper2` is 4.5:1 (4.46), used by the small "Currently debugging" line in the Currently building band. See TODO.

## Typography
- Display headings: weight 500, **negative tracking** (`-.04em` to `-.055em`) and tight leading (`.86–.94`) so large type reads as one block.
- Body UI text: Familjen Grotesk 400/500, `1rem/1.55`.
- Lead and reading paragraphs: Newsreader, `clamp(1.1rem, 1.4vw, 1.28rem)/1.5`.
- Sizes are `clamp()` ranges, no fixed breakpoints for type except the hero on narrow screens (`16vw`).
- Numbers use `font-variant-numeric: tabular-nums`.

## Grid and layout
- `.g` = 12-column grid (`repeat(12, minmax(0,1fr))`), column gap `--gap`, horizontal padding `--gx`. Direct children span all columns by default (`.g > * { grid-column: 1 / -1 }`) and sections place themselves at wider breakpoints.
- `.sec` = vertical section spacing `clamp(72px, 12vw, 180px)`.
- Breakpoints used: **599px** (small phones), **640px** (case-study decisions go two-column), **760px** (nav links appear, hero two-column, footer columns), **900px** (desktop layouts: project sections, teardown side-by-side, About, Experience, Stack, Contact), `1760px` content cap via `--gx`.
- Safe areas: header, menu and footer add `env(safe-area-inset-*)`.

## Class vocabulary
**Layout/text:** `.g` grid · `.sec` section · `.label` ("01 Selected work") · `.big` display heading · `.serif`.
**Reveal:** `.mk` (clipped line that slides up) · `.fd` (fade up) · `.rv` (observed element; gets `.in` on entry) · `.in` · `.js` (on `<html>`, gates all hidden "before" states).
**Nav:** `.nav` (+ `.s` after 40px scroll) · `.now` · `.links` · `.idx` · `.menu`.
**Hero:** `.hero` · `.hero-top` · `.roles` · `.hero-h` (`.l1 .l2 .l3`) · `.hero-bot` · `.hero-lead` · `.hero-links` · `.more` (underlined arrow link).
**Project (shared):** `.proj` (+ `.go` once built in) · `.pcap` caption · `.ptitle` · `.open` (title button; its `::after` makes the whole card clickable) · `.tt` (title text, animated) · `.plead` · `.facts` · `.art` (+ `.par` for parallax) · `data-art` / `data-i` hooks.
**Per project:** `.volt` · `.staff` (`.ledger .tiers .tier .rows`) · `.beacon` (`.a-beacon .ov .ov-in`) · `.cms` (`.cms-grid .tile .src .abs .comp .app .txt`) · `.dol` (`.a-dol .dol-pool .dol-mock .browser .phone`) · `.more-work` / `.mw`.
**About/Experience/Stack/Building/Contact:** `.about .statement .mkr .about-copy .depth .princ` · `.xp .when .info` · `.stack-head .sgrid` · `.build .bl .prog .build-foot` · `.contact .c-art .c-bot .clist .btn-c .foot`.
**Case study:** `dialog.cs` · `.cs-bar` · `.cs-top .cs-title .cs-meta .cs-art` · `.cs-sec` · `.seq` · `.dec` · `.pts` · `.phb` (dashed "To add") · `.cs-links` · `.cs-next`.
**Teardown:** `.anat` (+ `.anat-live` = pinned) · `.anat-pin` · `.anat-head` · `.anat-stage` · `.pa.an` (the drawing box, 470×410 units) · `.pl[data-k]` (a plate) · `.veil` · `.an-tags .an-tag` · `.an-cards .an-card(.on)` · `.an-seen .an-link`.

## Per-section layout notes
- **Hero:** three-line mask reveal; line 2 indented (`7.5vw`), line 3 is the accent-coloured tagline at `.35em`, indented `34vw` on desktop. Below 760px the heading is `16vw` and `the<br> interface.` breaks.
- **VoltGH:** the title is huge and overlaps the drawing (`margin-left:-.56em`, `white-space:nowrap`) on desktop; a phone mockup sits bottom-left of the drawing.
- **Staffing:** text left, a "ledger" right: three stepped tiers (bronze/silver/gold) and four metric rows with **blank values on purpose**.
- **Beacon:** dark full-bleed. On desktop the SVG and the text overlay share one grid cell (`grid-area:1/1`) with the huge title bottom-left; on narrow screens it stacks (caption, art, text, title) and the title overlaps the art.
- **CMS Starter Kit:** a 12-column modular grid (two sources → one accent "CMS abstraction" tile → three component tiles → two targets) with the text in the right column.
- **Dolphins:** an accent "pool" with lane-rope pattern, an illustrative browser and phone. The mockups are **labelled as illustrative**, not a live site.
- **Currently building:** `--paper2` band, two huge names.
- **Contact:** ink background; faint route lines behind; accent button; footer inside the section.

## Motion principles
Motion explains structure (things build in, layers pull apart); it is never decoration for its own sake.
All motion is gated by `@media (prefers-reduced-motion: no-preference)` in CSS, or by `prefersReducedMotion()` in scripts.
Hidden "before" states are scoped to `.js`, so with scripts disabled everything is visible.
See [INTERACTIONS.md](./INTERACTIONS.md).

## Grain
`.art::after` and `.dol-pool::after` overlay a subtle SVG-noise texture (`mix-blend-mode: multiply`; `screen` on Beacon) so flat colour fields feel printed.
