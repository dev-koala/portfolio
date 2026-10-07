# Deployment and testing

## Deploy (Vercel recommended)
1. Push the repo to GitHub (the new account, once linked).
2. Import it in Vercel. Framework: Next.js (auto-detected). No environment variables are required.
3. **Before the first public deploy:** set `site.url` in `data/site.ts` to the real domain (canonical, OG, sitemap, robots all derive from it). Until then everything points at `https://example.com`.
4. Add the résumé PDF to `public/` and set `site.links.resume`.
5. Add the custom domain in Vercel.
It is a fully static site (`next build` output shows `○ /`), so any static-capable host works.

## Checks before every release
```bash
npm run typecheck
npm run lint
npm run build
```
All three must pass with no errors.

## Browser test recipes (Playwright, Chromium)
These are what were used to verify the rebuild. Playwright is not a dependency of the project; install it separately if you want to run them.

**Smoke test (desktop 1370×800 and mobile 390×844):** load `/`, wait for network idle, assert no `console.error`/`warning` and `pageerror`; assert `document.documentElement.scrollWidth === innerWidth` (no horizontal scroll).

**Teardown stops:** compute `top = anatomy.getBoundingClientRect().top + scrollY` and `total = anatomy.offsetHeight − innerHeight`; scroll to `top + total × f` for `f` in `0, .2, .34, .56, .78, .95`; wait ~900ms per stop (eased); screenshot. Expected: intro card at 0; API active near .34; Data near .56; CMS near .78; Product near .95.

**Work motion:** scroll each `.proj` into view, wait ~2.5s, screenshot; confirm `.proj.go` count is 5.

**Dialogs:** for `i` in 0..8: click `[data-open="i"]`; assert `dialog#cs[open]`, `#cs-title` text equals the project name, `#cs-art` has a child for projects 0–4 only, `.cs-next button` shows the next project's name (9 loops to 0); press `Escape`; assert `body` no longer has `.lock`.

**Placeholders:** click `.hero a[data-ph]` (Résumé) → `.toast.show` contains "Placeholder: Résumé file not linked yet." Click a `[data-ph]` inside the dialog → the toast **inside** the dialog shows.

**Mobile menu:** click `#menu-open` → `#menu` visible, first link focused, `aria-expanded="true"`; `Escape` closes and refocuses the button.

**Reduced motion:** create a context with `reducedMotion: "reduce"`: `#anatomy` loses `anat-live`, all cards stack, `.proj.go` count is 5, no console errors.

**Dev-mode hydration:** run `next dev`, load `/`, open a case study; the console must have no hydration or React warnings.

## Known test limits
- Verified in Chromium only. Safari/Firefox and real devices are on the TODO.
- Screenshots in the sandbox use the self-hosted fonts, so type rendering matches production.
