"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// 官網 live chat：載入自架 Chatwoot 的 widget（訊息進 CS Genius 收件匣「官網 saiens.tw」）。
// 兩個環境變數缺一就不渲染，避免在 preview／本機誤連；日文站（/jp）暫不掛，客服目前只服務台灣。
const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL ?? "";
const WEBSITE_TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN ?? "";

declare global {
  interface Window {
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void };
    chatwootSettings?: Record<string, unknown>;
  }
}

export default function ChatwootWidget() {
  const pathname = usePathname();
  if (!BASE_URL || !WEBSITE_TOKEN) return null;
  if (pathname?.startsWith("/jp")) return null;

  return (
    <Script
      id="chatwoot-sdk"
      src={`${BASE_URL}/packs/js/sdk.js`}
      strategy="lazyOnload"
      onLoad={() => {
        window.chatwootSettings = { locale: "zh_TW", position: "right", type: "standard" };
        window.chatwootSDK?.run({ websiteToken: WEBSITE_TOKEN, baseUrl: BASE_URL });
      }}
    />
  );
}
