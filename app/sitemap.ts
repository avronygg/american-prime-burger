import type { MetadataRoute } from "next";

const siteUrl = "https://americanprimeburger.cl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/pedir`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
