import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { heroTagline, heroSubtitle, sections } from "./content";

export const metadata: Metadata = {
  title: "お手入れガイド | Saiens",
  description:
    "天板の汚れやキズの悩みにサヨナラ。Saiensのカウンター素材お手入れガイドで、長く美しく使い続けるための正しいケア方法をご紹介します。",
};

export default function JapanMaintenanceManualPage() {
  return (
    <LegalPage
      heroTagline={heroTagline}
      heroSubtitle={heroSubtitle}
      sections={sections}
    />
  );
}
