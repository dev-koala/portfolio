/**
 * Single source of truth for personal details, links and page metadata.
 *
 * Anything set to `null` is a PLACEHOLDER: the UI renders a link that does not navigate and
 * shows a toast ("Placeholder: ...") instead. Replace `null` with the real URL and it becomes
 * a normal link.
 */
export const site = {
  name: "Christabel Quaye",
  fullName: "Christabel Amorkor Quaye",
  /** Short line used in the footer, the mobile menu and social cards. */
  title: "Software Engineer / Technical Product Owner",
  location: "Based in Accra and Takoradi, Ghana",
  /**
   * Production URL. Drives canonical, sitemap, robots, Open Graph, and the link on /cv and the PDF.
   * When a custom domain is bought, set NEXT_PUBLIC_SITE_URL in Vercel (or change the default here).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://christabel-quaye.vercel.app",
  description:
    "Christabel Quaye is a software engineer and technical product owner in Accra, Ghana. She works between Accra and Takoradi, across the product from requirements to the interfaces, APIs and systems behind it.",
  socialDescription: "Software engineer and technical product owner. Interfaces, APIs and systems.",
  /** The four cursor labels on the hero canvas. */
  roles: [
    "Software Engineer",
    "Technical Product Owner",
    "Frontend & Full-Stack",
    "Product & Systems",
  ],
  heroLead:
    "I work across the product, from understanding the problem and shaping requirements to building the interfaces, APIs and systems behind them.",
  links: {
    email: "qchristabel5@gmail.com",
    linkedin: "https://www.linkedin.com/in/christabel-quaye-780a1a1a9/",
    /** The older account, kept on purpose until the new one has some activity (then swap both here and `display.github`). */
    github: "https://github.com/Cherrybe",
    /** The résumé page on this site. Set to `null` to fall back to a placeholder link. */
    resume: "/cv" as string | null,
    /** The downloadable PDF. Put the file in /public with this exact name. */
    resumePdf: "/christabel-quaye-cv.pdf",
  },
  /** Shown as the visible label of the contact rows. */
  display: {
    linkedin: "in/christabel-quaye-780a1a1a9",
    github: "github.com/Cherrybe",
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  copyrightYear: 2026,
} as const;
