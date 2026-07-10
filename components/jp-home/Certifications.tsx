import Image from "next/image";

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
    <section className="relative overflow-hidden bg-(--black) py-24 text-(--white)">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/5a5e0231-a71d-436e-bbbc-bd96cd3198be/DSC08731.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 sm:px-10 sm:grid-cols-2 lg:grid-cols-4">
        {CERTIFICATIONS.map((cert) => (
          <div key={cert.title} className="flex flex-col gap-3">
            <p className="text-lg font-semibold tracking-wide">{cert.title}</p>
            <p className="text-sm leading-relaxed text-(--accent)">
              {cert.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
