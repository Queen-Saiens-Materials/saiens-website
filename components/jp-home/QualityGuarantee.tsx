import Image from "next/image";

interface WarrantyBadge {
  alt: string;
  image: string;
}

const WARRANTY_BADGES: WarrantyBadge[] = [
  {
    alt: "japan saiens web MQ25年品質保證",
    image: "/images/ffa7097a-666c-4641-bac0-e869633a2909/japan+saiens+web+MQ25_.png",
  },
  {
    alt: "japan saiens web ET15年品質保證",
    image: "/images/ab7b0bed-8b09-4938-af0c-45f772c492d9/japan+saiens+web+ET15_.png",
  },
  {
    alt: "japansaiens web QJ15年品質保證",
    image: "/images/6fc7ce25-722a-47fa-a25b-0356ae48bdb8/japansaiens+web+QJ15_.png",
  },
];

export default function QualityGuarantee(): React.JSX.Element {
  return (
    <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <h2 className="font-(family-name:--font-jost) max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          品質保証
          <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
            さらに数十年の美をお届けします。
          </span>
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-(--black)/80">
          Saiensの製品はNSF・SGS硬度試験や吸水試験に合格し、耐久性と品質基準をクリアしています。
          家庭での日常使用にも適し、材料保証と加工保証が付帯。詳細な品質保証内容は各製品の説明をご参照ください。
        </p>

        <a
          href="/japan-guarantees-and-warranties"
          className="inline-block bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
        >
          品質保証サービスの詳細を見る
        </a>

        <div className="mt-8 grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
          {WARRANTY_BADGES.map((badge) => (
            <div key={badge.image} className="relative aspect-[4/3] w-full">
              <Image
                src={badge.image}
                alt={badge.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
