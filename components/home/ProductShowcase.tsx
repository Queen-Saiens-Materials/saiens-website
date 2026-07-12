import Image from "next/image";
import Carousel from "@/components/Carousel";
import content from "@/content/pages/home-tw.json";

export default function ProductShowcase() {
  const { heading, ctaLabel, items } = content.products;

  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>

        <Carousel label="products" className="mt-16">
          {items.map((product) => (
            <a
              key={product.code}
              href={product.link}
              target={product.link.startsWith("http") ? "_blank" : undefined}
              rel={
                product.link.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex w-72 flex-col gap-4 sm:w-80"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--accent)">
                <Image
                  src={product.image}
                  alt={`${product.code} ${product.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-(family-name:--font-jost) text-lg tracking-tight">
                {product.code}
                <span className="ml-2 text-(--dark-accent)">
                  {product.name}
                </span>
              </h3>
              <span className="inline-block w-fit bg-(--black) px-4 py-2 text-xs uppercase tracking-wide text-(--white)">
                {ctaLabel}
              </span>
            </a>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
