import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { heroTagline, heroSubtitle, sections } from "./content";

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
    />
  );
}
