# Christabel Quaye — Portfolio

Next.js (App Router) · React · TypeScript · plain CSS. Editorial light theme, a scroll-driven "teardown" of a product into layers, five featured projects with motion, nine case studies.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build && npm start
```

## Where content lives
All copy is in `data/` (see `.claude/docs/CONTENT-MODEL.md`). Anything missing is a visible placeholder, never invented.

| File | Controls |
| --- | --- |
| `data/site.ts` | Name, location, **site URL**, links (email, LinkedIn, GitHub, résumé), hero roles |
| `data/projects.ts` | The nine case studies and the five featured project cards |
| `data/teardown.ts` | The five teardown layers and their "Seen in" links |
| `data/about.ts`, `experience.ts`, `stack.ts`, `building.ts` | About, Experience, Stack, Currently building |

## Docs
Full documentation is in **`.claude/docs/`**. Start with `README.md` there, then `TODO.md` (things left to do: GitHub link, résumé PDF, domain, screenshots, a few case-study gaps).

## Before you go live
1. Set `site.url` (domain) in `data/site.ts`.
2. Replace the GitHub link (still the old account) and add the résumé PDF to `public/`.
3. Fill the "To add" gaps in the case studies, add screenshots.
4. Run `npm run typecheck && npm run lint && npm run build`.
