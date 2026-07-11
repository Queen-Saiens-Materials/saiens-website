import Image from "next/image";
import Carousel from "@/components/Carousel";

interface ProductItem {
  title: string;
  image: string;
  link: string;
}

const PRODUCTS: ProductItem[] = [
  {
    title: "MQ-737 Tranquilty Gold",
    image:
      "/images/1752483347170-Z8H6QP7PSP40LT3NYEH3/4803876482117202834.b30f005f6a2bf0eb7ff895d7412550c8.22100916.jpg",
    link: "https://web.mikadoquartz.tw/zh-TW/products/tranquility-gold",
  },
  {
    title: "QJ-3L323 Terrazo",
    image: "/images/1752483347173-V6IABIZ721GYVOS85SF9/__QJ3L323_2JPG.JPG",
    link: "https://qjquartzstone.com.tw/product_detail.php?id=15",
  },
  {
    title: "MQ-759 Infinity",
    image: "/images/1752483347175-WQ8N0YW2UMK6IFI1EFCS/DSC02248+_1_.jpg",
    link: "https://web.mikadoquartz.tw/zh-TW/products/infinity",
  },
  {
    title: "ET-6015 Calacatta Gold",
    image: "/images/1752483347179-V7YIBVXI41V1L9MM8EUT/ET-6015.jpg",
    link: "https://www.eternos.us/et-6015/",
  },
  {
    title: "ET-6005 Statuario Antique",
    image: "/images/1752483347182-8JRLWJMEKE292AYQO79E/ET-6005.jpg",
    link: "https://www.eternos.tw/et-6005/",
  },
];

export default function Products(): React.JSX.Element {
  return (
    <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          コレクションをもっと見る
        </h2>

        <Carousel label="製品" className="mt-16">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: ProductItem;
}

function ProductCard({ product }: ProductCardProps): React.JSX.Element {
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
        もっと詳しく知る
      </span>
    </a>
  );
}
