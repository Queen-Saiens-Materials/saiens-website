import Image from "next/image";

export default function Maintenance() {
  return (
    <section className="bg-(--black) px-6 py-24 text-(--light-accent) sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="/images/5a5e0231-a71d-436e-bbbc-bd96cd3198be/DSC08731.jpg"
            alt="Saiens 檯面保養"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-8">
          <h2 className="font-(family-name:--font-jost) text-3xl font-semibold tracking-tight sm:text-4xl">
            Saiens 讓清潔更簡單，美感耐久不費力。
          </h2>
          <p className="text-sm leading-relaxed text-(--accent)">
            在saiens，我們重視每個家的細節。以高品質檯面材質，揮別吃色、刮傷困擾，讓生活不再充滿顧慮。saiens以零煩惱美學，賦予空間耐用與潔淨價值，讓家始終保持理想樣貌。
          </p>

          <h3 className="font-(family-name:--font-jost) text-xl font-medium">
            揮別檯面吃色、刮傷的困擾
            <span className="block text-(--accent)">擁抱零煩惱居家美學。</span>
          </h3>
          <p className="text-sm leading-relaxed text-(--accent)">
            作為您最值得信賴的檯面材料夥伴，我們的使命是透過簡單的清潔和保養來幫助您擺脫檯面吃色和刮傷的煩惱。藉此，您可以享受無煩惱的居家美學，不再需要對著污染吃色的檯面皺眉，也不需要提心吊膽地苛護你的廚房，讓您的每一天都更專注於享受生活！
          </p>

          <a
            href="/maintenance-manual/"
            className="inline-block w-fit border border-(--accent) px-6 py-3 text-sm uppercase tracking-wide text-(--light-accent) transition-colors hover:bg-(--accent) hover:text-(--black)"
          >
            查看更多清潔指南服務說明
          </a>
        </div>
      </div>
    </section>
  );
}
