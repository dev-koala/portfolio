# Content model

**Rule: copy lives in `data/`, not in components.** Components only hold layout and a few short structural strings
(section labels, the About statement because it contains highlighted phrases, the work intro paragraph, the contact CTA copy).

| File | Controls |
| --- | --- |
| `data/site.ts` | Name, title, location, **site URL**, description, hero roles + lead, **links (email, LinkedIn, GitHub, résumé)**, nav items, copyright year |
| `data/projects.ts` | All eight case studies + the cards of the five featured projects |
| `data/teardown.ts` | Teardown heading, hint, aria label, intro card, five layer cards and their "Seen in" project slugs |
| `data/about.ts` | About paragraphs, "things I enjoy", the depth list, the four principles |
| `data/experience.ts` | Experience rows (years kept here on purpose) |
| `data/stack.ts` | Stack groups and the note |
| `data/building.ts` | "Currently building" items, exploring line, debugging line |
| `components/About.tsx` | The big About statement (has `.mkr` highlighted phrases) |
| `components/work/Work.tsx` | The "Selected work" intro paragraph |
| `components/Contact.tsx` | Contact heading and CTA paragraph |

## The `Project` type (`data/projects.ts`)
```ts
type Project = {
  slug: string;            // stable id; teardown "Seen in" uses it
  num: string;             // "01".."09" display number
  name: string;
  role: string;
  type: string;            // "Backend · API · EV Infrastructure"  (NO years)
  status: string;          // "Selected Work" | "In Development" | "In Progress" | free text
  notLive?: boolean;       // case study says "Live project: Not live yet"
  internal?: boolean;      // links say "Internal, not public" / "Private"
  noArt?: boolean;         // no drawing: screenshots block omits "the drawing above is a stand-in"
  builtLabel: string;      // label of the 4th meta cell: "Built with" | "Platform context" | "Focus" | "Data sources" | "Key pieces"
  built: string[];
  builtNote?: string;      // adds a "Platform context" section (used by Staffing)
  lead: string;            // "Overview"
  problem: string;  solution: string;  myrole: string;   // "" => "To add" block
  seq: [string, string][]; seqNote?: string;              // "How it fits together"; [] => "To add"
  decisions: { h: string; i: string[] }[];                // "Technical decisions"; [] => "To add"
  challenges: string[];  learned: string[];               // [] => "To add"
  featured?: { lead: string; facts: [string, string][] }; // present => full section in "Selected work"
};
```
- **Order matters.** Array order = order on the page and the "Next project" chain (last loops to first). `num` is a display string; keep it in step with the order.
- **`featured`** projects (the first five) each have their own hand-built section in `components/work/Projects.tsx`. A new featured project needs a new section component with its own art. Everything else listed without `featured` appears automatically in **More work** and needs no extra code.
- **Index vs slug.** Buttons use `data-open="<array index>"`. Components compute it with `projectIndex(slug)`; do not hard-code indexes.

## Placeholders
Nothing is invented. Where information is missing the UI says so:
- Empty `problem` / `solution` / `myrole` / `seq` / `decisions` / `challenges` / `learned` → dashed **"To add"** block (`CaseStudy.tsx`).
- `site.links.resume === null` → a link that does not navigate; a toast says "Placeholder: Résumé file not linked yet."
- Case-study "Live project" / "Repository" → `<a href="#" data-ph>` until a link model is added (see TODO).
- Screenshots → "Real screenshots, once you have them."
- Staffing metric values → "—" **deliberately**, with a note on the page.

## How to…
**Edit copy:** change the string in `data/`. No component change needed.
**Add a "More work" project:** append an object to `projects` (set `num`, `slug`, `noArt: true`, leave `featured` off). It appears in the list and the case study works. If it should appear in a teardown layer's "Seen in", add its slug in `data/teardown.ts`.
**Add a featured project:** add it to `projects` with a `featured` block, then add a section component (copy a similar one in `Projects.tsx`), a drawing, CSS in `globals.css`, and render it in `Work.tsx`. Mark the `<article>` with `data-i` and the drawing with `data-art` so the dialog can clone it. Update the intro paragraph ("Five projects…").
**Change the order:** reorder the array **and** renumber `num`.
**Link the résumé:** put the PDF in `public/`, set `site.links.resume`.
