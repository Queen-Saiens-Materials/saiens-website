import type { Metadata } from "next";
import Image from "next/image";

const TITLE =
  "拆解未來生活的想像，從建築、結構到物件，展開一場以材料為核心的三維對話。";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: TITLE,
};

export default function FluidLivingLandingPage() {
  return (
    <main className="flex flex-1 flex-col bg-(--black) text-(--white)">
      <section className="relative isolate w-full overflow-hidden px-6 py-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/62824d7d-20f1-43b7-8558-b39a423977a6/2026+___.png"
            alt="2026 好感空間展 背景漸層"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 text-left md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="flex flex-col items-start gap-4">
            <h4 className="text-sm uppercase tracking-[0.3em] text-(--accent)">
              2026 好感空間展
            </h4>
            <h1 className="font-(family-name:--font-jost) text-5xl tracking-tight md:text-7xl">
              FLUID
              <br />
              LIVING
              <span className="ml-2 align-middle text-2xl md:text-3xl">流動的生活</span>
            </h1>
            <h3 className="mt-2 text-base md:text-lg">
              遠雄建設 · 山恩 · 集力門品牌聯展
            </h3>

            <div className="mt-6 flex flex-col gap-1 text-sm text-(--white)/80 md:text-base">
              <h3 className="font-normal">日期｜ 2026.07.02（四）— 07.05（日）</h3>
              <p>時間｜ 10:00 — 18:00</p>
              <p>地點｜ ICC TAINAN 大臺南會展中心</p>
              <p>地址｜ 臺南市歸仁區歸仁十二路 3 號</p>
              <p>展位 ｜E358</p>
            </div>
          </div>

          <div className="relative aspect-square w-full max-w-md shrink-0 overflow-hidden md:w-2/5">
            <Image
              src="/images/66e7d351-5058-4899-a5ec-5cc95e713e7e/ChatGPT+Image+Jun+24_+2026_+12_36_02+AM.png"
              alt="流動的生活 概念建築意象"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-(--light-accent) text-(--black)">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 md:flex-row md:items-center">
          <div className="relative aspect-video w-full shrink-0 overflow-hidden md:w-1/2">
            <Image
              src="/images/487dd007-3304-4388-88be-96b6e450f774/ChatGPT+Image+Jun+19_+2026_+03_49_41+AM.png"
              alt="流動的生活 室內空間意象"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 text-left md:w-1/2">
            <p className="text-sm uppercase tracking-[0.3em] text-(--dark-accent)">
              The Vision
            </p>
            <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
              當空間不再被定義，
              <br />
              而是持續回應生活
            </h2>
            <div className="flex flex-col gap-4 text-(--black)/85">
              <p>
                過去，我們習慣將空間視為固定不變的存在，隨著工作與生活交織、家庭關係持續轉變、空間使用方式不斷被重新定義，我們需要的，不再是一個靜止的容器，而是一個能夠隨著需求、關係與時間持續流動的空間系統。
              </p>
              <p>
                《流動的生活 Fluid Living》由遠雄建設、山恩 × COVE Living
                、集力門共同策展，從建築、結構到材料三個尺度出發，重新思考人與空間的關係。
              </p>
              <p>這是一場關於未來生活的提問。</p>
              <p>當生活持續改變，我們是否能創造一個更有彈性、更有連結，也更能陪伴人們成長的空間？</p>
              <p>而這，正是我們所想像的——流動的生活。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-(--accent)">
            The Collaboration
          </p>
          <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
            三種專業視角，
            <br />
            共創未來生活
          </h2>
        </div>

        <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <div className="relative h-16 w-full max-w-[220px]">
              <Image
                src="/images/158f0ae1-6fb0-48b1-b5e6-fedd6938c698/logo.DttVRYz7.png"
                alt="Farglory Land 遠雄建設"
                fill
                sizes="220px"
                className="object-contain object-center md:object-left"
              />
            </div>
            <div className="flex flex-col gap-4 text-(--white)/85">
              <p>遠雄建設 以「永續共享」為核心價值，自 2018 年展開「未來居住實驗」。</p>
              <p>
                攜手 META Design 與小智研發
                MINIWIZ，將工地再生材料轉化為可體驗的永續空間，旗下「好室智造所」以全台巡迴形式推動綠色居住文化落地。
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <div className="relative h-16 w-full max-w-[220px]">
              <Image
                src="/images/2e3acdf3-b8e1-4b54-84b2-4297515935f2/Saiens+logo+white+_1_.png"
                alt="Saiens 山恩"
                fill
                sizes="220px"
                className="object-contain object-center md:object-left"
              />
            </div>
            <div className="flex flex-col gap-4 text-(--white)/85">
              <p>
                Saiens
                山恩深耕石英石材料領域，旗下擁有帝雉石、闊石、永恆石等品牌，從廚房與衛浴檯面到建築壁面，持續探索材料在空間中的多元應用。
              </p>
              <p>
                旗下家飾品牌 COVE
                Living，則將材料延伸至生活場景，透過桌几、燈具與生活物件的設計轉譯，讓石材走出工程領域，以更貼近人的尺度融入日常，實踐品牌「Bless
                Every Home &amp; Family」的初心。
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <div className="relative h-16 w-full max-w-[220px]">
              <Image
                src="/images/2adc9c83-982e-4b5a-8d9e-a3216e205354/GILI+SLIDING+DOOR.png"
                alt="Gili 集力門 sliding door"
                fill
                sizes="220px"
                className="object-contain object-center md:object-left"
              />
            </div>
            <div className="flex flex-col gap-4 text-(--white)/85">
              <p>
                Gili 集力門傳承喬城五金 40
                年產業底蘊，結合創新能量。用超越玉山高度的減廢實績，與設計界共築低碳未來。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-(--white) text-(--black)">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-20">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-(--dark-accent)">
            Exhibition Highlights
          </p>

          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="grid w-full grid-cols-2 gap-4 md:w-1/2">
              <div className="relative col-span-2 aspect-[4/3] overflow-hidden sm:col-span-1">
                <Image
                  src="/images/2365bb8c-b24f-44a3-b7b4-e1e6d1de26a0/S__163643495_0.jpg"
                  alt="遠雄建設展區 再生材料工藝品"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/b2ad84fd-ca29-47c7-93ee-c266107aca08/S__163643483_0.jpg"
                  alt="遠雄建設展區 再生材料座椅"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/b8fe775a-27dd-45e8-abd0-6629db59c864/S__163643505.jpg"
                  alt="遠雄建設展區 安全操作示範"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/218b4103-8347-4cbf-823f-f6c2f15632cc/S__163643480_0+_1_.jpg"
                  alt="板模再生板材 展示：板模、帆布、水泥袋、泡棉、防墜網"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 text-left md:w-1/2">
              <h2 className="font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
                遠雄建設
                <br />
                Farglory Land
              </h2>
              <p className="text-(--black)/85">
                遠雄建設以「永續共享」為核心價值，自 2018 年展開「未來居住實驗」，攜手 META
                Design 與小智研發 MINIWIZ，透過「好室智造所」行動展間，以全台巡迴形式推動綠色居住文化落地。
              </p>
              <p className="text-(--black)/85">
                展間運用工地廢棄帆布與塑膠安全網轉化而成的再生建材，展現建築生命週期中的循環可能，也促成遠雄與山恩在循環材料與永續實踐上的合作，共同探索未來建築的更多可能。
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:flex-row-reverse md:items-start">
            <div className="grid w-full grid-cols-2 gap-4 md:w-1/2">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/976167d2-150f-488e-833a-919558610c95/DSC09459.jpg"
                  alt="Gili 集力門展區 廚房與拉門場景"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/7c8d6388-12cb-466b-a95f-4502620df1a2/___+_4_.jpg"
                  alt="Gili 集力門展區 滑動拉門細節"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/fbc80072-38e8-4e15-9ed2-17bae3da4b60/___+_2_.jpg"
                  alt="Gili 集力門展區 連動拉門實景"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 text-left md:w-1/2">
              <h2 className="font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
                Gili 集力門
              </h2>
              <p className="text-(--black)/85">
                集力門以「All About
                Door」為核心，將滑動、折疊、旋轉等門體系統帶入展場，讓觀者體驗空間在開放與私密之間的流動關係。從五金工藝出發，集力門重新定義「門」的角色，透過結構的靈活變化，回應當代生活對彈性與自由的需求，也呼應《流動的生活》所探討的人、空間與生活之間不斷變化的關係。
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="relative aspect-[4/3] w-full overflow-hidden md:w-1/2">
              <Image
                src="/images/cd0af0c8-2082-42dc-acbe-966e588fb883/DSC09451.jpg"
                alt="Saiens 山恩展區 石材桌几與沙發"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 text-left md:w-1/2">
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
          </div>
        </div>
      </section>
    </main>
  );
}
