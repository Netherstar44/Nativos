import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollVideo from "@/components/ScrollVideo";
import ProductGrid from "@/components/ProductGrid";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-background">
      <Navbar />
      <Hero />
      <ScrollVideo />
      <ProductGrid />
      <BrandStory />
      <Footer />
    </main>
  );
}
