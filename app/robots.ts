import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 內部頁不進索引（頁內另有 meta noindex 雙保險）
      disallow: ["/future", "/team-h2", "/odoo-development"],
    },
    sitemap: "https://www.saiens.group/sitemap.xml",
  };
}
