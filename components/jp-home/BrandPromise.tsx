import Image from "next/image";

export default function BrandPromise(): React.JSX.Element {
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
          Saiensに託せば、
          <br />
          変わらぬ美しさと確かな品質を。
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-(--accent)">
          Saiensは、デザインの美しさと耐久性の確かさが響き合うときに、本当のクラフトマンシップが生まれると信じています。
          私たちはただ表面をつくるのではなく、長く信頼されるパートナーとして、日々の暮らしや未来に寄り添います。
          すべての家庭が祝福される存在だからこそ。
        </p>
      </div>
    </section>
  );
}
