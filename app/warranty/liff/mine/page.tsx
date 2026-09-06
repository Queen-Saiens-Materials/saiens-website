import type { Metadata } from "next";
import MyWarrantyClient from "./MyWarrantyClient";
import { statusEndpoint } from "../warrantyStatus.js";
import "../../register/warranty.css";

export const metadata: Metadata = {
  title: "我的保固 | Saiens",
  description: "透過 Saiens 客服 LINE 查看已綁定的保固資料。",
  robots: {
    index: false,
    follow: false,
  },
};

type MyWarrantyPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function DisabledPage() {
  return (
    <main className="wr flex flex-1 flex-col">
      <section className="status" aria-labelledby="t-liff-disabled">
        <p className="eyebrow">My Warranty</p>
        <h1 id="t-liff-disabled">此功能尚未啟用</h1>
        <p>LINE 我的保固正在設定中。若您需要保固服務，請先聯繫 Saiens 客服。</p>
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

export default async function MyWarrantyPage({ searchParams }: MyWarrantyPageProps) {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID?.trim();

  if (!liffId) return <DisabledPage />;

  const params = await searchParams;
  const endpoint = statusEndpoint(getSingleParam(params.env));

  return (
    <main className="flex flex-1 flex-col">
      <MyWarrantyClient liffId={liffId} endpoint={endpoint} />
    </main>
  );
}
