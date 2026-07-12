import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner";
import UsaHero from "@/components/usa-home/UsaHero";
import UsaCollection from "@/components/usa-home/UsaCollection";
import UsaOneStopService from "@/components/usa-home/UsaOneStopService";
import UsaBrand from "@/components/usa-home/UsaBrand";
import UsaCertifications from "@/components/usa-home/UsaCertifications";
import UsaWarranty from "@/components/usa-home/UsaWarranty";
import UsaCertificationDetails from "@/components/usa-home/UsaCertificationDetails";
import content from "@/content/pages/home-usa.json";

export const metadata: Metadata = {
  title: "saiens US | Explore Premium Materials Now — Saiens",
  description:
    "Saiens US offers innovative, high-quality building materials, including quartz and ceramic surfaces, with comprehensive R&D, manufacturing, and certification for durability and safety.",
};

export default function UsaHome() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroBanner
        videoSrc={content.heroBanner.videoSrc}
        posterSrc={content.heroBanner.posterSrc}
      />
      <UsaHero />
      <UsaCollection />
      <UsaOneStopService />
      <UsaBrand />
      <UsaCertifications />
      <UsaWarranty />
      <UsaCertificationDetails />
    </main>
  );
}
