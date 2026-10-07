import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** One page. Case studies are dialogs on the home page, not separate URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
