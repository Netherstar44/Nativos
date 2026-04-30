import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 px-6 py-3 bg-white/90 backdrop-blur-md shadow-sm flex justify-between items-center pointer-events-auto">
      <Link href="/" className="cursor-pointer">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Nativos Logo" className="h-14 w-auto object-contain" />
      </Link>
      <div className="hidden md:flex space-x-8 text-sm font-bold tracking-wide text-[#009e4f]">
        <a href="#origen" className="hover:text-[#e31e24] transition-colors">Origen</a>
        <a href="#sabores" className="hover:text-[#e31e24] transition-colors">Sabores</a>
        <a href="#atelier" className="hover:text-[#e31e24] transition-colors">Atelier</a>
      </div>
      <button className="text-sm font-bold px-6 py-2 bg-[#e31e24] text-white rounded-full hover:bg-red-700 transition-colors shadow-md">
        Explorar
      </button>
    </nav>
  );
}
