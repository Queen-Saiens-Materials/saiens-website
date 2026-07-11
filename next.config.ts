import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

function getSlugsFromDir(dirPath: string): string[] {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
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
      // Retired placeholder/test pages
      { source: "/new-page", destination: "/", permanent: true },
      { source: "/new-page-1", destination: "/", permanent: true },
      { source: "/new-page-2", destination: "/", permanent: true },
      { source: "/usa/:slug", destination: "/usa", permanent: true },
    ];
  },
};

export default nextConfig;
