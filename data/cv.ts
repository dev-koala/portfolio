/**
 * The CV shown at /cv and exported to public/christabel-quaye-cv.pdf.
 * Source: the "portfolio CV" document. Keep it in sync with that document and with
 * .claude/docs/CONTENT-RULES-AND-FACTS.md. The phone number is deliberately NOT here: this is a public page.
 */
export type CvGroup = { heading: string; bullets: string[] };

export type CvEntry = {
  org: string;
  place: string;
  when: string;
  /** Current title line, e.g. "Full-Stack Technical Product Owner & Frontend Engineer". */
  title: string;
  titleWhen?: string;
  /** Short strapline under the title. */
  focus?: string;
  /** Earlier roles at the same organisation. */
  earlier?: string;
  groups: CvGroup[];
};

export type CvProject = {
  name: string;
  note: string;
  bullets: string[];
};

export const cv = {
  name: "Christabel Amorkor Quaye",
  headline: "Technical Product Owner | Software Engineer",
  location: "Ghana (open to remote)",
  summary:
    "Technical Product Owner and software engineer with five years at AmaliTech, moving from frontend delivery to owning internal data products and client discovery work. I take a problem from discovery and requirements through backlog, delivery and stakeholder validation, and I can build the frontend and API work myself. Strongest in React, Next.js, Vue and Nuxt, with hands-on Node.js, PostgreSQL and headless CMS experience.",
  experience: [
    {
      org: "AmaliTech",
      place: "Takoradi, Ghana",
      when: "Aug 2021 – Present",
      title: "Full-Stack Technical Product Owner & Frontend Engineer",
      titleWhen: "Nov 2025 – Present",
      focus: "Product ownership • Internal analytics products • Frontend engineering",
      earlier:
        "Earlier at AmaliTech: Internship Trainee (Aug 2021 – Nov 2022) · National Service Personnel (Nov 2022 – Oct 2023) · Junior Associate (Nov 2023 – Sep 2024) · Associate (Oct 2024 – Nov 2025)",
      groups: [
        {
          heading: "Product: internal analytics products",
          bullets: [
            "Own the Staffing Analytics Dashboard. The project started without a BRD, so I defined the problem, the stakeholders and 8 KPIs, then ran the backlog, sprint planning and stakeholder validation with the development team.",
            "Aligned the roadmap with a related internal product: Phase 1 reads from Jira, and a later phase moves to that product once it handles staffing requests. Coordinated the API requirements with that team and managed the change from request-level to role-level tracking. Set up the project’s Confluence space (technical documentation, user guide, governance).",
            "Own the Global Operations Cost Dashboard. Worked with Finance in Ghana and Rwanda to map QuickBooks reporting and agree definitions. When requirements firmed up, moved the first-phase data source from a direct QuickBooks integration to structured Excel data, and kept the team aligned.",
            "When the scope grew into company-wide financial reporting, separated the original requirement from the wider vision so the first phase could be delivered on its own.",
          ],
        },
        {
          heading: "Client: Academy Sports + Outdoors (business analyst and developer)",
          bullets: [
            "Ran technical discovery on the client’s website and technology, and took part in client sessions to shape the proposals.",
            "Built an AI content-generation proof of concept for their editors, experimenting with different AI models, and iterated it on internal testing and client feedback.",
            "Wrote the business and system requirements documentation for the solution and submitted it to the client.",
          ],
        },
        {
          heading: "Engineering",
          bullets: [
            "Led frontend delivery of the AmaliTech corporate website rebuild from WordPress to Next.js and Sanity CMS.",
            "Refactored the interactive navigation to remove duplicated code and simplify its CMS configuration for editors, and added tests around it.",
            "Built a working prototype of the page-break interaction to show it matched the Figma design, handed the approach to a colleague for implementation, and later fixed bugs found in testing.",
            "Added lazy loading with skeleton layouts, JSON-LD structured data for search engines, and fixed code-quality issues flagged in SonarQube.",
            "Designed reusable UI architecture using Atomic Design, built shared component libraries, integrated REST and GraphQL APIs, and built dashboards with Chart.js and Apache ECharts.",
            "Ran a research spike on LLM tool calling: built benchmark repos comparing end-to-end pipelines across LLM providers (Gemini, OpenAI, Claude), covering live search, scraping, content generation and automated quality scoring.",
          ],
        },
      ],
    },
    {
      org: "Studio Freight (via Scale Army)",
      place: "Remote",
      when: "Nov 2025 – Apr 2026",
      title: "Frontend / CMS Developer, contract",
      groups: [
        {
          heading: "",
          bullets: [
            "Developed the CMS abstraction layer so Next.js and Nuxt apps read one content shape from Sanity or Storyblok.",
            "Enhanced and updated the existing Next.js and Nuxt starter kits.",
            "Built out the CMS implementation on a client project and fixed issues in both the CMS and the frontend.",
            "Contributed to developer tooling, debugging utilities, deployment workflows and Vercel configuration.",
          ],
        },
      ],
    },
  ] satisfies CvEntry[],
  projects: [
    {
      name: "VoltGH: API for an EV charging platform",
      note: "independent project · TypeScript, Node.js, Fastify, PostgreSQL, Prisma",
      bullets: [
        "Designed and built a 27-endpoint REST API over a 9-table PostgreSQL schema with versioned Prisma migrations.",
        "Modelled the multi-role crowdsourcing workflow as an explicit state machine, from field report through peer confirmation and admin approval to live station status.",
        "Implemented authentication with Argon2 password hashing, short-lived JWTs with role claims, rotating refresh tokens stored as hashes, and revocation on logout. Added role-based route guards across three roles, and account flows for registration, sign-in and password reset.",
        "Kept multi-write operations atomic with Prisma transactions, and mapped database constraint violations to appropriate HTTP responses.",
        "Built location-based radius search: a bounding-box filter first, then distance calculation to return nearby stations.",
      ],
    },
    {
      name: "Beacon: intercity parcel delivery platform",
      note: "in development, not live",
      bullets: [
        "Product thinking and system design for delivery between Accra, Kumasi and Takoradi: booking, collection, assignment, delivery and refunds.",
        "Defined the operational rules (cancellation and refunds, driver unavailability, delivery cutoffs) and kept Phase 1 separate from later ideas such as a marketplace and loyalty.",
      ],
    },
    {
      name: "Dolphins Swim Center, Takoradi: digital transformation",
      note: "in progress, not live",
      bullets: [
        "Product Owner and frontend engineer. Mapping how the organisation runs today, largely on paper, writing requirements and planning how those workflows move into software, while building the frontend in Next.js with a CMS.",
      ],
    },
  ] satisfies CvProject[],
  skills: [
    [
      "Product",
      "Discovery, BRD and system requirements, backlog and sprint planning, stakeholder management, prioritisation, KPI definition, scope management",
    ],
    ["Product tools", "Jira, Confluence, Figma, Power BI"],
    ["Languages", "TypeScript, JavaScript, HTML5, CSS3, SCSS"],
    ["Frontend", "React, Next.js, Vue.js, Nuxt.js, Tailwind CSS, Styled Components"],
    ["Backend", "Node.js, Fastify, REST API design, JWT and RBAC, Zod"],
    ["Data", "PostgreSQL, Prisma, database migrations"],
    [
      "AI and automation",
      "LLM tool calling, prompt and pipeline evaluation, Gemini, OpenAI and Claude APIs",
    ],
    ["State and forms", "Redux, Zustand, Context API, Pinia, React Hook Form"],
    ["Testing", "Vitest, Jest, React Testing Library, integration testing"],
    ["Headless CMS", "Sanity, Storyblok, GROQ"],
    ["UI libraries", "shadcn/ui, Material UI, Ant Design"],
    ["Charts and motion", "Apache ECharts, Chart.js, Framer Motion, GSAP, Lottie"],
    ["Developer tools", "Git, GitHub, GitHub Actions, Vercel, Docker, Postman, SonarQube"],
  ] as [string, string][],
  education: [
    "BTech, Software Engineering, Takoradi Technical University",
    "HND, Information Technology, Takoradi Technical University",
    "AWS Certified Cloud Practitioner, 2024",
    "Cybersecurity Awareness, SoSafe, 2024",
    "Google Product Management course, Coursera (in progress)",
  ],
  languages: "English, Twi, Ga, basic Ewe",
};