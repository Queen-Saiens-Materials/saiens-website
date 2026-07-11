import type { Metadata } from "next";
import Image from "next/image";

const TITLE =
  "拆解未來生活的想像，從建築、結構到物件，展開一場以材料為核心的三維對話。";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description:
    "在《好感之夜》中，我們以「讓建築・真正開始循環」為主軸，從材料革新、空間應用到永續工藝，重新串連人、建築與環境的關係。",
};

const PARTNERS = [
  {
    logo: "/images/158f0ae1-6fb0-48b1-b5e6-fedd6938c698/logo.DttVRYz7.png",
    alt: "遠雄建設",
    width: 190,
    height: 100,
    copy: "遠雄建設從自身出發，持續推動建築材料再生循環。透過向上循環技術與創新應用，讓拆除後的材料重新回到空間與生活之中，賦予資源全新價值，實踐建築與環境共生的永續未來。",
  },
  {
    logo: "/images/4e5eb5e9-ee4f-4310-8968-239e6d312f1d/logo+white+small.png",
    alt: "Saiens 山恩",
    width: 140,
    height: 25,
    copy: "山恩實業從使用資源走向管理資源，透過城市採礦與再生石材技術，讓材料循環再生，重新定義建築與環境的未來價值。",
  },
  {
    logo: "/images/5dac9bda-7852-497c-a580-2113fe541eec/LOGO__.png",
    alt: "永記造漆（虹牌油漆）",
    width: 160,
    height: 79,
    copy: "永記造漆(虹牌油漆)結合綠建材、防蝕科技與再生材料應用，以適應海島氣候的塗裝系統，打造兼具耐久與永續價值的防護工程-淡江大橋。",
  },
  {
    logo: "/images/2adc9c83-982e-4b5a-8d9e-a3216e205354/GILI+SLIDING+DOOR.png",
    alt: "Gili 集力門",
    width: 200,
    height: 78,
    copy: "喬城以40年五金底蘊，結合 Gili 集力門創新能量。以精準施工與高循環材料，用超越玉山高度的減廢實績，與設計界共築低碳未來。",
  },
];

export default function Mobius2Page() {
  return (
    <main className="flex flex-1 flex-col bg-(--black) text-(--white)">
      <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/437e8c28-8a6c-432a-9197-b5a722a6d1e7/fluidliving.png"
            alt="Fluid Living"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
        </div>

        <h1 className="font-(family-name:--font-jost) text-5xl tracking-tight md:text-7xl">
          FLUID
          <br />
          LIVING
        </h1>
        <h4 className="text-lg tracking-wide text-(--accent)">流動的生活</h4>
        <h3 className="mt-4 text-base md:text-lg">
          遠雄 × 山恩 × 虹牌 × Gili ｜好感之夜
        </h3>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16 text-center">
        <p className="font-semibold text-(--white)/90">
          在《好感之夜》中，我們以「讓建築・真正開始循環」為主軸，從材料革新、空間應用到永續工藝，重新串連人、建築與環境的關係。透過循環思維與跨界創新，讓每一份資源被更長久地使用，也讓建築不只承載生活，更成為邁向未來的永續行動。
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-14 px-6 py-16">
        {PARTNERS.map((partner) => (
          <div
            key={partner.alt}
            className="flex flex-col items-center gap-4 text-center"
          >
            <Image
              src={partner.logo}
              alt={partner.alt}
              width={partner.width}
              height={partner.height}
              className="h-auto max-h-16 w-auto object-contain"
            />
            <p className="text-sm text-(--white)/80">{partner.copy}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <h1 className="font-(family-name:--font-jost) text-4xl tracking-tight md:text-6xl">
          YOU&rsquo;RE INVITED
        </h1>
        <h3 className="text-base md:text-lg">
          遠雄 × 山恩 × 虹牌 × Gili ｜好感之夜
        </h3>
        <p className="max-w-xl text-(--white)/80">
          探索再生材的更多可能，誠摯邀請您參與「好感之夜」。
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 py-8 text-center">
        <h3 className="font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
          拆解未來生活的想像，從建築、結構到物件，展開一場以材料為核心的三維對話。
        </h3>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-6 py-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-(--accent)">
          活動資訊
        </p>
        <p>日期｜2026.07.02（四）</p>
        <p>地點｜ 大台南會展中心 ICC TAINAN</p>
        <p>臺南市歸仁區歸仁十二路3號3樓 大員A廳</p>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-6 py-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-(--accent)">
          晚宴流程
        </p>
        <p>18:00 來賓入場</p>
        <p>18:30 好感之夜 • 輕鬆開場</p>
        <p>18:30－19:00 品牌與永續的輕對話</p>
        <p>19:00－21:00 自在餐敘・微醺夜談</p>
      </section>

      <section className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6 py-8 text-center">
        <p>填寫表單預約好感之夜席次</p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="w-full cursor-not-allowed bg-(--white)/40 px-8 py-3 text-sm uppercase tracking-wide text-(--black)"
        >
          Submit
        </button>
        <p className="text-sm text-(--accent)">
          Coming soon — 表單尚未開放送出，敬請期待。
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6 py-16 text-center">
        <p className="text-(--white)/80">本活動酒品 由麒麟贊助</p>
        <Image
          src="/images/52d21dcc-f9b1-43af-8182-ffa797a622cd/kirin-logo-black-and-white.png"
          alt="麒麟"
          width={90}
          height={90}
          className="h-16 w-16 object-contain invert"
        />
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-2 px-6 py-16 text-center text-(--white)/80">
        <p>如需進一步服務與協助，歡迎點此與我們聯繫。</p>
      </section>
    </main>
  );
}
