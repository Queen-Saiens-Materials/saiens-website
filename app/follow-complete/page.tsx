import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "追蹤完成 | Saiens",
  description: "遠雄建設・山恩・集力門品牌聯展",
};

// Layout matches the live page (www.saiens.group/follow-complete):
// full-bleed blue→grey→warm gradient background at full opacity, the
// cream 追蹤完成 card image positioned toward the left, and a white
// caption below it over the background.
export default function FollowCompletePage() {
  return (
    <main className="relative flex w-full flex-1 flex-col overflow-hidden bg-(--black) text-(--white)">
      <div className="absolute inset-0">
        <Image
          src="/images/688fa0de-59f9-42e6-b9b8-95d9b6bd75c7/usethis.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-start gap-6 px-8 py-16 md:px-16 md:py-24">
        <div className="relative h-[26rem] w-72 sm:h-[31rem] sm:w-[22.5rem]">
          <Image
            src="/images/d1600387-b4ad-4ea9-ade5-3ce33561e176/complete.png"
            alt="追蹤完成！請向工作人員領取飲品"
            fill
            sizes="(max-width: 640px) 18rem, 22.5rem"
            className="object-contain object-left"
          />
        </div>

        <h3 className="font-(family-name:--font-jost) text-lg font-bold tracking-tight md:text-xl">
          遠雄建設・山恩・集力門品牌聯展
        </h3>
      </div>
    </main>
  );
}
