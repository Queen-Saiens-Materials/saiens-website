import type { ReactNode } from "react";
import Image from "next/image";

export type LegalSection =
  | { type: "heading"; level: 2 | 3 | 4; text: string; center?: boolean }
  | { type: "paragraph"; text: string; center?: boolean; small?: boolean }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; width: number; height: number; small?: boolean }
  | { type: "contact"; lines: string[] };

interface LegalPageProps {
  /** Large English tagline from the source hero (h1) */
  heroTagline: string;
  /** Localized secondary tagline from the source hero (h4) */
  heroSubtitle: string;
  sections: LegalSection[];
  /** Optional photo background for the hero section */
  heroImage?: { src: string; alt: string };
  /** Optional content rendered below the sections (e.g. a form) */
  children?: ReactNode;
}

const headingClasses: Record<2 | 3 | 4, string> = {
  2: "text-2xl md:text-3xl",
  3: "text-xl md:text-2xl",
  4: "text-lg md:text-xl",
};

function LegalSectionBlock({ section }: { section: LegalSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2
          className={`font-(family-name:--font-jost) whitespace-pre-line leading-snug tracking-tight ${
            headingClasses[section.level]
          } ${section.center ? "text-center" : ""}`}
        >
          {section.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          className={`leading-relaxed text-(--foreground) ${
            section.center ? "text-center" : ""
          } ${section.small ? "text-sm text-(--dark-accent)" : ""}`}
        >
          {section.text}
        </p>
      );
    case "list":
      return section.ordered ? (
        <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
          {section.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          {section.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-(--accent)">
                {section.headers.map((header, i) => (
                  <th key={i} className="py-3 pr-4 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i} className="border-b border-(--light-accent)">
                  {row.map((cell, j) => (
                    <td key={j} className="py-3 pr-4 leading-relaxed">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return (
        <div className={`mx-auto w-full ${section.small ? "max-w-[130px]" : "max-w-sm"}`}>
          <Image
            src={section.src}
            alt={section.alt}
            width={section.width}
            height={section.height}
            className="h-auto w-full"
          />
        </div>
      );
    case "contact":
      return (
        <div className="flex flex-col gap-1 text-center text-sm text-(--dark-accent)">
          {section.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function LegalPage({
  heroTagline,
  heroSubtitle,
  sections,
  heroImage,
  children,
}: LegalPageProps) {
  return (
    <main className="flex flex-1 flex-col bg-(--white) text-(--black)">
      <section className="relative isolate overflow-hidden bg-(--black) px-6 py-20 text-(--white) sm:px-10 md:py-28">
        {heroImage ? (
          <div className="absolute inset-0 -z-10">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              sizes="100vw"
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-(--black)/30" />
          </div>
        ) : null}
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h1 className="font-(family-name:--font-jost) whitespace-pre-line text-3xl leading-tight tracking-tight md:text-5xl">
            {heroTagline}
          </h1>
          <p className="whitespace-pre-line text-base leading-relaxed text-(--accent) md:text-lg">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16 md:py-24">
        {sections.map((section, i) => (
          <LegalSectionBlock key={i} section={section} />
        ))}
      </div>

      {children}
    </main>
  );
}
