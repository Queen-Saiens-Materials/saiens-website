import type { Metadata } from "next";
import Image from "next/image";

const TITLE = "Fluid Living Register Page";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: "流動的生活 Fluid Living — 遠雄建設 x Saiens 山恩 x Gili 集力門",
};

const OCCUPATION_OPTIONS = ["建設公司", "室內設計師", "廚具商", "個人業主", "其他"];
const REGION_OPTIONS = ["北區", "中區", "南區"];

// Layout matches the live page (www.saiens.group/fluid-living-registration):
// a single full-bleed section with the blue -> grey -> warm gradient
// background image, and all content (hero text + registration form)
// left-aligned in one column over it.
export default function FluidLivingRegistrationPage() {
  return (
    <main className="relative flex w-full flex-1 flex-col overflow-hidden bg-(--black) text-(--white)">
      <div className="absolute inset-0">
        <Image
          src="/images/62824d7d-20f1-43b7-8558-b39a423977a6/2026+___.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-start gap-3 px-8 py-16 md:px-16 md:py-24">
        <h1 className="font-(family-name:--font-jost) text-4xl tracking-tight md:text-6xl">
          FLUID LIVING
        </h1>
        <h4 className="text-lg tracking-wide">流動的生活</h4>
        <p className="text-sm font-bold italic">
          Farglory Land 遠雄建設 x Saiens 山恩 x Gili 集力門
        </p>

        <h2 className="mt-8 font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
          Register Now
        </h2>

        {/* Form UI replicated from the original Squarespace site. Submission is intentionally disabled until a backend (planned: Vercel Function + Resend email) is wired up. Do not remove the disabled state without adding the backend. */}
        <form className="flex w-full max-w-md flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm">
              姓名 <span className="text-(--white)/60">(required)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              disabled
              className="border border-(--white)/70 bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="occupation" className="text-sm">
              職業 <span className="text-(--white)/60">(required)</span>
            </label>
            <select
              id="occupation"
              name="occupation"
              disabled
              defaultValue=""
              className="border border-(--white)/70 bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
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
            <label htmlFor="region" className="text-sm">
              地區 <span className="text-(--white)/60">(required)</span>
            </label>
            <select
              id="region"
              name="region"
              disabled
              defaultValue=""
              className="border border-(--white)/70 bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
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
            <label htmlFor="phone" className="text-sm">
              手機 <span className="text-(--white)/60">(required)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              disabled
              className="border border-(--white)/70 bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">
              E-mail <span className="text-(--white)/60">(required)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              disabled
              className="border border-(--white)/70 bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="mt-2 w-fit cursor-not-allowed bg-(--accent) px-8 py-3 text-sm text-(--black)"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
