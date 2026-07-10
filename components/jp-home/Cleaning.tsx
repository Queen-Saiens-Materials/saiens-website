export default function Cleaning(): React.JSX.Element {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-16 px-6 py-24 text-center sm:px-10">
      <div className="flex flex-col gap-6">
        <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight sm:text-4xl">
          <strong>Saiens で掃除はもっと簡単に。美しさは、手間なく長持ち。</strong>
        </h2>
        <p className="text-sm leading-relaxed text-(--dark-accent) sm:text-base">
          サイエンスでは、真のクラフトマンシップとはデザインと耐久性の完璧な融合であると信じています。
          私たちは単に表面を作るだけでなく、すべての住まいの日常と未来のための信頼できるパートナーでありたいと考えています。
          なぜなら、すべての家は祝福されるに値するからです。
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h4 className="font-(family-name:--font-jost) text-2xl tracking-tight">
          傷や汚れを気にせず、
          <br />
          心地よい暮らしを。
        </h4>
        <p className="text-sm leading-relaxed text-(--dark-accent) sm:text-base">
          私たちは、信頼できるカウンターパートナーとして、簡単なお手入れで汚れや傷の悩みから解放します。
          気を遣いすぎることなく、美しいキッチンと暮らしを長く楽しめるように。毎日をもっと自由に、もっと心地よく。
        </p>
      </div>
    </section>
  );
}
