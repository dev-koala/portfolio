# Interactions: how each behaviour works

All page scripts are in `lib/enhance/` and started once from `components/Enhance.tsx` → `initPage()`.
Each `init*` returns a cleanup. Everything is gated for reduced motion.

## 1. Reveal on scroll (`reveal.ts` + CSS "reveal" block)
- Elements with **`.rv`** or **`.fd`** are observed (`IntersectionObserver`, `rootMargin: 0 0 -8% 0`, `threshold: .05`). On entry they get **`.in`** and are unobserved.
- `.fd` fades up 14px. `.mk > span` slides up from `translateY(112%)` inside a clipped parent (`.mk{overflow:hidden}`), giving the "line rises into place" effect. `.in` on the element **or an ancestor** reveals it (`.js .in .mk>span`, `.js .in .fd`).
- Stagger: `style={{ '--d': n }}` (helper `d(n)`); delay = `--d × 90ms`.
- The hero heading gets `.in` two animation frames after mount so the entrance plays on load.
- Hidden "before" states exist **only** under `.js` (class added by an inline `<head>` script) and are overridden in `@media (prefers-reduced-motion: reduce)`. No JS ⇒ everything visible.

## 2. Teardown scene (`teardown.ts`, markup in `components/teardown/`)
A pinned scene: the drawing of a product comes apart into five layers as you scroll, one text card at a time, and goes back together on the way up.

**Layout:** `.anat.anat-live` is `calc(100svh + 250svh)` tall; `.anat-pin` is `position: sticky; top: 0; height: 100svh`. Scroll progress `tp` (0..1) = `(scrollY − sectionTop) / (sectionHeight − viewportHeight)`.

**Drawing:** five SVGs `.pl[data-k=0..4]` (0 Interface on top … 4 Product at the bottom) are isometric plates in the box `.pa.an` (470×410 design units; scale `u = box width / 470`). Each plate is its own composited layer, moved only by `translate3d`.

**Per frame** (`requestAnimationFrame`, only while the section is near the viewport):
1. Smooth: `s += (tp − s) × (1 − exp(−dt/110))`. The eased value `s` is what is drawn, so scroll feels weighted, not jittery.
2. Envelopes (all `smoothstep`): `g = ease((s−.05)/.08)` (how far dimmed/lifted), `e = ease((s−.02)/.1)` (spread).
3. Continuous layer index `c = (s − .12) / .22`. Active layer `a = s < .1 ? −1 : round(c)` clamped 0..4. (`−1` = the intro card.)
4. Spread: resting plate spacing is `70u`; target spacing `= clamp(70u, availH/5.3, 160u)` where `availH` is the stage height (wide) or 52% of it (narrow). `oy[L] = (L−2) × (target−rest) × e`.
5. Per layer `L`: lift `f = ease(1 − |c − L| / .85)`, `lift = f × g`. Transform `translate3d(28·lift·u, oy[L] − 6·lift·u, 0)`. The opaque `.veil` polygon on each plate gets `opacity = .74 × g × (1 − f)` (dims plates that are not active; opaque so plates behind do not show through).
6. Tags (`.an-tag`) follow their plate; opacity `1 − .65·g·(1−f)`; the active tag turns accent.
7. Cards: only the active card has **`.on`** (fades/slides in). On wide screens the card is positioned beside its plate via `--y` (clamped inside the stage). On narrow screens it is a fixed strip at the bottom, with fewer bullets shown (CSS hides items 3+, and items 2+ on short screens).
8. The "Scroll to take it apart" hint fades out after `s > .04`.
Inactive cards' buttons get `tabindex=-1` so keyboard focus never lands on an invisible card.

**Reduced motion:** `anat-live` is removed (script), the section is a normal two-column layout with the drawing fully spread (sticky on wide screens) and every card visible.
**Measuring:** `measure()` runs on resize, on `load`, via `ResizeObserver` on the drawing, and whenever the section enters the 200px intersection margin.
**Do not** put `transform` on `.pl` in CSS; the script owns it.

## 3. Selected work motion (`work-motion.ts` + the "Selected work" CSS block)
- Each `.proj` gets **`.go`** when 18% is visible (`rootMargin: 0 0 -6% 0`). All drawings are CSS-animated from "hidden" (`.js .proj:not(.go) …`) to built:
  - **VoltGH:** bounding box, circles scale in; the accent radius circle **draws itself** (`pathLength="1"` + `stroke-dashoffset`); points pop in staggered (`--i`); a pulse loops; the phone slides up.
  - **Staffing:** tiers grow from 4% height; metric rows slide in with their dotted leader lines extending; the note fades in.
  - **Beacon:** the 51 parallel route lines draw themselves (`--i` × 28ms stagger), cities fade in, then the dotted accent route fades in and flows (`stroke-dashoffset` loop; faster on hover).
  - **CMS:** tiles rise in on custom delays (`--td`), component bars grow.
  - **Dolphins:** the pool wipes in with `clip-path`, browser and phone rise in.
- Titles (`.tt`) fade/translate in.
- **Pointer response** (only `(hover:hover) and (pointer:fine)` and not reduced motion): on `.a-volt` and `.a-dol`, `pointermove` sets `--mx` / `--my` (−1..1); CSS translates the ring/browser and phone in opposite directions a few pixels.
- Implementation notes that matter: entrances use the **individual `translate` / `scale` properties** and animation fill-mode **`backwards`**, so the hover `transform` still works afterwards.
- Reduced motion or no IntersectionObserver ⇒ `.go` is added to all immediately and no pointer handlers are attached.

## 4. Parallax (`parallax.ts`)
Elements with `data-par="<factor>"` (only VoltGH's `.par`) move by `(elementCentre − viewportCentre) × factor`, clamped to ±6% of the host's height, on scroll via rAF. Disabled for reduced motion. The case-study clone strips `data-par`.

## 5. Beacon drawing (`beacon.ts`)
`drawBeacon(svg, mode)` writes the SVG contents at runtime in **real pixels** of its container so the three cities and their labels can be kept clear of the text column and the huge title.
- `wide` (≥900px): reads the positions of `.beacon .ptext`, `.ptitle`, `.pcap` to pick `xMax`/`yA`/`yB`, then places Kumasi (top), Takoradi (left), Accra (bottom right).
- `narrow` (<900px) and `cs` (case-study dialog) use fixed proportional positions and smaller type.
- Three bundles of 17 curved paths (offset from `−8..8`) connect the cities; a dotted accent `.route` Accra→Kumasi gets the flow animation.
- `initBeacon()` redraws on breakpoint change, container resize (`ResizeObserver`) and when fonts are ready.
- React never manages the SVG's children (it renders an empty `<svg id="beacon-svg">`).

## 6. Case-study dialog (`CaseStudyDialog.tsx`)
- A native `<dialog class="cs">` opened with `showModal()` (browser provides focus trap, `Esc`, top layer, inert page).
- One delegated `click` listener on `document` handles every `[data-open="<index>"]`: title buttons, More work rows, teardown "Seen in" links, and "Next project".
- It `flushSync`es the selected index into React state, calls `showModal()`, **then** clones the art (so Beacon can measure the visible dialog), resets `scrollTop`, and adds `body.lock` (stops page scroll).
- **Focus** returns to the opener on close (not for "Next project", which stays in the dialog).
- The dialog sticks a top bar (`.cs-bar`) with the number, name and **Close**.
- Content is `CaseStudy.tsx` rendered from `projects[idx]`; see [CONTENT-MODEL.md](./CONTENT-MODEL.md).

## 7. Nav (`Nav.tsx`)
- `.nav` gets `.s` after 40px scroll (blur + hairline).
- "Current section": last `[data-sec]` whose top is above 38% of the viewport height (and the last section when at the very bottom). Drives the "01 Selected work" readout and `aria-current` on the four links.
- **Mobile Index menu** (<760px): full-screen `role="dialog" aria-modal`; focus moves to the first link, `Tab` is trapped, `Esc` closes and returns focus to the button, scroll is locked, and it auto-closes if the viewport grows past 760px.

## 8. Placeholder links and toast (`Enhance.tsx`, `Toast.tsx`, `SmartLink.tsx`)
A link with `data-ph="message"` does not navigate. `Enhance` prevents default and dispatches `cq:toast`. Two `Toast` instances listen (page and dialog); the one that matches whether a `<dialog>` is open shows the message for 2.6s. (A page-level toast would be hidden behind a modal dialog, which lives in the browser's top layer.)

## 9. Contact art
`ContactArt` in `Contact.tsx`: 21 faint curves plus one dotted accent route, computed at render time (static SVG). It echoes the Beacon routes.

## Hero canvas: role lines as cursors (`lib/enhance/cursors.ts`)
- Markup: `components/Hero.tsx` renders `.canvas[data-cv] > ul.roles > li.cur.c1..c4` (arrow svg `.ar` + label `.tag`). The four labels (Software Engineer, Technical Product Owner, Frontend & Full-Stack, Product & Systems) come from `site.roles`, so the real text is always in the DOM and read by screen readers.
- Look (`app/globals.css`, "Hero canvas" block): a masked dot grid (`.canvas::before`) plus a faint accent glow (`::after`). c1 solid accent, c2 solid ink, c3 accent-lt tint, c4 paper with ink outline. No new colours.
- Base layout (no JS, reduced motion): a plain right-aligned stack on desktop, left-aligned stack in a short dotted band on mobile. Motion CSS is only inside `@media (prefers-reduced-motion:no-preference)` and `.js`.
- Behaviour: the cursors start in the stack, fade in at ~0.7s, then every ~3.6s each moves to its next waypoint (`PATHS`, fractions of the free space, staggered 2.4 / 3.1 / 3.8 / 4.5s). Movement is a CSS transition on `left/top` (2.1s). The movement zone starts to the right of where the headline ends, so no waypoint can touch the headline.
- Safeguards: targets are nudged so cursors do not land on each other; below 420px wide each cursor gets its own lane; paused when the hero is off screen or the tab is hidden; re-placed on resize. Verified no overlap with the headline at 320 to 1920px.
- Zone: `.roles` is the movement area (desktop: right 60% of `.canvas`, which starts at 50% of the hero; mobile: the whole band).
- Not built (ideas): one cursor following the real pointer with lag; cursors "clicking" a work card.

## Contact art (`ContactArt` in components/Contact.tsx)
The route lines sit in `.c-main` (everything above the footer), so they stop above the footer rule instead of running through it. `.c-art` has a two-gradient mask that fades its left, top and bottom edges, so there is no hard edge. Only the right edge is open (the art runs off the page).
