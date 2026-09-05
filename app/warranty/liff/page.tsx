import type { Metadata } from "next";
import WarrantyLiffClient from "./WarrantyLiffClient";
import "../register/warranty.css";

export const metadata: Metadata = {
  title: "LINE 保固登記 | Saiens",
  description: "透過 Saiens 客服 LINE 完成保固登記。",
  openGraph: {
    title: "LINE 保固登記 | Saiens",
    description: "透過 Saiens 客服 LINE 完成保固登記。",
    images: ["https://saiens.group/images/1757040221622-KLLGGX2BVD9TC5ZIJ3JV/IMG_6957.JPG"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

type WarrantyLiffPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function DisabledPage() {
  return (
    <main className="wr flex flex-1 flex-col">
      <section className="status" aria-labelledby="t-liff-disabled">
        <p className="eyebrow">Saiens Warranty · 保固登記</p>
        <h1 id="t-liff-disabled">此功能尚未啟用</h1>
        <p>LINE 保固登記正在設定中。若您需要保固服務，請先聯繫 Saiens 客服。</p>
        <div className="actions">
          <a className="btn btn-primary" href="https://lin.ee/poXsa4y" target="_blank" rel="noreferrer">
            加入 Saiens LINE
          </a>
          <a className="link" href="mailto:service@saiens.tw">
            service@saiens.tw
          </a>
        </div>
      </section>
      <p className="fine">Saiens 山恩 · 保固服務地區限台灣本島 · service@saiens.tw</p>
    </main>
  );
}

export default async function WarrantyLiffPage({ searchParams }: WarrantyLiffPageProps) {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID?.trim();
  const odooApiUrl = process.env.NEXT_PUBLIC_ODOO_API_URL?.trim() || "https://quote.saiens.tw";

  if (!liffId) return <DisabledPage />;

  const params = await searchParams;
  const token = getSingleParam(params.token)?.trim() || "";

  return (
    <main className="flex flex-1 flex-col">
      <WarrantyLiffClient liffId={liffId} odooApiUrl={odooApiUrl} token={token} />
    </main>
  );
}
