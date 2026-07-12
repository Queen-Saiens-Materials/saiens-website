import HeroBanner from "@/components/HeroBanner";
import Hero from "@/components/home/Hero";
import OneStopService from "@/components/home/OneStopService";
import ProductShowcase from "@/components/home/ProductShowcase";
import BrandCards from "@/components/home/BrandCards";
import TrustBand from "@/components/home/TrustBand";
import QualityAssurance from "@/components/home/QualityAssurance";
import CleaningIntro from "@/components/home/CleaningIntro";
import Maintenance from "@/components/home/Maintenance";
import News from "@/components/home/News";
import content from "@/content/pages/home-tw.json";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroBanner
        videoSrc={content.heroBanner.videoSrc}
        posterSrc={content.heroBanner.posterSrc}
      />
      <Hero />
      <OneStopService />
      <ProductShowcase />
      <BrandCards />
      <TrustBand />
      <QualityAssurance />
      <CleaningIntro />
      <Maintenance />
      <News />
    </main>
  );
}
