import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

/**
 * Local-only Tina config for Phase 1 of the TinaCMS migration.
 * Tina Cloud (clientId/token) is intentionally left as env-var
 * placeholders — connecting to Tina Cloud is a Phase 2 task.
 * Run `npx tinacms dev` (TINA_PUBLIC_IS_LOCAL=true) to edit locally
 * against the filesystem without a Tina Cloud account.
 */
export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post_tw",
        label: "文章（台灣）",
        path: "content/blog/tw",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "標題",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "日期",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "摘要",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "thumbnail",
            label: "縮圖",
          },
          {
            type: "string",
            name: "originalUrl",
            label: "Original URL",
            ui: { component: () => null },
          },
          {
            type: "rich-text",
            name: "body",
            label: "內文",
            isBody: true,
          },
        ],
      },
      {
        name: "page_home_tw",
        label: "首頁（台灣）",
        path: "content/pages",
        format: "json",
        match: { include: "home-tw" },
        ui: {
          allowedActions: { create: false, delete: false },
          filename: { readonly: true },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "主視覺文字",
            fields: [
              { type: "string", name: "heading", label: "標題" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "oneStopService",
            label: "一站式服務",
            fields: [
              { type: "string", name: "headingZh", label: "標題（英文）" },
              { type: "string", name: "headingEn", label: "標題（中文）" },
              {
                type: "object",
                name: "services",
                label: "服務項目",
                list: true,
                fields: [
                  { type: "image", name: "icon", label: "圖示" },
                  { type: "string", name: "iconAlt", label: "圖示替代文字" },
                  { type: "string", name: "titleZh", label: "標題（中文）" },
                  { type: "string", name: "titleEn", label: "標題（英文）" },
                  {
                    type: "string",
                    name: "bodyZh",
                    label: "內文（中文）",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "bodyEn",
                    label: "內文（英文）",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "products",
            label: "產品展示",
            fields: [
              { type: "string", name: "heading", label: "標題" },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              {
                type: "object",
                name: "items",
                label: "產品項目",
                list: true,
                fields: [
                  { type: "string", name: "code", label: "產品代號" },
                  { type: "string", name: "name", label: "產品名稱" },
                  { type: "image", name: "image", label: "圖片" },
                  { type: "string", name: "link", label: "連結" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "brands",
            label: "品牌介紹",
            fields: [
              { type: "string", name: "headingZh", label: "標題（中文）" },
              { type: "string", name: "headingEn", label: "標題（英文）" },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              { type: "string", name: "ctaHref", label: "按鈕連結" },
              {
                type: "object",
                name: "items",
                label: "品牌項目",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "品牌名稱" },
                  { type: "string", name: "spec", label: "規格" },
                  { type: "string", name: "thickness", label: "厚度" },
                  { type: "string", name: "scope", label: "適用範圍" },
                  { type: "string", name: "features", label: "特色" },
                  { type: "string", name: "href", label: "官網連結" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "trustBand",
            label: "信任區塊",
            fields: [
              { type: "image", name: "backgroundImage", label: "背景圖片" },
              { type: "string", name: "heading", label: "標題" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "qualityAssurance",
            label: "品質保證",
            fields: [
              { type: "string", name: "headingZh", label: "標題（中文）" },
              { type: "string", name: "headingEn", label: "標題（英文）" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              { type: "string", name: "ctaHref", label: "按鈕連結" },
              {
                type: "object",
                name: "certifications",
                label: "認證項目",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "名稱" },
                  {
                    type: "string",
                    name: "description",
                    label: "說明",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "cleaning",
            label: "清潔介紹",
            fields: [
              { type: "string", name: "heading", label: "標題" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "maintenance",
            label: "保養說明",
            fields: [
              { type: "string", name: "headingLine1", label: "標題第一行" },
              { type: "string", name: "headingLine2", label: "標題第二行" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              { type: "string", name: "ctaHref", label: "按鈕連結" },
            ],
          },
          {
            type: "object",
            name: "news",
            label: "最新消息區塊",
            fields: [
              { type: "string", name: "headingLine1", label: "標題第一行" },
              { type: "string", name: "headingLine2", label: "標題第二行" },
              { type: "string", name: "subhead", label: "副標題" },
            ],
          },
          {
            type: "object",
            name: "heroBanner",
            label: "頂部影片橫幅",
            fields: [
              { type: "string", name: "videoSrc", label: "影片路徑" },
              { type: "image", name: "posterSrc", label: "影片封面圖片" },
            ],
          },
        ],
      },
      {
        name: "page_home_jp",
        label: "首頁（日本）",
        path: "content/pages",
        format: "json",
        match: { include: "home-jp" },
        ui: {
          allowedActions: { create: false, delete: false },
          filename: { readonly: true },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "主視覺文字",
            fields: [
              { type: "string", name: "eyebrow", label: "頂部小標" },
              { type: "string", name: "heading", label: "標題" },
              {
                type: "string",
                name: "bodyParagraphs",
                label: "內文段落",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "products",
            label: "產品展示",
            fields: [
              { type: "string", name: "heading", label: "標題" },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              {
                type: "object",
                name: "items",
                label: "產品項目",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "標題" },
                  { type: "image", name: "image", label: "圖片" },
                  { type: "string", name: "link", label: "連結" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "服務流程",
            fields: [
              { type: "string", name: "headingEn", label: "標題（英文）" },
              { type: "string", name: "headingJa", label: "標題（日文）" },
              { type: "image", name: "backgroundImage", label: "背景圖片" },
              {
                type: "object",
                name: "steps",
                label: "流程步驟",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "標題" },
                  {
                    type: "string",
                    name: "description",
                    label: "說明",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "brands",
            label: "品牌介紹",
            fields: [
              { type: "string", name: "headingJa", label: "標題（日文）" },
              { type: "string", name: "headingEn", label: "標題（英文）" },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              { type: "string", name: "ctaHref", label: "按鈕連結" },
              {
                type: "object",
                name: "items",
                label: "品牌項目",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "品牌名稱" },
                  { type: "string", name: "spec", label: "規格" },
                  { type: "string", name: "thickness", label: "厚度" },
                  { type: "string", name: "scope", label: "適用範圍" },
                  { type: "string", name: "features", label: "特色" },
                  { type: "string", name: "href", label: "官網連結" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "brandPromise",
            label: "品牌承諾",
            fields: [
              { type: "image", name: "backgroundImage", label: "背景圖片" },
              { type: "string", name: "heading", label: "標題" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "qualityGuarantee",
            label: "品質保證",
            fields: [
              { type: "string", name: "headingJa", label: "標題（日文）" },
              { type: "string", name: "headingEn", label: "標題（英文）" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              { type: "string", name: "ctaHref", label: "按鈕連結" },
              {
                type: "object",
                name: "badges",
                label: "保固標章",
                list: true,
                fields: [
                  { type: "string", name: "alt", label: "替代文字" },
                  { type: "image", name: "image", label: "圖片" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "certifications",
            label: "認證輪播",
            fields: [
              {
                type: "object",
                name: "items",
                label: "認證項目",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "標題" },
                  {
                    type: "string",
                    name: "description",
                    label: "說明",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "cleaning",
            label: "清潔介紹",
            fields: [
              {
                type: "object",
                name: "section1",
                label: "第一段",
                fields: [
                  { type: "string", name: "heading", label: "標題" },
                  {
                    type: "string",
                    name: "body",
                    label: "內文",
                    ui: { component: "textarea" },
                  },
                ],
              },
              {
                type: "object",
                name: "section2",
                label: "第二段",
                fields: [
                  { type: "string", name: "headingLine1", label: "標題第一行" },
                  { type: "string", name: "headingLine2", label: "標題第二行" },
                  {
                    type: "string",
                    name: "body",
                    label: "內文",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "ctaLabel", label: "按鈕文字" },
                  { type: "string", name: "ctaHref", label: "按鈕連結" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "news",
            label: "最新消息區塊",
            fields: [
              { type: "string", name: "headingLine1", label: "標題第一行" },
              { type: "string", name: "headingLine2", label: "標題第二行" },
              { type: "string", name: "subhead", label: "副標題" },
              { type: "string", name: "emptyStateText", label: "無文章時顯示文字" },
            ],
          },
          {
            type: "object",
            name: "heroBanner",
            label: "頂部影片橫幅",
            fields: [
              { type: "string", name: "videoSrc", label: "影片路徑" },
              { type: "image", name: "posterSrc", label: "影片封面圖片" },
            ],
          },
        ],
      },
      {
        name: "page_home_usa",
        label: "首頁（美國）",
        path: "content/pages",
        format: "json",
        match: { include: "home-usa" },
        ui: {
          allowedActions: { create: false, delete: false },
          filename: { readonly: true },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "主視覺文字",
            fields: [
              { type: "string", name: "heading", label: "標題" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "collection",
            label: "系列展示",
            fields: [
              { type: "string", name: "eyebrow", label: "頂部小標" },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              {
                type: "object",
                name: "items",
                label: "系列項目",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "標題" },
                  { type: "image", name: "image", label: "圖片" },
                  { type: "string", name: "alt", label: "圖片替代文字" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "oneStopService",
            label: "一站式服務",
            fields: [
              { type: "string", name: "eyebrow", label: "頂部小標" },
              {
                type: "object",
                name: "services",
                label: "服務項目",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "標題" },
                  {
                    type: "string",
                    name: "description",
                    label: "說明",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "brand",
            label: "品牌介紹",
            fields: [
              { type: "string", name: "heading", label: "標題" },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              { type: "string", name: "ctaHref", label: "按鈕連結" },
              { type: "string", name: "names", label: "品牌名稱", list: true },
            ],
          },
          {
            type: "object",
            name: "certifications",
            label: "認證區塊",
            fields: [
              {
                type: "object",
                name: "items",
                label: "認證項目",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "標題" },
                  {
                    type: "string",
                    name: "description",
                    label: "說明",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "warranty",
            label: "保固說明",
            fields: [
              { type: "string", name: "headingPrefix", label: "標題前段" },
              { type: "string", name: "headingStrong", label: "標題粗體字" },
              { type: "string", name: "headingSuffix", label: "標題後段" },
              {
                type: "string",
                name: "body",
                label: "內文",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaLabel", label: "按鈕文字" },
              { type: "string", name: "ctaHref", label: "按鈕連結" },
            ],
          },
          {
            type: "object",
            name: "certificationDetails",
            label: "認證詳細說明",
            list: true,
            fields: [
              { type: "image", name: "image", label: "圖片" },
              { type: "string", name: "alt", label: "圖片替代文字" },
              { type: "string", name: "heading", label: "標題" },
              {
                type: "string",
                name: "paragraphs",
                label: "內文段落",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "heroBanner",
            label: "頂部影片橫幅",
            fields: [
              { type: "string", name: "videoSrc", label: "影片路徑" },
              { type: "image", name: "posterSrc", label: "影片封面圖片" },
            ],
          },
        ],
      },
      {
        name: "settings",
        label: "網站設定",
        path: "content/settings",
        format: "json",
        match: { include: "site" },
        ui: {
          allowedActions: { create: false, delete: false },
          filename: { readonly: true },
        },
        fields: [
          { type: "string", name: "lineUrl", label: "LINE 連結" },
          {
            type: "object",
            name: "socialLinks",
            label: "社群連結",
            fields: [
              { type: "string", name: "facebook", label: "Facebook" },
              { type: "string", name: "instagram", label: "Instagram" },
              { type: "string", name: "youtube", label: "YouTube" },
            ],
          },
          {
            type: "object",
            name: "showroomImages",
            label: "展間圖片",
            fields: [
              {
                type: "object",
                name: "TAIPEI",
                label: "台北",
                fields: [
                  { type: "image", name: "src", label: "圖片" },
                  { type: "string", name: "alt", label: "替代文字" },
                ],
              },
              {
                type: "object",
                name: "TAICHUNG",
                label: "台中",
                fields: [
                  { type: "image", name: "src", label: "圖片" },
                  { type: "string", name: "alt", label: "替代文字" },
                ],
              },
              {
                type: "object",
                name: "KAOHSIUNG",
                label: "高雄",
                fields: [
                  { type: "image", name: "src", label: "圖片" },
                  { type: "string", name: "alt", label: "替代文字" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "showrooms",
            label: "展間資訊（台灣/英文）",
            list: true,
            fields: [
              { type: "string", name: "city", label: "城市代碼" },
              { type: "string", name: "label", label: "顯示名稱" },
              { type: "string", name: "mapUrl", label: "地圖連結" },
              { type: "string", name: "address", label: "地址" },
              { type: "string", name: "telHref", label: "電話連結" },
              { type: "string", name: "telLabel", label: "電話顯示文字" },
              { type: "string", name: "hours", label: "營業時間", list: true },
              { type: "string", name: "imageKey", label: "對應圖片代碼" },
            ],
          },
          {
            type: "object",
            name: "showroomsJa",
            label: "展間資訊（日本）",
            list: true,
            fields: [
              { type: "string", name: "city", label: "城市代碼" },
              { type: "string", name: "label", label: "顯示名稱" },
              { type: "string", name: "mapUrl", label: "地圖連結" },
              { type: "string", name: "address", label: "地址" },
              { type: "string", name: "details", label: "詳細資訊", list: true },
              { type: "string", name: "imageKey", label: "對應圖片代碼" },
            ],
          },
          {
            type: "object",
            name: "saiensSalon",
            label: "Saiens Salon 聯絡資訊",
            fields: [
              { type: "string", name: "location", label: "地點" },
              { type: "string", name: "address", label: "地址" },
              { type: "string", name: "contactName", label: "聯絡人" },
              { type: "string", name: "contactPhone", label: "聯絡電話" },
            ],
          },
        ],
      },
      {
        name: "post_jp",
        label: "記事（日本）",
        path: "content/blog/jp",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "タイトル",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "日付",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "抜粋",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "thumbnail",
            label: "サムネイル",
          },
          {
            type: "string",
            name: "originalUrl",
            label: "Original URL",
            ui: { component: () => null },
          },
          {
            type: "rich-text",
            name: "body",
            label: "本文",
            isBody: true,
          },
        ],
      },
    ],
  },
});
