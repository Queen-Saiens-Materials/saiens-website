import Image from "next/image";

interface Certification {
  name: string;
  description: string;
  icon?: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    name: "UL GREENGUARD",
    description: "金牌認證，認定材料對人體健康不會造成任何傷害。",
    icon: "/images/63708724-1b26-4689-91fc-8f3896eacb78/4-Greenguard.png",
  },
  {
    name: "全球檢驗機構 SGS檢驗認證",
    description: "檢驗認證，材料之各項優良物理特性。",
  },
  {
    name: "美國國家衛生基金會 NSF",
    description: "認證材料適用於所有的區域，可與食品直接接觸。",
  },
  {
    name: "歐洲合格認證 CE",
    description: "材料符合相應的歐洲聯盟指令，且已完成相應的評估程序。",
  },
];

interface WarrantyBadge {
  brand: string;
  years: string;
  image: string;
}

const WARRANTY_BADGES: WarrantyBadge[] = [
  {
    brand: "Mikaodo Quartz",
    years: "Mikaodo Quartz 系列提供25年品質保證",
    image:
      "/images/1752483347192-R1CBT5A4NTM7BLH6F7RD/saiens+web+MQ25_.png.png",
  },
  {
    brand: "QJ Quartz Stone",
    years: "QJ Quartz Stone 提供15年品質保證",
    image: "/images/1752483347194-E49K9ME8RKEEPMC1JOKJ/saiens+web+QJ15_.png",
  },
  {
    brand: "ETERNOS",
    years: "ETERNOS 提供15年品質保證",
    image: "/images/1752483347197-SOY0SC6FF76QQJGC30GN/saiens+web+ET15_.png",
  },
];

export default function QualityAssurance() {
  return (
    <section className="bg-(--black) px-6 py-24 text-(--light-accent) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          品質保證
          <span className="mt-2 block text-lg font-normal text-(--accent)">
            為您帶來更多數十年如一日的美。
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-(--accent)">
          Saiens旗下產品皆有通過 NSF、SGS
          硬度測試報告與吸水率報告，符合我們對品質和耐用度的嚴格要求，並符合一般家庭的日常使用標準，我們的產品提供了材料保固及加工保固，各項產品品質保證的涵蓋範圍，請參考每項產品之細項說明。
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.name} className="flex items-start gap-4">
              {cert.icon ? (
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    src={cert.icon}
                    alt={cert.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              ) : null}
              <div>
                <h3 className="font-(family-name:--font-jost) text-base font-semibold">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-(--accent)">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {WARRANTY_BADGES.map((badge) => (
            <div key={badge.brand} className="flex flex-col items-center gap-4 text-center">
              <div className="relative aspect-square w-40">
                <Image
                  src={badge.image}
                  alt={badge.years}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-(--accent)">{badge.years}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/guarantees-and-warranties"
            className="inline-block border border-(--accent) px-6 py-3 text-sm uppercase tracking-wide text-(--light-accent) transition-colors hover:bg-(--accent) hover:text-(--black)"
          >
            查看更多品質保證服務說明
          </a>
        </div>
      </div>
    </section>
  );
}
