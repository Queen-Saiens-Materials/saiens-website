import Image from "next/image";

export default function BrandPromise(): React.JSX.Element {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center gap-8 overflow-hidden px-6 py-24 text-center sm:px-10">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/1752483347189-VC4PBASC72Q7C9I1LQZB/3D_MQL422_3.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-(--black)/40" />
      </div>
      <h2 className="max-w-3xl font-(family-name:--font-jost) text-3xl leading-snug tracking-tight text-(--white) sm:text-4xl">
        Saiensに託せば、
        <br />
        変わらぬ美しさと確かな品質を。
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-(--white) sm:text-base">
        <strong>
          Saiensは、デザインの美しさと耐久性の確かさが響き合うときに、本当のクラフトマンシップが生まれると信じています。
          私たちはただ表面をつくるのではなく、長く信頼されるパートナーとして、日々の暮らしや未来に寄り添います。
          すべての家庭が祝福される存在だからこそ。
        </strong>
      </p>
    </section>
  );
}
