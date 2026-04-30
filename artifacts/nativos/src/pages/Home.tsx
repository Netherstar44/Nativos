import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollVideo from "@/components/ScrollVideo";
import ProductGrid from "@/components/ProductGrid";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";
import FlavorMixer from "@/components/FlavorMixer";
import OriginMap from "@/components/OriginMap";
import ColdPress from "@/components/ColdPress";
import JuiceCompare from "@/components/JuiceCompare";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-background">
      <Navbar />
      <Hero />
      <FlavorMixer />
      <OriginMap />
      <ScrollVideo />
      <ColdPress />
      <JuiceCompare />
      <ProductGrid />
      <BrandStory />
      <Footer />
    </main>
  );
}
