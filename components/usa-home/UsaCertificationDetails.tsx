import Image from "next/image";
import content from "@/content/pages/home-usa.json";

export default function UsaCertificationDetails() {
  const [greenguard, scs] = content.certificationDetails;

  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
          <div className="relative h-24 w-24 shrink-0">
            <Image
              src={greenguard.image}
              alt={greenguard.alt}
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-(family-name:--font-jost) text-xl font-semibold">
              {greenguard.heading}
            </h4>
            <p className="text-sm leading-relaxed text-(--dark-accent)">
              {greenguard.paragraphs[0]}
            </p>
            <p className="text-sm leading-relaxed text-(--dark-accent)">
              {greenguard.paragraphs[1]}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
          <div className="relative h-24 w-24 shrink-0">
            <Image
              src={scs.image}
              alt={scs.alt}
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-(family-name:--font-jost) text-xl font-semibold">
              {scs.heading}
            </h4>
            <p className="text-sm leading-relaxed text-(--dark-accent)">
              {scs.paragraphs[0]}
            </p>
            <p className="text-sm leading-relaxed text-(--dark-accent)">
              {scs.paragraphs[1]}
            </p>
            <p className="text-sm leading-relaxed text-(--dark-accent)">
              {scs.paragraphs[2]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
