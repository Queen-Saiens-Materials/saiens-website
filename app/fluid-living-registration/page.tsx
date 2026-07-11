import type { Metadata } from "next";

const TITLE = "Fluid Living Register Page";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: "流動的生活 Fluid Living — 遠雄建設 x Saiens 山恩 x Gili 集力門",
};

const OCCUPATION_OPTIONS = ["建設公司", "室內設計師", "廚具商", "個人業主", "其他"];
const REGION_OPTIONS = ["北區", "中區", "南區"];

export default function FluidLivingRegistrationPage() {
  return (
    <main className="flex flex-1 flex-col bg-(--black) text-(--white)">
      <section className="flex flex-col items-center gap-3 px-6 py-20 text-center">
        <h1 className="font-(family-name:--font-jost) text-4xl tracking-tight md:text-6xl">
          FLUID LIVING
        </h1>
        <h4 className="text-lg tracking-wide text-(--accent)">流動的生活</h4>
        <p className="text-sm text-(--white)/80">
          Farglory Land 遠雄建設 x Saiens 山恩 x Gili 集力門
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pb-24">
        <h2 className="text-center font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
          Register Now
        </h2>

        {/* Form UI replicated from the original Squarespace site. Submission is intentionally disabled until a backend (planned: Vercel Function + Resend email) is wired up. Do not remove the disabled state without adding the backend. */}
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-(--accent)">
              姓名 <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              disabled
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="occupation" className="text-sm text-(--accent)">
              職業 <span aria-hidden="true">*</span>
            </label>
            <select
              id="occupation"
              name="occupation"
              disabled
              defaultValue=""
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
            >
              <option value="" disabled>
                Select an option
              </option>
              {OCCUPATION_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-(--black)">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="region" className="text-sm text-(--accent)">
              地區 <span aria-hidden="true">*</span>
            </label>
            <select
              id="region"
              name="region"
              disabled
              defaultValue=""
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
            >
              <option value="" disabled>
                Select an option
              </option>
              {REGION_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-(--black)">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm text-(--accent)">
              手機 <span aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              disabled
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-(--accent)">
              E-mail <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              disabled
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="mt-2 w-full cursor-not-allowed bg-(--white)/40 px-8 py-3 text-sm uppercase tracking-wide text-(--black)"
          >
            Submit
          </button>
          <p className="text-center text-sm text-(--accent)">
            Coming soon — 表單尚未開放送出，敬請期待。
          </p>
        </form>
      </section>
    </main>
  );
}
