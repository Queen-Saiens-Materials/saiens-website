import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

const BASE_URL = "https://www.saiens.group";

const STATIC_ROUTES = [
  "/",
  "/jp",
  "/usa",
  "/news",
  "/jp/news",
  "/visit-us",
  "/visit-us-jp",
  "/guarantees-and-warranties",
  "/japan-guarantees-and-warranties",
  "/maintenance-manual",
  "/japan-maintenance-manual",
  "/saiens-salon",
  "/group-events",
  "/taipeibex",
  "/mobius",
  "/mobius-2",
  "/mobius-contact",
  "/mobius-contact02",
  "/fluid-living-landing-page",
  "/fluid-living-registration",
  "/follow-us",
  "/follow-complete",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const postEntries = [
    ...getPosts("tw").map((post) => ({
      url: `${BASE_URL}/news/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...getPosts("jp").map((post) => ({
      url: `${BASE_URL}/jp/news/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticEntries, ...postEntries];
}
