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
   * TODO: the real production URL. Drives canonical, sitemap, robots and Open Graph.
   * Still the placeholder because no domain has been bought yet.
   */
  url: "https://example.com",
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
    "I work across the product — from understanding the problem and shaping requirements to building the interfaces, APIs and systems behind them.",
  links: {
    email: "qchristabel5@gmail.com",
    linkedin: "https://www.linkedin.com/in/christabel-quaye-780a1a1a9/",
    /** TODO: swap for the new GitHub account once it is linked. This is the old one. */
    github: "https://github.com/Cherrybe",
    /** TODO: the résumé. Drop the PDF in /public and set e.g. "/christabel-quaye-cv.pdf". */
    resume: null as string | null,
  },
  /** Shown as the visible label of the contact rows. */
  display: {
    linkedin: "in/christabel-quaye",
    github: "github.com/Cherrybe",
    resume: "[add résumé link]",
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  copyrightYear: 2026,
} as const;
