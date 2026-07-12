import Carousel from "@/components/Carousel";
import content from "@/content/pages/home-jp.json";

export default function Certifications(): React.JSX.Element {
  const { items } = content.certifications;

  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Carousel label="certifications">
          {items.map((cert) => (
            <div key={cert.title} className="w-72 sm:w-80">
              <h3 className="font-(family-name:--font-jost) text-base font-semibold">
                <span aria-hidden="true">・</span> {cert.title}
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
