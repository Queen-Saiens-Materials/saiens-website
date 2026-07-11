import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Visit Us | Plan Your Visit Today — Saiens",
  description:
    "Visit Saiens locations in Taipei, Taichung, and Kaohsiung. Schedule your visit today for a personalized experience at our showrooms.",
};

const LINE_URL = "https://line.me/R/ti/p/@154cxzgk?oat_content=url";

const MAP_TAIPEI =
  "https://www.google.com/maps/place/%E5%8F%B0%E5%8C%97%EF%BD%9CSaiens%E5%B1%B1%E6%81%A9%EF%BD%9CMikado+Quartz%E5%B8%9D%E9%9B%89%E7%9F%B3%EF%BD%9CQJ+Quartz+Stone%E9%97%8A%E7%9F%B3%EF%BD%9C%E5%A4%A7%E7%90%86%E7%9F%B3%E7%B4%8B%E7%9F%B3%E8%8B%B1%E7%9F%B3/@25.0582903,121.5986306,17z/data=!3m1!4b1!4m6!3m5!1s0x3442ab6d22a39d13:0xff06d8343f329fb1!8m2!3d25.0582903!4d121.6012109!16s%2Fg%2F11n2tgwcp_?entry=ttu";
const MAP_TAICHUNG =
  "https://www.google.com/maps/place/408%E5%8F%B0%E4%B8%AD%E5%B8%82%E5%8D%97%E5%B1%AF%E5%8D%80%E6%83%A0%E4%B8%AD%E8%B7%AF%E4%BA%8C%E6%AE%B5152%E8%99%9F/@24.1541264,120.6403112,17z/data=!3m1!4b1!4m6!3m5!1s0x34693deb088502a9:0x53deb2ea8200a2d2!8m2!3d24.1541264!4d120.6403112!16s%2Fg%2F11jd9flg6s?hl=zh-TW&entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D";
const MAP_KAOHSIUNG =
  "https://www.google.com/maps/place/%E6%99%82%E4%BB%A3%E5%AF%8C%E8%B1%AA%E5%84%AA%E7%94%9F%E4%BC%81%E6%A5%AD%E5%A4%A7%E6%A8%93/@22.6650703,120.3035751,17z/data=!3m1!4b1!4m6!3m5!1s0x346e050421ec5ee7:0xdf18b2dfb045e9c0!8m2!3d22.6650703!4d120.3035751!16s%2Fg%2F11gfcycwqb?hl=zh-TW&entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D";

interface ShowroomImage {
  src: string;
  alt: string;
}

interface Showroom {
  city: string;
  label: string;
  mapUrl: string;
  address: string;
  details: string[];
  image: ShowroomImage;
}

const SHOWROOMS: Showroom[] = [
  {
    city: "TAIPEI",
    label: "台北ショールーム（予約制）",
    mapUrl: MAP_TAIPEI,
    address: "台北市南港区松河街616号 1階",
    details: [
      "TEL：02-2745-8089",
      "営業時間：月曜～金曜 10:00～17:30",
      "土曜 10:30～17:30",
    ],
    image: {
      src: "/images/1752483355394-S7BQJS9E2WDWS4K5L0Z7/20240427-DSC02520+_.jpg",
      alt: "Modern interior of a building with white and black design elements, large windows, a marble table, chairs, and decorative lighting.",
    },
  },
  {
    city: "TAICHUNG",
    label: "台中ショールーム（予約制）",
    mapUrl: MAP_TAICHUNG,
    address: "台中市南屯区惠中路二段152号",
    details: [
      "TEL：04-2251-1850",
      "営業時間：月曜～金曜 10:00～17:30",
      "土曜：ご見学をご希望の方は、事前にご予約ください。",
    ],
    image: {
      src: "/images/1752483355397-IKXIVP1M269EKLDAI5QY/DSC02212.jpg",
      alt: "Modern minimalist waiting area with a long beige sofa, orange headboard-style cushions, a small black Marshall speaker, and a set of minimalist white and gray tiered coffee tables.",
    },
  },
  {
    city: "KAOHSIUNG",
    label: "高雄ショールーム（予約制）",
    mapUrl: MAP_KAOHSIUNG,
    address: "高雄市左営区博愛二路366号 2階",
    details: [
      "TEL：04-2251-1850",
      "営業時間：月曜～金曜 10:00～17:30",
      "土曜：ご見学をご希望の方は、事前にご予約ください。",
    ],
    image: {
      src: "/images/1752483355401-9MF2AH9D83UD0DUXWEAE/2023-03-15.png",
      alt: "Interior display of large marble and stone slabs in a showroom, with modern ceiling lights and a marble countertop.",
    },
  },
];

const LINK_CLASS =
  "underline underline-offset-4 transition-colors hover:text-(--dark-accent)";

const MARQUEE_ITEMS = Array.from({ length: 16 }, (_, i) => i);

// Display order matches the original site's side-by-side arch layout:
// Taichung (left) / Taipei (center, larger) / Kaohsiung (right).
const DISPLAY_ORDER = [1, 0, 2];

export default function VisitUsJpPage() {
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
                <p className="whitespace-pre-wrap font-(family-name:--font-noto-tc) text-base leading-relaxed">
                  <a
                    href={showroom.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {showroom.address}
                  </a>
                  <br />
                  {showroom.details.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < showroom.details.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
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
