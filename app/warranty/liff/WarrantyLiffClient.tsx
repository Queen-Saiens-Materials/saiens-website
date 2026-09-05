"use client";

import Script from "next/script";
import { FormEvent, useMemo, useState } from "react";
import { errorMessageForCode, submitRegistration } from "./submitRegistration.js";

const LINE_OA_URL = "https://lin.ee/poXsa4y";

type Liff = {
  init: (options: { liffId: string }) => Promise<void>;
  isLoggedIn: () => boolean;
  login: (options: { redirectUri: string }) => void;
  getIDToken: () => string | null;
};

declare global {
  interface Window {
    liff?: Liff;
  }
}

type Result =
  | { status: "bound"; address: string; warranty_years: string }
  | { status: "pending_review" }
  | { status: "no_match" };

type FormState = {
  address: string;
  name: string;
  phone: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type Props = {
  liffId: string;
  endpoint: string;
  token: string;
};

const EMPTY: FormState = {
  address: "",
  name: "",
  phone: "",
};

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.address.trim().length < 6) errors.address = "請填寫完整案場地址";
  if (!form.name.trim()) errors.name = "請填寫姓名";
  if (!form.phone.trim()) errors.phone = "請填寫電話";
  else if (form.phone.replace(/\D/g, "").length < 8) errors.phone = "電話號碼看起來不完整，請再確認一次";
  return errors;
}

export default function WarrantyLiffClient({ liffId, endpoint, token }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [idToken, setIdToken] = useState("");
  const [initError, setInitError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const ready = useMemo(() => Boolean(idToken) && !initError, [idToken, initError]);

  async function initLiff() {
    if (!window.liff) {
      setInitError("請在 LINE 內開啟");
      setIsInitializing(false);
      return;
    }

    try {
      await window.liff.init({ liffId });
      if (!window.liff.isLoggedIn()) {
        // 只嘗試登入一次，避免登入失敗或使用者取消授權時無限跳轉
        const LOGIN_FLAG = "wr-liff-login-attempted";
        let attempted = false;
        try {
          attempted = sessionStorage.getItem(LOGIN_FLAG) === "1";
          sessionStorage.setItem(LOGIN_FLAG, "1");
        } catch {
          attempted = false;
        }
        if (attempted) {
          setInitError("請在 LINE 內開啟");
          return;
        }
        window.liff.login({ redirectUri: window.location.href });
        return;
      }
      try {
        sessionStorage.removeItem("wr-liff-login-attempted");
      } catch {
        // ignore
      }
      const tokenValue = window.liff.getIDToken();
      if (!tokenValue) {
        setInitError("請在 LINE 內開啟");
        return;
      }
      setIdToken(tokenValue);
    } catch {
      setInitError("請在 LINE 內開啟");
    } finally {
      setIsInitializing(false);
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    if (!idToken) {
      setSubmitError(errorMessageForCode("INVALID_ID_TOKEN"));
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await submitRegistration({
        idToken,
        address: form.address.trim(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        token,
        endpoint,
      });
      setResult(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "送出時發生問題，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (result) return <RegistrationResult result={result} />;

  if (initError) {
    return (
      <div className="wr">
        <section className="status" aria-labelledby="t-liff-error">
          <p className="eyebrow">Saiens Warranty · 保固登記</p>
          <h1 id="t-liff-error">{initError}</h1>
          <p>請從 Saiens 客服 LINE 重新開啟保固登記頁，讓我們確認您的 LINE 帳號。</p>
          <div className="actions">
            <a className="btn btn-primary" href={LINE_OA_URL} target="_blank" rel="noreferrer">
              加入 Saiens LINE
            </a>
            <a className="link" href="mailto:service@saiens.tw">
              service@saiens.tw
            </a>
          </div>
        </section>
        <FinePrint />
      </div>
    );
  }

  return (
    <div className="wr">
      <Script
        src="https://static.line-scdn.net/liff/edge/2/sdk.js"
        strategy="afterInteractive"
        onLoad={initLiff}
        onError={() => {
          setInitError("請在 LINE 內開啟");
          setIsInitializing(false);
        }}
      />
      <section className="section liff-register" aria-labelledby="t-liff-register">
        <p className="eyebrow">Saiens Warranty · 保固登記</p>
        <h1 id="t-liff-register">請告訴我們您家的案場地址</h1>
        <p className="lede">我們會比對山恩的施工紀錄，完成後由山恩直接為您服務。</p>

        <form className="form-wrap" onSubmit={onSubmit} noValidate>
          <Field
            id="wr-liff-address"
            label="案場地址"
            required
            value={form.address}
            placeholder="台北市南港區松河街616號1樓"
            onChange={(value) => update("address", value)}
            error={errors.address}
            autoComplete="street-address"
          />
          <Field
            id="wr-liff-name"
            label="姓名"
            required
            value={form.name}
            onChange={(value) => update("name", value)}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            id="wr-liff-phone"
            label="電話"
            required
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(value) => update("phone", value)}
            error={errors.phone}
            autoComplete="tel"
          />

          <button type="submit" className="btn btn-primary btn-block" disabled={!ready || isInitializing || isSubmitting}>
            {isSubmitting ? "比對中" : "完成保固登記"}
          </button>
          {isInitializing ? <p className="form-note">正在連線 LINE。</p> : null}
          {submitError ? (
            <p className="submit-err" role="alert">
              {submitError}
            </p>
          ) : null}
        </form>
      </section>
      <FinePrint />
    </div>
  );
}

function RegistrationResult({ result }: { result: Result }) {
  if (result.status === "bound") {
    return (
      <div className="wr">
        <section className="cert" aria-labelledby="t-bound">
          <p className="cert-eyebrow">Registered</p>
          <h1 className="cert-title" id="t-bound">
            登記完成。
            <br />
            這個家的檯面，由山恩負責。
          </h1>
          <div className="cert-meta">
            <p className="addr">{result.address}</p>
            <p>
              {result.warranty_years
                ? `材料保固 ${result.warranty_years} 年，自安裝完工日起計算。`
                : "材料保固年限將依完工資訊確認後通知您。"}
            </p>
            <p>保固資訊與後續服務將由這個 LINE 帳號直接傳送給您。</p>
          </div>
        </section>
        <FinePrint />
      </div>
    );
  }

  if (result.status === "pending_review") {
    return (
      <StatusResult title="已收到您的登記。" message="地址需要再核對一次，我們會在一個工作日內透過 LINE 回覆您。" />
    );
  }

  return <StatusResult title="已收到您的資料。" message="目前找不到對應的施工紀錄，客服會透過 LINE 與您聯繫確認。" />;
}

function StatusResult({ title, message }: { title: string; message: string }) {
  return (
    <div className="wr">
      <section className="status" aria-labelledby="t-status-result">
        <p className="eyebrow">Saiens Warranty · 保固登記</p>
        <h1 id="t-status-result">{title}</h1>
        <p>{message}</p>
      </section>
      <FinePrint />
    </div>
  );
}

function Field({
  id,
  label,
  required,
  type = "text",
  inputMode,
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  inputMode?: "tel" | "text";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="field" htmlFor={id}>
      <span className="lbl">
        {label}
        {required ? <span className="req">＊</span> : null}
      </span>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error ? (
        <span className="err" id={`${id}-err`} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function FinePrint() {
  return <p className="fine">Saiens 山恩 · 保固服務地區限台灣本島 · service@saiens.tw</p>;
}
