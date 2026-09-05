"use client";

import { FormEvent, useEffect, useState } from "react";
import Reveal from "./Reveal";

const LINE_OA_URL = "https://lin.ee/poXsa4y";
const HERO_IMAGE = "/images/ed15e8a4-399b-4432-9039-08d1fb33feb0/Copy+of+_2-MQL422.jpg";

type Props = {
  token: string;
  address: string;
  warrantyYears: string;
  /** dev-only: render the completed state directly for visual QA */
  initialStatus?: Status;
};

type Status = "idle" | "submitting" | "done" | "already_registered";

type FormState = {
  name: string;
  phone: string;
  email: string;
  isDesignerProxy: boolean;
  proxyName: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  isDesignerProxy: false,
  proxyName: "",
};

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "請填寫姓名";
  if (!form.phone.trim()) errors.phone = "請填寫電話";
  else if (form.phone.replace(/\D/g, "").length < 8) errors.phone = "電話號碼看起來不完整，請再確認一次";
  if (!form.email.trim()) errors.email = "請填寫 Email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Email 格式看起來不對，請再確認一次";
  if (form.isDesignerProxy && !form.proxyName.trim()) errors.proxyName = "請填寫代填人姓名";
  return errors;
}

function yearsLabel(years: string) {
  return years ? `${years} 年` : "依完工資訊確認";
}

function formatToday() {
  return new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(),
  );
}

export default function WarrantyFlow({ token, address, warrantyYears, initialStatus = "idle" }: Props) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (status === "done" || status === "already_registered") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [status]);

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

    setStatus("submitting");
    try {
      const response = await fetch("/api/warranty/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          registered_by: form.isDesignerProxy ? "designer_proxy" : "owner",
          ...(form.isDesignerProxy ? { proxy_name: form.proxyName.trim() } : {}),
        }),
      });
      if (response.ok) {
        setStatus("done");
        return;
      }
      if (response.status === 409) {
        setStatus("already_registered");
        return;
      }
      setSubmitError("送出時發生問題，請稍後再試。");
      setStatus("idle");
    } catch {
      setSubmitError("目前無法送出，請確認網路連線後再試。");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return <Certificate address={address} warrantyYears={warrantyYears} />;
  }

  if (status === "already_registered") {
    return (
      <div className="wr">
        <section className="status" aria-labelledby="t-already">
          <p className="eyebrow">Warranty Registration</p>
          <h1 id="t-already">這個案場的保固已完成登記。</h1>
          <p>
            無需重複填寫。若要查詢保固內容或安排維修，加入 Saiens 客服 LINE 是最快的方式。
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={LINE_OA_URL} target="_blank" rel="noreferrer">
              加入 Saiens 客服 LINE
            </a>
            <a className="link" href="mailto:service@saiens.tw">
              service@saiens.tw
            </a>
          </div>
        </section>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <div className="wr">
      <Reveal />

      {/* 1. Hero */}
      <section className="hero" id="hero" aria-label="Saiens 保固登記">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-bg" src={HERO_IMAGE} alt="" width={2000} height={1333} fetchPriority="high" />
        <div className="hero-scrim" aria-hidden="true" />
        <p className="hero-eyebrow" data-stage="1">
          Saiens Warranty · 保固登記
        </p>
        <h1 className="hero-title">
          {warrantyYears ? (
            <>
              <span className="num" data-stage="2">
                {warrantyYears}
              </span>
              <span className="outline" data-stage="3">
                YEARS
              </span>
            </>
          ) : (
            <>
              <span className="num" data-stage="2">
                SAIENS
              </span>
              <span className="outline" data-stage="3">
                WARRANTY
              </span>
            </>
          )}
        </h1>
        <p className="hero-sub" data-stage="4">
          {warrantyYears ? `為您的檯面，留下一份 ${warrantyYears} 年的承諾。` : "為您的檯面，留下一份長期的承諾。"}
          <br />
          <span className="addr">{address}</span>
        </p>
        <div className="hero-cta-row" data-stage="4">
          <a className="btn btn-primary" href="#register">
            完成登記
          </a>
          <p className="hero-hint">約 1 分鐘 · 三個欄位</p>
        </div>
      </section>

      {/* 2. Spec trio */}
      <section className="section" aria-labelledby="t-spec">
        <p className="eyebrow" data-reveal>
          Your Warranty
        </p>
        <h2 id="t-spec" data-reveal data-stagger="1">
          這份保固，屬於這個家。
        </h2>
        <div className="trio">
          <div className="trio-item" data-reveal data-stagger="1">
            <p className="k">Coverage</p>
            <p className="v">{yearsLabel(warrantyYears)}</p>
            <p className="d">材料保固，自安裝完工日起計算</p>
          </div>
          <div className="trio-item" data-reveal data-stagger="2">
            <p className="k">Site</p>
            <p className="v">保固案場</p>
            <p className="d">{address}</p>
          </div>
          <div className="trio-item" data-reveal data-stagger="3">
            <p className="k">Service</p>
            <p className="v">原廠維修</p>
            <p className="d">非外力破壞之材料損傷，保固期內免費維修</p>
          </div>
        </div>
      </section>

      {/* 3. What it means */}
      <section className="section" aria-labelledby="t-rules">
        <p className="eyebrow" data-reveal>
          The Promise
        </p>
        <h2 id="t-rules" data-reveal data-stagger="1">
          登記之後，
          <br />
          我們為您守住三件事。
        </h2>
        <div className="rules">
          <div className="rule" data-reveal data-stagger="1">
            <span className="no">01</span>
            <div>
              <p className="t">材料本身的保固</p>
              <p className="s">正常家用下，檯面破裂、刮傷等非外力造成的材料損傷，由原廠免費維修。</p>
            </div>
          </div>
          <div className="rule" data-reveal data-stagger="2">
            <span className="no">02</span>
            <div>
              <p className="t">安裝工藝的保固</p>
              <p className="s">石材安裝提供專業施工的加工保固，自施工完成日起一年內有效。</p>
            </div>
          </div>
          <div className="rule" data-reveal data-stagger="3">
            <span className="no">03</span>
            <div>
              <p className="t">保養與客服的陪伴</p>
              <p className="s">
                依保養指南定期清潔即可維持保固效力。任何問題，Saiens 客服 LINE 直接為您安排。
              </p>
            </div>
          </div>
        </div>
        <p className="lede" data-reveal data-stagger="2" style={{ fontSize: 15 }}>
          完整條款與不適用情形，見{" "}
          <a href="/guarantees-and-warranties" target="_blank" rel="noreferrer">
            品質保證說明
          </a>
          。
        </p>
      </section>

      {/* 4. Form */}
      <section className="section" id="register" aria-labelledby="t-register">
        <p className="eyebrow" data-reveal>
          Register
        </p>
        <h2 id="t-register" data-reveal data-stagger="1">
          留下您的聯絡方式
        </h2>
        <p className="lede" data-reveal data-stagger="2">
          三個欄位，約一分鐘。資料僅用於本案場的保固服務與通知。
        </p>

        <form className="form-wrap" onSubmit={onSubmit} noValidate>
          <Field
            id="wr-name"
            label="姓名"
            required
            value={form.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            id="wr-phone"
            label="電話"
            required
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(v) => update("phone", v)}
            error={errors.phone}
            autoComplete="tel"
          />
          <Field
            id="wr-email"
            label="Email"
            required
            type="email"
            inputMode="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            autoComplete="email"
          />

          <label className={`toggle${form.isDesignerProxy ? " on" : ""}`}>
            <input
              type="checkbox"
              checked={form.isDesignerProxy}
              onChange={(e) => update("isDesignerProxy", e.target.checked)}
            />
            <span className="d8">我是設計師，代業主填寫</span>
            <span className="tag">{form.isDesignerProxy ? "代填" : "選填"}</span>
          </label>

          {form.isDesignerProxy ? (
            <Field
              id="wr-proxy"
              label="代填人姓名"
              required
              value={form.proxyName}
              onChange={(v) => update("proxyName", v)}
              error={errors.proxyName}
              autoComplete="name"
            />
          ) : null}

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "送出中" : "完成保固登記"}
          </button>
          {submitError ? (
            <p className="submit-err" role="alert">
              {submitError}
            </p>
          ) : null}
          <p className="form-note">送出後即刻生效。您會收到一封確認信，並可加入客服 LINE 取得後續服務。</p>
        </form>
      </section>

      <p className="fine">
        Saiens 山恩 · 保固服務地區限台灣本島 ·{" "}
        <a href="mailto:service@saiens.tw">service@saiens.tw</a>
      </p>
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
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  inputMode?: "tel" | "email" | "text";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
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
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
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

function Certificate({ address, warrantyYears }: { address: string; warrantyYears: string }) {
  return (
    <div className="wr">
      <Reveal />
      <section className="cert" aria-labelledby="t-cert">
        <p className="cert-eyebrow" data-reveal>
          Registered · {formatToday()}
        </p>
        <h1 className="cert-title" id="t-cert" data-reveal data-stagger="1">
          登記完成。
          <br />
          這個家，交給我們守護。
        </h1>
        <p className="cert-years" data-reveal data-stagger="2" aria-label={`保固年限 ${yearsLabel(warrantyYears)}`}>
          {warrantyYears || "—"}
          <small>{warrantyYears ? "Years Warranty" : "年限依完工資訊確認後通知"}</small>
        </p>
        <div className="cert-meta" data-reveal data-stagger="3">
          <p className="addr">{address}</p>
          <p>材料保固自安裝完工日起計算。確認信已寄至您留下的 Email。</p>
        </div>
      </section>

      <section className="next" aria-labelledby="t-next">
        <p className="eyebrow" data-reveal>
          What&apos;s Next
        </p>
        <h2
          id="t-next"
          data-reveal
          data-stagger="1"
          style={{
            fontSize: "clamp(34px, 6vw, 56px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          接下來，三件小事。
        </h2>
        <div className="steps">
          <div className="step" data-reveal data-stagger="1">
            <p className="no">01</p>
            <p className="t">加入客服 LINE</p>
            <p className="s">保固查詢、報修、保養提醒都在這裡。一對一，不需再找人轉達。</p>
            <a className="btn btn-primary" href={LINE_OA_URL} target="_blank" rel="noreferrer">
              加入 Saiens LINE
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="qr" src="/line-oa-qr.png" alt="Saiens 客服 LINE QR code" width={120} height={120} loading="lazy" />
          </div>
          <div className="step" data-reveal data-stagger="2">
            <p className="no">02</p>
            <p className="t">讀一遍保養指南</p>
            <p className="s">五分鐘了解石英石的日常清潔、什麼該避開。保養得當，保固才持續有效。</p>
            <a className="btn btn-ghost" href="/maintenance-manual">
              保養指南
            </a>
          </div>
          <div className="step" data-reveal data-stagger="3">
            <p className="no">03</p>
            <p className="t">把 Saiens 介紹給朋友</p>
            <p className="s">若您滿意這次的檯面，歡迎將 Saiens 分享給正在裝修的朋友。</p>
            <a className="btn btn-ghost" href="/visit-us">
              預約展間參觀
            </a>
          </div>
        </div>
      </section>

      <p className="fine">
        Saiens 山恩 · 保固服務地區限台灣本島 ·{" "}
        <a href="mailto:service@saiens.tw">service@saiens.tw</a> ·{" "}
        <a href="/guarantees-and-warranties">品質保證說明</a>
      </p>
    </div>
  );
}
