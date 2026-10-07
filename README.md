# Christabel Quaye: Portfolio

My personal portfolio: a single-page site that shows how I work across a product, from the problem and the requirements to the interfaces, APIs and systems behind them.

Built with Next.js (App Router), React, TypeScript and plain CSS. An editorial light theme (paper, ink, one blue accent), a scroll-driven "teardown" of a product into layers, five featured projects with motion, and eight case studies that open in a dialog.

## What is on the page

| Section | What it is |
| --- | --- |
| Hero | A typographic headline on a dot-grid canvas where four labelled cursors (Software Engineer, Technical Product Owner, Frontend & Full-Stack, Product & Systems) drift around |
| Teardown | A pinned, scroll-driven scene that pulls a product apart into five layers (interface, API, data, CMS, product), each linking to the projects where it shows up |
| Work | Five featured projects (VoltGH, Staffing Analytics Dashboard, Beacon, CMS Starter Kit, Dolphins Swim Center) plus three more below, each with a case study |
| About | A short statement, how far down the work goes, four working principles, and what I enjoy |
| Experience | AmaliTech and Studio Freight / Scale Army |
| Stack | What I use, grouped by what it is for |
| Currently building | What is in progress |
| Contact | Email, LinkedIn, GitHub, résumé |

## Tech

- **Next.js 16** (App Router, fully static output), **React 19**, **TypeScript** (strict)
- **Plain CSS** in one hand-written stylesheet. No Tailwind, no animation library.
- **Self-hosted fonts** via Fontsource: Familjen Grotesk and Newsreader. Nothing third-party loads.
- **Server components** for every section. Only the nav, the case-study dialog, the toast and the enhancement starter are client components.
- **Motion** lives in small plain-DOM scripts in `lib/enhance/`. Each one returns a cleanup, respects `prefers-reduced-motion`, and works with React Strict Mode.

## Run it

Requires Node 20 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run build        # production build (static)
npm start            # serve the production build
```

Run `typecheck`, `lint` and `build` before every release. All three must pass.

## Project structure

```
app/                  layout, page, global CSS, icon, Open Graph image, robots, sitemap, 404
components/           one component per section
  case-study/         the case-study dialog and its content
  teardown/           the teardown section and its SVG plates
  work/               the featured project sections and their drawings
  ui/                 small shared pieces (arrow, link, SVG sprite)
data/                 all of the copy, typed (see below)
lib/enhance/          scroll, motion and interaction scripts
.claude/docs/         full project documentation and the to-do list
```

## Where the content lives

All copy sits in `data/`, not in the components. Edit it there.

| File | Controls |
| --- | --- |
| `data/site.ts` | Name, location, site URL, links (email, LinkedIn, GitHub, résumé), hero cursor labels, intro line |
| `data/projects.ts` | The eight case studies and the featured project cards |
| `data/teardown.ts` | The five teardown layers and their "Seen in" links |
| `data/about.ts`, `experience.ts`, `stack.ts`, `building.ts` | About, Experience, Stack, Currently building |

Anything not filled in yet shows as a visible placeholder (a dashed "To add" block, or a link that shows a toast), never as invented content.

## Accessibility and performance

- Keyboard: skip link, visible focus, mobile menu with a focus trap, case studies in a native `<dialog>` that returns focus to the button that opened it.
- Reduced motion: the teardown becomes a stacked layout, the hero cursors become a still list, and entrance motion is switched off.
- The role labels are real text, so screen readers and search engines read them even though they move.
- Static HTML, self-hosted fonts and no third-party requests.

## Deploy

It is a static site, so any static-capable host works. Vercel is the intended one: import the repo, no environment variables are needed. Set the real domain in `data/site.ts` first (`site.url`), because the canonical tag, Open Graph data, `robots.txt` and the sitemap all derive from it.
