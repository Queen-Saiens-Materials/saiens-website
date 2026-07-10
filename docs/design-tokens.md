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

## 其他

- 版型：Squarespace 7.1，深底白字 Hero、大量留白、極簡
- 無 commerce（已驗證：JSON 無 store collection），購物車圖示為模板殘留，不搬
- 原站完整 CSS 備份於 `archive/site.css`（1.27 MB），細部間距/斷點實作時對照
