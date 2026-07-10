interface Certification {
  title: string;
  description: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    title: "UL GREENGUARD Gold Certification",
    description:
      "Certified that the material does not pose any harm to human health.",
  },
  {
    title: "NSF Certification",
    description:
      "Certified that the material is suitable for all applications and safe for direct contact with food.",
  },
  {
    title: "CE Certification (Conformité Européenne)",
    description:
      "Certified that the material complies with relevant European Union directives and has completed the required assessment procedures.",
  },
  {
    title: "SGS Certification (Global Testing Organization)",
    description:
      "Certified by SGS, verifying the material's excellent physical properties.",
  },
];

export default function UsaCertifications() {
  return (
    <section className="bg-(--light-accent) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.title} className="flex flex-col gap-3 text-center">
              <h4 className="font-(family-name:--font-jost) text-lg font-semibold">
                {cert.title}
              </h4>
              <p className="text-sm leading-relaxed text-(--dark-accent)">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
