import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/app/ContactForm";

const TITLE = "這是一場邀請制的VIP私人晚宴，山恩團隊將親自下廚招待各位。";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: "遠雄 × 山恩｜好感之夜 — 探索再生材的更多可能，誠摯邀請您參與「好感之夜」。",
};

const HIGHLIGHTS = [
  "與遠雄攜手，呈現再生材料於建築與空間中的實際應用，探索更多元的空間可能",
  "透光石英石的運用，讓光線成為空間設計的一部分",
  "透過石英石熱彎工法，將堅硬材質轉化為柔和且流動的視覺表現",
  "COVE Living 家飾系列，延伸材料於日常生活中的應用與想像",
];

const MEAL_OPTIONS = ["葷食", "素食"];
const SESSION_OPTIONS = [
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "13:00-13:30",
  "13:30-14:00",
  "14:00-14:30",
  "14:30-15:00",
  "15:00-15:30",
  "15:30-16:00",
  "16:00-16:30",
  "16:30-17:00",
  "17:00-17:30",
];

export default function MobiusContact02Page() {
  return (
    <main className="flex flex-1 flex-col bg-(--black) text-(--white)">
      <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/0dfd31ff-1d98-4b34-b22c-e80ec694fd09/IMG_6405.jpg"
            alt="Fluid Living"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
        </div>

        <h1 className="font-(family-name:--font-jost) text-5xl tracking-tight md:text-7xl">
          FLUID
          <br />
          LIVING
        </h1>
        <h4 className="text-lg tracking-wide text-(--accent)">流動的生活</h4>
        <h3 className="mt-4 text-base md:text-lg">遠雄 × 山恩｜好感之夜</h3>
      </section>

      <section className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <h1 className="font-(family-name:--font-jost) text-4xl tracking-tight md:text-6xl">
          YOU&rsquo;RE INVITED
        </h1>
        <p className="text-base md:text-lg">遠雄 × 山恩｜好感之夜</p>
        <p className="max-w-xl text-(--white)/80">
          探索再生材的更多可能，誠摯邀請您參與「好感之夜」。
          <br />
          活動當日將安排專人導覽，帶您走進「好感空間展」深入了解材料與空間的應用。
        </p>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 py-8 text-center">
        <h3 className="font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
          拆解未來生活的想像，從建築、結構到物件，展開一場以材料為核心的三維對話。
        </h3>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-16">
        {/*
          Original site uses this photo as a tall full-bleed backdrop behind the
          highlights list and event info (not a standalone framed image), so we
          render it the same way here rather than as an isolated square.
        */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/beb0b35b-4ceb-4712-a1a7-adb4a2828346/_-2.jpg"
            alt="好感之夜"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-(--black)/55" />
        </div>

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          <p className="text-center text-(--white)/80">在展場中，你可以看到：</p>
          <ul className="mt-4 flex flex-col gap-3 text-center text-(--white)/85">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 pt-16 text-center">
          <p className="font-semibold">活動資訊：</p>
          <p className="font-semibold">日期｜2026.07.03（五）</p>
          <p className="font-semibold">時間｜18：00 報到入場 18：30 開始用餐</p>
          <p className="font-semibold">地點｜ 大台南會展中心 ICC TAINAN</p>
          <p className="font-semibold">711臺南市歸仁區歸仁十二路3號 3樓</p>
          <p className="font-semibold">大員A廳</p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pb-24">
        <h2 className="text-center font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
          遠雄 × 山恩｜好感之夜 2
        </h2>

        <ContactForm
          formId="mobius-contact02"
          fallbackEmail="service@saiens.tw"
          className="flex flex-col gap-6"
          buttonClassName="mt-2 w-full bg-(--white)/80 px-8 py-3 text-sm uppercase tracking-wide text-(--black) transition hover:bg-(--white) disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="org-name" className="text-sm text-(--accent)">
              公司／組織名稱 <span aria-hidden="true">*</span>
            </label>
            <input
              id="org-name"
              name="org-name"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-(--accent)">
              姓名 <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
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
            <label htmlFor="title" className="text-sm text-(--accent)">
              職稱
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="headcount" className="text-sm text-(--accent)">
              人數 <span aria-hidden="true">*</span>
            </label>
            <input
              id="headcount"
              name="headcount"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="companions" className="text-sm text-(--accent)">
              同行夥伴姓名/公司/職稱
            </label>
            <input
              id="companions"
              name="companions"
              type="text"
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="meal" className="text-sm text-(--accent)">
              葷食或素食
            </label>
            <select
              id="meal"
              name="meal"
              defaultValue=""
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
            >
              <option value="" disabled>
                Select an option
              </option>
              {MEAL_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-(--black)">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="session" className="text-sm text-(--accent)">
              欲參加場次
            </label>
            <select
              id="session"
              name="session"
              defaultValue=""
              className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
            >
              <option value="" disabled>
                Select an option
              </option>
              {SESSION_OPTIONS.map((option) => (
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
