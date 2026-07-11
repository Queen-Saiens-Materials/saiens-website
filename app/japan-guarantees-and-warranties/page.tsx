import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { heroTagline, heroSubtitle, sections } from "./content";
import RegisterProductForm from "./RegisterProductForm";

export const metadata: Metadata = {
  title: "Saiens JP-品質保証 | Discover Quality Guarantee - Shop with Confidence — Saiens",
  description:
    "Explore Saiens JP-品質保証 for durable, high-quality quartz and stone products with comprehensive guarantees and customer support in Taiwan.",
};

export default function JapanGuaranteesAndWarrantiesPage() {
  return (
    <LegalPage
      heroTagline={heroTagline}
      heroSubtitle={heroSubtitle}
      sections={sections}
      heroImage={{
        src: "/images/ed15e8a4-399b-4432-9039-08d1fb33feb0/Copy+of+_2-MQL422.jpg",
        alt: "大理石の質感と装飾の背景",
      }}
    >
      <RegisterProductForm />
    </LegalPage>
  );
}
