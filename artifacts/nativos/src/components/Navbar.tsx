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
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference text-white flex justify-between items-center pointer-events-auto">
      <Link href="/" className="text-2xl font-serif tracking-tight cursor-pointer">
        Nativos
      </Link>
      <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
        <a href="#origen" className="hover:opacity-70 transition-opacity">Origen</a>
        <a href="#sabores" className="hover:opacity-70 transition-opacity">Sabores</a>
        <a href="#atelier" className="hover:opacity-70 transition-opacity">Atelier</a>
      </div>
      <button className="text-sm font-medium px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors">
        Explorar
      </button>
    </nav>
  );
}
