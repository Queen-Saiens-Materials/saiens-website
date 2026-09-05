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
  async rewrites() {
    return [
      // Standalone OUGER architect-facing brand page. Keep the public URL clean
      // while serving the self-contained document without the Saiens site chrome.
      { source: "/ouger", destination: "/ouger/index.html" },
      // Standalone piko Japan partner landing page (same pattern as /ouger).
      { source: "/project-piko", destination: "/project-piko/index.html" },
      // 山恩未來說明會（內部簡報頁，meta noindex＋robots disallow；same pattern as /ouger）。
      { source: "/future", destination: "/future/index.html" },
      // 山恩業務團隊 2026 H2 策略會議頁（內部簡報頁，same pattern as /future）。
      { source: "/team-h2", destination: "/team-h2/index.html" },
    ];
  },
  async redirects() {
    return [
      // 2026-09-05 Michael 指示：台灣官網主網域改為 saiens.tw；saiens.group 保留給全球事業，
      // 現階段整站轉址到 saiens.tw 並保留路徑。www.saiens.tw 也收斂到 saiens.tw。
      // MX 在 GoDaddy 維持 Google Workspace，此處只處理 HTTP
      ...["saiens.group", "www.saiens.group", "www.saiens.tw"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://saiens.tw/:path*",
        permanent: true,
      })),
      // /warranty 現在是保固入口頁（app/warranty/page.tsx），舊的 → 品質保證頁轉址已移除
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
      // 已印製的 QR code 指向底線版網址，實體物件改不了，必須永久保留這條。
      // 原站與站內連結一律是連字號版，底線版從未存在過。
      { source: "/maintenance_manual", destination: "/maintenance-manual", permanent: true },
      // Retired placeholder/test pages
      { source: "/new-page", destination: "/", permanent: true },
      { source: "/new-page-1", destination: "/", permanent: true },
      { source: "/new-page-2", destination: "/", permanent: true },
      { source: "/usa/:slug", destination: "/usa", permanent: true },
    ];
  },
};

export default nextConfig;
