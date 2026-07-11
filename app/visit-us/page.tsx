import type { Metadata } from "next";
import Image from "next/image";
import { LINE_URL, SHOWROOMS } from "@/config/site";

export const metadata: Metadata = {
  title: "Visit Us | Plan Your Visit Today — Saiens",
  description:
    "Visit Saiens locations in Taipei, Taichung, and Kaohsiung. Schedule your visit today for a personalized experience at our showrooms.",
};

const LINK_CLASS =
  "underline underline-offset-4 transition-colors hover:text-(--dark-accent)";

const MARQUEE_ITEMS = Array.from({ length: 16 }, (_, i) => i);

// Display order matches the original site's side-by-side arch layout:
// Taichung (left) / Taipei (center, larger) / Kaohsiung (right).
const DISPLAY_ORDER = [1, 0, 2];

export default function VisitUsPage() {
  return (
    <main className="flex flex-1 flex-col pb-8">
      <p className="px-6 pt-12 text-center">
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          Customer service&nbsp;
        </a>{" "}
        /
        <a href="mailto:service@saiens.tw" className={LINK_CLASS}>
          Email us
        </a>
      </p>

      <ShowroomSection />
    </main>
  );
}

function ShowroomSection() {
  return (
    <section className="relative mt-10 overflow-hidden bg-(--black) py-20 text-(--white)">
      <MarqueeBand />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-20 px-6 md:flex-row md:items-start md:justify-center md:gap-6">
        {DISPLAY_ORDER.map((index) => {
          const showroom = SHOWROOMS[index];
          const isTaipei = showroom.city === "TAIPEI";

          return (
            <div
              key={showroom.city}
              className={`flex flex-col items-center text-center ${
                isTaipei ? "md:-mt-12 md:w-80" : "md:mt-10 md:w-64"
              }`}
            >
              <div
                className={`relative aspect-[3/4] w-56 overflow-hidden rounded-t-full bg-(--light-accent) ${
                  isTaipei ? "md:w-72" : "md:w-56"
                }`}
              >
                <Image
                  src={showroom.image.src}
                  alt={showroom.image.alt}
                  fill
                  sizes="(max-width: 768px) 224px, 288px"
                  priority={isTaipei}
                  className="object-cover"
                />
              </div>

              <div className="mx-auto mt-8 flex w-full max-w-xs flex-col gap-4">
                <h1 className="font-(family-name:--font-jost) text-4xl tracking-tight md:text-5xl">
                  {showroom.city}
                </h1>
                <h4 className="font-(family-name:--font-jost) text-lg text-(--dark-accent)">
                  {showroom.label}
                </h4>
                <pre className="whitespace-pre-wrap font-(family-name:--font-noto-tc) text-base leading-relaxed">
                  <code>
                    <a
                      href={showroom.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLASS}
                    >
                      {showroom.address}
                    </a>
                    {"\n"}
                    <a href={showroom.telHref} className={LINK_CLASS}>
                      {showroom.telLabel}
                    </a>
                  </code>
                </pre>
                <pre className="whitespace-pre-wrap font-(family-name:--font-noto-tc) text-base leading-relaxed">
                  <code>{showroom.hours.join("\n")}</code>
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MarqueeBand() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-14 z-0 overflow-hidden whitespace-nowrap py-4 text-(--white) md:top-20">
      <style>{`
        @keyframes visit-us-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="inline-flex will-change-transform"
        style={{ animation: "visit-us-marquee 30s linear infinite" }}
        aria-hidden
      >
        {MARQUEE_ITEMS.map((i) => (
          <span
            key={i}
            className="px-8 font-(family-name:--font-jost) text-2xl uppercase tracking-widest opacity-60"
          >
            #VISIT US
          </span>
        ))}
      </div>
      <span className="sr-only">#VISIT US</span>
    </div>
  );
}
