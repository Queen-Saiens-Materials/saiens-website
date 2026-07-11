import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { heroTagline, heroSubtitle, sections } from "./content";
import RegisterProductForm from "./RegisterProductForm";

export const metadata: Metadata = {
  title: "品質保證-為您帶來數十年如一日的美 | Saiens",
  description:
    "Discover Saiens' quality assurance policies and product warranties, ensuring lasting beauty and durability for decades. Trust our expert care and certified materials.",
};

export default function GuaranteesAndWarrantiesPage() {
  return (
    <LegalPage
      heroTagline={heroTagline}
      heroSubtitle={heroSubtitle}
      sections={sections}
      heroImage={{
        src: "/images/ed15e8a4-399b-4432-9039-08d1fb33feb0/Copy+of+_2-MQL422.jpg",
        alt: "大理石紋理與擺飾背景",
      }}
    >
      <RegisterProductForm />
    </LegalPage>
  );
}
