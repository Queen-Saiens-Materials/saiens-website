import Image from "next/image";
import content from "@/content/pages/home-tw.json";

export default function TrustBand() {
  const { backgroundImage, heading, body } = content.trustBand;
  const [headingLine1, headingLine2] = heading.split("\n");

  return (
    <section className="relative overflow-hidden bg-(--black) px-6 py-28 text-(--white) sm:px-10">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-(--black)/40" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <h2 className="font-(family-name:--font-jost) text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingLine1}
          <br />
          {headingLine2}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-(--accent)">
          {body}
        </p>
      </div>
    </section>
  );
}
