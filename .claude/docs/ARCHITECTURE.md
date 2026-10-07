# Architecture

## Rendering model
- `app/page.tsx` composes the sections. **Every section is a server component** and is fully
  present in the static HTML (the site is statically prerendered: `○ /` in the build output).
- Only five things are client components (`"use client"`):
  1. `components/Nav.tsx` — scroll state, "current section" label, `aria-current`, the mobile menu (React state).
  2. `components/case-study/CaseStudyDialog.tsx` — the case-study `<dialog>` (React state for which project is open).
  3. `components/Toast.tsx` — status message (two instances: page and dialog).
  4. `components/Enhance.tsx` — renders nothing; starts the page scripts after hydration.
  5. (`CaseStudy.tsx` is not marked client but is only rendered inside the client dialog.)
- Everything else (hero, teardown markup, work, about, ...) is plain server-rendered markup. This keeps the
  JavaScript small and means the content is readable with scripts off.

## Why the motion scripts are plain DOM code (not React state)
The hand-tuned scroll scene, reveal and motion were built and approved as vanilla JS in a single HTML file. They
work by toggling classes and setting inline `transform` / custom properties on elements React rendered once on the
server and never re-renders. Keeping them as small TypeScript modules in `lib/enhance/` preserves the exact,
already-approved behaviour and keeps them off React's render path (60fps scroll work must not trigger renders).
Rules that keep this safe:
- Server components never re-render on the client, so React will not overwrite classes/styles the scripts add.
- Each `init*` function returns a **cleanup** (React Strict Mode mounts effects twice in dev).
- Scripts look elements up by id/class (`#anatomy`, `.proj`, `[data-par]`...). If you rename those hooks in markup or CSS, rename them in the script too. The hooks are listed in [INTERACTIONS.md](./INTERACTIONS.md).

## Data flow
```
data/*.ts  ──►  server components (markup)  ──►  static HTML
                                   │
data/projects.ts ─► CaseStudy.tsx (rendered inside the client dialog from `projects[idx]`)
```
- `data/projects.ts` is the content model for case studies and the "Selected work" cards.
- The five featured projects also have a `featured` block (`lead`, `facts`) used by the section components.
- Teardown "Seen in" buttons are built from project **slugs** (`data/teardown.ts`) and resolved to indexes at render time.

## Case-study art: cloned, not re-rendered
The dialog shows the same drawing as the page. `fillArt()` in `CaseStudyDialog.tsx` finds
`.proj[data-i="<index>"] [data-art]` and clones that DOM node into `#cs-art`. The clone drops `data-art`, the
`beacon-svg` id and any parallax transform. Projects without a `[data-art]` element (the three More work entries) show no drawing.
This means: **a featured project's section must keep `data-i` on the `<article>` and `data-art` on its drawing.**

## File map
```
app/
  layout.tsx            metadata, fonts, <head> script that adds the `js` class, global components
  page.tsx              section order
  globals.css           all styles (tokens at the top, banners per section)
  icon.svg              favicon ("CQ" + accent bar)
  opengraph-image.tsx   social card (palette + name + title)
  robots.ts, sitemap.ts one URL; case studies are dialogs, not routes
  not-found.tsx
components/
  Nav.tsx               header, current-section label, mobile menu
  Hero.tsx
  About.tsx  Experience.tsx  Stack.tsx  Building.tsx  Contact.tsx
  Toast.tsx  Enhance.tsx
  teardown/Teardown.tsx   markup for the pinned scene, cards from data
  teardown/Plates.tsx     the five isometric SVG plates (hand-drawn, tokens as colours)
  work/Work.tsx           intro, five featured sections, More work list
  work/Projects.tsx       the five featured section layouts (Volt, Staffing, Beacon, CMS, Dolphins)
  work/parts.tsx          Cap, Title, Facts, ReadMore
  work/VoltArt.tsx  work/DolphinsArt.tsx   drawings
  case-study/CaseStudy.tsx          renders one project from data
  case-study/CaseStudyDialog.tsx    dialog, open/close, art cloning
  ui/Arrow.tsx  ui/SvgSprite.tsx  ui/SmartLink.tsx
data/
  site.ts  projects.ts  teardown.ts  about.ts  experience.ts  stack.ts  building.ts
lib/
  utils.ts                         d(n), cssVar(name, value)
  enhance/index.ts                 initPage(): starts everything, returns one cleanup
  enhance/{reveal,teardown,work-motion,parallax,beacon,util}.ts
```

## Conventions
- Copy lives in `data/`; layout lives in components; style lives in `globals.css`.
- Stagger delay: `style={d(n)}` sets `--d`, and CSS multiplies it by 90ms.
- Placeholder links: a missing URL renders `<a href="#" data-ph="message">`; `Enhance.tsx` turns the click into a toast.
- Prettier config: `.prettierrc.json` (100 columns). `globals.css` is intentionally kept in its compact hand-written form.
