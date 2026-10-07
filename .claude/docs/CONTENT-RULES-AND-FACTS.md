# Content rules and verified facts

**Read this before editing any copy, CV or case study.** These are the rules Christabel set and the facts she has confirmed.
If something is not here and not in `data/`, it has not been confirmed: ask, or leave a placeholder.

## Hard rules
1. **Never invent** content, metrics, URLs, repositories, testimonials, awards, client outcomes or contact details. If it is missing, use a placeholder (`null` link, empty array → "To add" block, "—" for a value).
2. **Voice:** first person, plain, specific. No buzzwords ("passionate", "synergy", "cutting-edge", "world-class", "leverage"…). Say what was done.
3. **No years in project metadata.** The `Role · Type · Status` line carries no dates. Years belong only in Experience.
4. **Not live means not live.** Dolphins Swim Center is *in progress, not live*. Beacon is *in development, not live*. Never link to or imply a live site for them. The Dolphins visual is an *illustrative mockup* and is labelled as such.
5. **Power BI and BigQuery are "platform context" only** (Staffing Analytics Dashboard). They are platforms the product sits on, not part of her engineering stack. They never appear in the Stack section.
6. **Do not name Entra.** It is an internal dependency of Staffing Analytics and is intentionally not named anywhere (portfolio or CVs).
7. **Contentstack is not a skill or project.** It was removed everywhere. Her CMSs are **Sanity** and **Storyblok**.
8. **Starter kits:** at Studio Freight she **developed the CMS abstraction layer** (Sanity/Storyblok behind one content shape) and **enhanced/updated the existing** Next.js and Nuxt starter kits. She did **not** build the kits from scratch. Never write "built the starter kits" alone.
9. **Client names:** Academy Sports + Outdoors may be named, but **without depth about what was done** for them. Keep client case studies high level.
10. **Academy Sports + Outdoors work** was a mix of **business analysis and development** (discovery, requirements documentation, a proof of concept). She experimented with different AI models and some BI. Her role on the SEO content proof of concept was developer plus discovery and requirements; do not claim she led the AI strategy.
11. **Phone number:** not on the portfolio (it is on the CV only).
12. **The "8 KPIs" figure** for Staffing Analytics appears on the CVs but **not on the portfolio** (Christabel's call).
13. **GitHub:** the old account `https://github.com/Cherrybe` is used until she links the new one. Do not invent a handle.
14. **No domain yet.** Canonical/OG use `https://example.com` until one is chosen.
15. Staffing metric **values are blank on purpose**; do not fill them.

## Person
- **Christabel Amorkor Quaye** ("Chrissy"). Based in **Accra and Takoradi, Ghana**.
- Positioning (job search): **Technical Product Owner | Software Engineer**. Portfolio hero (updated Oct 2026): Software Engineer / Technical Product Owner · Frontend & Full-Stack · Product & Systems. Hero lead: "I work across the product — from understanding the problem and shaping requirements to building the interfaces, APIs and systems behind them."
- Education (CV): BTech Software Engineering and HND Information Technology, Takoradi Technical University. AWS Certified Cloud Practitioner (2024); Cybersecurity Awareness, SoSafe (2024); Google Product Management course on Coursera (in progress).
- Languages: English, Twi, Ga, basic Ewe.
- Contact on the site: email `qchristabel5@gmail.com`; LinkedIn `https://www.linkedin.com/in/christabel-quaye-780a1a1a9/`.

## Career timeline (use these dates)
**AmaliTech, Takoradi: Aug 2021 – present** (the portfolio shows "2021 to now")
- Internship Trainee: Aug 2021 – Nov 2022
- National Service Personnel: Nov 2022 – Oct 2023
- Junior Associate: Nov 2023 – Sep 2024
- Associate: Oct 2024 – Nov 2025
- **Full-Stack Technical Product Owner & Frontend Engineer: Nov 2025 – present** (her stated title; LinkedIn shows "Frontend Developer, contract" for the same period)

**Studio Freight (via Scale Army), remote, contract: Nov 2025 – Apr 2026** (the portfolio shows "2025 to 2026")
- Frontend / CMS developer. Developed the CMS abstraction layer; enhanced the existing Next.js/Nuxt starter kits; built out the CMS implementation on a client project and fixed issues in the CMS and the frontend (**Dragonfly is deliberately not named anywhere**, at her request); contributed to developer tooling, debugging utilities, deployment workflows and Vercel configuration.

## Projects (see `data/projects.ts` for the case-study text)
1. **VoltGH** — independent project. REST API for EV charging discovery in Ghana: TypeScript, Node.js, Fastify, PostgreSQL, Prisma; 27 endpoints over a 9-table schema; Argon2, short-lived JWTs, rotating hashed refresh tokens, role-based guards; radius search via SQL bounding box + Haversine (no PostGIS). Designed and built end to end.
2. **Staffing Analytics Dashboard** — AmaliTech, internal. She is Product Owner and does the technical product work. Bronze/silver/gold layering, one definition per metric; metrics: active requests, SLA compliance, average time to staff, fulfilment rate. Started without a BRD. Major change: tracking moved from request level to role level. Phase 1 reads Jira and historical Excel data. Confluence space: technical docs, user guide, governance.
3. **Beacon** — intercity parcel delivery (Accra, Kumasi, Takoradi). In development, not live. Her part: product thinking and system design; operational rules (cancellation/refunds, the 10-minute driver-unavailability rule, delivery cutoffs, working hours, restrictions); Phase 1 kept separate from a marketplace and loyalty.
4. **CMS Starter Kit** — see rule 8.
5. **Dolphins Swim Center, Takoradi** — in progress, not live. Product Owner and frontend engineer. Mapping paper-based operations, requirements, planning how workflows move to software; Next.js frontend with a CMS.
6. **AmaliTech Corporate Website** — rebuilt from WordPress to Next.js and Sanity CMS; she led frontend delivery. Refactored the interactive navigation (removed duplicated code, simplified CMS configuration for editors, added tests); built a prototype of the page-break interaction against the Figma design and handed the approach to a colleague; lazy loading with skeleton layouts; JSON-LD; SonarQube fixes.
7. **AI Content Generation POC** — client engagement (Academy Sports + Outdoors). Discovery, requirements documentation submitted to the client, a proof of concept with Gemini, live search, streamed generation and version history; iterated on internal testing and client feedback.
8. **Global Operations Cost Dashboard** — AmaliTech, internal and private. Product Owner. Worked with Finance (Ghana and Rwanda) on QuickBooks reporting and definitions; Phase 1 data source moved from direct QuickBooks integration to structured Excel data; scope separated from the wider company-wide reporting vision.
9. ~~Dragonfly~~ — **removed from the portfolio** (Oct 2026). She did not know enough about the project to describe it; the Studio Freight work is covered by the CMS abstraction layer, starter kits and a plain bullet about building out and fixing the CMS and frontend on a client project.

Other work she has mentioned (not on the portfolio): an LLM tool-calling benchmark spike (Gemini, OpenAI, Claude) at AmaliTech; a KVM/keyboard bridge side project; freelance and advisory work. Add to the portfolio only if she asks.

## Corrections already made (do not regress)
- AmaliTech start year was wrong in earlier drafts (2022): **2021**.
- Contentstack removed.
- Entra removed from every place it appeared.
- Starter-kit claim corrected (rule 8).
- Academy chatbot critique removed from the proof of concept case study.
- Title updated to "Full-Stack Technical Product Owner & Frontend Engineer" (ampersand, Oct 2026).
- Hero roles and lead line re-pitched to the PO/engineer framing; site description and social description updated to match.
- CVs: AmaliTech entry now headed by the current title, a "Product ownership • Internal analytics products • Frontend engineering" line, earlier roles on their own line, and bullets grouped Product / Client / Engineering (the LLM research spike is a bullet under Engineering).

## Two CVs (kept in sync with this file)
- **Portfolio CV:** the general CV to link from the site.
- **Technical PO CV:** tailored to Technical Product Owner applications (PO work first; "available for U.S. business hours" line for U.S. employers).
Both were drafted from LinkedIn and her CDC report. Neither contains invented numbers.
