import type { Metadata } from "next";
import Image from "next/image";

const TITLE = "Group Events";

export const metadata: Metadata = {
  title: `${TITLE} — Saiens`,
  description: TITLE,
};

// Note: the original Squarespace page for this route was never customized
// past the template's placeholder demo content (generic "summer camp" copy
// and stock demo images), so there is no real Saiens body copy to reproduce
// here verbatim. Rendering the page shell with the real brand mark only.
export default function GroupEventsPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-(--white) px-6 py-32 text-center text-(--black)">
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
    </main>
  );
}
