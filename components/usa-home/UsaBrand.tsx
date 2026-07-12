import Link from "next/link";
import content from "@/content/pages/home-usa.json";

export default function UsaBrand() {
  const { heading, ctaLabel, ctaHref, names } = content.brand;

  return (
    <section
      id="ourbrand"
      className="bg-(--light-accent) px-6 py-24 text-(--foreground) sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-(family-name:--font-jost) text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <Link
            href={ctaHref}
            className="text-xs uppercase tracking-[0.2em] text-(--dark-accent) transition-colors hover:text-(--foreground)"
          >
            {ctaLabel}
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {names.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center border border-(--accent) px-6 py-16 transition-colors hover:border-(--dark-accent)"
            >
              <h4 className="font-(family-name:--font-jost) text-xl uppercase tracking-wide">
                {brand}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
