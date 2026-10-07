/** Stack groups, in display order. The section is deliberately placed after the work. */
export const stackNote =
  "Listed after the work on purpose. The tools are what I reach for. The projects are the point.";

export const stack: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js", "Vue", "Nuxt.js", "TypeScript", "JavaScript"] },
  {
    group: "Styling & UI",
    items: ["Tailwind", "SCSS", "Styled Components", "MUI", "Ant Design", "shadcn/ui"],
  },
  { group: "Backend", items: ["Node.js", "Fastify", "REST APIs", "PostgreSQL", "Prisma"] },
  { group: "CMS", items: ["Sanity", "Storyblok"] },
  {
    group: "Tools",
    items: ["GitHub", "Vercel", "Netlify", "pnpm", "NVM", "GSAP", "Framer Motion"],
  },
];
