import Image from "next/image";
import content from "@/content/pages/home-tw.json";

export default function OneStopService() {
  const { headingZh, headingEn, services } = content.oneStopService;

  return (
    <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingZh}
          <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
            {headingEn}
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
          {services.map((service) => (
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
