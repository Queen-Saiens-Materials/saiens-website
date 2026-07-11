export default function Maintenance() {
  return (
    <section className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h3 className="font-(family-name:--font-jost) max-w-2xl text-xl font-medium sm:text-2xl">
          揮別檯面吃色、刮傷的困擾
          <span className="block text-(--dark-accent)">擁抱零煩惱居家美學。</span>
        </h3>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-(--black)/80">
          作為您最值得信賴的檯面材料夥伴，我們的使命是透過簡單的清潔和保養來幫助您擺脫檯面吃色和刮傷的煩惱。藉此，您可以享受無煩惱的居家美學，不再需要對著污染吃色的檯面皺眉，也不需要提心吊膽地苛護你的廚房，讓您的每一天都更專注於享受生活！
        </p>

        <a
          href="/maintenance-manual/"
          className="mt-8 inline-block w-fit bg-(--black) px-6 py-3 text-sm uppercase tracking-wide text-(--white) transition-colors hover:bg-(--dark-accent)"
        >
          查看更多清潔指南服務說明
        </a>
      </div>
    </section>
  );
}
