import Carousel from "@/components/Carousel";

interface Certification {
  title: string;
  description: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    title: "UL GREENGUARD",
    description:
      "ゴールド認証。この認証は、素材が人の健康に害を与えないことを証明するものです。",
  },
  {
    title: "全米保健財団NSF",
    description: "認証された素材は、食品と直接接触するあらゆる場所に適している。",
  },
  {
    title: "欧州適合証明書 CE",
    description:
      "材料は対応する欧州連合指令に適合しており、対応する評価手続きは完了している。",
  },
  {
    title: "世界基準 SGS認証取得",
    description: "SGS認証により、素材の高い物理性能が裏付けられています",
  },
];

export default function Certifications(): React.JSX.Element {
  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Carousel label="certifications">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.title} className="w-72 sm:w-80">
              <h3 className="font-(family-name:--font-jost) text-base font-semibold">
                <span aria-hidden="true">・</span> {cert.title}
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
