import Image from "next/image";

interface Brand {
  name: string;
  spec: string;
  thickness: string;
  scope?: string;
  features: string;
  href: string;
}

const BRANDS: Brand[] = [
  {
    name: "QJ Quartz Stone 闊石",
    spec: "320 x 160cm",
    thickness: "1.5cm",
    scope: "廚房檯面、浴室檯面、牆面、地面",
    features: "抗菌抗污、抗刮耐磨、抗酸鹼、不吸水、抗衝擊、透體花紋",
    href: "#",
  },
  {
    name: "Mikado Quartz 帝雉石",
    spec: "320 x 160cm",
    thickness: "2cm（3cm可依專案詢問）",
    features: "抗菌抗污、抗刮耐磨、抗酸鹼、不吸水、抗衝擊、透體花紋",
    href: "https://web.mikadoquartz.tw/",
  },
  {
    name: "ETERNOS 永恆石",
    spec: "320 x 160cm",
    thickness: "2cm / 1.2cm",
    scope: "廚房檯面、浴室檯面、牆面、地面",
    features: "抗菌抗污、抗刮耐磨、抗酸鹼、不吸水、抗衝擊、透體/單體",
    href: "https://www.eternos.tw/",
  },
  {
    name: "Atlas Plan 亞特蘭石",
    spec: "324 x 162cm",
    thickness: "1.5cm",
    scope: "室內外空間、浴室檯面、電視牆、牆面",
    features: "抗菌抗污、抗刮耐磨、抗酸鹼、不吸水",
    href: "#",
  },
];

export default function BrandCards() {
  return (
    <section id="ourbrand" className="bg-(--black) px-6 py-24 text-(--light-accent) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          我們的品牌
          <span className="mt-2 block text-lg font-normal text-(--accent)">
            Our Brand
          </span>
        </h2>

        <div className="relative mx-auto mt-12 aspect-[16/9] w-full max-w-3xl overflow-hidden">
          <Image
            src="/images/1752483347189-VC4PBASC72Q7C9I1LQZB/3D_MQL422_3.jpg"
            alt="Mikado Quartz 帝雉石"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed">
          您可以放心交給 Saiens
          <br />
          美感恆久，品質如一。
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-(--accent)">
          在 Saiens，我們相信真正的工藝，是設計與耐用的完美結合。
          我們不只是在打造表面，更希望成為您長久信賴的夥伴，
          陪伴每一個家的日常與未來。因為每一個家，都值得被祝福。
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {BRANDS.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              target={brand.href.startsWith("http") ? "_blank" : undefined}
              rel={brand.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col gap-3 border border-(--dark-accent) p-6 transition-colors hover:border-(--accent)"
            >
              <h3 className="font-(family-name:--font-jost) text-xl tracking-tight">
                {brand.name}
              </h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-(--accent)">
                <dt className="text-(--dark-accent)">規格｜</dt>
                <dd>{brand.spec}</dd>
                <dt className="text-(--dark-accent)">厚度｜</dt>
                <dd>{brand.thickness}</dd>
                {brand.scope ? (
                  <>
                    <dt className="text-(--dark-accent)">適用範圍｜</dt>
                    <dd>{brand.scope}</dd>
                  </>
                ) : null}
                <dt className="text-(--dark-accent)">特色｜</dt>
                <dd>{brand.features}</dd>
              </dl>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
