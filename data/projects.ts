/**
 * Case-study content. One entry per project; the order here is the order on the page
 * and the "Next project" chain (the last entry loops back to the first).
 *
 * - `featured` entries (the first five) also get a full-width section in "Selected work".
 *   Entries without it appear in "More work".
 * - Empty arrays / empty strings render a dashed "To add" placeholder block in the
 *   case study, so nothing is ever invented. Fill them in to replace the placeholder.
 * - `notLive` / `internal` / `noArt` change the Links and Screenshots sections of the
 *   case study (see components/case-study/CaseStudy.tsx).
 */
export type Decision = { h: string; i: string[] };

export type FeaturedCard = {
  /** Paragraph shown under the title in the Selected work section. */
  lead: string;
  /** Label / value rows shown in the facts list. */
  facts: [label: string, value: string][];
};

export type Project = {
  slug: string;
  /** Two-digit display number. */
  num: string;
  name: string;
  role: string;
  /** Short tag line, e.g. "Backend · API · EV Infrastructure". No years. */
  type: string;
  /** Free text shown in the caption and the case-study meta ("Selected Work", "In Development"...). */
  status: string;
  /** Not live yet: the case study says "Not live yet" instead of a placeholder link. */
  notLive?: boolean;
  /** Internal AmaliTech product: link rows say "Internal, not public" / "Private". */
  internal?: boolean;
  /** There is no drawing for this project: the screenshots block says "Real screenshots, once you have them." */
  noArt?: boolean;
  builtLabel: string;
  built: string[];
  builtNote?: string;
  lead: string;
  problem: string;
  solution: string;
  myrole: string;
  /** "How it fits together": [step title, one-line description]. */
  seq: [string, string][];
  seqNote?: string;
  decisions: Decision[];
  challenges: string[];
  learned: string[];
  featured?: FeaturedCard;
};

export const projects: Project[] = [
  {
    slug: "voltgh",
    num: "01",
    name: "VoltGH",
    role: "API design and engineering",
    type: "Backend · API · EV Infrastructure",
    status: "Selected Work",
    builtLabel: "Built with",
    built: ["TypeScript", "Node.js", "Fastify", "PostgreSQL", "Prisma"],
    lead: "A platform for finding EV charging infrastructure and using charging services across Ghana.",
    problem:
      "Finding a charger shouldn’t be guesswork. A charging platform needs station data it can trust, accounts that are secure, and a fast answer to “what’s near me?”, all behind an API that stays consistent as it grows.",
    solution:
      "A versioned REST API on a PostgreSQL schema. Authentication, validation and error handling are shared layers rather than repeated per route, and location search stays cheap by narrowing candidates before doing exact distance maths.",
    myrole:
      "I designed and built the API end to end: the schema, migrations, authentication, validation and the geographic search.",
    seq: [
      ["Client", "Requests come in"],
      ["Fastify routes", "Zod validation at the boundary"],
      ["Auth guards", "JWT access tokens and role-based route guards"],
      ["Services and Prisma", "Business logic and versioned migrations"],
      ["PostgreSQL", "Schema, bounding-box and Haversine queries"],
    ],
    seqNote: "Centralized error handling wraps the request lifecycle.",
    decisions: [
      {
        h: "Authentication",
        i: [
          "Argon2 password hashing",
          "Short-lived JWT access tokens",
          "Rotating refresh tokens",
          "Refresh-token revocation",
          "Role-based route guards",
        ],
      },
      {
        h: "Data layer",
        i: ["PostgreSQL schema design", "Versioned Prisma migrations"],
      },
      {
        h: "Geographic search",
        i: [
          "Geographic radius search",
          "SQL bounding-box filtering",
          "Haversine distance calculation",
        ],
      },
      {
        h: "API quality",
        i: ["Versioned REST API", "Zod validation", "Centralized error handling"],
      },
    ],
    challenges: [
      "Designing the PostgreSQL schema so the different EV entities (charging stations, connectors, users and the rest) made sense together.",
      "Building location and radius search without PostGIS. A SQL bounding-box prefilter first, then Haversine distance to get the results that are actually nearby.",
      "Authentication has several moving parts: password hashing, short-lived access tokens, refresh-token rotation and revocation, and role-based access.",
      "Making the API feel consistent across every endpoint, instead of every route handling validation and errors differently.",
    ],
    learned: [
      "Backend design gets much easier when I start from the data relationships and the queries users actually make, not from a list of endpoints.",
      "A solution doesn’t need every possible tool to be good. I solved the location problem with PostgreSQL and SQL instead of reaching for PostGIS straight away.",
      "Security isn’t something to bolt on afterwards. Authentication, authorization and the token lifecycle shape the architecture from the beginning.",
      "I became much more comfortable thinking about the system behind an interface, not just the interface itself.",
    ],
    featured: {
      lead: "A platform for finding EV charging infrastructure and using charging services across Ghana. I designed and built the API underneath it: the schema, the authentication, and the search that answers “what’s near me?”",
      facts: [
        ["Role", "API design and engineering"],
        [
          "Auth",
          "Argon2 hashing, short-lived JWTs, rotating and revocable refresh tokens, role-based route guards.",
        ],
        ["Data", "A PostgreSQL schema with versioned Prisma migrations."],
        ["Search", "A SQL bounding box first, Haversine distance second."],
        ["API", "Zod validation and one centralized error handler."],
        ["Built with", "TypeScript, Node.js, Fastify, PostgreSQL, Prisma"],
      ],
    },
  },
  {
    slug: "staffing-analytics-dashboard",
    num: "02",
    name: "Staffing Analytics Dashboard",
    role: "Product Owner, technical product work",
    type: "Product · Data · Internal Analytics",
    status: "Selected Work",
    builtLabel: "Platform context",
    built: ["BigQuery", "Power BI", "Jira"],
    builtNote:
      "The platforms the product sits on. They’re context for the work, not part of my engineering stack.",
    lead: "An internal product that follows a staffing request from creation to fulfilment.",
    problem:
      "Staffing requests move through several tools and teams, so understanding where a request stands, or whether it’s on track, meant piecing together information from more than one source.",
    solution:
      "A centralized product that brings operational data together and turns it into staffing insight: active requests, SLA compliance, average time to staff and fulfilment rate, from creation through to fulfilment.",
    myrole:
      "I own the product as Product Owner, and do the technical product work: turning staffing-process requirements into the metrics, data layers and views the dashboard shows.",
    seq: [
      ["Data sources", "Operational data from multiple systems"],
      ["Bronze", "Raw data, landed as it arrives"],
      ["Silver", "Cleaned and standardised"],
      ["Gold", "Business-ready staffing metrics"],
      ["Analytics", "Dashboards for requests, SLA, time to staff and fulfilment"],
    ],
    decisions: [
      {
        h: "Data modelling",
        i: ["Bronze, Silver and Gold layering", "One definition per metric"],
      },
      {
        h: "Metrics",
        i: ["Active requests", "SLA compliance", "Average time to staff", "Fulfilment rate"],
      },
    ],
    challenges: [
      "The biggest one: the underlying staffing model changed from tracking requests at one level to tracking roles. That affected a lot of the dashboard’s assumptions and implementation.",
      "Data came from different places (historical Excel data and Jira, among others), so deciding what the “source of truth” should be mattered.",
      "Defining metrics like active requests, SLA compliance, average time to staff and fulfilment wasn’t just a dashboard problem. The definitions depended on how the underlying data and lifecycle were structured.",
    ],
    learned: [
      "A dashboard can look technically correct and still answer the wrong question if the business definitions underneath aren’t settled.",
      "Data modelling and product requirements are tightly connected.",
      "A change upstream can change what has to happen downstream, so I now care much more about understanding the lifecycle and the source of truth before building around them.",
      "Product work isn’t separate from engineering for me. What should be measured directly affects how I’d build the system.",
    ],
    featured: {
      lead: "An internal product that follows a staffing request from creation to fulfilment, so demand, SLA compliance and time to staff come from one place instead of several. I own it as Product Owner and do the technical product work: what gets measured, how the data is layered, and what the dashboards have to answer.",
      facts: [
        ["Role", "Product Owner / technical product work"],
        [
          "Platform",
          "BigQuery, Power BI and Jira. The platforms it sits on, not my engineering stack.",
        ],
      ],
    },
  },
  {
    slug: "beacon",
    num: "03",
    name: "Beacon",
    role: "Product thinking and system design",
    type: "Product · Systems · Delivery Platform",
    status: "In Development",
    notLive: true,
    builtLabel: "Focus",
    built: ["Product design", "System design", "Payments", "Notifications"],
    lead: "A delivery platform for moving parcels between Accra, Kumasi and Takoradi.",
    problem:
      "Moving parcels between three cities is more than a booking form. Someone has to collect, someone has to drive, payments have to settle, and when something goes wrong a refund has to follow rules.",
    solution:
      "A platform modelled as one ecosystem rather than a single app: customers book and track, the delivery platform coordinates, drivers are onboarded and work within clear rules, and admins oversee it all.",
    myrole:
      "Product thinking and technical system design: defining the flows, the operational rules and the structure of the platform.",
    seq: [
      ["Customer app", "Parcel booking, payments, tracking"],
      ["Delivery platform", "Intercity delivery, collection points, door-to-door, notifications"],
      ["Driver operations", "Driver onboarding and delivery operations"],
      ["Admin dashboard", "Operational rules and refund handling"],
    ],
    decisions: [
      {
        h: "Booking and delivery",
        i: ["Parcel booking", "Intercity delivery", "Collection points", "Door-to-door delivery"],
      },
      {
        h: "Money",
        i: ["Payment handling", "Refund handling"],
      },
      {
        h: "Operations",
        i: ["Driver onboarding", "Operational rules", "Notifications"],
      },
      {
        h: "Visibility",
        i: ["Delivery tracking", "Admin dashboard"],
      },
    ],
    challenges: [
      "The delivery flow has far more states and rules than “book, then deliver”: collection points, assignment, driver availability, tracking, refunds, notifications and several different actors.",
      "Operational rules had to be defined very explicitly: cancellation and refund behaviour, the 10-minute unavailability rule, delivery cutoffs, working hours and restrictions on what can be delivered.",
      "Designing the first version meant resisting the urge to build everything at once. Marketplace functionality, loyalty and other ideas had to be kept apart from the actual Phase 1 product.",
    ],
    learned: [
      "Requirements get much clearer when you follow the actual journey and state changes instead of listing features.",
      "Edge cases are often the actual product. Refunds, failed assignments and unavailable drivers need as much thought as the happy path.",
      "Scope is a product skill. Knowing what not to build yet matters as much as knowing what to build.",
    ],
    featured: {
      lead: "A delivery platform for moving parcels between Accra, Kumasi and Takoradi. I worked on the product thinking and system design: how a booking becomes a collection, a journey, a delivery, and sometimes a refund.",
      facts: [
        ["Role", "Product thinking and system design"],
        ["Status", "In development. Not live yet."],
        ["Focus", "Product design, system design, payments, notifications."],
        ["Surfaces", "Customer app, delivery platform, driver operations, admin dashboard."],
      ],
    },
  },
  {
    slug: "cms-starter-kit",
    num: "04",
    name: "CMS Starter Kit",
    role: "CMS abstraction layer and starter-kit enhancements",
    type: "Frontend · Architecture · Starter Kit",
    status: "Selected Work",
    builtLabel: "Built with",
    built: ["Next.js", "Nuxt", "Sanity", "Storyblok"],
    lead: "Next.js and Nuxt starter kits for CMS-powered websites, with an abstraction layer between the content platform and the app. Built while contracted to Studio Freight.",
    problem:
      "Every CMS brings its own SDK, content model and quirks, so each new project ends up re-solving the same integration work from scratch.",
    solution:
      "A CMS abstraction between the content platform and the web application. Components consume one consistent shape; the platform-specific details stay behind the boundary.",
    myrole:
      "I developed the CMS abstraction layer for Sanity and Storyblok, and enhanced and updated the existing Next.js and Nuxt starter kits.",
    seq: [
      ["CMS platforms", "Sanity and Storyblok"],
      ["CMS abstraction", "One content shape for the UI"],
      ["Web application", "Next.js or Nuxt, built from reusable components"],
    ],
    decisions: [
      {
        h: "Architecture",
        i: ["CMS abstraction layer", "Unified interfaces over each platform"],
      },
      {
        h: "Content",
        i: ["Content modeling", "Integration patterns"],
      },
      {
        h: "Reuse",
        i: ["Reusable components", "Next.js and Nuxt targets"],
      },
    ],
    challenges: [
      "The whole point was supporting different CMS platforms (Sanity and Storyblok) without making the frontend care which one was underneath.",
      "The CMSs don’t expose content in the same shape, so the abstraction had to normalise that difference.",
      "It had to work across both Next.js and Nuxt, rather than becoming something tightly coupled to one framework.",
    ],
    learned: [
      "Good abstraction isn’t about hiding everything. It’s about hiding the differences the consuming application shouldn’t have to care about.",
      "Reusability only becomes useful when the underlying structure is actually consistent.",
      "Working on the same problem across different CMSs made me think more about architecture and boundaries, not just implementation.",
    ],
    featured: {
      lead: "Next.js and Nuxt starter kits for CMS-powered websites. I developed the abstraction layer that sits between the content platform and the app, so components consume one content shape, and I enhanced the existing starter kits. Built while contracted to Studio Freight.",
      facts: [
        ["Role", "CMS abstraction layer and starter-kit enhancements"],
        ["Built with", "Next.js, Nuxt, Sanity, Storyblok"],
      ],
    },
  },
  {
    slug: "dolphins-swim-center",
    num: "05",
    name: "Dolphins Swim Center",
    role: "Product Owner and frontend engineer",
    type: "Product · Frontend · Digital Transformation",
    status: "In Progress",
    notLive: true,
    builtLabel: "Built with",
    built: ["Next.js", "CMS"],
    lead: "A digital transformation for Dolphins Swim Center in Takoradi, moving an organisation that still runs largely on paper towards software.",
    problem:
      "Much of how the organisation works today lives on paper. Before anything is built, the existing activities and workflows have to be understood and mapped, and then worked out as software: which parts translate directly, and which need rethinking.",
    solution:
      "Treated as product work first. Map the existing activities and workflows, turn them into requirements, plan the transition from paper-based processes to software across the organisation, then build the frontend on top of that. The project is in progress and not live yet.",
    myrole:
      "Product Owner and frontend engineer: product discovery, process mapping, requirements and planning, alongside the technical implementation of the frontend.",
    seq: [
      ["Existing activities", "Paper-based processes, as they run today"],
      ["Workflow mapping", "How the work actually moves through the organisation"],
      ["Requirements", "What the software has to do"],
      ["Transition plan", "From paper to software, across the organisation"],
      ["Frontend", "Technical implementation in Next.js"],
    ],
    decisions: [
      {
        h: "Discovery",
        i: ["Mapping existing activities", "Process and workflow mapping"],
      },
      {
        h: "Planning",
        i: ["Requirements", "Organisation-wide transition plan"],
      },
      {
        h: "Implementation",
        i: ["Frontend in Next.js", "Content management"],
      },
    ],
    challenges: [
      "Understanding and mapping an organisation that still relies heavily on paper-based processes, and working out how those workflows can translate into software.",
    ],
    learned: [], // TODO: add once there is something to say (shows a "To add" block)
    featured: {
      lead: "A digital transformation for Dolphins Swim Center in Takoradi. I’m mapping how the organisation runs today, largely on paper, and planning how those workflows move into software, alongside building the frontend. It isn’t live yet.",
      facts: [
        ["Role", "Product Owner and frontend engineer"],
        ["Status", "In progress. Not live yet."],
        [
          "Focus",
          "Product discovery, process mapping, requirements, planning, frontend implementation.",
        ],
        ["Built with", "Next.js, CMS"],
      ],
    },
  },
  {
    slug: "amalitech-corporate-website",
    num: "06",
    name: "AmaliTech Corporate Website",
    role: "Frontend lead",
    type: "Frontend · CMS · Performance",
    status: "Selected Work",
    noArt: true,
    builtLabel: "Built with",
    built: ["Next.js", "Sanity CMS"],
    lead: "The AmaliTech corporate website, rebuilt from WordPress to Next.js and Sanity CMS. I led frontend delivery and kept working on its usability, performance, SEO structure and code quality.",
    problem:
      "Moving a corporate site from WordPress to Next.js and Sanity meant rebuilding every interaction in the new stack, keeping it true to the Figma designs, and keeping it easy for editors to manage.",
    solution:
      "A Next.js frontend over Sanity, with configurable components that editors control from the CMS, lazy loading with skeleton layouts for heavier components, and structured data so search engines read the content correctly.",
    myrole:
      "I led frontend delivery of the rebuild, then kept contributing across the component, CMS and rendering layers: the interactive navigation, a prototype for the page-break interaction, performance and SEO work, and code-quality fixes.",
    seq: [
      ["Sanity CMS", "Editors manage content and component settings"],
      ["Components", "Configurable, reusable and tested"],
      ["Next.js rendering", "Lazy-loaded components with skeleton layouts"],
      ["Search", "JSON-LD structured data"],
      ["Quality", "SonarQube issues addressed"],
    ],
    decisions: [
      {
        h: "Navigation",
        i: [
          "Refactored the interactive navigation modal",
          "Removed duplicated code",
          "Simplified its CMS configuration for editors",
          "Added and updated tests",
        ],
      },
      {
        h: "Page-break interaction",
        i: [
          "Built a working prototype to prove it matched the Figma design",
          "Handed the implementation approach to a colleague",
          "Fixed bugs found in testing later",
        ],
      },
      {
        h: "Performance and SEO",
        i: [
          "Lazy loading for selected components",
          "Skeleton and loading layouts",
          "JSON-LD structured data",
          "Component refactors for performance",
        ],
      },
      {
        h: "Code quality",
        i: ["SonarQube issues resolved"],
      },
    ],
    challenges: [
      "The page-break interaction had to behave the way the Figma design intended, and it wasn’t clear it was achievable. I built a working prototype to prove it before the team committed to an approach.",
      "Making the navigation easier for editors meant simplifying its configuration without losing behaviour, so I refactored it and added tests around the modal.",
      "Keeping the experience steady while heavier components load meant pairing lazy loading with skeleton layouts.",
    ],
    learned: [],
  },
  {
    slug: "ai-content-generation-poc",
    num: "07",
    name: "AI Content Generation POC",
    role: "Business analyst and developer",
    type: "Client engagement · AI · Discovery",
    status: "Selected Work",
    noArt: true,
    builtLabel: "Key pieces",
    built: ["Gemini", "Live search", "Streamed generation", "Version history"],
    lead: "A proof of concept for Academy Sports + Outdoors that helps editors write SEO-focused content: it researches, drafts with Gemini, streams the result back and keeps version history.",
    problem:
      "Academy’s editors needed more useful, SEO-focused content, and the discovery work pointed to opportunities in SEO and content.",
    solution:
      "An editor-facing workflow: capture the SEO titles, descriptions, keywords and requirements, run live searches for Academy and competitor context, combine that with content guidelines, generate with Gemini, stream the draft back for review and editing, and keep a conversation and version history.",
    myrole:
      "The role was a mix of business analysis and development. I took ownership of implementing the proof of concept, experimenting with different AI models along the way, working with colleagues who had more experience with AI models. I also took part in the discovery sessions and wrote the business and system requirements documentation, which I submitted to the client.",
    seq: [
      ["Editor input", "SEO titles, descriptions, keywords, requirements"],
      ["Live search", "Academy’s own content and competitor sources"],
      ["Content guidelines", "Predefined rules combined with the research"],
      ["Gemini", "Generation, streamed back to the editor"],
      ["Review and edit", "The editor shapes the draft"],
      ["Version history", "Earlier versions can be restored"],
    ],
    seqNote: "Prompt templates can be edited.",
    decisions: [
      {
        h: "Workflow",
        i: [
          "Research before generation",
          "Streamed output",
          "Editor review before anything is kept",
        ],
      },
      {
        h: "Control",
        i: ["Editable prompt templates", "Conversation and version history, with restore"],
      },
      {
        h: "Documentation",
        i: [
          "Business requirements",
          "System requirements",
          "Scope, proposed solution and constraints",
        ],
      },
    ],
    challenges: [
      "Learning the technologies in Academy’s environment while learning their business, and turning both into a proposal.",
      "The proof of concept went through several iterations, based on internal testing and client feedback.",
      "Turning the discovery conversations and the client’s BRD example into formal requirements documentation, with guidance from a colleague.",
    ],
    learned: [
      "Working through the whole journey (discovery, a proposal, a proof of concept, client feedback and requirements documentation) showed me the work around the build, not only the build.",
    ],
  },
  {
    slug: "global-operations-cost-dashboard",
    num: "08",
    name: "Global Operations Cost Dashboard",
    role: "Product Owner",
    type: "Product · Finance · Internal Analytics",
    status: "Selected Work",
    noArt: true,
    internal: true,
    builtLabel: "Data sources",
    built: ["QuickBooks reporting", "Structured Excel data (Phase 1)"],
    lead: "An internal dashboard that began as operational cost reporting and grew, after discussions with leadership, into a company-wide view of financial performance.",
    problem:
      "Cost reporting depended on QuickBooks data and on reporting structures that differed between entities. Before anything could be built, the definitions and the data mapping had to be agreed with Finance.",
    solution:
      "A phased dashboard. Phase 1 starts from structured Excel data instead of a direct QuickBooks integration, with business definitions and calculations agreed with Finance, and the broader financial-reporting scope held for later phases.",
    myrole:
      "I own it as Product Owner. I set up the project workspace, engaged Finance stakeholders in Ghana and Rwanda, took part in the leadership discussions on scope, coordinated the data mapping, and kept the development team aligned when the data-source decision changed.",
    seq: [
      ["Finance sources", "QuickBooks reporting in Ghana and Rwanda"],
      ["Data mapping", "Definitions and calculations agreed with Finance"],
      ["Structured Excel data", "The Phase 1 source"],
      ["Dashboard", "Operational cost reporting first"],
      ["Later phases", "The wider financial-performance view"],
    ],
    decisions: [
      {
        h: "Data source",
        i: [
          "Direct QuickBooks integration considered first",
          "Structured Excel data chosen for Phase 1",
        ],
      },
      {
        h: "Scope",
        i: ["Original requirement separated from the broader scope", "Delivery split into phases"],
      },
      {
        h: "Stakeholders",
        i: ["Finance in Ghana and Rwanda", "Leadership discussions on the expanded scope"],
      },
    ],
    challenges: [
      "The scope grew from operations reporting to company-wide financial reporting, and the data showed that entities structured their reporting differently, which needed more clarification and mapping.",
      "I focused too much on designing the whole solution before breaking it into deliverable phases, which risked delaying the original requirement. I noticed, went back to the original requester, and separated the immediate need from the wider scope.",
    ],
    learned: [
      "Deliver value in increments while keeping the long-term vision clear, instead of trying to solve the whole problem at once.",
    ],
  },
];

/** Projects that get a full Selected work section. */
export const featured = projects.filter((p) => p.featured);
/** Projects listed under "More work". */
export const moreWork = projects.filter((p) => !p.featured);

export function projectIndex(slug: string): number {
  return projects.findIndex((p) => p.slug === slug);
}
