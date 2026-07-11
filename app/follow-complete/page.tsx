import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "追蹤完成 | Saiens",
  description: "遠雄建設・山恩・集力門品牌聯展",
};

export default function FollowCompletePage() {
  return (
    <main className="relative flex w-full flex-1 flex-col overflow-hidden bg-(--black) text-(--white)">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/688fa0de-59f9-42e6-b9b8-95d9b6bd75c7/usethis.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-6 py-16 text-center md:py-24">
        <div className="relative h-64 w-48 sm:h-80 sm:w-60">
          <Image
            src="/images/d1600387-b4ad-4ea9-ade5-3ce33561e176/complete.png"
            alt=""
            fill
            sizes="(max-width: 640px) 12rem, 15rem"
            className="object-contain"
          />
        </div>

        <h3 className="font-(family-name:--font-jost) text-2xl tracking-tight md:text-3xl">
          遠雄建設・山恩・集力門品牌聯展
        </h3>
      </div>
    </main>
  );
}
