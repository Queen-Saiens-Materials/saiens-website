import Carousel from "@/components/Carousel";
import content from "@/content/pages/home-tw.json";

export default function QualityAssurance() {
  const { headingZh, headingEn, body, ctaLabel, ctaHref, certifications } =
    content.qualityAssurance;

  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingZh}
          <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
            {headingEn}
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-(--black)/80">
          {body}
        </p>

        <div className="mt-8 text-center">
          <a
            href={ctaHref}
            className="inline-block bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
          >
            {ctaLabel}
          </a>
        </div>

        <Carousel label="certifications" className="mt-16">
          {certifications.map((cert) => (
            <div key={cert.name} className="w-72 sm:w-80">
              <h3 className="font-(family-name:--font-jost) text-base font-semibold">
                <span aria-hidden="true">・</span> {cert.name}
              </h3>
              <p className="mt-2 text-sm text-(--black)/80">
                {cert.description}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
