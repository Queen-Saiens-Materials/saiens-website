import type { Metadata } from "next";
import Image from "next/image";

const TITLE =
  "這是一場邀請制的VIP私人晚宴，山恩團隊將親自下廚招待各位。";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: TITLE,
};

export default function SaiensSalonPage() {
  return (
    <main className="flex flex-1 flex-col bg-(--black) text-(--white)">
      <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/0dfd31ff-1d98-4b34-b22c-e80ec694fd09/IMG_6405.jpg"
            alt="Saiens Salon"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
        </div>

        <h1
          className="font-(family-name:--font-jost) text-5xl tracking-tight md:text-7xl"
          style={{ whiteSpace: "pre-wrap" }}
        >
          SAIENS
          <br />
          SALON
        </h1>
      </section>

      <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-10 px-6 py-16 text-center md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-(--accent)">
            Schedule
          </p>
          <p>18:30-19:00 入場交流</p>
          <p>19:00-22:00 流動盛宴</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-(--accent)">
            Location
          </p>
          <p>Saiens 山恩台北展間</p>
          <p>台北市南港區松河街616 號 1 樓</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-(--accent)">
            Members
          </p>
          <p>12人</p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16 text-center">
        <h2 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
          Welcome to Saiens Salon
        </h2>
        <div className="flex flex-col gap-4 text-(--white)/85">
          <p>這是一場邀請制的VIP私人晚宴</p>
          <p>山恩團隊將親自下廚招待各位</p>
          <p>晚宴無需收費</p>
          <p>請帶一瓶「酒」與參與者分享即可</p>
          <p>＊產地、價格、紅／白／氣泡不限，現場備有酒杯、冰桶＊</p>
        </div>
        <blockquote className="mt-6 flex flex-col gap-2 border-t border-(--dark-accent)/30 pt-6 text-(--accent) italic">
          <p>&quot;Wine is constant proof that God loves us and loves to see us happy.&quot;</p>
          <p className="not-italic text-sm">-Benjamin Franklin</p>
        </blockquote>
      </section>

      <section className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden">
        <Image
          src="/images/beb0b35b-4ceb-4712-a1a7-adb4a2828346/_-2.jpg"
          alt="Saiens Salon"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover"
        />
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-2 px-6 py-16 text-center text-(--white)/85">
        <p>若有任何問題，請不吝致電</p>
        <p>聯絡人：Elaine 陳珊慧 小姐</p>
        <p>聯絡電話：0919-483-180</p>
      </section>
    </main>
  );
}
