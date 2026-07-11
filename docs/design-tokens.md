# Saiens 設計 Tokens（自原站 site.css 抽取，2026-07-10）

來源：`archive/site.css`（versioned-site-css，site id 6874c6116a2003590e8bd051）

## 色彩（HSL）

| Token | HSL | 近似 HEX | 用途 |
|---|---|---|---|
| white | 0, 0%, 100% | #FFFFFF | 背景/反白文字 |
| black | 20, 4.35%, 13.53% | #242120 | 主文字/深色背景（帶暖調的近黑） |
| accent | 40, 9.84%, 76.08% | #C8C3BC | 主強調色（暖灰米色） |
| lightAccent | 0, 0%, 96.08% | #F5F5F5 | 淺色區塊背景 |
| darkAccent | 167.14, 6.31%, 56.47% | #879793 | 次強調（灰綠） |

## 字型

| 角色 | 原站 | 授權狀態 | 新站方案 |
|---|---|---|---|
| Heading / Site title | futura-pt | Adobe Fonts（隨 Squarespace 授權，搬離即失效） | **待定**：候選 (a) Jost（Google Fonts，Futura 系幾何開源替代）(b) 使用者若有 Adobe CC 可掛 Adobe Fonts embed |
| Body | "Helvetica Neue", Arial, sans-serif | 系統字型，免授權 | 照用 |
| 自訂區塊 | Poppins | Google Fonts 免費 | 照用（next/font） |
| 中文 | 未指定（fallback 系統字） | — | Noto Sans TC / 系統字 stack |
| 日文 | 未指定 | — | Noto Sans JP / 系統字 stack |

## 版型（重要更正，2026-07-11）

原站首頁**不是**深底白字站台。實際版型是白底黑字為主，只有特定區塊採黑底白字或淺灰底。以下為首頁（`archive/html/top.html`）各區塊 `data-section-theme` 與實際配色對照，依 DOM 順序：

| # | 區塊 | 主題 | 背景 | 文字 |
|---|---|---|---|---|
| 1 | Hero 影片（`HeroBanner`） | light | 影片全幅 | — |
| 2 | BLESS EVERY HOME&FAMILY（`Hero`） | black | `--black` #242120 | `--white` / `--accent` |
| 3 | One Stop Service（`OneStopService`） | white | `--white` #FFFFFF | `--black` |
| 4 | More Collection（`ProductShowcase`） | light | `--light-accent` #F5F5F5 | `--black` |
| 5 | 我們的品牌 / Our Brand（`BrandCards`，手風琴） | white | `--white` #FFFFFF | `--black` |
| 6 | 您可以放心交給 Saiens（`TrustBand`，大理石背景照） | black | `--black` + 石英石照片疊加 40% 黑色遮罩 | `--white` / `--accent` |
| 7 | 品質保證（`QualityAssurance`，含 Carousel） | light | `--light-accent` #F5F5F5 | `--black` |
| 8 | Saiens 讓清潔更簡單（`CleaningIntro`） | black | `--black` #242120 | `--white` / `--accent` |
| 9 | 揮別檯面吃色（`Maintenance`） | white | `--white` #FFFFFF | `--black` |
| 10 | What's New（`News`） | white | `--white` #FFFFFF | `--black` |

Header：固定深色（`--black` 底、`--white` 字），跨全站（含深色頁如 `/visit-us`）維持一致，不隨區塊主題切換。
Footer：白底黑字（`--white` 底、`--black` 字／logo），跨全站固定不變。

實作規則：
- 白色與淺灰區塊一律用 `--black` (#242120) 作主文字色，次要/說明文字用 `--dark-accent` (#879793)。
- 黑色區塊一律用 `--white` 作主文字色，次要/說明文字用 `--accent` (#C8C3BC)。
- 按鈕統一為實心對比色塊（白底區塊用黑底白字按鈕；黑底區塊用白底黑字或維持 outline）。

## 其他

- 版型：Squarespace 7.1，白底黑字為主、大量留白、極簡，特定區塊（見上表）採黑底白字或淺灰底
- 無 commerce（已驗證：JSON 無 store collection），購物車圖示為模板殘留，不搬
- 原站完整 CSS 備份於 `archive/site.css`（1.27 MB），細部間距/斷點實作時對照
