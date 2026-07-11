interface HeroBannerProps {
  /** Public path to the looping background video (e.g. "/videos/hero.mp4"). */
  videoSrc: string;
  /** Poster frame shown before the video loads. */
  posterSrc: string;
}

/**
 * Full-bleed banner used at the very top of each homepage, before the
 * "Bless Every Home&Family" text block. Mirrors the ~875px tall hero section
 * on the original Squarespace site: a muted, looping background video
 * (downloaded from the original site's HLS stream) with a poster fallback.
 */
export default function HeroBanner({
  videoSrc,
  posterSrc,
}: HeroBannerProps): React.JSX.Element {
  return (
    <section className="relative h-[50vh] max-h-[875px] min-h-[320px] w-full overflow-hidden sm:h-[70vh] lg:h-[875px]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </section>
  );
}
