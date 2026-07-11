import type { Metadata } from "next";
import Image from "next/image";
import { SAIENS_SALON } from "@/config/site";

const TITLE =
  "這是一場邀請制的VIP私人晚宴，山恩團隊將親自下廚招待各位。";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: TITLE,
};

const SALON_DATES = ["2026-05-28（四）", "2026-06-04（四）", "2026-06-11（四）"];

const SALON_TIME_OPTIONS = [
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export default function SaiensSalonPage() {
  return (
    <main className="flex flex-1 flex-col bg-(--black) text-(--white)">
      <section className="relative isolate flex w-full flex-col justify-end gap-8 overflow-hidden px-6 py-10 md:px-12 md:py-14">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/0dfd31ff-1d98-4b34-b22c-e80ec694fd09/IMG_6405.jpg"
            alt="Saiens Salon"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-(--black)/50" />
        </div>

        <h1
          className="font-(family-name:--font-jost) text-4xl tracking-tight md:text-6xl"
          style={{ whiteSpace: "pre-wrap" }}
        >
          SAIENS
          <br />
          SALON
        </h1>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Schedule</p>
            <p>18:30-19:00 入場交流</p>
            <p>19:00-22:00 流動盛宴</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Location</p>
            <p>{SAIENS_SALON.location}</p>
            <p>{SAIENS_SALON.address}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Members</p>
            <p>12人</p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
            Welcome to Saiens Salon
          </h2>
          <span className="h-px w-56 bg-(--white)/60 md:w-72" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-4 text-(--white)/85">
          <p>這是一場邀請制的VIP私人晚宴</p>
          <p>山恩團隊將親自下廚招待各位</p>
          <p className="font-semibold text-(--white)">晚宴無需收費</p>
          <p className="font-semibold text-(--white)">請帶一瓶「酒」與參與者分享即可</p>
          <p>＊產地、價格、紅／白／氣泡不限，現場備有酒杯、冰桶＊</p>
        </div>
        <blockquote className="mt-6 flex flex-col gap-2 border-t border-(--dark-accent)/30 pt-6 text-(--accent) italic">
          <p>&quot;Wine is constant proof that God loves us and loves to see us happy.&quot;</p>
          <p className="not-italic text-sm">-Benjamin Franklin</p>
        </blockquote>
      </section>

      <section className="relative isolate w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/beb0b35b-4ceb-4712-a1a7-adb4a2828346/_-2.jpg"
            alt="Saiens Salon"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-(--black)/60" />
        </div>

        <div className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 py-16">
          {/* Form UI replicated from the original Squarespace site. Submission is intentionally disabled until a backend (planned: Vercel Function + Resend email) is wired up. Do not remove the disabled state without adding the backend. */}
          <form className="flex flex-col gap-6">
            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm text-(--accent)">
                參加場次 <span aria-hidden="true">(required)</span>
              </legend>
              {SALON_DATES.map((date) => (
                <label key={date} className="flex items-center gap-2 text-(--white)">
                  <input
                    type="checkbox"
                    name="salonDate"
                    value={date}
                    disabled
                    className="disabled:opacity-60"
                  />
                  {date}
                </label>
              ))}
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-sm text-(--accent)">
                中文全名 <span aria-hidden="true">(required)</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                disabled
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="preferredName" className="text-sm text-(--accent)">
                希望我們怎麼稱呼您？
              </label>
              <input
                id="preferredName"
                name="preferredName"
                type="text"
                disabled
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="organization" className="text-sm text-(--accent)">
                公司／組織名稱 <span aria-hidden="true">(required)</span>
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                disabled
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm text-(--accent)">
                Phone <span aria-hidden="true">(required)</span>
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
              <label htmlFor="title" className="text-sm text-(--accent)">
                職稱 <span aria-hidden="true">(required)</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                disabled
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="referrer" className="text-sm text-(--accent)">
                邀請人
              </label>
              <input
                id="referrer"
                name="referrer"
                type="text"
                disabled
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="calendarEmail" className="text-sm text-(--accent)">
                行事曆 e-mail <span aria-hidden="true">(required)</span>
              </label>
              <input
                id="calendarEmail"
                name="calendarEmail"
                type="email"
                disabled
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dietaryRestrictions" className="text-sm text-(--accent)">
                是否有飲食禁忌？
              </label>
              <textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                rows={4}
                disabled
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) placeholder:text-(--white)/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="startTime" className="text-sm text-(--accent)">
                Start time
              </label>
              <select
                id="startTime"
                name="startTime"
                disabled
                defaultValue=""
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {SALON_TIME_OPTIONS.map((option) => (
                  <option key={option} value={option} className="text-(--black)">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="endTime" className="text-sm text-(--accent)">
                End time
              </label>
              <select
                id="endTime"
                name="endTime"
                disabled
                defaultValue=""
                className="border border-(--accent) bg-transparent px-4 py-2 text-(--white) disabled:opacity-60"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {SALON_TIME_OPTIONS.map((option) => (
                  <option key={option} value={option} className="text-(--black)">
                    {option}
                  </option>
                ))}
              </select>
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
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-2 px-6 py-16 text-center text-(--white)/85">
        <p>若有任何問題，請不吝致電</p>
        <p>聯絡人：{SAIENS_SALON.contactName}</p>
        <p>聯絡電話：{SAIENS_SALON.contactPhone}</p>
      </section>
    </main>
  );
}
