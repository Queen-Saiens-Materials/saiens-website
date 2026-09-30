import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

const SHIFT_BOARD_ORIGIN =
  "https://shift-board-queen-saiens-materials.vercel.app";
const SHIFT_BOARD_HOST = "system.saiens.group";
// 業務週報（kpi.qsm.group 上的靜態頁＋/am 歷期檢視器＋其 API）改由 system.saiens.group 對外提供。
// 2026-09-30 Michael 指示；kpi.qsm.group 原網址保留，mini 的 run_weekly.sh 仍部署到那裡。
const KPI_ORIGIN = "https://kpi.qsm.group";
const KPI_PATHS = ["am-weekly", "am", "api/report"];

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
    return {
      beforeFiles: [
        {
          source: "/taipei-shift",
          has: [{ type: "host" as const, value: SHIFT_BOARD_HOST }],
          destination: `${SHIFT_BOARD_ORIGIN}/`,
        },
        {
          source: "/taipei-shift/:path*",
          has: [{ type: "host" as const, value: SHIFT_BOARD_HOST }],
          destination: `${SHIFT_BOARD_ORIGIN}/:path*`,
        },
        {
          source: "/_next/:path*",
          has: [{ type: "host" as const, value: SHIFT_BOARD_HOST }],
          destination: `${SHIFT_BOARD_ORIGIN}/_next/:path*`,
        },
        // 業務週報：/am-weekly（本期）、/am（歷期檢視器）、/api/report（歷期資料 API）代理到 kpi.qsm.group。
        ...KPI_PATHS.flatMap((p) => [
          {
            source: `/${p}`,
            has: [{ type: "host" as const, value: SHIFT_BOARD_HOST }],
            destination: `${KPI_ORIGIN}/${p}/`,
          },
          {
            source: `/${p}/:path*`,
            has: [{ type: "host" as const, value: SHIFT_BOARD_HOST }],
            destination: `${KPI_ORIGIN}/${p}/:path*`,
          },
        ]),
        // shift-board 的 host 級 catch-all；beforeFiles 的 rewrite 不會因前面規則命中而停止，
        // 所以用 negative lookahead 排除 /qsm-monthly-settlement（含其 basePath 下的 _next 資產）與業務週報路徑（/am-weekly、/am、/api/report），
        // 讓 app/qsm-monthly-settlement/ 的 route handler（月結工作台代理）接手。
        {
          source: "/:path((?!qsm-monthly-settlement(?:/|$)|am-weekly(?:/|$)|am(?:/|$)|api/report(?:/|$)).*)",
          has: [{ type: "host" as const, value: SHIFT_BOARD_HOST }],
          destination: `${SHIFT_BOARD_ORIGIN}/:path`,
        },
      ],
      afterFiles: [
        // Standalone OUGER architect-facing brand page. Keep the public URL clean
        // while serving the self-contained document without the Saiens site chrome.
        { source: "/ouger", destination: "/ouger/index.html" },
        // Standalone piko Japan partner landing page (same pattern as /ouger).
        { source: "/project-piko", destination: "/project-piko/index.html" },
        // 山恩未來說明會（內部簡報頁，meta noindex＋robots disallow；same pattern as /ouger）。
        { source: "/future", destination: "/future/index.html" },
        // 山恩業務團隊 2026 H2 策略會議頁（內部簡報頁，same pattern as /future）。
        { source: "/team-h2", destination: "/team-h2/index.html" },
      ],
    };
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
      {
        source: "/",
        has: [{ type: "host" as const, value: SHIFT_BOARD_HOST }],
        destination: "/taipei-shift",
        permanent: false,
      },
      {
        source: "/login",
        has: [{ type: "host" as const, value: SHIFT_BOARD_HOST }],
        destination: "/taipei-shift/login",
        permanent: false,
      },
      // /warranty 現在是保固入口頁（app/warranty/page.tsx），舊的 → 品質保證頁轉址已移除
      // 舊保養指南併入新的清潔使用指南（2026-09-06）；日文版 /japan-maintenance-manual 不動
      { source: "/maintenance-manual", destination: "/warranty/care", permanent: true },
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
