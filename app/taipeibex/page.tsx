import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/app/ContactForm";

const TITLE = "山恩 Saiens · 2025 建材展";
const DESCRIPTION =
  "請填寫入場資訊與我們一同探索材質、設計與生活美學的更多可能。";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: DESCRIPTION,
};

const IDENTITY_OPTIONS = ["個人業主", "設計師", "建設公司", "廚具商", "加工廠", "其他"];
const REQUEST_OPTIONS = [
  "對再生材有興趣 ",
  "對 ETERNOS 有興趣",
  "送樣拜訪",
  "近期有案，需報價",
  "其他 ",
];
const RECEPTION_OPTIONS = [
  "黃聖熙 Alexis",
  "廖瑩惠 Nico",
  "鄭安廷 Anne",
  "鍾欣恩 Murphy",
  "蔣慶瑤 Ivy",
  "林芊緹 Angela",
  "林于靖 Karen",
  "陳依葶 Debby",
  "邱若淇 LaLa",
  "顏汎書 Melody",
  "苗晏慈 Josephine",
  "鍾宇庭 Kelly",
  "嚴梵 Fan",
  "陳珊慧 Elaine",
  "陳昱安 Ann",
  "莊亞婷 Alice",
  "張卓艷 Shirley",
  "余芯樺 Bella",
  "莊馥嘉 Alva",
];

export default function TaipeibexPage() {
  return (
    <main className="flex flex-1 flex-col bg-(--black) text-(--white)">
      <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-24 text-center">
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

        <div className="relative h-16 w-40">
          <Image
            src="/images/6e71d0ec-be92-4f81-97d7-fb5737ace005/Saiens.png"
            alt="Saiens"
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>

        <h1 className="font-(family-name:--font-jost) text-4xl tracking-tight md:text-6xl">
          {TITLE}
        </h1>

        <p className="max-w-xl text-lg text-(--white)/85">請填寫入場資訊</p>
        <p className="max-w-xl text-(--white)/85">
          與我們一同探索材質、設計與生活美學的更多可能。
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pb-24">
        <ContactForm
          formId="taipeibex"
          fallbackEmail="service@saiens.tw"
          className="flex flex-col gap-6"
          buttonClassName="mt-2 w-full bg-(--white)/80 px-8 py-3 text-sm uppercase tracking-wide text-(--black) transition hover:bg-(--white) disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-(--accent)">
              怎麼稱呼您？ <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="identity" className="text-sm text-(--accent)">
              您的身份 <span aria-hidden="true">*</span>
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
            <label htmlFor="company" className="text-sm text-(--accent)">
              公司名稱 <span aria-hidden="true">*</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="若無則填「無」"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm text-(--accent)">
              聯絡電話 <span aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="region" className="text-sm text-(--accent)">
              地區 <span aria-hidden="true">*</span>
            </label>
            <input
              id="region"
              name="region"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="border-t border-(--accent)/50 pt-4 text-sm text-(--white)/60">
            以下為業務填寫
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 text-sm text-(--accent)">需求</legend>
            {REQUEST_OPTIONS.map((option) => (
              <label
                key={option}
                htmlFor={`request-${option}`}
                className="flex items-center gap-2 text-sm text-(--white)/85"
              >
                <input
                  id={`request-${option}`}
                  name="request"
                  type="checkbox"
                  value={option}
                  className="disabled:opacity-60"
                />
                {option.trim()}
              </label>
            ))}
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor="note" className="text-sm text-(--accent)">
              其他備註
            </label>
            <input
              id="note"
              name="note"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reception" className="text-sm text-(--accent)">
              接待業務
            </label>
            <select
              id="reception"
              name="reception"
              defaultValue=""
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
            >
              <option value="" disabled>
                Select an option
              </option>
              {RECEPTION_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-(--black)">
                  {option}
                </option>
              ))}
            </select>
          </div>

        </ContactForm>
      </section>
    </main>
  );
}
