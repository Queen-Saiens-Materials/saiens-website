import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const TITLE =
  "拆解未來生活的想像，從建築、結構到物件，展開一場以材料為核心的三維對話。";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: TITLE,
};

export default function FluidLivingLandingPage() {
  return (
    <main className="flex flex-1 flex-col bg-(--black) text-(--white)">
      <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/62824d7d-20f1-43b7-8558-b39a423977a6/2026+___.png"
            alt="2026 好感空間展 背景漸層"
            fill
            sizes="100vw"
            className="object-cover opacity-70"
            priority
          />
        </div>

        <h4 className="text-sm uppercase tracking-[0.3em] text-(--accent)">
          2026 好感空間展
        </h4>
        <h1 className="font-(family-name:--font-jost) text-5xl tracking-tight md:text-7xl">
          FLUID
          <br />
          LIVING
        </h1>
        <h4 className="text-lg tracking-wide text-(--accent)">流動的生活</h4>
        <h3 className="mt-6 text-base md:text-lg">
          遠雄建設 · 山恩 · 集力門品牌聯展
        </h3>

        <div className="mt-6 flex flex-col gap-1 text-sm text-(--white)/80 md:text-base">
          <h3 className="font-normal">日期｜ 2026.07.02（四）— 07.05（日）</h3>
          <p>時間｜ 10:00 — 18:00</p>
          <p>地點｜ ICC TAINAN 大臺南會展中心</p>
          <p>地址｜ 臺南市歸仁區歸仁十二路 3 號</p>
          <p>展位 ｜E358</p>
        </div>

        <Link
          href="/fluid-living-registration"
          className="mt-10 inline-block bg-(--white) px-8 py-3 text-sm uppercase tracking-wide text-(--black) transition-colors hover:bg-(--accent)"
        >
          Register Now
        </Link>
      </section>

      <section className="w-full bg-(--light-accent) text-(--black)">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-20 text-center">
          <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
            當空間不再被定義， 而是持續回應生活
          </h2>
          <p className="text-sm uppercase tracking-[0.3em] text-(--dark-accent)">
            The Vision
          </p>
          <div className="flex flex-col gap-4 text-left text-(--black)/85 md:text-center">
            <p>
              過去，我們習慣將空間視為固定不變的存在，隨著工作與生活交織、家庭關係持續轉變、空間使用方式不斷被重新定義，我們需要的，不再是一個靜止的容器，而是一個能夠隨著需求、關係與時間持續流動的空間系統。
            </p>
            <p>
              《流動的生活 Fluid Living》由遠雄建設、山恩 × COVE Living
              、集力門共同策展，從建築、結構到材料三個尺度出發，重新思考人與空間的關係。
              這是一場關於未來生活的提問。
            </p>
            <p>當生活持續改變，我們是否能創造一個更有彈性、更有連結，也更能陪伴人們成長的空間？</p>
            <p>而這，正是我們所想像的——流動的生活。</p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-(--accent)">
          The Collaboration
        </p>
        <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
          三種專業視角， 共創未來生活
        </h2>
        <div className="flex flex-col gap-4 text-left text-(--white)/85 md:text-center">
          <p>遠雄建設 以「永續共享」為核心價值，自 2018 年展開「未來居住實驗」。</p>
          <p>
            攜手 META Design 與小智研發
            MINIWIZ，將工地再生材料轉化為可體驗的永續空間，旗下「好室智造所」以全台巡迴形式推動綠色居住文化落地。
          </p>
          <p>
            Saiens
            山恩深耕石英石材料領域，旗下擁有帝雉石、闊石、永恆石等品牌，從廚房與衛浴檯面到建築壁面，持續探索材料在空間中的多元應用。
          </p>
          <p>
            旗下家飾品牌 COVE
            Living，則將材料延伸至生活場景，透過桌几、燈具與生活物件的設計轉譯，讓石材走出工程領域，以更貼近人的尺度融入日常，實踐品牌「Bless
            Every Home &amp; Family」的初心。
          </p>
          <p>
            Gili 集力門傳承喬城五金 40
            年產業底蘊，結合創新能量。用超越玉山高度的減廢實績，與設計界共築低碳未來。
          </p>
        </div>
      </section>

      <section className="w-full bg-(--white) text-(--black)">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-20">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-(--dark-accent)">
            Exhibition Highlights
          </p>

          <div className="flex flex-col gap-4 text-left">
            <h2 className="font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
              遠雄建設 Farglory Land
            </h2>
            <p className="text-(--black)/85">
              遠雄建設以「永續共享」為核心價值，自 2018 年展開「未來居住實驗」，攜手 META
              Design 與小智研發 MINIWIZ，透過「好室智造所」行動展間，以全台巡迴形式推動綠色居住文化落地。
            </p>
            <p className="text-(--black)/85">
              展間運用工地廢棄帆布與塑膠安全網轉化而成的再生建材，展現建築生命週期中的循環可能，也促成遠雄與山恩在循環材料與永續實踐上的合作，共同探索未來建築的更多可能。
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h2 className="font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
              Saiens 山恩
            </h2>
            <p className="text-(--black)/85">
              本次展覽Saiens
              山恩以「材料之島」的概念，透過石材、再生材料與創新工藝的展示，呈現材料從天然礦物到空間應用的完整旅程。展區中央長達七公尺的中島，如同一座被壓縮的建築，引導觀者從材料的視角重新理解空間的形成；而旗下家飾品牌
              COVE
              Living，則進一步將石材工藝轉化為燈具、桌几與生活物件，展現材料從建築尺度走向生活尺度的更多可能。從廚房檯面、建築壁面到日常生活，山恩希望讓觀者看見材料不只是空間的表面，而是連結工藝、設計與未來生活的重要媒介。
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h2 className="font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
              Gili 集力門
            </h2>
            <p className="text-(--black)/85">
              集力門以「All About
              Door」為核心，將滑動、折疊、旋轉等門體系統帶入展場，讓觀者體驗空間在開放與私密之間的流動關係。從五金工藝出發，集力門重新定義「門」的角色，透過結構的靈活變化，回應當代生活對彈性與自由的需求，也呼應《流動的生活》所探討的人、空間與生活之間不斷變化的關係。
            </p>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center gap-6 px-6 py-20 text-center">
        <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
          Register Now
        </h2>
        <Link
          href="/fluid-living-registration"
          className="inline-block bg-(--white) px-8 py-3 text-sm uppercase tracking-wide text-(--black) transition-colors hover:bg-(--accent)"
        >
          Register
        </Link>
      </section>
    </main>
  );
}
