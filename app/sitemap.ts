import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Home page and the CV page. Case studies are dialogs on the home page, not separate URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
