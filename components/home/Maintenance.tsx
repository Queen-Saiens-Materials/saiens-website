import content from "@/content/pages/home-tw.json";

export default function Maintenance() {
  const { headingLine1, headingLine2, body, ctaLabel, ctaHref } =
    content.maintenance;

  return (
    <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h3 className="font-(family-name:--font-jost) max-w-2xl text-xl font-medium sm:text-2xl">
          {headingLine1}
          <span className="block text-(--dark-accent)">{headingLine2}</span>
        </h3>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-(--black)/80">
          {body}
        </p>

        <a
          href={ctaHref}
          className="mt-8 inline-block w-fit bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
