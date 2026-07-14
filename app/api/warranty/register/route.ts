import { after } from "next/server";

import { submitWarrantyRegistration } from "@/lib/warranty/api";
import { INTERNAL_NOTIFICATION_TO } from "@/lib/email/config";
import { sendEmail } from "@/lib/email/resend";

type RegistrationRequest = {
  token?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  registered_by?: unknown;
  proxy_name?: unknown;
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
}: {
  name: string;
  phone: string;
  email: string;
  registeredBy: "owner" | "designer_proxy";
  proxyName: string;
}) {
  const ownerEmail = await sendEmail({
    to: email,
    subject: "Saiens 保固註冊完成通知",
    html: `
      <p>${escapeHtml(name)} 您好：</p>
      <p>我們已收到您登記的案場保固註冊資料。</p>
      <p>保固年限請洽客服或設計師確認。</p>
      <p>客服 LINE：<a href="https://lin.ee/poXsa4y">https://lin.ee/poXsa4y</a><br />Email：<a href="mailto:service@saiens.tw">service@saiens.tw</a></p>
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
      }),
    );
  }

  return Response.json(result.data, { status: result.status });
}
