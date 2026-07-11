import Image from "next/image";

interface ProcessStep {
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "研究開発",
    description:
      "Saiens は自社の「Saiensラボ」を有し、研究開発チームが常に革新を追求。市場や顧客のニーズに応える、独自で実用的な製品ソリューションを生み出します。",
  },
  {
    title: "生産",
    description:
      "Saiens は自社の原料鉱山と生産工場を有し、専門チームが品質を厳重に管理。すべての生産工程を徹底的にコントロールし、安定した耐久性のある品質を保証します。",
  },
  {
    title: "加工",
    description:
      "Saiens は自社の加工・施工チームを擁し、柔軟な加工力と専門的な施工サービスで、あらゆるカスタマイズやデザインニーズにお応えします。",
  },
  {
    title: "サービス",
    description:
      "Saiens 旗下ブランドは、1〜25年の品質保証と万全のサポートで、安心のパートナーです。",
  },
];

export default function Process(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-(--black) px-6 py-24 text-(--white) sm:px-10">
      <div className="absolute inset-0">
        <Image
          src="/images/1752483347185-ENXAUFO7XV8W4O0SWBJI/DSC00088.JPG"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-(--black)/60" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          One Stop Service
          <span className="mt-2 block text-lg font-normal text-(--accent)">
            ワンストップサービス
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.title} className="flex flex-col gap-3">
              <h3 className="font-(family-name:--font-jost) text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-(--white)/90">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
