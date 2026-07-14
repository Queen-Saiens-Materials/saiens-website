import { EMAIL_FROM } from "@/lib/email/config";

type SendEmailInput = {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

type SendEmailResult =
  | {
      ok: true;
      status: number;
      id?: string;
    }
  | {
      ok: false;
      status: number;
      error: string;
    };

export async function sendEmail({
  from = EMAIL_FROM,
  to,
  subject,
  html,
  replyTo,
}: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: "missing_resend_api_key",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    let body: unknown = null;
    try {
      body = await response.json();
    } catch {
      body = null;
    }

    if (response.ok) {
      return {
        ok: true,
        status: response.status,
        id:
          typeof body === "object" &&
          body !== null &&
          "id" in body &&
          typeof body.id === "string"
            ? body.id
            : undefined,
      };
    }

    return {
      ok: false,
      status: response.status,
      error: getResendError(body),
    };
  } catch {
    return {
      ok: false,
      status: 503,
      error: "network_error",
    };
  }
}

function getResendError(body: unknown) {
  if (
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof body.message === "string"
  ) {
    return body.message;
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    return body.error;
  }

  return "resend_error";
}
