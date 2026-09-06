import assert from "node:assert/strict";
import test from "node:test";
import {
  fetchWarrantyStatus,
  formatLeadCard,
  formatWarrantyDate,
  statusEndpoint,
  statusErrorMessageForCode,
  verificationLabel,
} from "../warrantyStatus.js";

test("statusEndpoint routes staging only when asked", () => {
  assert.equal(statusEndpoint("staging"), "/api/warranty/liff/status?env=staging");
  assert.equal(statusEndpoint(undefined), "/api/warranty/liff/status");
  assert.equal(statusEndpoint("prod"), "/api/warranty/liff/status");
});

test("formatLeadCard formats complete warranty data", () => {
  assert.deepEqual(
    formatLeadCard({
      lead_id: 123,
      address: "台北市南港區松河街616號1樓",
      warranty_years: "25",
      completion_date: "2026-01-10",
      warranty_end_date: "2051-01-10",
      verification: "address_matched",
      bound_at: "2026-09-05T08:00:00",
    }),
    {
      leadId: 123,
      address: "台北市南港區松河街616號1樓",
      warrantyText: "材料保固 25 年",
      periodText: "自 2026/1/10 起，至 2051/1/10",
      verificationText: "地址核對",
    },
  );
});

test("formatLeadCard handles empty warranty years and dates", () => {
  const card = formatLeadCard({
    lead_id: 456,
    address: "",
    warranty_years: "",
    completion_date: "",
    warranty_end_date: "",
    verification: "manual_confirmed",
  });

  assert.equal(card.address, "未提供地址");
  assert.equal(card.warrantyText, "年限確認後通知");
  assert.equal(card.periodText, "自 依完工資訊確認 起，至 依完工資訊確認");
  assert.equal(card.verificationText, "人工確認");
});

test("formatWarrantyDate rejects invalid input", () => {
  assert.equal(formatWarrantyDate(""), "依完工資訊確認");
  assert.equal(formatWarrantyDate("not-a-date"), "依完工資訊確認");
});

test("verificationLabel maps known values and falls back", () => {
  assert.equal(verificationLabel("token_only"), "保固連結");
  assert.equal(verificationLabel("unknown"), "保固狀態");
});

test("fetchWarrantyStatus posts id_token and returns data", async () => {
  let captured;
  const data = { leads: [], pending_claims: 0 };
  const fetchImpl = async (url, request) => {
    captured = { url, request };
    return {
      ok: true,
      json: async () => ({ success: true, data }),
    };
  };

  const result = await fetchWarrantyStatus(
    { idToken: "id-token", endpoint: "/api/warranty/liff/status?env=staging" },
    fetchImpl,
  );

  assert.deepEqual(result, data);
  assert.equal(captured.url, "/api/warranty/liff/status?env=staging");
  assert.deepEqual(JSON.parse(captured.request.body), { id_token: "id-token" });
});

test("status errors map INVALID_ID_TOKEN separately from generic failures", async () => {
  assert.equal(statusErrorMessageForCode("INVALID_ID_TOKEN"), "LINE 登入已過期，請重新開啟此頁");
  assert.equal(statusErrorMessageForCode("RATE_LIMITED"), "目前無法取得資料，請稍後再試");

  await assert.rejects(
    fetchWarrantyStatus(
      { idToken: "id-token" },
      async () => ({
        ok: false,
        json: async () => ({ success: false, error: { code: "INVALID_ID_TOKEN" } }),
      }),
    ),
    /LINE 登入已過期，請重新開啟此頁/,
  );
});
