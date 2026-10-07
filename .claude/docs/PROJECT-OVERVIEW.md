# Project overview

## What this is
The personal portfolio of **Christabel Amorkor Quaye** ("Chrissy"), based in Accra and Takoradi, Ghana.
It is a single-page site: a typographic hero, a scroll-driven "teardown" of a product into layers, five
featured projects, a list of three more, About, Experience, Stack, Currently building and Contact.
Each project opens as a full-screen case study in a native `<dialog>` (no separate pages).

## Who it is for
Hiring managers and clients. Job-search positioning is **Technical Product Owner | Software Engineer**;
target roles are Technical PO/PM, Frontend Engineer and Product/Solutions Architect. The page is written to show
someone who works across the interface and the systems behind it, and who also does product work.

## Page structure (DOM order matters)
| # | Section | Id | `data-sec` label | Component |
| - | --- | --- | --- | --- |
| – | Hero | `top` | *(empty)* | `components/Hero.tsx` |
| – | Teardown ("How far down the work goes") | `anatomy` | How it’s built | `components/teardown/Teardown.tsx` |
| 01 | Selected work (5 featured + More work) | `work` | 01 Selected work | `components/work/Work.tsx` |
| 02 | About | `about` | 02 About | `components/About.tsx` |
| 03 | Experience | `experience` | 03 Experience | `components/Experience.tsx` |
| 04 | Stack | `stack` | 04 Stack | `components/Stack.tsx` |
| 05 | Currently building | `building` | 05 Currently building | `components/Building.tsx` |
| 06 | Contact (+ footer) | `contact` | 06 Contact | `components/Contact.tsx` |

The nav’s "current section" readout reads the `data-sec` attribute of these sections in DOM order.

## Stack
- **Next.js 16** (App Router), **React 19**, **TypeScript** (strict).
- **Plain CSS** in `app/globals.css` (no Tailwind). **No animation library**: motion is CSS plus a few small scripts.
- Fonts self-hosted via `@fontsource-variable`: **Familjen Grotesk** (display/UI) and **Newsreader** (serif, with optical size).
- No analytics, no third-party requests, no cookies.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build && npm start
```
Node 20+ is fine (built and tested on Node 22).

## Folder map (short)
```
app/            layout, page, global CSS, icon, robots, sitemap, Open Graph image, 404
components/     one component per section, plus ui/, work/, teardown/, case-study/
data/           ALL copy and content as typed data (site, projects, teardown, about, experience, stack, building)
lib/enhance/    the DOM scripts (reveal, teardown scene, work motion, parallax, Beacon drawing)
lib/utils.ts    tiny style helpers for CSS custom properties
public/         static files (put the résumé PDF here)
.claude/docs/   this documentation
CLAUDE.md       short instructions for Claude Code sessions
```
See [ARCHITECTURE.md](./ARCHITECTURE.md) for the detail.
