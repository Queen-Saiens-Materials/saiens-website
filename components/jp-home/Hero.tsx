import content from "@/content/pages/home-jp.json";

export default function Hero(): React.JSX.Element {
  const { eyebrow, heading, bodyParagraphs } = content.hero;
  const [headingLine1, headingLine2] = heading.split("\n");

  return (
    <section className="relative flex flex-col items-center justify-center gap-8 bg-(--black) px-6 py-28 text-center text-(--white) sm:px-10 sm:py-36">
      <p className="text-sm tracking-[0.3em] text-(--accent) uppercase">
        {eyebrow}
      </p>
      <h1 className="font-(family-name:--font-jost) text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
        {headingLine1}
        <br />
        {headingLine2}
      </h1>
      <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-(--accent) sm:text-base">
        <p>{bodyParagraphs[0]}</p>
        <p>{bodyParagraphs[1]}</p>
        <p>{bodyParagraphs[2]}</p>
      </div>
    </section>
  );
}
