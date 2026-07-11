import Image from "next/image";
import Carousel from "@/components/Carousel";

interface Product {
  code: string;
  name: string;
  image: string;
  link: string;
}

const PRODUCTS: Product[] = [
  {
    code: "MQ-737",
    name: "Tranquilty Gold",
    image:
      "/images/1752483347170-Z8H6QP7PSP40LT3NYEH3/4803876482117202834.b30f005f6a2bf0eb7ff895d7412550c8.22100916.jpg",
    link: "https://web.mikadoquartz.tw/zh-TW/products/tranquility-gold",
  },
  {
    code: "QJ-3L323",
    name: "Terrazo",
    image: "/images/1752483347173-V6IABIZ721GYVOS85SF9/__QJ3L323_2JPG.JPG",
    link: "/#ourbrand",
  },
  {
    code: "MQ-759",
    name: "Infinity",
    image: "/images/1752483347175-WQ8N0YW2UMK6IFI1EFCS/DSC02248+_1_.jpg",
    link: "https://web.mikadoquartz.tw/zh-TW/products/infinity",
  },
  {
    code: "ET-6015",
    name: "Calacatta Gold",
    image: "/images/1752483347179-V7YIBVXI41V1L9MM8EUT/ET-6015.jpg",
    link: "https://www.eternos.tw/et-6005/",
  },
  {
    code: "ET-6005",
    name: "Statuario Antique",
    image: "/images/1752483347182-8JRLWJMEKE292AYQO79E/ET-6005.jpg",
    link: "https://www.eternos.tw/et-6005/",
  },
];

export default function ProductShowcase() {
  return (
    <section className="bg-(--black) px-6 py-24 text-(--light-accent) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          More Collection
        </h2>

        <Carousel label="products" className="mt-16">
          {PRODUCTS.map((product) => (
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
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--dark-accent)">
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
              <span className="text-xs uppercase tracking-wide text-(--dark-accent)">
                Discover More
              </span>
            </a>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
