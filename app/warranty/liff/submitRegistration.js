export const DEFAULT_ODOO_API_URL = "https://quote.saiens.tw";
export const WARRANTY_LIFF_REGISTER_PATH = "/api/saiens/warranty/liff/register";

/**
 * @typedef {"bound" | "pending_review" | "no_match"} RegistrationStatus
 * @typedef {{ status: "bound", address: string, warranty_years: string } | { status: "pending_review" } | { status: "no_match" }} RegistrationResult
 * @typedef {{ idToken: string, address: string, name: string, phone: string, token?: string, odooApiUrl?: string }} RegistrationPayload
 */

export function errorMessageForCode(code) {
  if (code === "INVALID_ID_TOKEN") return "LINE 登入已過期，請重新開啟此頁";
  return "送出時發生問題，請稍後再試";
}

/**
 * @param {RegistrationPayload} payload
 * @param {typeof fetch} fetchImpl
 * @returns {Promise<RegistrationResult>}
 */
export async function submitRegistration(payload, fetchImpl = fetch) {
  const baseUrl = (payload.odooApiUrl || DEFAULT_ODOO_API_URL).replace(/\/+$/, "");
  const response = await fetchImpl(`${baseUrl}${WARRANTY_LIFF_REGISTER_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_token: payload.idToken,
      address: payload.address,
      name: payload.name,
      phone: payload.phone,
      ...(payload.token ? { token: payload.token } : {}),
    }),
  });

  let envelope;
  try {
    envelope = await response.json();
  } catch {
    envelope = null;
  }

  if (!response.ok || !envelope?.success) {
    const code = envelope?.error?.code || "UNKNOWN";
    throw Object.assign(new Error(errorMessageForCode(code)), { code });
  }

  return envelope.data;
}
