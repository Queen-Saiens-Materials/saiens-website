import { after } from "next/server";

import { submitWarrantyRegistration } from "@/lib/warranty/api";
import { INTERNAL_NOTIFICATION_TO } from "@/lib/email/config";
import { sendEmail } from "@/lib/email/resend";
import { getLiffRegisterUrl } from "@/lib/warranty/liff";

type RegistrationRequest = {
  token?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  registered_by?: unknown;
  proxy_name?: unknown;
  // 只給確認信用，不轉送 Odoo
  site_address?: unknown;
  warranty_years?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function logEmailFailure(label: string, result: Awaited<ReturnType<typeof sendEmail>>) {
  if (!result.ok) {
    console.error(label, {
      status: result.status,
      error: result.error,
    });
  }
}

async function sendWarrantyEmails({
  name,
  phone,
  email,
  registeredBy,
  proxyName,
  token,
  siteAddress,
  warrantyYears,
}: {
  name: string;
  phone: string;
  email: string;
  registeredBy: "owner" | "designer_proxy";
  proxyName: string;
  token: string;
  siteAddress: string;
  warrantyYears: string;
}) {
  const liffUrl = getLiffRegisterUrl(token);
  const yearsLine = warrantyYears
    ? `材料保固 ${escapeHtml(warrantyYears)} 年，自安裝完工日起計算。`
    : "材料保固年限將依完工資訊確認後另行通知。";
  const ownerEmail = await sendEmail({
    to: email,
    subject: "Saiens 保固登記完成",
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,'Noto Sans TC',sans-serif;color:#302b27;line-height:1.7;font-size:16px;">
        <p>${escapeHtml(name)} 您好：</p>
        <p>您的保固登記已完成。從今天起，這個家的檯面由山恩負責。</p>
        ${siteAddress ? `<p><strong>保固案場</strong><br />${escapeHtml(siteAddress)}</p>` : ""}
        <p>${yearsLine}</p>
        ${
          liffUrl
            ? `<p>建議把這個案場綁到您的 LINE，之後查詢保固、報修與保養提醒都在 LINE 裡完成，不需再找人轉達：<br /><a href="${liffUrl}" style="color:#274690;">用 LINE 綁定這個案場</a></p>`
            : `<p>後續保固服務與通知，請加入 Saiens 客服 LINE：<a href="https://lin.ee/poXsa4y" style="color:#274690;">https://lin.ee/poXsa4y</a></p>`
        }
        <p>清潔使用指南：<a href="https://saiens.tw/warranty/care" style="color:#274690;">https://saiens.tw/warranty/care</a><br />
        完整保固條款：<a href="https://saiens.tw/guarantees-and-warranties" style="color:#274690;">https://saiens.tw/guarantees-and-warranties</a></p>
        <p style="color:#857f7a;font-size:14px;">Saiens 山恩 · 保固服務地區限台灣本島 · service@saiens.tw</p>
      </div>
    `,
  });
  logEmailFailure("warranty_owner_email_failed", ownerEmail);

  const internalEmail = await sendEmail({
    to: INTERNAL_NOTIFICATION_TO,
    subject: "[保固註冊] 新登記",
    html: `
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
        <tr><th style="border:1px solid #ddd;padding:8px;text-align:left;background:#f7f7f7;">姓名</th><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(name)}</td></tr>
        <tr><th style="border:1px solid #ddd;padding:8px;text-align:left;background:#f7f7f7;">電話</th><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(phone)}</td></tr>
        <tr><th style="border:1px solid #ddd;padding:8px;text-align:left;background:#f7f7f7;">Email</th><td style="border:1px solid #ddd;padding:8px;">${escapeHtml(email)}</td></tr>
        <tr><th style="border:1px solid #ddd;padding:8px;text-align:left;background:#f7f7f7;">代填標記</th><td style="border:1px solid #ddd;padding:8px;">${registeredBy === "designer_proxy" ? `設計師代填：${escapeHtml(proxyName)}` : "業主自行登記"}</td></tr>
      </table>
    `,
    replyTo: email,
  });
  logEmailFailure("warranty_internal_email_failed", internalEmail);
}

export async function POST(request: Request) {
  let payload: RegistrationRequest;

  try {
    payload = (await request.json()) as RegistrationRequest;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const token = getString(payload.token);
  const name = getString(payload.name);
  const phone = getString(payload.phone);
  const email = getString(payload.email);
  const proxyName = getString(payload.proxy_name);
  const registeredBy = payload.registered_by;
  const siteAddress = getString(payload.site_address).slice(0, 200);
  const warrantyYears = getString(payload.warranty_years).slice(0, 4);

  if (
    !token ||
    !name ||
    !phone ||
    !email ||
    (registeredBy !== "owner" && registeredBy !== "designer_proxy") ||
    (registeredBy === "designer_proxy" && !proxyName)
  ) {
    return Response.json({ error: "missing_required_fields" }, { status: 400 });
  }

  const result = await submitWarrantyRegistration({
    token,
    name,
    phone,
    email,
    registered_by: registeredBy,
    ...(registeredBy === "designer_proxy" ? { proxy_name: proxyName } : {}),
  });

  if (result.ok && "status" in result.data && result.data.status === "ok") {
    // after(): 回應送出後仍保證執行完（serverless 下裸 promise 會被凍結）
    after(() =>
      sendWarrantyEmails({
        name,
        phone,
        email,
        registeredBy,
        proxyName,
        token,
        siteAddress,
        warrantyYears,
      }),
    );
  }

  return Response.json(result.data, { status: result.status });
}
