"use client";

import { useRef, type ReactNode } from "react";

interface CarouselProps {
  children: ReactNode[];
  /** Accessible label for the previous/next buttons, e.g. "products". */
  label: string;
  className?: string;
}

/**
 * Generic horizontal scroll-snap carousel with left/right arrow controls.
 * No external dependencies — uses native CSS scroll-snap plus scrollBy.
 */
export default function Carousel({
  children,
  label,
  className,
}: CarouselProps): React.JSX.Element {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "prev" | "next"): void => {
    const track = trackRef.current;
    if (!track) return;

    const firstItem = track.firstElementChild as HTMLElement | null;
    const itemWidth = firstItem?.offsetWidth ?? track.clientWidth;
    const gap = 32; // matches gap-8 below
    const delta = (itemWidth + gap) * (direction === "next" ? 1 : -1);

    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-none snap-start"
            style={{ scrollSnapAlign: "start" }}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label={`Previous ${label}`}
          onClick={() => scrollByAmount("prev")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-current transition-opacity hover:opacity-70"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 fill-none stroke-current stroke-2"
          >
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={`Next ${label}`}
          onClick={() => scrollByAmount("next")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-current transition-opacity hover:opacity-70"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 fill-none stroke-current stroke-2"
          >
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
