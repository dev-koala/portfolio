/**
 * Content for the scroll-driven teardown ("How far down the work goes").
 *
 * The five layers are drawn top to bottom in the SVG (Interface -> Product thinking) and the
 * order here must match `data-k` 0..4 in components/teardown/Plates.tsx.
 * `seen` lists project slugs; each becomes a button that opens that project's case study.
 */
export type TeardownLayer = {
  /** Short label, also printed next to its plate. */
  tag: string;
  /** Label in the card header (can be longer than the tag). */
  label: string;
  title: string;
  points: string[];
  seen: string[];
};

export const teardownIntro = {
  title: "Everything here is a stack.",
  points: [
    "Scroll and it comes apart, one layer at a time, all the way down to the thinking underneath.",
    "Scroll back up and it goes back together.",
  ],
};

export const teardownHint = "Scroll to take it apart";
export const teardownHeading = "How far down the work goes";
export const teardownAria =
  "A product drawn as five layers that pull apart as you scroll: a web page for the interface, API requests and responses, data tables, CMS content blocks, and a product flow underneath.";

export const teardownLayers: TeardownLayer[] = [
  {
    tag: "Interface",
    label: "Interface",
    title: "Where it starts.",
    points: [
      "React, Next.js, Vue and Nuxt.",
      "Interactions, spacing, loading states and responsive behaviour are part of the product, not polish added at the end.",
      "Interfaces that feel simple even when what’s behind them isn’t.",
    ],
    seen: ["cms-starter-kit", "dolphins-swim-center", "amalitech-corporate-website"],
  },
  {
    tag: "API",
    label: "API",
    title: "What the interface asks of.",
    points: [
      "Fastify and REST, with Zod validation at the boundary and one centralized error handler.",
      "Argon2 password hashing, short-lived JWTs, rotating and revocable refresh tokens, role-based route guards.",
    ],
    seen: ["voltgh"],
  },
  {
    tag: "Data",
    label: "Data",
    title: "What the API remembers.",
    points: [
      "PostgreSQL with Prisma and versioned migrations.",
      "Radius search with a SQL bounding box first and Haversine distance second, without reaching for PostGIS.",
      "Business definitions settled before the dashboards: bronze, silver and gold layers, one definition per metric.",
    ],
    seen: ["voltgh", "staffing-analytics-dashboard", "global-operations-cost-dashboard"],
  },
  {
    tag: "CMS",
    label: "CMS",
    title: "Content that isn’t hard-coded.",
    points: [
      "Sanity and Storyblok behind one abstraction layer, developed at Studio Freight.",
      "The frontend doesn’t care which CMS is underneath. Next.js and Nuxt consume one content shape.",
    ],
    seen: ["cms-starter-kit", "amalitech-corporate-website"],
  },
  {
    tag: "Product",
    label: "Product thinking",
    title: "Why any of it exists.",
    points: [
      "Follow the journey and the state changes, not a list of features.",
      "Edge cases are often the actual product: refunds, failed assignments, unavailable drivers.",
      "Scope is a product skill. Knowing what not to build yet matters as much as what to build.",
      "Mapping how an organisation works on paper before deciding what becomes software.",
    ],
    seen: [
      "beacon",
      "staffing-analytics-dashboard",
      "dolphins-swim-center",
      "ai-content-generation-poc",
      "global-operations-cost-dashboard",
    ],
  },
];
