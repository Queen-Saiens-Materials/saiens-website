import Image from "next/image";

interface ProductItem {
  title: string;
  image: string;
}

const PRODUCTS: ProductItem[] = [
  {
    title: "MQ-737 Tranquilty Gold",
    image:
      "/images/1752483347170-Z8H6QP7PSP40LT3NYEH3/4803876482117202834.b30f005f6a2bf0eb7ff895d7412550c8.22100916.jpg",
  },
  {
    title: "QJ-3L323 Terrazo",
    image: "/images/1752483347173-V6IABIZ721GYVOS85SF9/__QJ3L323_2JPG.JPG",
  },
  {
    title: "MQ-759 Infinity",
    image: "/images/1752483347175-WQ8N0YW2UMK6IFI1EFCS/DSC02248+_1_.jpg",
  },
  {
    title: "ET-6015 Calacatta Gold",
    image: "/images/1752483347179-V7YIBVXI41V1L9MM8EUT/ET-6015.jpg",
  },
  {
    title: "ET-6005 Statuario Antique",
    image: "/images/1752483347182-8JRLWJMEKE292AYQO79E/ET-6005.jpg",
  },
];

export default function Products(): React.JSX.Element {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-20 sm:px-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: ProductItem;
}

function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--light-accent)">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover"
        />
      </div>
      <p className="text-sm tracking-wide text-(--black)">{product.title}</p>
    </div>
  );
}
