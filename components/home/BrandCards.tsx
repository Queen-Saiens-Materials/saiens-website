"use client";

import { useState } from "react";
import Link from "next/link";
import content from "@/content/pages/home-tw.json";

export default function BrandCards() {
  // Squarespace original uses data-should-allow-multiple-open-items="false",
  // i.e. only one row expanded at a time.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { headingZh, headingEn, ctaLabel, ctaHref, items } = content.brands;

  return (
    <section id="ourbrand" className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <h2 className="font-(family-name:--font-jost) text-3xl font-semibold tracking-tight sm:text-4xl">
            {headingZh}
            <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
              {headingEn}
            </span>
          </h2>
          <Link
            href={ctaHref}
            className="inline-block w-fit bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
          >
            {ctaLabel}
          </Link>
        </div>

        <ul className="flex flex-col border-t border-(--accent)">
          {items.map((brand, index) => {
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
                      <dt className="text-(--dark-accent)">規格｜</dt>
                      <dd>{brand.spec}</dd>
                      <dt className="text-(--dark-accent)">厚度｜</dt>
                      <dd>{brand.thickness}</dd>
                      {brand.scope ? (
                        <>
                          <dt className="text-(--dark-accent)">適用範圍｜</dt>
                          <dd>{brand.scope}</dd>
                        </>
                      ) : null}
                      <dt className="text-(--dark-accent)">特色｜</dt>
                      <dd>{brand.features}</dd>
                      <dt className="text-(--dark-accent)">官網｜</dt>
                      <dd>
                        <a
                          href={brand.href}
                          target={brand.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            brand.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="underline underline-offset-2 hover:text-(--black)"
                        >
                          官網»
                        </a>
                      </dd>
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
