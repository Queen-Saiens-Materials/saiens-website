import type { Metadata } from "next";
import Reveal from "./register/Reveal";
import TrackedLink from "./TrackedLink";
import "./register/warranty.css";

import { LINE_OA_URL, getLiffMineUrl, getLiffRegisterUrl } from "@/lib/warranty/liff";

// Odoo 端 LIFF 未上線時退回客服 LINE，由客服協助登記
const LIFF_REGISTER_URL = getLiffRegisterUrl() ?? LINE_OA_URL;
const HERO_IMAGE = "/images/1757040221622-KLLGGX2BVD9TC5ZIJ3JV/IMG_6957.JPG";

const MEMORY = [
  {
    k: "Site",
    v: "案場與施工紀錄",
    d: "從丈量、加工到安裝完成，我們把這個家的服務線索留在系統裡。",
  },
  {
    k: "Series",
    v: "材料系列與年限",
    d: "不用翻合約、問設計師；山恩會記住這片檯面使用的系列與保固年限。",
  },
  {
    k: "Service",
    v: "每一次維修紀錄",
    d: "有任何處理、判讀與到府服務，都會接回同一份案場紀錄。",
  },
];

const CLAIM_STEPS = [
  { t: "LINE 傳照片", s: "檯面哪裡不對，直接拍照或錄影傳給山恩，不需要先找設計師轉達。" },
  { t: "原廠技師線上檢傷", s: "我們先核對保固登記與案場紀錄，再判斷原因與建議處理方式。" },
  { t: "安排到府處理", s: "需要維修時，由原廠技師到府；保固範圍內依條款修復或更換。" },
];

const COVERAGE = [
  { t: "材料製造缺陷", s: "正常住宅使用下，因材料本身造成的異常。" },
  { t: "住宅室內平面應用", s: "永久安裝於住宅室內的檯面、牆面與立面。" },
  { t: "加工與安裝工藝一年", s: "山恩自行加工、自行安裝的工藝，自施工完成日起一年。" },
  { t: "同色同厚度修復或更換", s: "以相同花色與厚度處理；停產時以當時最接近產品替代。" },
];

export const metadata: Metadata = {
  title: "Saiens 山恩保固服務 | 從安裝完成那天起，我們就在",
  description: "登記 Saiens 山恩保固、查看清潔使用指南，讓檯面從安裝完成那天起都有原廠服務接住。",
  openGraph: {
    title: "Saiens 山恩保固服務",
    description: "從安裝完成那天起，我們就在。登記保固，讓山恩記住案場、材料與每一次服務紀錄。",
    images: ["https://saiens.tw/images/1757040221622-KLLGGX2BVD9TC5ZIJ3JV/IMG_6957.JPG"],
  },
};

export default function WarrantyPage() {
  const myWarrantyUrl = getLiffMineUrl() ?? "";

  return (
    <main className="wr flex flex-1 flex-col">
      <Reveal />

      <section className="hero" aria-label="Saiens 山恩保固服務">
        <p className="hero-eyebrow" data-stage="1">
          Saiens Warranty
        </p>
        <h1 className="hero-title" data-stage="2">
          從安裝完成的那一天起，我們就在。
        </h1>
        <p className="hero-sub" data-stage="3">
          檯面開始被使用的那一刻，山恩也開始替這個家記住材料、案場與服務紀錄。
          有任何狀況，一句話傳來，我們會接住。
        </p>
        <div className="hero-cta-row warranty-entry-row" data-stage="4">
          <div className="warranty-entry-primary">
            <TrackedLink event="warranty_cta" props={{ name: "register", page: "landing", pos: "hero" }} className="btn btn-primary" href={LIFF_REGISTER_URL} target="_blank" rel="noreferrer">
              登記保固
            </TrackedLink>
            <p className="hero-hint">在 LINE 內完成，約一分鐘</p>
          </div>
          <TrackedLink event="warranty_cta" props={{ name: "care", page: "landing", pos: "hero" }} className="btn btn-ghost" href="/warranty/care">
            清潔使用指南
          </TrackedLink>
        </div>
        {myWarrantyUrl ? (
          <p className="hero-hint warranty-mine-hint" data-stage="4">
            已經登記過？
            <a href={myWarrantyUrl} target="_blank" rel="noreferrer">
              查看我的保固
            </a>
          </p>
        ) : null}
        <figure className="hero-media" data-stage="4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMAGE} alt="Saiens 山恩石英石檯面安裝完成後的明亮居家空間" width={2048} height={1365} />
        </figure>
      </section>

      <section className="section" aria-labelledby="t-memory">
        <p className="eyebrow" data-reveal>
          We Remember
        </p>
        <h2 id="t-memory" data-reveal data-stagger="1">
          你不需要記住任何事。
        </h2>
        <p className="lede" data-reveal data-stagger="2">
          屋主常常不是直接向山恩購買，也不一定知道材料型號、施工日期或保固年限。
          這些細節由我們替你記著。
        </p>
        <div className="trio">
          {MEMORY.map((item, index) => (
            <div className="trio-item" data-reveal data-stagger={index + 1} key={item.v}>
              <p className="k">{item.k}</p>
              <p className="v">{item.v}</p>
              <p className="d">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="alt">
        <section className="section" aria-labelledby="t-claim">
          <p className="eyebrow" data-reveal>
            When Something Happens
          </p>
          <h2 id="t-claim" data-reveal data-stagger="1">
            有狀況，一句話就好。
          </h2>
          <p className="lede" data-reveal data-stagger="2">
            不用先回頭找設計師、不用自己判斷問題屬於誰。把照片傳來，山恩原廠技師會先替你看。
          </p>
          <div className="rules">
            {CLAIM_STEPS.map((item, index) => (
              <div className="rule" data-reveal data-stagger={index + 1} key={item.t}>
                <p className="no">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <p className="t">{item.t}</p>
                  <p className="s">{item.s}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="section" aria-labelledby="t-cover">
        <p className="eyebrow" data-reveal>
          Coverage
        </p>
        <h2 id="t-cover" data-reveal data-stagger="1">
          保固涵蓋什麼。
        </h2>
        <div className="cols warranty-coverage">
          {COVERAGE.map((item, index) => (
            <div className="coverage-item" data-reveal data-stagger={index + 1} key={item.t}>
              <p className="t">{item.t}</p>
              <p className="s">{item.s}</p>
            </div>
          ))}
        </div>
        <p className="lede small" data-reveal>
          需要完整條款時，可以查看{" "}
          <a href="/guarantees-and-warranties">Saiens 產品品質保證與保固條款</a>。
        </p>
      </section>

      <div className="alt">
        <section className="section warranty-closing" aria-labelledby="t-close">
          <p className="eyebrow" data-reveal>
            Start Here
          </p>
          <h2 id="t-close" data-reveal data-stagger="1">
            先完成登記，剩下的交給山恩記住。
          </h2>
          <p className="lede" data-reveal data-stagger="2">
            這不是一份冷冰冰的條款，而是日後你需要我們時，能快速被找到、被理解、被照顧的開始。
          </p>
          <div className="warranty-end-actions" data-reveal data-stagger="3">
            <TrackedLink event="warranty_cta" props={{ name: "register", page: "landing", pos: "closing" }} className="btn btn-primary" href={LIFF_REGISTER_URL} target="_blank" rel="noreferrer">
              登記保固
            </TrackedLink>
          </div>
        </section>
      </div>

      <p className="fine">Saiens 山恩 · 保固服務地區限台灣本島 · service@saiens.tw</p>
    </main>
  );
}
