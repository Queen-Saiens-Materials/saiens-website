import Link from "next/link";
import content from "@/content/pages/home-usa.json";

export default function UsaWarranty() {
  const { headingPrefix, headingStrong, headingSuffix, body, ctaLabel, ctaHref } =
    content.warranty;

  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-(family-name:--font-jost) text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingPrefix}
          <strong className="font-semibold">{headingStrong}</strong>
          {headingSuffix}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-(--dark-accent) sm:text-base">
          {body}
        </p>
        <Link
          href={ctaHref}
          className="mt-8 inline-block border border-(--accent) px-6 py-3 text-sm uppercase tracking-wide text-(--foreground) transition-colors hover:bg-(--accent) hover:text-(--black)"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
