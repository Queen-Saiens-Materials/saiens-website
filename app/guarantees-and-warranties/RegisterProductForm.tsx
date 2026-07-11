export default function RegisterProductForm() {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pb-24">
      {/* Form UI replicated from the original Squarespace site. Submission is intentionally disabled until a backend (planned: Vercel Function + Resend email) is wired up. Do not remove the disabled state without adding the backend. */}
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="reg-name" className="text-sm text-(--dark-accent)">
            姓名 <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            placeholder="Name"
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reg-phone" className="text-sm text-(--dark-accent)">
            電話號碼 <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reg-email" className="text-sm text-(--dark-accent)">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            placeholder="Email"
            disabled
            className="border border-(--accent) bg-transparent px-4 py-2 text-(--black) placeholder:text-(--dark-accent)/60 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reg-address" className="text-sm text-(--dark-accent)">
            案場地址
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
            案件編號
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
          確認送出
        </button>
        <p className="text-center text-sm text-(--dark-accent)">
          準備中 — 表單尚未開放送出，敬請期待。
        </p>
      </form>
    </section>
  );
}
