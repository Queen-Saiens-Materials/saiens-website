import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/app/ContactForm";

const TITLE = "Mindful Choices, Sustainable Future.";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: "探索再生材的應用可能 — 從材料到空間，為您的專案提供合適的解決方案",
};

const REGION_OPTIONS = [
  "北部（雙北、桃園、新竹、宜蘭、基隆等）",
  "中部（台中、苗栗、彰化、南投、雲林）",
  "南部（台南、高雄、嘉義、屏東）",
];
const IDENTITY_OPTIONS = ["個人業主", "設計師", "建設公司", "其他"];
const COMPANY_SIZE_OPTIONS = ["5人以下", "5-10人以下", "10-20人以下", "20人以上"];
const INTEREST_OPTIONS = [
  "再生材相關資訊，想根據專案詢問報價",
  "需要再生材樣品，請安排送樣",
  "其他",
];

export default function MobiusContactPage() {
  return (
    <main className="relative isolate flex flex-1 flex-col bg-(--black) text-(--white)">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/02719835-4f0a-4bb2-9876-baddb6c00521/_.png"
          alt="背景"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
          priority
        />
      </div>

      <section className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <h1 className="font-(family-name:--font-jost) text-3xl font-bold tracking-tight md:text-5xl">
          Mindful Choices,
          <br />
          Sustainable Future.
        </h1>
        <h2 className="mt-2 text-xl font-bold tracking-wide text-(--white) md:text-2xl">
          探索再生材的應用可能
        </h2>
        <p className="max-w-xl text-lg font-bold text-(--white)">
          從材料到空間，
          <br />
          為您的專案提供合適的解決方案
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 py-16">
        <p className="text-center text-(--white)/85">
          填寫表單後，Saiens
          專業團隊將依據您的需求提供材料建議、應用方向與合作評估，協助您將再生材實際導入建築與空間設計之中。
        </p>

        <ContactForm
          formId="mobius-contact"
          fallbackEmail="service@saiens.tw"
          className="flex flex-col gap-6"
          buttonClassName="mt-2 w-full bg-(--white)/80 px-8 py-3 text-sm uppercase tracking-wide text-(--black) transition hover:bg-(--white) disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="full-name" className="text-sm text-(--accent)">
              您的全名{" "}
              <span className="text-xs font-normal text-(--white)/60">
                (required)
              </span>
            </label>
            <input
              id="full-name"
              name="full-name"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm text-(--accent)">
              聯絡電話{" "}
              <span className="text-xs font-normal text-(--white)/60">
                (required)
              </span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="line-id" className="text-sm text-(--accent)">
              Line ID{" "}
              <span className="text-xs font-normal text-(--white)/60">
                (required)
              </span>
            </label>
            <input
              id="line-id"
              name="line-id"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="region" className="text-sm text-(--accent)">
              您的所在地
            </label>
            <select
              id="region"
              name="region"
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
            <label htmlFor="identity" className="text-sm text-(--accent)">
              您的身份{" "}
              <span className="text-xs font-normal text-(--white)/60">
                (required)
              </span>
            </label>
            <select
              id="identity"
              name="identity"
              defaultValue=""
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
            >
              <option value="" disabled>
                Select an option
              </option>
              {IDENTITY_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-(--black)">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company-name" className="text-sm text-(--accent)">
              公司名稱{" "}
              <span className="text-xs font-normal text-(--white)/60">
                (required)
              </span>
            </label>
            <input
              id="company-name"
              name="company-name"
              type="text"
              placeholder="若無則填「無」"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company-tax-id" className="text-sm text-(--accent)">
              公司統編{" "}
              <span className="text-xs font-normal text-(--white)/60">
                (required)
              </span>
            </label>
            <input
              id="company-tax-id"
              name="company-tax-id"
              type="text"
              placeholder="若無則填「無」"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company-size" className="text-sm text-(--accent)">
              公司規模{" "}
              <span className="text-xs font-normal text-(--white)/60">
                (required)
              </span>
            </label>
            <select
              id="company-size"
              name="company-size"
              defaultValue=""
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
            >
              <option value="" disabled>
                Select an option
              </option>
              {COMPANY_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-(--black)">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 text-sm text-(--accent)">我想了解</legend>
            {INTEREST_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex items-start gap-2 text-sm text-(--white)/85"
              >
                <input
                  type="checkbox"
                  name="interest"
                  value={option}
                  className="mt-1 disabled:opacity-60"
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>

        </ContactForm>
      </section>
    </main>
  );
}
