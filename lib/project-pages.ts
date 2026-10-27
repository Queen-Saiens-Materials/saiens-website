// 內部研究／敘事靜態頁（public/<slug>/index.html，頁內 meta noindex＋robots disallow 雙保險）。
// 2026-10-27 自 projects.saiens.group（saiens-projects repo）搬入。新增頁面只需放進 public/ 並加到這裡；
// next.config.ts 的 rewrite 與 app/robots.ts 的 disallow 共用本清單。
// 研究正本：saiens-next 與 prefab 四頁在 qsm-ai-lab/vault/60-projects/saiens-prefab/；
// NOSIGNER 兩頁在 project-nosigner/concept/。
export const PROJECT_PAGES = [
  "saiens-next",
  "nosigner-saiens-kitchen",
  "future-kitchen",
  "prefab-mvp",
  "prefab-mvp-bp",
  "prefab-startups",
  "ruentex-patent-study",
] as const;
