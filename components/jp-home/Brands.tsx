"use client";

import { useState } from "react";
import Link from "next/link";

interface Brand {
  name: string;
  spec: string;
  thickness: string;
  scope?: string;
  features: string;
  href?: string;
}

const BRANDS: Brand[] = [
  {
    name: "QJ Quartz Stone（クォーツストーン・闊石）",
    spec: "320×160cm",
    thickness: "1.5cm",
    scope: "キッチンカウンター、浴室カウンター、壁、床",
    features: "抗菌・防汚、耐傷・耐摩耗、耐酸・耐アルカリ、非吸水、耐衝撃、半透明パターン",
    href: "https://qjquartzstone.com.tw/index.php",
  },
  {
    name: "Mikado Quartz（帝雉石／テイチセキ）",
    spec: "320×160cm",
    thickness: "2cm（ご希望により3cm）",
    features: "抗菌、防汚、防傷、耐摩耗、耐酸、非吸水、耐衝撃、半透明柄",
    href: "https://web.mikadoquartz.tw/",
  },
  {
    name: "ETERNOS（永恆石／エタノス）",
    spec: "320 x 160cm",
    thickness: "2cm / 1.2cm",
    scope: "キッチンカウンター、バスルームカウンター、壁、床",
    features: "抗菌・防汚、耐傷・耐摩耗、耐酸・耐アルカリ、非吸水、耐衝撃、半透明・モノブロック。",
    href: "https://www.eternos.us/",
  },
  {
    name: "nexea（ネクシア）",
    spec: "324 x 162cm",
    thickness: "1.2cm",
    scope: "屋内外、浴室カウンター、テレビ壁面、壁面",
    features: "抗菌・防汚、耐傷性・耐摩耗性、耐酸性・耐アルカリ性、非吸水性",
  },
];

export default function Brands(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="ourbrand" className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <h2 className="font-(family-name:--font-jost) text-3xl font-semibold tracking-tight sm:text-4xl">
            ブランド紹介
            <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
              Our Brand
            </span>
          </h2>
          <Link
            href="/visit-us-jp"
            className="inline-block w-fit bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
          >
            ショールームへ
          </Link>
        </div>

        <ul className="flex flex-col border-t border-(--accent)">
          {BRANDS.map((brand, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={brand.name} className="border-b border-(--accent)">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-(family-name:--font-jost) text-lg tracking-tight">
                    {brand.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-(--black)" />
                    <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-(--black)" />
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 pb-6 text-sm text-(--black)/80">
                      <dt className="text-(--dark-accent)">仕様｜</dt>
                      <dd>{brand.spec}</dd>
                      <dt className="text-(--dark-accent)">厚さ｜</dt>
                      <dd>{brand.thickness}</dd>
                      {brand.scope ? (
                        <>
                          <dt className="text-(--dark-accent)">用途｜</dt>
                          <dd>{brand.scope}</dd>
                        </>
                      ) : null}
                      <dt className="text-(--dark-accent)">特徴｜</dt>
                      <dd>{brand.features}</dd>
                      {brand.href ? (
                        <>
                          <dt className="text-(--dark-accent)">公式サイト｜</dt>
                          <dd>
                            <a
                              href={brand.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2 hover:text-(--black)"
                            >
                              公式サイト»
                            </a>
                          </dd>
                        </>
                      ) : null}
                    </dl>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
