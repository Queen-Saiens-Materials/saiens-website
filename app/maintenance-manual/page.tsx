import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { heroTagline, heroSubtitle, sections } from "./content";

export const metadata: Metadata = {
  title:
    "保養指南-揮別檯面吃色、刮傷的困擾擁抱零煩惱居家美學。 | Explore Care Tips Today — Saiens",
  description:
    "Comprehensive guide for maintaining quartz countertops, focusing on cleaning and damage prevention to ensure long-lasting beauty and home aesthetics.",
};

export default function MaintenanceManualPage() {
  return (
    <LegalPage
      heroTagline={heroTagline}
      heroSubtitle={heroSubtitle}
      sections={sections}
    />
  );
}
