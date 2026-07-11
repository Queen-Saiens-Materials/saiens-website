import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import HeroBanner from "@/components/HeroBanner";
import Hero from "@/components/jp-home/Hero";
import Products from "@/components/jp-home/Products";
import Process from "@/components/jp-home/Process";
import Brands from "@/components/jp-home/Brands";
import BrandPromise from "@/components/jp-home/BrandPromise";
import QualityGuarantee from "@/components/jp-home/QualityGuarantee";
import Certifications from "@/components/jp-home/Certifications";
import Cleaning from "@/components/jp-home/Cleaning";
import News from "@/components/jp-home/News";

export const metadata: Metadata = {
  title: "Saiens | すべての家と家族に祝福を",
  description:
    "Saiens（山恩グループ）は、トップクラスのマテリアルサイエンス統合企業を目指しています。科学と美学を融合させた卓越したマテリアルをご紹介します。",
};

export default async function JpHomePage(): Promise<React.JSX.Element> {
  const posts = getPosts("jp");

  return (
    <main className="flex flex-1 flex-col">
      <HeroBanner
        src="/images/1752483347162-YN8Z4OF1BMHYG447WBN7/hero-poster.jpg"
        alt="Saiens マテリアルショーケース"
      />
      <Hero />
      <Products />
      <Process />
      <Brands />
      <BrandPromise />
      <QualityGuarantee />
      <Certifications />
      <Cleaning />
      <News posts={posts} />
    </main>
  );
}
