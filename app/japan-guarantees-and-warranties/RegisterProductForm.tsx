export default function RegisterProductForm() {
  return (
    <section className="w-full bg-(--light-accent) pt-8 pb-24 md:pt-10">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-5 px-6 text-(--black)">
        <h2 className="text-2xl tracking-tight">保証登録について</h2>
        <p className="leading-relaxed text-(--dark-accent)">
          保固登録は専用リンクからのみ可能です。担当デザイナーまたはSaiensまでお問い合わせください。
        </p>
        <a
          href="mailto:service@saiens.tw"
          className="underline underline-offset-4"
        >
          service@saiens.tw
        </a>
      </div>
    </section>
  );
}
