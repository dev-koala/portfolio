# Things left to do

Status as of the Next.js rebuild of the approved "Theme 3 / teardown" design (October 2026).
Nothing below blocks the site from running; every item is either a placeholder that renders safely
or a decision that needs Christabel.

Legend: **[you]** needs information or a decision from Christabel · **[dev]** engineering task · **[opt]** optional polish.

---

## 1. Must do before launch

### Links and files
- [ ] **[you] GitHub link.** `data/site.ts` → `links.github` still points to the OLD account (`https://github.com/Cherrybe`). Replace it when the new account is linked, and update `display.github`.
- [ ] **[you] Résumé.** Two CVs exist (as shared documents): one for the portfolio and one tailored to Technical Product Owner applications. Export the **portfolio CV** to PDF, put it in `public/` (e.g. `public/christabel-quaye-cv.pdf`) and set `links.resume` in `data/site.ts` to `"/christabel-quaye-cv.pdf"`. Until then the Resume link shows a "Résumé file not linked yet" toast. Also update `display.resume`/the label logic in `components/Contact.tsx` if you want different wording.
- [ ] **[you] Domain.** Buy/choose it, then set `site.url` in `data/site.ts`. It drives `metadataBase`, the canonical tag, Open Graph, `robots.txt` and `sitemap.xml`. It is `https://example.com` today.
- [ ] **[you] Contact details check.** Email and LinkedIn are set. The phone number is **deliberately not on the site** (it is on the CV only). Confirm that is still what you want.

### Case-study content gaps
Every empty field renders a dashed "To add" block in the case study, so nothing is invented, but these should be filled:
- [ ] **[you] Dolphins Swim Center** (`projects[4]`): "What I learned" is empty (`learned: []`).
- [ ] **[you] AmaliTech Corporate Website** (`projects[5]`): `learned` is empty.
- [ ] **[you] AI Content Generation POC** (`projects[6]`): this case study goes into more detail than Christabel said she wanted for client work (she said clients can be named but without depth). Review and trim if needed. The critique of the client's chatbot was already removed.
- [ ] **[you] Confirm the roles.** `role` strings were inferred from briefs and CDC material. Confirm each in `data/projects.ts`.
- [ ] **[you] Confirm the status of the four "More work" projects.** They are all `Selected Work` by assumption.
- [ ] **[you] Staffing Analytics Dashboard** is an internal AmaliTech product but is **not** flagged `internal: true`, so its case study shows "Live project / Repository: placeholder" links. Decide: set `internal: true` (shows "Internal, not public" / "Private"), like Global Operations Cost Dashboard.
- [ ] **[you] Project URLs and repos.** Each non-internal, live-able project shows placeholder "Live project" and "Repository" links in its case study (VoltGH, CMS Starter Kit, AmaliTech Corporate Website, AI Content Generation POC if public). There is no field for these yet. See "Add link fields" in section 3.
- [ ] **[you] Screenshots.** Case studies say "Real screenshots, once you have them." Drawings are stand-ins for the five featured projects. Add images (see section 3).

### Quick content check
- [ ] **[you] Read every case study once** for tone and accuracy. Rules for copy are in [CONTENT-RULES-AND-FACTS.md](./CONTENT-RULES-AND-FACTS.md).
- [ ] **[you] Re-read the About statement** (`components/About.tsx`) so it matches the new hero ("Software Engineer / Technical Product Owner"). The hero roles and lead line are already updated; the About statement already moves from frontend into product decisions, so this is a read-through, not a rewrite.

---

## 2. Engineering to-do

- [ ] **[dev] Run the full test pass on real devices.** The teardown scene uses `position: sticky`, `svh` units and `translate3d`. Test on iOS Safari and a mid-range Android phone. See [DEPLOYMENT-AND-TESTING.md](./DEPLOYMENT-AND-TESTING.md).
- [ ] **[dev] Lighthouse / Web Vitals pass** after deploying. Fonts are self-hosted (fontsource), nothing third-party loads. The initial HTML contains one hidden case study (see "Dialog SSR" below).
- [ ] **[dev] Dialog SSR.** `CaseStudyDialog` renders project 0's case study into the closed `<dialog>` on the server. It is `display: none`, but it is extra HTML and duplicated headings for crawlers. Option: render the case study body only after the first open.
- [ ] **[dev] Reduced-motion flash.** The server renders `anat-live` (pinned layout) so there is no layout jump for everyone else; reduced-motion users briefly see the pinned layout until hydration removes it. Option: a tiny inline head script that sets a `rm` class before paint, then scope the CSS to it.
- [ ] **[dev] Deploy** (Vercel is the intended host). Set the production URL first.

---

## 3. Optional polish

- [ ] **[opt] Add link fields to `Project`.** Extend the type with `links?: { live?: string; repo?: string }` and render real anchors in `CaseStudy.tsx` instead of the `data-ph` placeholders when set. (The README of the old project had this per-project `links` model.)
- [ ] **[opt] Screenshots.** Add `images?: { src: string; alt: string }[]` to `Project`, put files in `public/work/<slug>/`, and render them in the "Screenshots" section of `CaseStudy.tsx` (use `next/image`).
- [ ] **[opt] Deep links.** Case studies are dialogs with no URL. Add `#case=voltgh` hash handling in `CaseStudyDialog.tsx` so a case study can be shared and the browser Back button closes it.
- [ ] **[opt] Designed Open Graph image.** `app/opengraph-image.tsx` is a simple typographic card in the site palette.
- [ ] **[opt] Structured data.** Add `Person` JSON-LD in `app/layout.tsx` once the domain and social links are final.
- [ ] **[opt] Reduced-motion hint text.** The hint says "Scroll to take it apart" even when the section is static; consider hiding it in that mode.
- [ ] **[opt] A proper 404 design.** Currently minimal.
- [ ] **[opt] Contrast nit.** `.debug` (faint text on `--paper2` in Currently building) is 4.46:1, just under the 4.5:1 AA threshold for small text. Darken `--faint` slightly or use `--muted` there.

---

## 4. Things outside this repo

- [ ] **[you] The earlier preview pages.** Theme 1 and Theme 2 previews, plus Hero A and Hero B versions of Theme 3, still exist as shared pages. Hero A/B still contain removed content (Contentstack, "2022 to now", only five projects). Only the **teardown** version is current. Delete the old ones when you are ready; nothing here depends on them.
- [ ] **[you] Two CVs.** Keep both in sync with the portfolio when facts change: the portfolio CV and the Technical PO CV. Facts they share are listed in [CONTENT-RULES-AND-FACTS.md](./CONTENT-RULES-AND-FACTS.md).
- [ ] **[you] Memory/profile hygiene.** If titles or dates change, update them everywhere (portfolio data, both CVs, LinkedIn).

---

## Done in this rebuild (for reference)
- Rebuilt in Next.js (App Router, TypeScript) from the approved teardown design: typographic hero, scroll-driven teardown, five featured projects with motion, "More work" list, About, Experience, Stack, Currently building, Contact, nine case studies.
- AmaliTech start corrected to 2021; Contentstack removed; Entra not named; starter-kit wording corrected; three more projects added (AmaliTech Corporate Website, AI Content Generation POC, Global Operations Cost Dashboard). Dragonfly added then removed (Oct 2026).
- Typed content in `data/`, behaviour in `lib/enhance/`, no Tailwind or animation library (CSS + a few small scripts).
- This documentation folder.

- [ ] **[optional] Hero cursors**: decide whether one cursor should follow the real pointer (see INTERACTIONS.md). Check the motion on a real phone and a real trackpad; automated tests only cover layout, not feel.
