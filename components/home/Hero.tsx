export default function Hero() {
  return (
    <section className="bg-(--black) px-6 py-28 text-(--light-accent) sm:px-10 sm:py-36">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <h1 className="font-(family-name:--font-jost) text-4xl font-semibold uppercase tracking-tight sm:text-5xl md:text-6xl">
          Bless Every Home&amp;Family
        </h1>
        <p className="whitespace-pre-line text-sm leading-relaxed text-(--accent) sm:text-base">
          {`Saiens 山恩集團致力於成為頂尖的材料科學整合商，自 2019 年創辦以來，以「科學」結合「美學」創造出兼具實用性與藝術性的卓越材料。
結合本地生產的美國石英石品牌 Mikado Quartz 帝雉石、平價大眾石英石 QJ Quartz Stone 闊石、創新材料 Eternos 永恆石、代理義大利知名陶板品牌 atlasPLAN 亞特蘭陶瓷薄板，山恩提供客戶全方位的材料，透過研發技術、材料整合和專業知識，以高品質、高規格的品牌概念，成為客戶最值得信賴的材料夥伴。`}
        </p>
      </div>
    </section>
  );
}
