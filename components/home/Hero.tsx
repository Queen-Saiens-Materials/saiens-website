import content from "@/content/pages/home-tw.json";

export default function Hero() {
  return (
    <section className="bg-(--black) px-6 py-28 text-(--light-accent) sm:px-10 sm:py-36">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <h1 className="font-(family-name:--font-jost) text-4xl font-semibold uppercase tracking-tight sm:text-5xl md:text-6xl">
          {content.hero.heading}
        </h1>
        <p className="whitespace-pre-line text-sm leading-relaxed text-(--accent) sm:text-base">
          {content.hero.body}
        </p>
      </div>
    </section>
  );
}
