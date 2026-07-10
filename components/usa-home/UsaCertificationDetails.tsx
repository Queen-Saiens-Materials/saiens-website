import Image from "next/image";

export default function UsaCertificationDetails() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
        <div className="relative h-24 w-24 shrink-0">
          <Image
            src="/images/63708724-1b26-4689-91fc-8f3896eacb78/4-Greenguard.png"
            alt="Green UL Greenguard product label for low chemical emissions, featuring a leaf symbol and the word 'GOLD' at the bottom."
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-(family-name:--font-jost) text-xl font-semibold">
            GREENGUARD
          </h4>
          <p className="text-sm leading-relaxed text-(--dark-accent)">
            GREENGUARD: All Caesarstone quartz surfaces comply with GREENGUARD
            certification, verifying that Caesarstone products meet the most
            stringent indoor air emission standards.
          </p>
          <p className="text-sm leading-relaxed text-(--dark-accent)">
            GREENGUARD GOLD: All Caesarstone quartz surfaces comply with the
            GREENGUARD GOLD standard (formerly known as GREENGUARD Children
            &amp; Schools Certification), which evaluates the sensitive nature
            of school populations combined with the unique building
            characteristics found in schools, and presents the most rigorous
            product emissions criteria to date.
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
        <div className="relative h-24 w-24 shrink-0">
          <Image
            src="/images/bc44ec55-f26b-4dce-8c49-6040daa276b9/images.png"
            alt="SGS logo in gray with orange lines"
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-(family-name:--font-jost) text-xl font-semibold">
            SCS Global Services
          </h4>
          <p className="text-sm leading-relaxed text-(--dark-accent)">
            As a global leader in independent certification and verification
            of environmental and sustainable stewardship, SCS Global Services
            has developed internationally recognized standards and
            certification programs to achieve the highest environmental
            performance and social accountability level.
          </p>
          <p className="text-sm leading-relaxed text-(--dark-accent)">
            Some Caesarstone models are SCS-certified for recycled content,
            made with up to 50% pre-consumer recycled crushed glass content.
          </p>
          <p className="text-sm leading-relaxed text-(--dark-accent)">
            For specific percentage and type of recycled materials used,
            download and review the certification below.
          </p>
        </div>
      </div>
    </section>
  );
}
