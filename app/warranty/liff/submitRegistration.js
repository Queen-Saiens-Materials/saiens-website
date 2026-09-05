// 同網域代理路由（app/api/warranty/liff/register/route.ts），由伺服器轉送到 Odoo
export const WARRANTY_LIFF_REGISTER_PATH = "/api/warranty/liff/register";

export function registrationEndpoint(env) {
  return env === "staging" ? `${WARRANTY_LIFF_REGISTER_PATH}?env=staging` : WARRANTY_LIFF_REGISTER_PATH;
}

/**
 * 從目前網址找出 env 參數。LIFF 開啟／登入導回時會把原始 query 塞進 `liff.state`，
 * 直接的 `?env=` 也支援；找到就記到 sessionStorage，之後的導回都沿用。
 * @param {string} search  window.location.search
 * @param {{ getItem(k: string): string | null, setItem(k: string, v: string): void } | null} storage
 */
export function resolveEnv(search, storage) {
  const KEY = "wr-liff-env";
  const params = new URLSearchParams(search || "");
  let env = params.get("env");
  if (!env) {
    const state = params.get("liff.state");
    if (state) {
      const inner = state.startsWith("?") ? state : state.includes("?") ? state.slice(state.indexOf("?")) : `?${state}`;
      env = new URLSearchParams(inner).get("env");
    }
  }
  try {
    if (env) storage?.setItem(KEY, env);
    else env = storage?.getItem(KEY) || null;
  } catch {
    // storage unavailable
  }
  return env || undefined;
}

/**
 * @typedef {"bound" | "pending_review" | "no_match"} RegistrationStatus
 * @typedef {{ status: "bound", address: string, warranty_years: string } | { status: "pending_review" } | { status: "no_match" }} RegistrationResult
 * @typedef {{ idToken: string, address: string, name: string, phone: string, token?: string, endpoint?: string }} RegistrationPayload
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
  const response = await fetchImpl(payload.endpoint || WARRANTY_LIFF_REGISTER_PATH, {
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
