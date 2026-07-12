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
