import type { Metadata } from "next";
import Image from "next/image";

const TITLE = "山恩 Saiens · 2025 建材展";
const DESCRIPTION =
  "請填寫入場資訊與我們一同探索材質、設計與生活美學的更多可能。";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: DESCRIPTION,
};

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
    </main>
  );
}
