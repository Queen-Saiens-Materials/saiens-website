import Carousel from "@/components/Carousel";

interface Certification {
  name: string;
  description: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    name: "UL GREENGUARD",
    description: "金牌認證，認定材料對人體健康不會造成任何傷害。",
  },
  {
    name: "美國國家衛生基金會 NSF",
    description: "認證材料適用於所有的區域，可與食品直接接觸。",
  },
  {
    name: "歐洲合格認證 CE",
    description: "材料符合相應的歐洲聯盟指令，且已完成相應的評估程序。",
  },
  {
    name: "全球檢驗機構 SGS檢驗認證",
    description: "檢驗認證，材料之各項優良物理特性。",
  },
];

export default function QualityAssurance() {
  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          品質保證
          <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
            為您帶來更多數十年如一日的美。
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-(--black)/80">
          Saiens旗下產品皆有通過 NSF、SGS
          硬度測試報告與吸水率報告，符合我們對品質和耐用度的嚴格要求，並符合一般家庭的日常使用標準，我們的產品提供了材料保固及加工保固，各項產品品質保證的涵蓋範圍，請參考每項產品之細項說明。
        </p>

        <div className="mt-8 text-center">
          <a
            href="/guarantees-and-warranties"
            className="inline-block bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
          >
            查看更多品質保證服務說明
          </a>
        </div>

        <Carousel label="certifications" className="mt-16">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.name} className="w-72 sm:w-80">
              <h3 className="font-(family-name:--font-jost) text-base font-semibold">
                <span aria-hidden="true">・</span> {cert.name}
              </h3>
              <p className="mt-2 text-sm text-(--black)/80">
                {cert.description}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
