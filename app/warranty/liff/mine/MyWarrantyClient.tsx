"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { fetchWarrantyStatus, formatLeadCard, statusEndpoint, statusErrorMessageForCode } from "../warrantyStatus.js";
import { resolveEnv } from "../submitRegistration.js";

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

type Lead = {
  lead_id: number;
  address: string;
  warranty_years: string;
  completion_date: string;
  warranty_end_date: string;
  verification: "address_matched" | "manual_confirmed" | "token_only" | string;
  bound_at: string;
};

type StatusData = {
  leads: Lead[];
  pending_claims: number;
};

type Props = {
  liffId: string;
  endpoint: string;
};

export default function MyWarrantyClient({ liffId, endpoint }: Props) {
  const [idToken, setIdToken] = useState("");
  const [initError, setInitError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [data, setData] = useState<StatusData | null>(null);

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
        const LOGIN_FLAG = "wr-liff-mine-login-attempted";
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
        sessionStorage.removeItem("wr-liff-mine-login-attempted");
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

  useEffect(() => {
    if (!ready || data || isLoading || hasRequested) return;

    async function loadStatus() {
      setLoadError("");
      setHasRequested(true);
      setIsLoading(true);
      try {
        let storage: Storage | null = null;
        try {
          storage = window.sessionStorage;
        } catch {
          storage = null;
        }
        const env = resolveEnv(window.location.search, storage);
        const resolvedEndpoint = env ? statusEndpoint(env) : endpoint;
        const status = await fetchWarrantyStatus({ idToken, endpoint: resolvedEndpoint });
        setData({
          leads: Array.isArray(status?.leads) ? status.leads : [],
          pending_claims: Number.isFinite(status?.pending_claims) ? status.pending_claims : 0,
        });
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : statusErrorMessageForCode("UNKNOWN"));
      } finally {
        setIsLoading(false);
      }
    }

    loadStatus();
  }, [ready, idToken, endpoint, data, isLoading, hasRequested]);

  if (initError) {
    return (
      <div className="wr">
        <StatusShell title={initError} message="請從 Saiens 客服 LINE 重新開啟我的保固頁，讓我們確認您的 LINE 帳號。" />
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
      <section className="section mine" aria-labelledby="t-my-warranty">
        <p className="eyebrow">My Warranty</p>
        <h1 id="t-my-warranty">我的保固</h1>
        {isInitializing || isLoading ? <p className="lede">正在連線 LINE，讀取您的保固資料。</p> : null}
        {loadError ? (
          <p className="submit-err mine-error" role="alert">
            {loadError}
          </p>
        ) : null}
        {data ? <WarrantyStatus data={data} /> : null}
      </section>
      <MineFooter />
    </div>
  );
}

function WarrantyStatus({ data }: { data: StatusData }) {
  const pending = Math.max(0, data.pending_claims || 0);
  const leads = data.leads || [];

  if (leads.length === 0 && pending === 0) {
    return (
      <div className="mine-empty">
        <p>這個 LINE 帳號還沒有綁定保固。</p>
        <a className="btn btn-primary" href="/warranty/liff">
          登記保固
        </a>
      </div>
    );
  }

  return (
    <>
      {pending > 0 ? (
        <p className="mine-alert" role="status">
          有 {pending.toLocaleString("zh-TW")} 筆登記待我們確認，會在 LINE 回覆您。
        </p>
      ) : null}
      <div className="mine-list">
        {leads.map((lead) => {
          const card = formatLeadCard(lead);
          return (
            <article className="step mine-card" key={card.leadId ?? lead.address}>
              <p className="mine-address">{card.address}</p>
              <p className="mine-years">{card.warrantyText}</p>
              <p className="mine-period">{card.periodText}</p>
              <p className="mine-tag">{card.verificationText}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}

function StatusShell({ title, message }: { title: string; message: string }) {
  return (
    <>
      <section className="status" aria-labelledby="t-mine-error">
        <p className="eyebrow">My Warranty</p>
        <h1 id="t-mine-error">{title}</h1>
        <p>{message}</p>
        <div className="actions">
          <a className="btn btn-primary" href={LINE_OA_URL} target="_blank" rel="noreferrer">
            加入 Saiens LINE
          </a>
        </div>
      </section>
      <MineFooter />
    </>
  );
}

function MineFooter() {
  return (
    <>
      <div className="mine-actions">
        <a className="btn btn-primary" href={LINE_OA_URL} target="_blank" rel="noreferrer">
          有狀況，在 LINE 告訴我們
        </a>
        <a className="mine-link" href="/warranty/care">
          清潔使用指南
        </a>
      </div>
      <p className="fine">Saiens 山恩 · 保固服務地區限台灣本島 · service@saiens.tw</p>
    </>
  );
}
