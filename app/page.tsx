import Hero from "@/components/home/Hero";
import OneStopService from "@/components/home/OneStopService";
import ProductShowcase from "@/components/home/ProductShowcase";
import BrandCards from "@/components/home/BrandCards";
import QualityAssurance from "@/components/home/QualityAssurance";
import Maintenance from "@/components/home/Maintenance";
import News from "@/components/home/News";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <OneStopService />
      <ProductShowcase />
      <BrandCards />
      <QualityAssurance />
      <Maintenance />
      <News />
    </main>
  );
}
