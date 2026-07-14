export default function RegisterProductForm() {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pb-24">
      <div className="flex flex-col gap-4 border-y border-(--accent) py-10 text-center">
        <h2 className="text-2xl tracking-tight">產品保固註冊</h2>
        <p className="leading-relaxed text-(--dark-accent)">
          保固註冊需由專屬連結進入，請洽您的設計師或 Saiens 業務取得連結。
        </p>
        <p className="text-sm text-(--dark-accent)">
          客服信箱：
          <a className="underline underline-offset-4" href="mailto:service@saiens.tw">
            service@saiens.tw
          </a>
        </p>
      </div>
    </section>
  );
}
