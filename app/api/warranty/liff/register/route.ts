// 同網域代理：LIFF 頁面把 id_token 與表單送到這裡，由伺服器轉送到 Odoo。
// 目的：避開 Odoo 端 CORS 白名單差異（staging 只允許 line-staging），並讓 ?env=staging 可在正式網域測試。
const PRODUCTION_API_URL = (process.env.ODOO_API_URL ?? "https://quote.saiens.tw").replace(/\/$/, "");
const STAGING_API_URL = (process.env.NEXT_PUBLIC_ODOO_STAGING_API_URL ?? "").replace(/\/$/, "");
const ODOO_PATH = "/api/saiens/warranty/liff/register";
const MAX_BODY_BYTES = 8 * 1024;

export async function POST(request: Request) {
  const env = new URL(request.url).searchParams.get("env");
  const base = env === "staging" && STAGING_API_URL ? STAGING_API_URL : PRODUCTION_API_URL;

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ success: false, error: { code: "PAYLOAD_TOO_LARGE", message: "payload too large" } }, { status: 413 });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ success: false, error: { code: "INVALID_JSON", message: "invalid json" } }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${base}${ODOO_PATH}`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ success: false, error: { code: "UPSTREAM_UNAVAILABLE", message: "odoo unavailable" } }, { status: 503 });
  }
}
