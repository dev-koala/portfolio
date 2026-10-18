/**
 * Experience. Years are kept here on purpose (project metadata elsewhere carries none).
 * `org` is an array of lines so a long name can break over two lines.
 */
export type ExperienceEntry = {
  when: string;
  org: string[];
  role: string;
  focus: string;
};

export const experience: ExperienceEntry[] = [
  {
    when: "2026 to now",
    org: ["PGES"],
    role: "Junior Full-Stack Engineer, contract",
    focus:
      "PHP and Laravel across several applications: platforms for companies and individuals to manage their pensions, savings and investments, and a USSD flow.",
  },
  {
    when: "2021 to now",
    org: ["AmaliTech"],
    role: "Technical Product Owner & Frontend Engineer",
    focus:
      "Product coordination, analytics, staffing systems, technical requirements, frontend engineering and working across teams.",
  },
  {
    when: "2025 to 2026",
    org: ["Studio Freight /", "Scale Army"],
    role: "Frontend / CMS Developer, contract",
    focus:
      "Frontend development, CMS integrations, React / Next.js, Vue / Nuxt, Sanity, Storyblok and reusable frontend architecture.",
  },
];
