# Saiens Website 維護指南

Next.js 16 App Router + Tailwind v4 + TypeScript 專案，前身為 Squarespace 網站遷移。

## 1. 部落格文章（Blog）

- 內容位置：`content/blog/tw/*.json`（繁中）與 `content/blog/jp/*.json`（日文），檔名即為文章 slug 的來源。
- 實際 JSON 欄位（以現有檔案驗證）：
  - `slug`：文章代稱，需與檔名一致
  - `region`：`"tw"` 或 `"jp"`
  - `originalUrl`：Squarespace 舊網址（供對照，非必要）
  - `title`：標題
  - `date`：發布日期（`YYYY-MM-DD`）
  - `excerpt`：摘要（含 HTML）
  - `thumbnail`：封面縮圖路徑，格式如 `/images/<hash>-<id>/_.jpg`
  - `bodyHtml`：內文（原始 Squarespace HTML，含大量 inline style/class，勿手動精簡）
- 圖片實際放在 `public/images/<雜湊>-<ID>/` 資料夾下，路徑需與 JSON 內 `thumbnail` / `bodyHtml` 引用的路徑完全一致。
- **Redirect 已自動化**：`next.config.ts` 會在 build 時讀取 `content/blog/tw` 與 `content/blog/jp` 目錄下所有檔名，自動產生 `/top/<slug> → /news/<slug>`、`/top-jp/<slug> → /jp/news/<slug>` 的 301 redirect。新增或刪除文章檔案即可，**不需要**手動維護 slug 清單。其餘固定 redirect（如 `/top → /`、`/new-page* → /`）也在同一個檔案中設定。

## 2. 聯絡資訊（Contact Info）

- 聯絡資訊集中在 `config/site.ts`，各頁面皆以 import 引用，改這一個檔案即可：
  - `LINE_URL`：LINE 官方帳號連結
  - `SOCIAL_LINKS`：Facebook / Instagram / YouTube 連結
  - `SHOWROOMS`：台北／台中／高雄展示間（地址、電話、營業時間、地圖連結）
  - `SHOWROOMS_JA`：日文版展示間資訊（`/visit-us-jp` 用，文案獨立維護）
  - `SAIENS_SALON`：Saiens Salon 頁面的地點與聯絡人資訊
- 引用處：`components/Header.tsx`、`components/Footer.tsx`、`app/visit-us/page.tsx`、`app/visit-us-jp/page.tsx`、`app/saiens-salon/page.tsx`。

## 3. 本機預覽與部署

- `package.json` scripts：
  - `npm run dev` → `next dev`（未指定 port，預設使用 `localhost:3000`）
  - `npm run build` → `next build`
  - `npm run start` → `next start`（需先 build）
- 專案已透過 `.vercel/project.json` 連結 Vercel 專案（無 `vercel.json` 自訂設定）。
- 部署：
  - Preview：`vercel deploy`
  - Production：`vercel --prod`

## 4. 表單狀態（Forms）

以下 5 個頁面共 7 個表單實例，UI 已完整還原自舊 Squarespace 網站，但**送出功能目前為停用狀態**：

- `app/guarantees-and-warranties`
- `app/japan-guarantees-and-warranties`
- `app/fluid-living-registration`
- `app/mobius-contact`
- `app/mobius-contact02`
- `app/mobius`（頁面內嵌 1 個表單）
- `app/mobius-2`（頁面內嵌 1 個表單）

規劃中的後端方案為 Vercel Function + Resend 寄信服務，尚未串接。

**修改這些表單時，請勿移除「停用」狀態（例如 disabled 屬性、送出邏輯的攔截），除非同時完成後端串接**，否則會讓使用者誤以為表單已送出但實際上資料並未被接收。
