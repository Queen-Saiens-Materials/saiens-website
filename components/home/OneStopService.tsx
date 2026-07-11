import Image from "next/image";

interface ServiceItem {
  icon: string;
  iconAlt: string;
  titleZh: string;
  titleEn: string;
  bodyZh: string;
  bodyEn: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: "/images/3480781c-fcb4-4581-85f4-5507bc9a971b/atom+_1_.png",
    iconAlt: "R&D icon",
    titleZh: "研發",
    titleEn: "R&D",
    bodyZh: "山恩擁有自有礦源與實驗室，研發團隊持續創新，為市場打造獨特且實用的產品。",
    bodyEn: "Innovative R&D tailored to real market and customer needs.",
  },
  {
    icon: "/images/c1f3eaa7-c30a-42d6-b70c-6faac542b7fb/tube.png",
    iconAlt: "Manufacturing & Fabrication icon",
    titleZh: "製造與加工",
    titleEn: "Manufacturing & Fabrication",
    bodyZh: "從原料到成品，山恩自建生產與加工體系，嚴格控管品質，靈活實現多樣化設計需求。",
    bodyEn:
      "Integrated production and fabrication for precision, flexibility, and quality assurance.",
  },
  {
    icon: "/images/c4e789e0-936b-4939-9ac3-b8bf1bc41eff/user.png",
    iconAlt: "Service icon",
    titleZh: "服務",
    titleEn: "Service",
    bodyZh: "山恩提供完善的售前與售後支援以及最長 25 年品質保證，讓每一次合作都安心無虞。",
    bodyEn: "Comprehensive service ensuring confidence and long-term satisfaction.",
  },
];

export default function OneStopService() {
  return (
    <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          One Stop Service
          <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
            一站式服務
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.titleEn}
              className="flex flex-col items-center gap-5 text-center"
            >
              <div className="relative h-16 w-16">
                <Image
                  src={service.icon}
                  alt={service.iconAlt}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <h3 className="font-(family-name:--font-jost) text-xl font-medium">
                {service.titleZh}
                <span className="block text-sm text-(--dark-accent)">
                  {service.titleEn}
                </span>
              </h3>
              <p className="text-sm leading-relaxed text-(--black)/80">
                {service.bodyZh}
              </p>
              <p className="text-xs leading-relaxed text-(--dark-accent)">
                {service.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
