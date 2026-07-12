import Image from "next/image";
import Carousel from "@/components/Carousel";
import content from "@/content/pages/home-jp.json";

interface ProductItem {
  title: string;
  image: string;
  link: string;
}

export default function Products(): React.JSX.Element {
  const { heading, ctaLabel, items } = content.products;

  return (
    <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>

        <Carousel label="製品" className="mt-16">
          {items.map((product) => (
            <ProductCard key={product.title} product={product} ctaLabel={ctaLabel} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: ProductItem;
  ctaLabel: string;
}

function ProductCard({ product, ctaLabel }: ProductCardProps): React.JSX.Element {
  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-72 flex-col gap-4 sm:w-80"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--accent)">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="font-(family-name:--font-jost) text-lg tracking-tight">
        {product.title}
      </h3>
      <span className="inline-block w-fit bg-(--black) px-4 py-2 text-xs uppercase tracking-wide text-(--white)">
        {ctaLabel}
      </span>
    </a>
  );
}
