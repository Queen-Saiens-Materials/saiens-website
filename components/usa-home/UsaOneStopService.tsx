interface ServiceItem {
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: "R&D",
    description: "Innovative R&D tailored to real market and customer needs.",
  },
  {
    title: "Manufacturing",
    description:
      "Precision-driven production for consistent quality and scale.",
  },
  {
    title: "Fabrication",
    description: "Versatile fabrication built to meet any design challenge.",
  },
  {
    title: "Service",
    description: "End-to-end service focused on quality and satisfaction.",
  },
];

export default function UsaOneStopService() {
  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-(--dark-accent)">
          One Stop Service
        </p>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-3 text-center"
            >
              <h3 className="font-(family-name:--font-jost) text-2xl tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-(--dark-accent)">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
