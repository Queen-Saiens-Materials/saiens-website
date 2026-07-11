export default function Cleaning(): React.JSX.Element {
  return (
    <>
      <section className="bg-(--black) px-6 py-24 text-(--white) sm:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-(family-name:--font-jost) max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Saiensで掃除はもっと簡単に。美しさは、手間なく長持ち。
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-(--accent)">
            サイエンスでは、真のクラフトマンシップとはデザインと耐久性の完璧な融合であると信じています。
            私たちは単に表面を作るだけでなく、すべての住まいの日常と未来のための信頼できるパートナーでありたいと考えています。
            なぜなら、すべての家は祝福されるに値するからです。
          </p>
        </div>
      </section>

      <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
        <div className="mx-auto max-w-6xl">
          <h3 className="font-(family-name:--font-jost) max-w-2xl text-xl font-medium sm:text-2xl">
            傷や汚れを気にせず、
            <span className="block text-(--dark-accent)">心地よい暮らしを。</span>
          </h3>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-(--black)/80">
            私たちは、信頼できるカウンターパートナーとして、簡単なお手入れで汚れや傷の悩みから解放します。
            気を遣いすぎることなく、美しいキッチンと暮らしを長く楽しめるように。毎日をもっと自由に、もっと心地よく。
          </p>

          <a
            href="/japan-maintenance-manual"
            className="mt-8 inline-block w-fit bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
          >
            清掃ガイドとサービスの詳細を見る
          </a>
        </div>
      </section>
    </>
  );
}
