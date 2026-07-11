import Image from "next/image";
import Carousel from "@/components/Carousel";

interface CollectionItem {
  title: string;
  image: string;
  alt: string;
}

const ITEMS: CollectionItem[] = [
  {
    title: "Dream it.",
    image:
      "/images/1618497259178-6XJGK9GR6YAVBQL5L519/20140301_Trade-151_012-2.jpg",
    alt: "Dream it — quartz countertop in a modern kitchen",
  },
  {
    title: "Build it.",
    image:
      "/images/1607694583486-2PQT0LQ193RL7MCB6DX4/20140228_Trade+151_0046.jpg",
    alt: "Build it — quartz surface installation",
  },
  {
    title: "Grow it.",
    image: "/images/1607694644871-IC85FNH781UNZSZEGHDR/Aro+Ha_0428.jpg",
    alt: "Grow it — quartz surface in a living space",
  },
  {
    title: "Sell it.",
    image:
      "/images/1589847767761-J2M1HI20BXRQ9XCR0HUD/Large+JPG-Aro+Ha_0387.jpg",
    alt: "Sell it — quartz surface showroom display",
  },
];

export default function UsaCollection() {
  return (
    <section className="bg-(--white) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-(--dark-accent)">
          More Collection
        </p>
        <Carousel label="collection" className="mt-12">
          {ITEMS.map((item) => (
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
                  Discover More
                </span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
