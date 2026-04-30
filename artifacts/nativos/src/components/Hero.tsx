import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import luloImg from "@/assets/floating-lulo.png";
import mangoImg from "@/assets/floating-mango.png";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const luloRef = useRef<HTMLImageElement>(null);
  const mangoRef = useRef<HTMLImageElement>(null);
  const parallaxLuloRef = useRef<HTMLDivElement>(null);
  const parallaxMangoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(subtextRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    gsap.to(luloRef.current, {
      y: "-=30",
      rotation: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(mangoRef.current, {
      y: "+=40",
      rotation: -10,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 50; 
      const yPos = (clientY / window.innerHeight - 0.5) * 50;

      gsap.to(parallaxLuloRef.current, { x: xPos, y: yPos, duration: 1, ease: "power2.out" });
      gsap.to(parallaxMangoRef.current, { x: -xPos * 1.5, y: -yPos * 1.5, duration: 1, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] flex flex-col items-center justify-center pt-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={parallaxLuloRef} className="absolute top-1/4 left-[15%] w-32 md:w-48 opacity-80 blur-[2px]">
          <img 
            ref={luloRef} 
            src={luloImg} 
            alt="" 
            className="w-full object-contain" 
          />
        </div>
        <div ref={parallaxMangoRef} className="absolute bottom-1/4 right-[10%] w-40 md:w-56 opacity-90 blur-[1px]">
          <img 
            ref={mangoRef} 
            src={mangoImg} 
            alt="" 
            className="w-full object-contain" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
      </div>

      <div className="z-10 text-center max-w-4xl px-6">
        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.9] text-[#e31e24] tracking-tighter drop-shadow-sm"
        >
          Nativos
        </h1>
        <p 
          ref={subtextRef}
          className="mt-6 text-xl md:text-2xl text-[#009e4f] font-medium max-w-lg mx-auto drop-shadow-sm"
        >
          Naturalmente Activos. <br className="hidden md:block" /> Jugos prensados en frío con frutas 100% naturales.
        </p>
      </div>
    </section>
  );
}
