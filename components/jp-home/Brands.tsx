interface BrandItem {
  name: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
}

const BRANDS: BrandItem[] = [
  {
    name: "QJ Quartz Stone（クォーツストーン・闊石）",
    description:
      "仕様｜320×160cm　厚さ｜1.5cm　用途｜キッチンカウンター、浴室カウンター、壁、床　特徴｜抗菌・防汚、耐傷・耐摩耗、耐酸・耐アルカリ、非吸水、耐衝撃、半透明パターン",
    linkLabel: "公式サイト >>",
    linkHref: "https://qjquartzstone.com.tw/index.php",
  },
  {
    name: "Mikado Quartz（帝雉石／テイチセキ）",
    description:
      "仕様｜320×160cm　厚み｜2cm（ご希望により3cm）　特徴｜抗菌、防汚、防傷、耐摩耗、耐酸、非吸水、耐衝撃、半透明柄",
    linkLabel: "公式サイト」>",
    linkHref: "https://web.mikadoquartz.tw/",
  },
  {
    name: "ETERNOS（永恆石／エタノス）",
    description:
      "仕様｜320 x 160cm　厚さ｜2cm / 1.2cm　用途｜キッチンカウンター、バスルームカウンター、壁、床　特徴｜抗菌・防汚、耐傷・耐摩耗、耐酸・耐アルカリ、非吸水、耐衝撃、半透明・モノブロック。",
    linkLabel: "公式サイト」>",
    linkHref: "https://www.eternos.us/",
  },
  {
    name: "nexea （nexea/ネクシア)",
    description:
      "仕様｜324 x 162cm　厚さ｜1.2cm　用途｜屋内外、浴室カウンター、テレビ壁面、壁面　特徴｜抗菌・防汚、耐傷性・耐摩耗性、耐酸性・耐アルカリ性、非吸水性",
  },
];

export default function Brands(): React.JSX.Element {
  return (
    <section
      id="ourbrand"
      className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-24 sm:px-10"
    >
      <h1 className="font-(family-name:--font-jost) text-3xl tracking-tight sm:text-4xl">
        <strong>ブランド紹介</strong>
        <br />
        Our Brand
      </h1>

      <ul className="flex flex-col divide-y divide-(--accent)">
        {BRANDS.map((brand) => (
          <li key={brand.name} className="flex flex-col gap-3 py-8">
            <h4 className="text-lg tracking-wide text-(--black)">
              {brand.name}
            </h4>
            <p className="max-w-2xl text-sm leading-relaxed text-(--dark-accent)">
              {brand.description}
            </p>
            {brand.linkHref ? (
              <a
                href={brand.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-(--black) underline underline-offset-4"
              >
                {brand.linkLabel}
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
