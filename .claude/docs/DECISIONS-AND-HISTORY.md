# Decisions and history

## How the design got here
1. **Theme 1 (original Next.js build):** dark forest-green with gold, Newsreader + Instrument Sans + JetBrains Mono, a terminal hero, Tailwind and Framer Motion, separate `/work/[slug]` pages. Delivered as the first zip. It is **not** what this repo looks like any more.
2. **Theme 2:** another direction, previewed and set aside.
3. **Theme 3 (approved):** editorial light paper (`#ECECE8`), ink (`#0F1012`), one accent (`#2536FF`); Familjen Grotesk + Newsreader. Christabel approved this direction and every later change builds on it.
4. **Hero explorations (A and B)** included graphics in the hero. She asked for the **typographic hero** layout with the graphics taken out of it: the sentence is the hero.
5. **Teardown.** To show the range ("how far down the work goes") without a long, dull scroll, the hero graphics were replaced by a **scroll-driven teardown** of a product into five layers (Interface, API, Data, CMS, Product thinking), "like a mech part we rip apart". Iterations:
   - First version scattered grain/particles → rejected ("not sandy scattered, a graphic that represents each phase").
   - Replaced with five isometric plates, one per phase.
   - Scroll jank fixed: per-plate composited SVGs, eased scroll smoothing, cached measurements, `translate` property for card entrance.
   - Translucent dimming showed plates through each other → opaque `.veil` polygons.
   - She flagged that the scroll felt long and not smooth; the section length, spacing and easing were reworked in response.
6. **Selected work felt static** → each project drawing now builds itself on entry and a few react lightly to the pointer (see [INTERACTIONS.md](./INTERACTIONS.md)).
7. **Staffing overlay** (title overlapping the ledger) fixed with column and font-size changes; verified from 900px to 1920px.
8. **Currently building** spacing tightened.
9. **More work:** three more projects (AmaliTech website, AI POC, Global Operations Cost Dashboard; Dragonfly was added then removed in Oct 2026) added as a quieter numbered list under the five featured sections, rather than five more full-bleed sections.

## Decisions worth remembering
- **One accent colour.** Anything coloured is meant to mean something.
- **Stack comes late** and says why ("The tools are what I reach for. The projects are the point.").
- **Case studies are dialogs, not routes.** Keeps the single-page flow; costs shareable URLs (optional TODO: hash deep links).
- **Honest placeholders over filler.** "To add" blocks, a visibly blank ledger, "illustrative mockup" labels.
- **No years on project metadata**, years in Experience only.
- **Power BI/BigQuery as platform context only.**
- **Plain CSS, no Tailwind, no animation library** in the rebuild: the approved design was hand-written CSS with precise, interdependent rules; keeping it verbatim avoided drift and removed two dependencies.
- **Scripts as DOM modules, content as typed data.** See [ARCHITECTURE.md](./ARCHITECTURE.md).
- **Self-hosted fonts** instead of Google Fonts (no third-party requests; works offline).
- **Phone number off the portfolio.**

## Bugs found and fixed (so they are not reintroduced)
- A variable named `P` clashed between the project data and the plate palette → renamed (palette `PP`).
- Mobile teardown tags clipped at the right edge → drawing narrowed and shifted on small screens.
- Last teardown card touched the bottom edge → clamped with a 36px margin.
- Translucent dimmed plates showed through → opaque veil polygons.
- Mobile CMS source tiles overflowed their text → smaller type at ≤599/380/340px.
- Staffing title overlapped the ledger on some widths → column/font changes.
- More work row had the type column squeezed on desktop → four-column grid at ≥900px.
- A stray `-->` after an HTML comment rendered as an arrow glyph at the bottom of More work → fixed (now no such text in the rebuild).

## Source of truth for the approved design
The approved design lived as a single self-contained HTML file ("portfolio-theme3-teardown.html", published as a shared page). This repo is a componentised port of it: the CSS is carried over verbatim, the markup became components and data, the script became `lib/enhance/*`. If the two ever disagree, this repo is now the source of truth.

- **Oct 2026:** Dragonfly removed (portfolio, design page, both CVs). Hero roles split into four cursors (Software Engineer, Technical Product Owner, Frontend & Full-Stack, Product & Systems). Contact art now fades at its edges and stops above the footer.
