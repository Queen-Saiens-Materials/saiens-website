import type { Metadata } from "next";
import Reveal from "../register/Reveal";
import "../register/warranty.css";

const LINE_OA_URL = "https://lin.ee/poXsa4y";
const STAIN_IMAGE =
  "/images/0b335ab5-88a2-4830-a31d-6e0fe3f8ffde/9a6c690e--2023_11g80uo000000000000028.png";
const POWDER_IMAGE =
  "/images/3bc2f299-4895-428b-acdb-8a4ca9860793/a4ff4e3b--2023_116e0jw000000000000028.png";

const DAILY_CARE = [
  {
    k: "01",
    v: "中性清潔劑",
    d: "日常清潔建議使用家用中性清潔劑，維持檯面長期良好狀態。",
  },
  {
    k: "02",
    v: "清水加沙拉脫",
    d: "一般油污與髒污，清水搭配沙拉脫也能有效去除。",
  },
  {
    k: "03",
    v: "需要消毒用酒精",
    d: "若需要消毒，可使用酒精；避免使用丙酮、去光水等溶劑。",
  },
];

const AVOID = [
  {
    t: "強酸、強鹼、丙酮與去光水",
    s: "石英石檯面內含樹酯成份，這些化學品會破壞樹酯與表面光澤。",
  },
  {
    t: "戶外與紫外線燈",
    s: "戶外紫外線與紫外線殺菌燈，都可能使樹酯成份變色，造成色差。",
  },
  {
    t: "直接在檯面切剁",
    s: "人造石英石硬度高於一般不鏽鋼或鐵器，但仍含樹酯，建議使用砧板。",
  },
  {
    t: "長時間高溫與急劇溫差",
    s: (
      <>
        檯面耐熱可達 <span className="nowrap">450 度</span>，仍建議使用隔熱墊；急劇溫差可能使接縫脫膠或開裂。
      </>
    ),
  },
  {
    t: "鈍物撞擊邊角",
    s: "人造石英石由石英砂及樹酯聚合而成，鈍物重擊可能導致崩角。",
  },
];

const DEEP_CLEAN = [
  {
    t: "酒精濕敷",
    s: (
      <>
        油性顏料、麥克筆或奇異筆沾染時，以酒精濕敷髒污處 <span className="nowrap">10-15 分鐘</span>。
      </>
    ),
  },
  { t: "清潔粉畫圓", s: "搭配具有輕微研磨顆粒的 Saiens 清潔粉，以畫圓方式將污垢去除。" },
  { t: "濕布擦拭", s: "最後用濕布擦拭檯面，即可去除表面污漬，效果類似去角質粉。" },
];

export const metadata: Metadata = {
  title: "Saiens 清潔使用指南 | 揮別吃色與刮傷的困擾",
  description: "Saiens 山恩石英石檯面的日常清潔、頑固髒污處理、使用禁忌與邊角缺損處理指南。",
  openGraph: {
    title: "Saiens 清潔使用指南",
    description: "揮別吃色與刮傷的困擾。照著山恩清潔使用指南，維持檯面長期良好狀態。",
    images: [
      "https://saiens.tw/images/0b335ab5-88a2-4830-a31d-6e0fe3f8ffde/9a6c690e--2023_11g80uo000000000000028.png",
    ],
  },
};

export default function WarrantyCarePage() {
  return (
    <main className="wr flex flex-1 flex-col">
      <Reveal />

      <section className="hero care-hero" aria-label="Saiens 清潔使用指南">
        <p className="hero-eyebrow" data-stage="1">
          Care Guide
        </p>
        <h1 className="hero-title" data-stage="2">
          揮別吃色與刮傷的困擾。
        </h1>
        <p className="hero-sub" data-stage="3">
          用簡單、正確的清潔與使用方式，擁抱零煩惱的居家美學，讓每一天更專注於享受生活。
        </p>
      </section>

      <section className="section" aria-labelledby="t-daily">
        <p className="eyebrow" data-reveal>
          Daily Care
        </p>
        <h2 id="t-daily" data-reveal data-stagger="1">
          日常清潔三步。
        </h2>
        <p className="lede" data-reveal data-stagger="2">
          符合生產標準的人造石英石吸水率少於 <span className="nowrap">0.03%</span>，因此不容易吸附顏色。
          但表面是透過拋光機研磨而成，並不像玻璃那麼光滑；使用過程中的金屬碳粉或食物色素，
          比較常見的是些微「卡髒」，不是吃色。
        </p>
        <div className="trio">
          {DAILY_CARE.map((item, index) => (
            <div className="trio-item" data-reveal data-stagger={index + 1} key={item.v}>
              <p className="k">{item.k}</p>
              <p className="v">{item.v}</p>
              <p className="d">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="alt">
        <section className="section" aria-labelledby="t-avoid">
          <p className="eyebrow" data-reveal>
            Avoid
          </p>
          <h2 id="t-avoid" data-reveal data-stagger="1">
            請避開這五件事。
          </h2>
          <div className="rules">
            {AVOID.map((item, index) => (
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

      <section className="section care-split" aria-labelledby="t-stain">
        <div>
          <p className="eyebrow" data-reveal>
            Stubborn Stains
          </p>
          <h2 id="t-stain" data-reveal data-stagger="1">
            頑固髒污怎麼處理。
          </h2>
          <p className="lede" data-reveal data-stagger="2">
            大多數髒污都可用 Saiens 清潔粉完成清理。油性顏料、麥克筆或奇異筆沾染檯面時，
            先濕敷，再用清潔粉處理。
          </p>
          <div className="steps care-steps">
            {DEEP_CLEAN.map((item, index) => (
              <div className="step" data-reveal data-stagger={index + 1} key={item.t}>
                <p className="no">{String(index + 1).padStart(2, "0")}</p>
                <p className="t">{item.t}</p>
                <p className="s">{item.s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="care-media-grid" aria-label="清潔說明圖">
          <figure className="care-frame" data-reveal data-stagger="1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STAIN_IMAGE}
              alt="說明石英石不容易吃色但表面可能卡髒，因此仍需要正確清潔"
              width={1880}
              height={1104}
              loading="lazy"
            />
          </figure>
          <figure className="care-frame" data-reveal data-stagger="2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POWDER_IMAGE}
              alt="Saiens 清潔粉三步驟：沾濕、畫圓清潔、濕布擦拭"
              width={1526}
              height={716}
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <div className="alt">
        <section className="section" aria-labelledby="t-chip">
          <p className="eyebrow" data-reveal>
            Edge Repair
          </p>
          <h2 id="t-chip" data-reveal data-stagger="1">
            邊角缺損怎麼辦。
          </h2>
          <p className="lede" data-reveal data-stagger="2">
            若不慎碰撞導致邊緣缺損，請先保留缺損的石料部分，並聯繫山恩。
            專業師傅可使用與原石相近顏色的石英專用膠進行修復，較高機率完成美觀且完好的修復。
          </p>
        </section>
      </div>

      <section className="section warranty-closing" aria-labelledby="t-care-close">
        <p className="eyebrow" data-reveal>
          Service
        </p>
        <h2 id="t-care-close" data-reveal data-stagger="1">
          有任何狀況，直接在 LINE 告訴我們。
        </h2>
        <p className="lede" data-reveal data-stagger="2">
          不確定是髒污、刮痕、崩角或接縫問題時，先拍照傳來，山恩會協助判讀。
        </p>
        <div className="warranty-end-actions" data-reveal data-stagger="3">
          <a className="btn btn-primary" href={LINE_OA_URL} target="_blank" rel="noreferrer">
            聯繫 Saiens 客服 LINE
          </a>
          <a className="btn btn-ghost" href="/warranty">
            登記保固
          </a>
        </div>
      </section>

      <p className="fine">Saiens 山恩 · 保固服務地區限台灣本島 · service@saiens.tw</p>
    </main>
  );
}
