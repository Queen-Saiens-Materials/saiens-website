import Image from "next/image";
import Carousel from "@/components/Carousel";
import content from "@/content/pages/home-usa.json";

export default function UsaCollection() {
  const { eyebrow, ctaLabel, items } = content.collection;

  return (
    <section className="bg-(--white) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-(--dark-accent)">
          {eyebrow}
        </p>
        <Carousel label="collection" className="mt-12">
          {items.map((item) => (
            <div
              key={item.title}
              className="group flex w-72 flex-col gap-4 sm:w-80"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--light-accent)">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="font-(family-name:--font-jost) text-xl tracking-tight">
                  {item.title}
                </h2>
                <span className="text-xs uppercase tracking-wide text-(--dark-accent)">
                  {ctaLabel}
                </span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
