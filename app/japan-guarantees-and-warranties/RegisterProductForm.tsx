export default function RegisterProductForm() {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pb-24">
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="reg-name" className="text-sm text-(--dark-accent)">
            お名前 <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            placeholder="Name"
            required
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reg-phone" className="text-sm text-(--dark-accent)">
            電話番号 <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            required
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reg-email" className="text-sm text-(--dark-accent)">
            メールアドレス <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            placeholder="Email"
            required
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reg-address" className="text-sm text-(--dark-accent)">
            現場住所
          </label>
          <input
            id="reg-address"
            name="case-address"
            type="text"
            placeholder="Case Address"
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reg-order" className="text-sm text-(--dark-accent)">
            ご意見・ご要望
          </label>
          <input
            id="reg-order"
            name="order-number"
            type="text"
            placeholder="Order number"
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reg-feedback" className="text-sm text-(--dark-accent)">
            意見回饋 <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="reg-feedback"
            name="feedback"
            placeholder="Feedback"
            rows={4}
            required
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-2 w-full cursor-not-allowed bg-(--black)/40 px-8 py-3 text-sm uppercase tracking-wide text-(--white)"
        >
          送信する
        </button>
        <p className="text-center text-sm text-(--dark-accent)">
          準備中 — フォームは現在ご利用いただけません。今しばらくお待ちください。
        </p>
      </form>
    </section>
  );
}
