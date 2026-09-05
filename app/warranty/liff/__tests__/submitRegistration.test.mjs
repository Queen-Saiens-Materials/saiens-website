import assert from "node:assert/strict";
import test from "node:test";
import { errorMessageForCode, submitRegistration } from "../submitRegistration.js";

function mockFetch(envelope, options = {}) {
  return async (url, request) => {
    return {
      ok: options.ok ?? true,
      status: options.status ?? 200,
      json: async () => envelope,
      request,
      url,
    };
  };
}

const payload = {
  idToken: "id-token",
  address: "台北市南港區松河街616號1樓",
  name: "陳小姐",
  phone: "0912345678",
  token: "warranty-token",
  odooApiUrl: "https://odoo.example.test/",
};

test("submitRegistration posts the LIFF registration payload and returns bound", async () => {
  let captured;
  const data = { status: "bound", address: payload.address, warranty_years: "25" };
  const fetchImpl = async (url, request) => {
    captured = { url, request };
    return {
      ok: true,
      json: async () => ({ success: true, data }),
    };
  };

  const result = await submitRegistration(payload, fetchImpl);

  assert.deepEqual(result, data);
  assert.equal(captured.url, "https://odoo.example.test/api/saiens/warranty/liff/register");
  assert.deepEqual(JSON.parse(captured.request.body), {
    id_token: "id-token",
    address: payload.address,
    name: "陳小姐",
    phone: "0912345678",
    token: "warranty-token",
  });
});

test("submitRegistration returns pending_review", async () => {
  const data = { status: "pending_review" };
  const result = await submitRegistration(payload, mockFetch({ success: true, data }));
  assert.deepEqual(result, data);
});

test("submitRegistration returns no_match", async () => {
  const data = { status: "no_match" };
  const result = await submitRegistration(payload, mockFetch({ success: true, data }));
  assert.deepEqual(result, data);
});

test("INVALID_ID_TOKEN maps to the LINE expired message", async () => {
  await assert.rejects(
    submitRegistration(
      payload,
      mockFetch(
        { success: false, error: { code: "INVALID_ID_TOKEN", message: "invalid" } },
        { ok: false, status: 401 },
      ),
    ),
    /LINE 登入已過期，請重新開啟此頁/,
  );
});

test("other API errors map to the generic submit error", async () => {
  assert.equal(errorMessageForCode("RATE_LIMITED"), "送出時發生問題，請稍後再試");
  await assert.rejects(
    submitRegistration(
      payload,
      mockFetch(
        { success: false, error: { code: "RATE_LIMITED", message: "slow down" } },
        { ok: false, status: 429 },
      ),
    ),
    /送出時發生問題，請稍後再試/,
  );
});
