import content from "@/content/pages/home-tw.json";

export default function CleaningIntro() {
  const { heading, body } = content.cleaning;

  return (
    <section className="bg-(--black) px-6 py-24 text-(--white) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-(--accent)">
          {body}
        </p>
      </div>
    </section>
  );
}
