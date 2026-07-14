"use client";

import { FormEvent, useState } from "react";

// TODO: Replace with the official Saiens LINE OA URL when provided.
const LINE_OA_URL = "https://lin.ee/PLACEHOLDER";

type RegistrationFormProps = {
  token: string;
  address: string;
  warrantyYears: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  isDesignerProxy: boolean;
  proxyName: string;
};

const initialFormState: FormState = {
  name: "",
  phone: "",
  email: "",
  isDesignerProxy: false,
  proxyName: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegistrationForm({
  token,
  address,
  warrantyYears,
}: RegistrationFormProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "complete" | "already_registered">("idle");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const proxyName = form.proxyName.trim();

    if (!name || !phone || !email) {
      setError("請填寫姓名、電話與 Email。");
      return;
    }

    if (!isValidEmail(email)) {
      setError("請填寫有效的 Email。");
      return;
    }

    if (form.isDesignerProxy && !proxyName) {
      setError("請填寫代填人姓名。");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/warranty/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          name,
          phone,
          email,
          registered_by: form.isDesignerProxy ? "designer_proxy" : "owner",
          ...(form.isDesignerProxy ? { proxy_name: proxyName } : {}),
        }),
      });

      if (response.ok) {
        setStatus("complete");
        return;
      }

      if (response.status === 409) {
        setStatus("already_registered");
        return;
      }

      setError("送出時發生問題，請稍後再試。");
    } catch {
      setError("目前無法送出，請確認網路連線後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "complete") {
    return (
      <div className="flex flex-col gap-6 border-y border-(--accent) py-10">
        <h2 className="text-2xl tracking-tight">保固註冊已完成</h2>
        <p className="leading-relaxed text-(--dark-accent)">
          感謝您完成 Saiens 保固註冊。後續保固與客服通知，建議加入 Saiens 客服 LINE。
        </p>
        <a
          href={LINE_OA_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center bg-(--black) px-8 py-3 text-sm uppercase tracking-wide text-(--white) transition hover:bg-(--dark-accent) sm:w-fit"
        >
          加入 Saiens 客服 LINE
        </a>
      </div>
    );
  }

  if (status === "already_registered") {
    return (
      <div className="flex flex-col gap-4 border-y border-(--accent) py-10">
        <h2 className="text-2xl tracking-tight">此案件已完成登記</h2>
        <p className="text-sm text-(--dark-accent)">
          如需查詢保固資訊，請聯繫
          <a className="underline underline-offset-4" href="mailto:service@saiens.tw">
            service@saiens.tw
          </a>
          。
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 border border-(--accent) px-4 py-5">
        <p className="text-sm text-(--dark-accent)">保固案場</p>
        <p className="text-lg leading-relaxed text-(--black)">{address}</p>
        <p className="text-sm text-(--dark-accent)">保固年限：{warrantyYears} 年</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="warranty-name" className="text-sm text-(--dark-accent)">
          姓名 <span aria-hidden="true">*</span>
        </label>
        <input
          id="warranty-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="warranty-phone" className="text-sm text-(--dark-accent)">
          電話 <span aria-hidden="true">*</span>
        </label>
        <input
          id="warranty-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="warranty-email" className="text-sm text-(--dark-accent)">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="warranty-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60"
          required
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-(--dark-accent)">
        <input
          type="checkbox"
          checked={form.isDesignerProxy}
          onChange={(event) => updateField("isDesignerProxy", event.target.checked)}
          className="mt-1 h-4 w-4 accent-(--black)"
        />
        <span>我是設計師，代業主填寫</span>
      </label>

      {form.isDesignerProxy ? (
        <div className="flex flex-col gap-2">
          <label htmlFor="warranty-proxy-name" className="text-sm text-(--dark-accent)">
            代填人姓名 <span aria-hidden="true">*</span>
          </label>
          <input
            id="warranty-proxy-name"
            name="proxy-name"
            type="text"
            autoComplete="name"
            value={form.proxyName}
            onChange={(event) => updateField("proxyName", event.target.value)}
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60"
            required={form.isDesignerProxy}
          />
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full bg-(--black) px-8 py-3 text-sm uppercase tracking-wide text-(--white) transition hover:bg-(--dark-accent) disabled:cursor-not-allowed disabled:bg-(--black)/40"
      >
        {isSubmitting ? "送出中" : "確認送出"}
      </button>
    </form>
  );
}
