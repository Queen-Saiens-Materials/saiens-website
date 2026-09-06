// LIFF 入口的單一真相：LIFF ID 來自環境變數；只有 Odoo 端 LIFF 端點正式上線（NEXT_PUBLIC_LIFF_LIVE=1）才對外露出連結。
const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID?.trim();
const LIFF_LIVE = process.env.NEXT_PUBLIC_LIFF_LIVE === "1";

export const LINE_OA_URL = "https://lin.ee/poXsa4y";

/** 保固登記 LIFF 連結；可帶既有保固 token 讓 LIFF 直接鎖定案件只補綁 LINE。未上線時回 null。 */
export function getLiffRegisterUrl(token?: string): string | null {
  if (!LIFF_ID || !LIFF_LIVE) return null;
  const base = `https://liff.line.me/${encodeURIComponent(LIFF_ID)}`;
  return token ? `${base}?token=${encodeURIComponent(token)}` : base;
}

/** 「我的保固」LIFF 連結。未上線時回 null。 */
export function getLiffMineUrl(): string | null {
  if (!LIFF_ID || !LIFF_LIVE) return null;
  return `https://liff.line.me/${encodeURIComponent(LIFF_ID)}/mine`;
}
