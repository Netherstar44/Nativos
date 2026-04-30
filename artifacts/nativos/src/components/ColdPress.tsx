import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import luloImg from "@/assets/floating-lulo.png";

export default function ColdPress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLImageElement>(null);
  const pressTopRef = useRef<HTMLDivElement>(null);
  const pressBottomRef = useRef<HTMLDivElement>(null);
  const juiceDropsRef = useRef<HTMLDivElement>(null);
  const bottleFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
      }
    });

    // 1. Fruit drops
    tl.to(fruitRef.current, { y: "20vh", duration: 1 })
      // 2. Press comes together
      .to(pressTopRef.current, { y: "15vh", duration: 1 }, "press")
      .to(pressBottomRef.current, { y: "-15vh", duration: 1 }, "press")
      // 3. Fruit gets "squished" (scale down)
      .to(fruitRef.current, { scaleY: 0.2, scaleX: 1.5, opacity: 0, duration: 0.5 }, "press+=0.5")
      // 4. Juice drops appear and fall
      .fromTo(juiceDropsRef.current, { opacity: 0, y: "15vh" }, { opacity: 1, y: "35vh", duration: 1 })
      // 5. Bottle fills up
      .to(bottleFillRef.current, { height: "100%", duration: 1 })
      // 6. Press opens up
      .to([pressTopRef.current, pressBottomRef.current], { y: "0", duration: 0.5 })
      .to(juiceDropsRef.current, { opacity: 0, duration: 0.2 }, "-=0.5");

  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-10 text-center w-full z-10 px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-[#009e4f] mb-4">La Magia del Cold Press</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Prensamos la fruta en frío con miles de libras de presión para extraer cada gota de nutrientes sin aplicar calor destructivo.</p>
      </div>

      <div className="relative w-full max-w-md h-[60vh] flex flex-col items-center justify-center mt-20">
        
        {/* Top Press Plate */}
        <div ref={pressTopRef} className="absolute top-[10%] w-64 h-4 bg-gray-800 rounded-full z-20 shadow-lg" />
        
        {/* The Fruit */}
        <img ref={fruitRef} src={luloImg} alt="Fruit" className="absolute top-0 w-24 h-24 object-contain z-10" />

        {/* Bottom Press Plate */}
        <div ref={pressBottomRef} className="absolute bottom-[40%] w-64 h-4 bg-gray-800 rounded-full z-20 shadow-lg" />

        {/* Juice Drops */}
        <div ref={juiceDropsRef} className="absolute top-[50%] z-0 flex gap-2">
          <div className="w-2 h-6 bg-[#009e4f] rounded-full animate-pulse" />
          <div className="w-3 h-8 bg-[#009e4f] rounded-full animate-pulse delay-75" />
          <div className="w-2 h-6 bg-[#009e4f] rounded-full animate-pulse delay-150" />
        </div>

        {/* The Bottle to fill */}
        <div className="absolute bottom-[5%] w-24 h-48 border-4 border-gray-300 rounded-[2rem] overflow-hidden flex items-end justify-center bg-gray-50/50">
          <div ref={bottleFillRef} className="w-full h-0 bg-[#009e4f]" />
          {/* Bottle highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/40" />
        </div>
      </div>
    </section>
  );
}
