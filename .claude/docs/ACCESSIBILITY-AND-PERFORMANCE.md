# Accessibility and performance

## Accessibility: what is in place
- **Skip link** ("Skip to content") as the first focusable element.
- **Landmarks:** `header` (primary nav), `main#main`, one `footer` (inside Contact), a labelled mobile `nav`. Sections use `aria-labelledby` pointing at their heading.
- **Headings:** one `h1` (hero); `h2` per section; `h3` for projects, cards and principles.
- **Focus:** visible `:focus-visible` outline in the accent colour on everything; the project card shows its outline via `:has(.open:focus-visible)` because the title button's `::after` stretches over the whole card.
- **Dialog:** native `<dialog>` modal (focus trap, `Esc`), `aria-labelledby="cs-title"`, focus returns to the opener.
- **Mobile menu:** `aria-expanded`, `aria-controls`, `role="dialog" aria-modal`, focus trap, `Esc`.
- **Nav state:** `aria-current="true"` on the active section link.
- **Drawings:** meaningful ones are `role="img"` or `role="group"` with a text alternative (teardown, Volt, Beacon, CMS grid, Staffing ledger, Dolphins mockup). Decorative ones (plates, tags, contact art, sprite, pool pattern) are `aria-hidden`.
- **Placeholders are announced as such:** the toast is a `role="status"` live region; the Staffing ledger says in text that values are intentionally blank.
- **Reduced motion:** honoured in CSS and in scripts. Teardown becomes a static, fully readable layout; reveals show immediately; no pointer tilt, parallax or looping route flow.
- **No JS:** all content is in the server HTML; hidden "before reveal" states are scoped to `.js`.
- **Teardown keyboard behaviour:** buttons inside invisible (inactive) teardown cards are removed from the tab order. Their text remains readable to screen readers.
- **Language:** `<html lang="en">`.

## Known gaps (also in TODO)
- `--faint` on `--paper2` is 4.46:1 (the "Currently debugging" line).
- The teardown is scroll-driven; keyboard and screen-reader users get the same content in order but not the animation. The text cards are in the DOM in order.
- Not yet tested with real screen readers (VoiceOver/NVDA). Do a pass before launch.

## Performance: what is in place
- Static prerender (`○ /`). No runtime data fetching.
- **Fonts self-hosted** (fontsource variable, `latin` subsets loaded by the browser as needed). No third-party requests at all.
- JavaScript is small: no animation library; the scripts are a few hundred lines of DOM code.
- **Scroll work is isolated:** the teardown moves five separately composited SVG layers with `translate3d`, measures once (cached) rather than every frame, pauses when the section is off-screen, and uses opaque polygons instead of opacity on large filtered groups.
- CSS animations use `transform`, `opacity`, `clip-path`, `stroke-dashoffset`; individual `translate`/`scale` properties avoid fighting hover transforms.
- Images: none yet (all art is inline SVG/CSS). When screenshots are added, use `next/image` with explicit sizes.

## Things to verify after deploy
1. Lighthouse (mobile) for Performance, Accessibility, Best Practices, SEO.
2. iOS Safari: sticky teardown (`svh` units, address-bar resize), dialog scrolling, `backdrop-filter` on the header.
3. Android Chrome mid-range device: teardown smoothness.
4. Keyboard-only: tab through hero → teardown → work → dialog → close; mobile menu.
5. VoiceOver / NVDA on the teardown and a case study.
6. `prefers-reduced-motion: reduce` on desktop and mobile.
7. 200% zoom and a 320px-wide viewport (no horizontal scroll; the CMS source tiles shrink their text at ≤599/380/340px).
