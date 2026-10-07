import type { Metadata, Viewport } from "next";
import "@fontsource-variable/familjen-grotesk";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "./globals.css";
import { site } from "@/data/site";
import { CaseStudyDialog } from "@/components/case-study/CaseStudyDialog";
import { Enhance } from "@/components/Enhance";
import { Nav } from "@/components/Nav";
import { Toast } from "@/components/Toast";
import { SvgSprite } from "@/components/ui/SvgSprite";

const title = `${site.name} — ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Portfolio`, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: site.socialDescription,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title, description: site.socialDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ECECE8",
  viewportFit: "cover",
};

/**
 * Adds the `js` class before first paint. Every hidden "before reveal" CSS state is scoped to `.js`,
 * so if scripts never run, nothing stays invisible.
 */
const jsClass = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsClass }} />
      </head>
      <body>
        <SvgSprite />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <CaseStudyDialog />
        <Toast scope="page" />
        <Enhance />
      </body>
    </html>
  );
}
