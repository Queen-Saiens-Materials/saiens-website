import type { Metadata } from "next";
import { verifyWarrantyToken } from "@/lib/warranty/api";
import WarrantyFlow from "./WarrantyFlow";
import "./warranty.css";

export const metadata: Metadata = {
  title: "保固登記 | Saiens",
  description: "完成 Saiens 保固登記，為您的檯面留下一份長期的承諾。",
  openGraph: {
    title: "保固登記 | Saiens",
    description: "完成 Saiens 保固登記，為您的檯面留下一份長期的承諾。",
    images: ["https://saiens.group/images/ed15e8a4-399b-4432-9039-08d1fb33feb0/Copy+of+_2-MQL422.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

type WarrantyRegisterPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const LINE_OA_URL = "https://lin.ee/poXsa4y";

// 本機視覺檢查用：`?token=preview` 不打 Odoo。production build 一律走真實驗證。
const PREVIEW_ENABLED = process.env.NODE_ENV !== "production";
const PREVIEW_ADDRESS = "台北市南港區松河街 616 號 1 樓";

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function StatusPage({ title, message }: { title: string; message: string }) {
  return (
    <main className="wr flex flex-1 flex-col">
      <section className="status" aria-labelledby="t-status">
        <p className="eyebrow">Warranty Registration</p>
        <h1 id="t-status">{title}</h1>
        <p>{message}</p>
        <div className="actions">
          <a className="btn btn-primary" href={LINE_OA_URL} target="_blank" rel="noreferrer">
            聯繫 Saiens 客服 LINE
          </a>
          <a className="link" href="mailto:service@saiens.tw">
            service@saiens.tw
          </a>
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
        title="這個保固連結已失效。"
        message="連結可能已過期或不完整。請聯繫您的設計師或 Saiens 業務，我們會重新寄一份給您。"
      />
    );
  }

  if (PREVIEW_ENABLED && token === "preview") {
    const state = getSingleParam(params.state);
    return (
      <main className="flex flex-1 flex-col">
        <WarrantyFlow
          token={token}
          address={PREVIEW_ADDRESS}
          warrantyYears={getSingleParam(params.years) ?? "25"}
          initialStatus={state === "done" ? "done" : "idle"}
        />
      </main>
    );
  }

  const verification = await verifyWarrantyToken(token);

  if (verification.status === 200 && "status" in verification.data) {
    if (verification.data.status === "already_registered") {
      return (
        <main className="flex flex-1 flex-col">
          <WarrantyFlow token={token} address="" warrantyYears="" initialStatus="already_registered" />
        </main>
      );
    }

    if (verification.data.status === "valid") {
      return (
        <main className="flex flex-1 flex-col">
          <WarrantyFlow
            token={token}
            address={verification.data.address}
            warrantyYears={verification.data.warranty_years}
          />
        </main>
      );
    }
  }

  return (
    <StatusPage
      title="這個保固連結已失效。"
      message="連結可能已過期或不完整。請聯繫您的設計師或 Saiens 業務，我們會重新寄一份給您。"
    />
  );
}
