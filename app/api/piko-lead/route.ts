// piko Japan LP (public/project-piko) 合作フォーム受信端。
// Supabase (qsm-system) の piko_leads に insert する。RLS は anon insert-only。
// 環境変数: PIKO_SUPABASE_URL / PIKO_SUPABASE_KEY (publishable key)

const ROLES = new Set(["architect", "media", "creator", "other"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const url = process.env.PIKO_SUPABASE_URL;
  const key = process.env.PIKO_SUPABASE_KEY;
  if (!url || !key) {
    return Response.json({ ok: false, error: "not configured" }, { status: 500 });
  }

  let form: URLSearchParams;
  try {
    form = new URLSearchParams(await request.text());
  } catch {
    return Response.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  // honeypot：機械投稿は成功を装って捨てる
  if (form.get("website")) {
    return Response.json({ ok: true });
  }

  const name = (form.get("name") ?? "").trim().slice(0, 100);
  const email = (form.get("email") ?? "").trim().slice(0, 200);
  const role = (form.get("role") ?? "").trim();
  if (!name || !ROLES.has(role) || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "missing required fields" }, { status: 400 });
  }

  const row = {
    name,
    email,
    role,
    company: (form.get("company") ?? "").trim().slice(0, 200) || null,
    message: (form.get("message") ?? "").trim().slice(0, 2000) || null,
    wants_deck: form.get("wantsDeck") === "1",
    ua: (form.get("ua") ?? "").slice(0, 300) || null,
  };

  const res = await fetch(`${url}/rest/v1/piko_leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    console.error("piko-lead insert failed", res.status, await res.text());
    return Response.json({ ok: false, error: "storage error" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
