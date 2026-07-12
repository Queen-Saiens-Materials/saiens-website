import content from "@/content/pages/home-jp.json";

export default function Cleaning(): React.JSX.Element {
  const { section1, section2 } = content.cleaning;

  return (
    <>
      <section className="bg-(--black) px-6 py-24 text-(--white) sm:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-(family-name:--font-jost) max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {section1.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-(--accent)">
            {section1.body}
          </p>
        </div>
      </section>

      <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
        <div className="mx-auto max-w-6xl">
          <h3 className="font-(family-name:--font-jost) max-w-2xl text-xl font-medium sm:text-2xl">
            {section2.headingLine1}
            <span className="block text-(--dark-accent)">{section2.headingLine2}</span>
          </h3>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-(--black)/80">
            {section2.body}
          </p>

          <a
            href={section2.ctaHref}
            className="mt-8 inline-block w-fit bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
          >
            {section2.ctaLabel}
          </a>
        </div>
      </section>
    </>
  );
}
