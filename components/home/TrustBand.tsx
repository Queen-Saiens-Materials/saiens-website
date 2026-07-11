import Image from "next/image";

export default function TrustBand() {
  return (
    <section className="relative overflow-hidden bg-(--black) px-6 py-28 text-(--white) sm:px-10">
      <div className="absolute inset-0">
        <Image
          src="/images/1752483347189-VC4PBASC72Q7C9I1LQZB/3D_MQL422_3.jpg"
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
          您可以放心交給 Saiens
          <br />
          美感恆久，品質如一。
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-(--accent)">
          在 Saiens，我們相信真正的工藝，是設計與耐用的完美結合。
          我們不只是在打造表面，更希望成為您長久信賴的夥伴，
          陪伴每一個家的日常與未來。因為每一個家，都值得被祝福。
        </p>
      </div>
    </section>
  );
}
