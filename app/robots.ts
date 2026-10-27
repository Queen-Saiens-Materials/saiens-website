import type { MetadataRoute } from "next";
import { PROJECT_PAGES } from "@/lib/project-pages";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 內部頁不進索引（頁內另有 meta noindex 雙保險）
      disallow: [
        "/future",
        "/team-h2",
        "/odoo-development",
        ...PROJECT_PAGES.map((slug) => `/${slug}`),
      ],
    },
    sitemap: "https://saiens.tw/sitemap.xml",
  };
}
