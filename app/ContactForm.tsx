"use client";

import { FormEvent, ReactNode, useState } from "react";

type ContactFormProps = {
  formId: string;
  children: ReactNode;
  className: string;
  buttonClassName: string;
  buttonLabel?: string;
  fallbackEmail?: string;
};

const SUCCESS_MESSAGE = "已收到您的訊息，我們會盡快與您聯繫";
const ERROR_MESSAGE = "送出時發生問題，請稍後再試。";

export default function ContactForm({
  formId,
  children,
  className,
  buttonClassName,
  buttonLabel = "Submit",
  fallbackEmail,
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, string | string[]> = { form: formId };

    formData.forEach((value, key) => {
      if (typeof value !== "string") {
        return;
      }

      const normalized = value.trim();
      if (!normalized) {
        return;
      }

      const current = payload[key];
      if (Array.isArray(current)) {
        current.push(normalized);
      } else if (typeof current === "string") {
        payload[key] = [current, normalized];
      } else {
        payload[key] = normalized;
      }
    });

    if (!payload.email && fallbackEmail) {
      payload.email = fallbackEmail;
    }

    if (!payload.name && typeof payload["full-name"] === "string") {
      payload.name = payload["full-name"];
    }

    if (!payload.name && typeof payload.fullName === "string") {
      payload.name = payload.fullName;
    }

    if (!payload.email && typeof payload.calendarEmail === "string") {
      payload.email = payload.calendarEmail;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      {children}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClassName}
      >
        {status === "submitting" ? "送出中" : buttonLabel}
      </button>
      {status === "success" ? (
        <p role="status" className="text-center text-sm text-(--accent)">
          {SUCCESS_MESSAGE}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-center text-sm text-red-300">
          {ERROR_MESSAGE}
        </p>
      ) : null}
    </form>
  );
}
