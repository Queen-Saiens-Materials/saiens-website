import type { Metadata } from "next";
import { verifyWarrantyToken } from "@/lib/warranty/api";
import WarrantyFlow from "./WarrantyFlow";
import { LINE_OA_URL, getLiffRegisterUrl } from "@/lib/warranty/liff";
import "./warranty.css";

export const metadata: Metadata = {
  title: "保固登記 | Saiens",
  description: "完成 Saiens 保固登記，為您的檯面留下一份長期的承諾。",
  openGraph: {
    title: "保固登記 | Saiens",
    description: "完成 Saiens 保固登記，為您的檯面留下一份長期的承諾。",
    images: ["https://saiens.tw/images/ed15e8a4-399b-4432-9039-08d1fb33feb0/Copy+of+_2-MQL422.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

type WarrantyRegisterPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};


// 本機視覺檢查用：`?token=preview` 不打 Odoo。production build 一律走真實驗證。
const PREVIEW_ENABLED = process.env.NODE_ENV !== "production";
const PREVIEW_ADDRESS = "台北市南港區松河街 616 號 1 樓";

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function StatusPage({ title, message }: { title: string; message: string }) {
  const liffUrl = getLiffRegisterUrl();
  return (
    <main className="wr flex flex-1 flex-col">
      <section className="status" aria-labelledby="t-status">
        <p className="eyebrow">Warranty Registration</p>
        <h1 id="t-status">{title}</h1>
        <p>{message}</p>
        {liffUrl ? (
          <p>不需要重新索取連結：在 LINE 內輸入案場地址，我們會比對施工紀錄直接完成登記。</p>
        ) : null}
        <div className="actions">
          {liffUrl ? (
            <a className="btn btn-primary" href={liffUrl} target="_blank" rel="noreferrer">
              用 LINE 登記保固
            </a>
          ) : (
            <a className="btn btn-primary" href={LINE_OA_URL} target="_blank" rel="noreferrer">
              聯繫 Saiens 客服 LINE
            </a>
          )}
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
        message="連結可能已過期或不完整。"
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
      message="連結可能已過期或不完整。"
    />
  );
}
