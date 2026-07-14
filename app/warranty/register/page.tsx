import type { Metadata } from "next";
import { verifyWarrantyToken } from "@/lib/warranty/api";
import RegistrationForm from "./RegistrationForm";

export const metadata: Metadata = {
  title: "保固註冊 | Saiens",
  robots: {
    index: false,
    follow: false,
  },
};

type WarrantyRegisterPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function StatusPage({
  title,
  message,
  showServiceEmail = false,
}: {
  title: string;
  message: string;
  showServiceEmail?: boolean;
}) {
  return (
    <main className="flex flex-1 flex-col bg-(--white) text-(--black)">
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-24 md:py-32">
        <div className="flex flex-col gap-4 border-y border-(--accent) py-10">
          <p className="font-(family-name:--font-jost) text-sm uppercase tracking-[0.18em] text-(--dark-accent)">
            Warranty Registration
          </p>
          <h1 className="text-3xl tracking-tight md:text-4xl">{title}</h1>
          <p className="leading-relaxed text-(--dark-accent)">{message}</p>
          {showServiceEmail ? (
            <p className="text-sm text-(--dark-accent)">
              客服信箱：
              <a className="underline underline-offset-4" href="mailto:service@saiens.tw">
                service@saiens.tw
              </a>
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default async function WarrantyRegisterPage({ searchParams }: WarrantyRegisterPageProps) {
  const params = await searchParams;
  const token = getSingleParam(params.token)?.trim();

  if (!token) {
    return (
      <StatusPage
        title="保固註冊連結無效"
        message="連結無效或已過期，請聯繫您的設計師或 Saiens 業務重新取得連結"
      />
    );
  }

  const verification = await verifyWarrantyToken(token);

  if (verification.status === 200 && "status" in verification.data) {
    if (verification.data.status === "already_registered") {
      return (
        <StatusPage
          title="此案件保固已完成登記"
          message="如需查詢保固資訊，請聯繫 Saiens 客服。"
          showServiceEmail
        />
      );
    }

    if (verification.data.status === "valid") {
      return (
        <main className="flex flex-1 flex-col bg-(--white) text-(--black)">
          <section className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-16 md:py-24">
            <div className="flex flex-col gap-3">
              <p className="font-(family-name:--font-jost) text-sm uppercase tracking-[0.18em] text-(--dark-accent)">
                Warranty Registration
              </p>
              <h1 className="text-3xl tracking-tight md:text-4xl">保固註冊</h1>
              <p className="leading-relaxed text-(--dark-accent)">
                請確認保固案場資訊，並填寫業主聯絡資料完成登記。
              </p>
            </div>
            <RegistrationForm
              token={token}
              address={verification.data.address}
              warrantyYears={verification.data.warranty_years}
            />
          </section>
        </main>
      );
    }
  }

  return (
    <StatusPage
      title="保固註冊連結無效"
      message="連結無效或已過期，請聯繫您的設計師或 Saiens 業務重新取得連結"
    />
  );
}
