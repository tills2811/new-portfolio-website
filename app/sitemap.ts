import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...projects.map((p) => ({ url: `${siteUrl}/work/${p.id}`, priority: 0.8 })),
  ];
}
