import content from "@/content/pages/home-usa.json";

export default function UsaOneStopService() {
  const { eyebrow, services } = content.oneStopService;

  return (
    <section className="bg-(--white) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-(--dark-accent)">
          {eyebrow}
        </p>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
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
