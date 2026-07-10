import type { NextConfig } from "next";

const TW_SLUGS = [
  "blog-post01",
  "blog-post02",
  "blog-post03",
  "blog-post04",
  "blog-post05",
  "blog-post06",
  "blog-post07",
  "blog-post08",
  "blog-post09",
  "blog-post10",
];

const JP_SLUGS = [
  "blog-post-jp01",
  "blog-post-jp02",
  "blog-post-jp03-g3p3l",
  "blog-post-jp05-5arr7",
  "blog-post-jp05-5arr7-l4tmc",
  "blog-post-jp05-lppet",
];

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
