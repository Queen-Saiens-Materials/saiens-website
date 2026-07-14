import { INTERNAL_NOTIFICATION_TO } from "@/lib/email/config";
import { sendEmail } from "@/lib/email/resend";

const MAX_BODY_BYTES = 10 * 1024;
const MAX_FIELD_LENGTH = 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = Record<string, unknown> & {
  form?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
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

function normalizeValue(value: unknown): string | null {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    const values = value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
    return values.join(", ");
  }

  return null;
}

function buildHtml(payload: ContactPayload) {
  const rows = Object.entries(payload)
    .map(([key, value]) => [key, normalizeValue(value)] as const)
    .filter(([, value]) => value !== null && value.length > 0)
    .map(
      ([key, value]) => `<tr>
        <th style="border:1px solid #ddd;padding:8px;text-align:left;background:#f7f7f7;">${escapeHtml(key)}</th>
        <td style="border:1px solid #ddd;padding:8px;">${escapeHtml(value ?? "")}</td>
      </tr>`,
    )
    .join("");

  return `<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">${rows}</table>`;
}

export async function POST(request: Request) {
  const bodyText = await request.text();

  if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES) {
    return Response.json({ error: "payload_too_large" }, { status: 400 });
  }

  let payload: ContactPayload;

  try {
    payload = JSON.parse(bodyText) as ContactPayload;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  const form = getString(payload.form);
  const name = getString(payload.name);
  const email = getString(payload.email);

  if (!form || !name || !email) {
    return Response.json({ error: "missing_required_fields" }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  for (const value of Object.values(payload)) {
    if (typeof value === "string" && value.length > MAX_FIELD_LENGTH) {
      return Response.json({ error: "field_too_long" }, { status: 400 });
    }

    if (
      Array.isArray(value) &&
      value.some((item) => typeof item === "string" && item.length > MAX_FIELD_LENGTH)
    ) {
      return Response.json({ error: "field_too_long" }, { status: 400 });
    }
  }

  const result = await sendEmail({
    to: INTERNAL_NOTIFICATION_TO,
    subject: `[官網表單] ${form}`,
    html: buildHtml(payload),
    replyTo: email,
  });

  if (!result.ok) {
    console.error("contact_email_failed", {
      form,
      status: result.status,
      error: result.error,
    });
  }

  return Response.json({ status: "ok" });
}
