import Image from "next/image";
import content from "@/content/pages/home-jp.json";

export default function Process(): React.JSX.Element {
  const { headingEn, headingJa, backgroundImage, steps } = content.process;

  return (
    <section className="relative overflow-hidden bg-(--black) px-6 py-24 text-(--white) sm:px-10">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-(--black)/60" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingEn}
          <span className="mt-2 block text-lg font-normal text-(--accent)">
            {headingJa}
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col gap-3">
              <h3 className="font-(family-name:--font-jost) text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-(--white)/90">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
