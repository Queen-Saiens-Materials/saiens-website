import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "追蹤我們 | Saiens",
  description: "追蹤我們，請你喝一杯 ☕",
};

interface FollowLink {
  brand: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
}

// Source: archive/html/follow-us.html — three co-exhibiting brands each
// have their own "追蹤 IG" (Follow IG) button.
const FOLLOW_LINKS: FollowLink[] = [
  {
    brand: "遠雄・馥麗生活",
    href: "https://www.instagram.com/farglory.hauslab?igsh=MWNyOW11ZDMxNTFpZw==",
    logoSrc: "/images/292dee50-d779-4813-b37f-c896c8e25e16/IMG_4642.PNG",
    logoWidth: 712,
    logoHeight: 167,
  },
  {
    brand: "Saiens 山恩",
    href: "https://www.instagram.com/saiens.tw?igsh=dTU1M3BnOHBzNGxh",
    logoSrc: "/images/26e0957c-b1be-47b8-a31a-275504f344dd/logo+black.png",
    logoWidth: 2500,
    logoHeight: 440,
  },
  {
    brand: "集力門 Gili Door",
    href: "https://www.instagram.com/gili_door?igsh=MXVrZHlmMjB3YmM4cg==",
    logoSrc: "/images/577508f9-0fcb-42ca-b8a8-49dfdf3dc9e6/Gili______+1.png",
    logoWidth: 2500,
    logoHeight: 834,
  },
];

export default function FollowUsPage() {
  return (
    <main className="relative flex w-full flex-1 flex-col overflow-hidden bg-(--black) text-(--white)">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/e12de6d4-6bd4-4406-80cf-e9676e232119/usethis.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-12 px-6 py-16 text-center md:py-24">
        <header className="flex flex-col gap-1">
          <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
            追蹤我們
          </h2>
          <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
            請你喝一杯 ☕
          </h2>
        </header>

        <div className="flex w-full flex-col gap-10 sm:flex-row sm:justify-center sm:gap-8">
          {FOLLOW_LINKS.map((link) => (
            <div
              key={link.brand}
              className="flex flex-1 flex-col items-center gap-4"
            >
              <div className="relative h-16 w-full max-w-[220px]">
                <Image
                  src={link.logoSrc}
                  alt={link.brand}
                  width={link.logoWidth}
                  height={link.logoHeight}
                  className="h-full w-full object-contain"
                />
              </div>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-(--white) px-8 py-3 text-sm font-medium text-(--black) transition-opacity hover:opacity-80"
              >
                追蹤 IG
              </a>
            </div>
          ))}
        </div>

        <h3 className="font-(family-name:--font-jost) text-xl tracking-tight md:text-2xl">
          完成追蹤後，請點擊下方按鈕
        </h3>

        <Link
          href="/follow-complete"
          className="inline-flex items-center justify-center bg-(--white) px-8 py-3 text-sm font-medium text-(--black) transition-opacity hover:opacity-80"
        >
          [ 完成追蹤，領取飲品 → ]
        </Link>
      </div>
    </main>
  );
}
