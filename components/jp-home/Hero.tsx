export default function Hero(): React.JSX.Element {
  return (
    <section className="relative flex flex-col items-center justify-center gap-8 bg-(--black) px-6 py-28 text-center text-(--white) sm:px-10 sm:py-36">
      <p className="text-sm tracking-[0.3em] text-(--accent) uppercase">
        BLESS EVERY HOME&amp;FAMILY
      </p>
      <h1 className="font-(family-name:--font-jost) text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
        すべての
        <br />
        家と家族に祝福を
      </h1>
      <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-(--accent) sm:text-base">
        <p>
          Saiens（山恩グループ）は、トップクラスのマテリアルサイエンス統合企業を目指しています。2019年の創業以来、「科学」と「美学」を融合させ、実用性と芸術性を兼ね備えた卓越したマテリアルを生み出してきました。
        </p>
        <p>
          自社生産のアメリカ産クォーツブランド Mikado Quartz（帝雉石）、手頃で幅広く使えるクォーツブランド QJ
          Quartz Stone（闊石）、革新的なマテリアル Eternos（永恆石）、そしてイタリアの著名タイルブランド
          atlasPLAN（亞特蘭陶瓷薄板）
          の代理を通じて、Saiensはお客様にあらゆるマテリアルを提供します。
        </p>
        <p>
          研究開発技術、マテリアル統合、専門知識を駆使し、高品質・ハイスタンダードなブランドコンセプトで、お客様にとって最も信頼できるマテリアルパートナーとなることを目指しています。
        </p>
      </div>
    </section>
  );
}
