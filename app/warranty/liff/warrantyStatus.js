export const WARRANTY_LIFF_STATUS_PATH = "/api/warranty/liff/status";

const VERIFICATION_LABELS = {
  address_matched: "地址核對",
  manual_confirmed: "人工確認",
  token_only: "保固連結",
};

const DATE_FORMATTER = new Intl.DateTimeFormat("zh-TW");

export function statusEndpoint(env) {
  return env === "staging" ? `${WARRANTY_LIFF_STATUS_PATH}?env=staging` : WARRANTY_LIFF_STATUS_PATH;
}

export function statusErrorMessageForCode(code) {
  if (code === "INVALID_ID_TOKEN") return "LINE 登入已過期，請重新開啟此頁";
  return "目前無法取得資料，請稍後再試";
}

export function verificationLabel(value) {
  return VERIFICATION_LABELS[value] || "保固狀態";
}

export function formatWarrantyDate(value) {
  if (!value) return "依完工資訊確認";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "依完工資訊確認";
  return DATE_FORMATTER.format(date);
}

export function formatLeadCard(lead) {
  const warrantyYears = String(lead?.warranty_years || "").trim();
  return {
    leadId: lead?.lead_id,
    address: String(lead?.address || "未提供地址").trim() || "未提供地址",
    warrantyText: warrantyYears ? `材料保固 ${warrantyYears} 年` : "年限確認後通知",
    periodText: `自 ${formatWarrantyDate(lead?.completion_date)} 起，至 ${formatWarrantyDate(lead?.warranty_end_date)}`,
    verificationText: verificationLabel(lead?.verification),
  };
}

export async function fetchWarrantyStatus({ idToken, endpoint = WARRANTY_LIFF_STATUS_PATH }, fetchImpl = fetch) {
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });

  let envelope;
  try {
    envelope = await response.json();
  } catch {
    envelope = null;
  }

  if (!response.ok || !envelope?.success) {
    const code = envelope?.error?.code || "UNKNOWN";
    throw Object.assign(new Error(statusErrorMessageForCode(code)), { code });
  }

  return envelope.data;
}
