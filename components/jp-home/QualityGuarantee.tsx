import Image from "next/image";
import content from "@/content/pages/home-jp.json";

export default function QualityGuarantee(): React.JSX.Element {
  const { headingJa, headingEn, body, ctaLabel, ctaHref, badges } =
    content.qualityGuarantee;

  return (
    <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <h2 className="font-(family-name:--font-jost) max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingJa}
          <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
            {headingEn}
          </span>
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-(--black)/80">
          {body}
        </p>

        <a
          href={ctaHref}
          className="inline-block bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
        >
          {ctaLabel}
        </a>

        <div className="mt-8 grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
          {badges.map((badge) => (
            <div key={badge.image} className="relative aspect-[4/3] w-full">
              <Image
                src={badge.image}
                alt={badge.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
