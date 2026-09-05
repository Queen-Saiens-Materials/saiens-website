"use client";

import { FormEvent, useEffect, useState } from "react";
import Reveal from "./Reveal";

const LINE_OA_URL = "https://lin.ee/poXsa4y";
// 完成頁只有在 Odoo 端 LIFF 端點正式上線（NEXT_PUBLIC_LIFF_LIVE=1）後才深連結到 LIFF
const LIFF_ID =
  process.env.NEXT_PUBLIC_LIFF_LIVE === "1" ? process.env.NEXT_PUBLIC_LIFF_ID?.trim() : undefined;
const HERO_IMAGE = "/images/1757040221622-KLLGGX2BVD9TC5ZIJ3JV/IMG_6957.JPG";

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

function formatToday() {
  return new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(),
  );
}

/* 保固範圍：參考 Cosentino Silestone 標準保固書（Rev. 01-05/2022）轉譯，
   對齊山恩既有品質保證條款（/guarantees-and-warranties）。 */
const COVERED = [
  { t: "材料本身的製造缺陷", s: "出廠品管未能發現的材料病變，或正常家用下非外力造成的損傷。" },
  { t: "室內平面應用", s: "永久安裝於住宅室內的檯面、牆面與立面。" },
  { t: "加工與安裝工藝", s: "山恩自行加工、自行安裝，加工保固自施工完成日起一年。" },
  { t: "同色同厚度修復或更換", s: "以相同花色與厚度處理；花色停產時，以當時最接近的產品替代。" },
];

const NOT_COVERED = [
  { t: "戶外或商業空間使用", s: "陽光直射、船舶、營業場所等非住宅室內環境。" },
  { t: "安裝後的裂痕與缺角", s: "多因熱源直接接觸、重壓、撞擊或邊角刮碰造成，非材料缺陷。" },
  { t: "使用造成的變化", s: "未依保養指南清潔、接觸強酸強鹼、寵物抓痕，以及歲月帶來的自然色差與光澤變化。" },
  { t: "非山恩施作的部分", s: "第三方改裝、切割或搬移；未付清款項或轉售的商品。" },
];

const SERIES = [
  { name: "Mikado Quartz 帝雉石", years: "25 年" },
  { name: "QJ Quartz Stone 闊石", years: "15 年" },
  { name: "ETERNOS 永恆石", years: "15 年" },
  { name: "加工與安裝工藝", years: "1 年" },
];

const CLAIM_STEPS = [
  { t: "告訴我們", s: "透過客服 LINE 傳來異常處的照片或影片，我們依登記資料核對案場與購買資訊。" },
  { t: "線上檢傷", s: "原廠技師先線上判讀，評估屬於保固範圍或需付費維修，並說明處理方式。" },
  { t: "到府處理", s: "原廠技師到府維修或更換。保固範圍內免費；範圍外先報價，您同意後再進行。" },
];

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
    return <Certificate token={token} address={address} warrantyYears={warrantyYears} />;
  }

  if (status === "already_registered") {
    return (
      <div className="wr">
        <section className="status" aria-labelledby="t-already">
          <p className="eyebrow">Warranty Registration</p>
          <h1 id="t-already">這個案場的保固已完成登記。</h1>
          <p>無需重複填寫。若要查詢保固內容或安排維修，加入 Saiens 客服 LINE 是最快的方式。</p>
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
        <p className="hero-eyebrow" data-stage="1">
          Saiens Warranty · 保固登記
        </p>
        <h1 className="hero-title" data-stage="2">
          我們對每一片板材負責。
        </h1>
        <p className="hero-sub" data-stage="3">
          登記這個案場，讓 <span className="addr">{address}</span> 的檯面，
          <br />
          在往後的每一天都有原廠照顧。
        </p>
        <div className="hero-cta-row" data-stage="4">
          <a className="btn btn-primary" href="#register">
            完成登記
          </a>
          <p className="hero-hint">約 1 分鐘 · 三個欄位</p>
        </div>
        <figure className="hero-media" data-stage="4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMAGE} alt="山恩展間中的石英石中島檯面" width={2048} height={1365} fetchPriority="high" />
        </figure>
      </section>

      <p className="trust" data-reveal>
        <span>NSF・SGS 硬度與吸水率測試</span>
        <span>原廠加工、原廠安裝</span>
        <span>原廠技師到府維修</span>
        <span>台灣本島服務</span>
      </p>

      {/* 2. Why trust: facts */}
      <section className="section" aria-labelledby="t-why">
        <p className="eyebrow" data-reveal>
          Why It Holds
        </p>
        <h2 id="t-why" data-reveal data-stagger="1">
          保固能兌現，
          <br />
          因為從板材到安裝都是我們。
        </h2>
        <p className="lede" data-reveal data-stagger="2">
          多數石材品牌只保材料，加工與安裝交給第三方，出問題時各說各話。山恩自己選板、自己加工、自己安裝，
          所以我們能為整片檯面負責，而不只是其中一段。
        </p>
        <div className="trio">
          <div className="trio-item" data-reveal data-stagger="1">
            <p className="k">Material</p>
            <p className="v">通過檢測</p>
            <p className="d">每個系列皆有 NSF、SGS 硬度與吸水率報告，符合一般家庭日常使用標準。</p>
          </div>
          <div className="trio-item" data-reveal data-stagger="2">
            <p className="k">Craft</p>
            <p className="v">一條龍</p>
            <p className="d">丈量、加工、安裝由同一個團隊完成，保固涵蓋材料與工藝。</p>
          </div>
          <div className="trio-item" data-reveal data-stagger="3">
            <p className="k">Service</p>
            <p className="v">原廠技師</p>
            <p className="d">維修不外包。線上檢傷後由原廠技師到府處理。</p>
          </div>
        </div>
      </section>

      {/* 3. Coverage */}
      <div className="alt">
        <section className="section" aria-labelledby="t-cover">
          <p className="eyebrow" data-reveal>
            What We Stand Behind
          </p>
          <h2 id="t-cover" data-reveal data-stagger="1">
            我們負責的，
            <br />
            與需要您留意的。
          </h2>
          <div className="cols">
            <div data-reveal data-stagger="1">
              <p className="col-h">保固涵蓋</p>
              <ul className="list">
                {COVERED.map((item) => (
                  <li key={item.t}>
                    <p className="t">{item.t}</p>
                    <p className="s">{item.s}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal data-stagger="2">
              <p className="col-h">不在保固範圍</p>
              <ul className="list">
                {NOT_COVERED.map((item) => (
                  <li key={item.t}>
                    <p className="t">{item.t}</p>
                    <p className="s">{item.s}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="lede small" data-reveal data-stagger="2">
            完整條款見{" "}
            <a href="/guarantees-and-warranties" target="_blank" rel="noreferrer">
              品質保證說明
            </a>
            。保固內容參考國際石英石品牌的標準保固書，並依台灣住宅使用情境調整。
          </p>
        </section>
      </div>

      {/* 4. Series & term */}
      <section className="section" aria-labelledby="t-series">
        <p className="eyebrow" data-reveal>
          Terms by Series
        </p>
        <h2 id="t-series" data-reveal data-stagger="1">
          保固年限，依系列而定。
        </h2>
        <p className="lede" data-reveal data-stagger="2">
          材料保固自安裝完工日起計算。年限是我們對材料耐久度的承諾，不是保固的全部；
          真正重要的是有問題時，有人負責到底。
        </p>
        <div className="series" data-reveal data-stagger="2">
          {SERIES.map((row) => (
            <div className="series-row" key={row.name}>
              <span className="n">{row.name}</span>
              <span className="y">{row.years}</span>
            </div>
          ))}
        </div>
        {warrantyYears ? (
          <p className="case-note" data-reveal data-stagger="3">
            本案場適用 {warrantyYears} 年材料保固。
          </p>
        ) : (
          <p className="case-note" data-reveal data-stagger="3">
            本案場適用年限將依完工資訊確認後通知您。
          </p>
        )}
      </section>

      {/* 5. Claim steps */}
      <div className="alt">
        <section className="section" aria-labelledby="t-claim">
          <p className="eyebrow" data-reveal>
            When Something Happens
          </p>
          <h2 id="t-claim" data-reveal data-stagger="1">
            有狀況時，三步。
          </h2>
          <div className="rules">
            {CLAIM_STEPS.map((step, i) => (
              <div className="rule" data-reveal data-stagger={i + 1} key={step.t}>
                <span className="no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="t">{step.t}</p>
                  <p className="s">{step.s}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. Form */}
      <section className="section" id="register" aria-labelledby="t-register">
        <p className="eyebrow" data-reveal>
          Register
        </p>
        <h2 id="t-register" data-reveal data-stagger="1">
          留下您的聯絡方式
        </h2>
        <p className="lede" data-reveal data-stagger="2">
          三個欄位，約一分鐘。資料只用於本案場的保固服務與通知，不作其他用途。
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

function Certificate({ token, address, warrantyYears }: { token: string; address: string; warrantyYears: string }) {
  const lineHref = LIFF_ID
    ? `https://liff.line.me/${encodeURIComponent(LIFF_ID)}?token=${encodeURIComponent(token)}`
    : LINE_OA_URL;

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
          這個家的檯面，由山恩負責。
        </h1>
        <div className="cert-meta" data-reveal data-stagger="2">
          <p className="addr">{address}</p>
          <p>
            {warrantyYears ? `材料保固 ${warrantyYears} 年，自安裝完工日起計算。` : "材料保固年限將依完工資訊確認後通知您。"}
            確認信已寄至您留下的 Email。
          </p>
        </div>
      </section>

      <div className="alt">
        <section className="next" aria-labelledby="t-next">
          <p className="eyebrow" data-reveal>
            What&apos;s Next
          </p>
          <h2 id="t-next" className="next-h" data-reveal data-stagger="1">
            接下來，三件小事。
          </h2>
          <div className="steps">
            <div className="step" data-reveal data-stagger="1">
              <p className="no">01</p>
              <p className="t">加入客服 LINE</p>
              <p className="s">保固查詢、報修、保養提醒都在這裡。一對一，不需再找人轉達。</p>
              <a className="btn btn-primary" href={lineHref} target="_blank" rel="noreferrer">
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
      </div>

      <p className="fine">
        Saiens 山恩 · 保固服務地區限台灣本島 ·{" "}
        <a href="mailto:service@saiens.tw">service@saiens.tw</a> ·{" "}
        <a href="/guarantees-and-warranties">品質保證說明</a>
      </p>
    </div>
  );
}
