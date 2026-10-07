/** About section copy (the big statement lives in components/About.tsx because it has highlighted phrases). */
export const aboutCopy = [
  "I like working where product, design and engineering overlap, because that’s where most of the real decisions get made.",
  "I care about code someone else can inherit, about understanding a problem before solving it, and about interfaces that feel simple even when what’s behind them isn’t.",
];

export const enjoy =
  "Things I enjoy: clean APIs, good UX, systems that make sense, and deleting code that isn’t needed.";

/** "How far down the work goes": each row is indented one step further than the last. */
export const depth = [
  "Interface",
  "APIs",
  "Databases",
  "Authentication",
  "CMS architecture",
  "Data flows",
  "Product thinking",
];

export const principles: { title: string; body: string }[] = [
  {
    title: "Understand the problem first",
    body: "Good implementation starts with knowing what we’re actually trying to solve.",
  },
  {
    title: "Write code that can be inherited",
    body: "It should make sense to the person who opens it six months from now.",
  },
  {
    title: "Sweat the small parts",
    body: "Interactions, spacing, loading states and responsive behaviour are part of the product.",
  },
  {
    title: "Check what the machine wrote",
    body: "AI speeds things up. Generated code still has to be reviewed, tested and understood.",
  },
];
