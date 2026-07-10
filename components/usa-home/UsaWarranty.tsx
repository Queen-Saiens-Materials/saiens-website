import Link from "next/link";

export default function UsaWarranty() {
  return (
    <section className="bg-(--white) px-6 py-24 text-(--foreground) sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-(family-name:--font-jost) text-3xl font-semibold tracking-tight sm:text-4xl">
          You can <strong className="font-semibold">depend on us</strong> for
          quality. At all times.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-(--dark-accent) sm:text-base">
          At Saiens, design and durability go together. As your reliable
          partner, we&apos;re looking to build countertops – and
          relationships – that last a lifetime.
        </p>
        <Link
          href="/guarantees-and-warranties"
          className="mt-8 inline-block border border-(--accent) px-6 py-3 text-sm uppercase tracking-wide text-(--foreground) transition-colors hover:bg-(--accent) hover:text-(--black)"
        >
          Our Life Time Warranty
        </Link>
      </div>
    </section>
  );
}
