import Image from "next/image";

interface HeroBannerProps {
  /** Public path to the hero image (e.g. "/images/.../hero-poster.jpg"). */
  src: string;
  alt: string;
}

/**
 * Full-bleed photo banner used at the very top of each homepage, before the
 * "Bless Every Home&Family" text block. Mirrors the ~875px tall hero section
 * on the original Squarespace site (rendered there as a looping background
 * video; here as a static frame since video assets weren't archived).
 */
export default function HeroBanner({
  src,
  alt,
}: HeroBannerProps): React.JSX.Element {
  return (
    <section className="relative h-[50vh] max-h-[875px] min-h-[320px] w-full sm:h-[70vh] lg:h-[875px]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </section>
  );
}
