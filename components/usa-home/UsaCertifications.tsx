import content from "@/content/pages/home-usa.json";

export default function UsaCertifications() {
  const { items } = content.certifications;

  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((cert) => (
            <div key={cert.title} className="flex flex-col gap-3 text-center">
              <h4 className="font-(family-name:--font-jost) text-lg font-semibold">
                {cert.title}
              </h4>
              <p className="text-sm leading-relaxed text-(--dark-accent)">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
