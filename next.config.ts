import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

function getSlugsFromDir(dirPath: string): string[] {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

const TW_SLUGS = getSlugsFromDir(
  path.join(process.cwd(), "content", "blog", "tw"),
);

const JP_SLUGS = getSlugsFromDir(
  path.join(process.cwd(), "content", "blog", "jp"),
);

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // saiens.tw（原 Squarespace 轉址網域）→ saiens.group，保留路徑
      // MX 在 GoDaddy 維持 Google Workspace，此處只處理 HTTP
      ...["saiens.tw", "www.saiens.tw"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://saiens.group/:path*",
        permanent: true,
      })),
      // 教材可印的保固短網址
      { source: "/warranty", destination: "/guarantees-and-warranties", permanent: true },
      // Old Squarespace URLs → new structure (preserve SEO)
      { source: "/top", destination: "/", permanent: true },
      { source: "/top-jp", destination: "/jp", permanent: true },
      ...TW_SLUGS.map((slug) => ({
        source: `/top/${slug}`,
        destination: `/news/${slug}`,
        permanent: true,
      })),
      ...JP_SLUGS.map((slug) => ({
        source: `/top-jp/${slug}`,
        destination: `/jp/news/${slug}`,
        permanent: true,
      })),
      // Duplicate Squarespace page variant → canonical page
      { source: "/saiens-salon-1", destination: "/saiens-salon", permanent: true },
      // Retired placeholder/test pages
      { source: "/new-page", destination: "/", permanent: true },
      { source: "/new-page-1", destination: "/", permanent: true },
      { source: "/new-page-2", destination: "/", permanent: true },
      { source: "/usa/:slug", destination: "/usa", permanent: true },
    ];
  },
};

export default nextConfig;
