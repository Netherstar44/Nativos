import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import luloImg from "@/assets/floating-lulo.png";

export default function ColdPress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLImageElement>(null);
  const pressTopRef = useRef<HTMLDivElement>(null);
  const pressBottomRef = useRef<HTMLDivElement>(null);
  const juiceRef = useRef<HTMLDivElement>(null);
  const bottleFillRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const drop1Ref = useRef<HTMLDivElement>(null);
  const drop2Ref = useRef<HTMLDivElement>(null);
  const drop3Ref = useRef<HTMLDivElement>(null);
  const drop4Ref = useRef<HTMLDivElement>(null);
  const drop5Ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const psiRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let stInstance: ScrollTrigger | null = null;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500",
        scrub: 1,
        pin: true,
      }
    });

    stInstance = tl.scrollTrigger!;

    // Phase 1: Fruit floats down to the press center
    tl.fromTo(fruitRef.current,
      { y: "-30vh", scale: 0.5, opacity: 0, rotation: -30 },
      { y: "0", scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "bounce.out" }
    );

    // Phase 2: Plates close in slowly with dramatic tension
    tl.to(pressTopRef.current, { y: "12vh", duration: 1.5, ease: "power2.in" }, "press")
      .to(pressBottomRef.current, { y: "-12vh", duration: 1.5, ease: "power2.in" }, "press")
      // PSI counter ramps up
      .fromTo(psiRef.current, { innerText: "0" }, {
        innerText: "3000",
        duration: 1.5,
        snap: { innerText: 1 },
        ease: "power2.in",
      }, "press")
      // Glow intensifies as pressure builds
      .fromTo(glowRef.current, { opacity: 0, scale: 0.5 }, { opacity: 0.6, scale: 1.5, duration: 1.5 }, "press");

    // Phase 3: Fruit gets crushed with splash effect
    tl.to(fruitRef.current, {
      scaleY: 0.1, scaleX: 2, opacity: 0, rotation: 15,
      duration: 0.5, ease: "power4.in"
    }, "crush")
      // Screen shake effect
      .to(containerRef.current, {
        x: 3, yoyo: true, repeat: 5, duration: 0.05, ease: "none"
      }, "crush")
      .to(containerRef.current, { x: 0, duration: 0.1 }, "crush+=0.3");

    // Phase 4: Juice drops rain down with stagger
    const drops = [drop1Ref.current, drop2Ref.current, drop3Ref.current, drop4Ref.current, drop5Ref.current];
    tl.fromTo(drops, 
      { opacity: 0, y: "10vh", scale: 0 },
      { opacity: 1, y: "30vh", scale: 1, duration: 1, stagger: 0.1, ease: "power1.out" },
      "drops"
    );

    // Phase 5: Bottle appears and fills up
    tl.fromTo(bottleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "back.out" },
      "fill"
    )
      .to(bottleFillRef.current, { height: "85%", duration: 1.5, ease: "power1.inOut" }, "fill+=0.3")
      // Drops fade as they merge into bottle
      .to(drops, { opacity: 0, y: "40vh", duration: 0.5, stagger: 0.05 }, "fill+=0.3")
      // Glow fades
      .to(glowRef.current, { opacity: 0, duration: 0.5 }, "fill+=0.5");

    // Phase 6: Press opens, label appears
    tl.to([pressTopRef.current, pressBottomRef.current], { y: 0, duration: 0.5, ease: "power2.out" }, "finale")
      .fromTo(labelRef.current, 
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
        "finale+=0.3"
      );

    return () => {
      if (stInstance) stInstance.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden flex items-center justify-center">
      {/* Background decorative dots */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #009e4f 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      {/* Header */}
      <div className="absolute top-8 md:top-12 text-center w-full z-20 px-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#e31e24] mb-3 block">Nuestro Proceso</span>
        <h2 className="text-4xl md:text-6xl font-serif text-[#009e4f] mb-3">La Magia del Cold Press</h2>
        <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto font-light">
          Miles de libras de presión. Cero calor. Máximos nutrientes.
        </p>
        {/* PSI Counter */}
        <div className="mt-4 inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-mono">
          <span className="w-2 h-2 bg-[#e31e24] rounded-full animate-pulse" />
          <span ref={psiRef}>0</span> PSI
        </div>
      </div>

      {/* Main Animation Area */}
      <div className="relative w-full max-w-lg h-[55vh] flex flex-col items-center justify-center mt-16">

        {/* Glow effect behind fruit */}
        <div ref={glowRef} className="absolute top-[25%] w-40 h-40 bg-[#009e4f] rounded-full blur-[60px] opacity-0 z-0" />

        {/* Top Press Plate */}
        <div ref={pressTopRef} className="absolute top-[15%] z-20 flex flex-col items-center">
          <div className="w-72 md:w-80 h-5 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg shadow-[0_4px_20px_rgba(0,0,0,0.3)]" />
          <div className="w-60 h-2 bg-gray-600 rounded-b-sm" />
          {/* Hydraulic pistons */}
          <div className="absolute -top-12 left-6 w-3 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-sm" />
          <div className="absolute -top-12 right-6 w-3 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-sm" />
        </div>

        {/* The Fruit */}
        <img ref={fruitRef} src={luloImg} alt="Lulo" className="absolute top-[25%] w-28 h-28 md:w-32 md:h-32 object-contain z-10 drop-shadow-2xl" />

        {/* Bottom Press Plate */}
        <div ref={pressBottomRef} className="absolute bottom-[35%] z-20 flex flex-col items-center">
          <div className="w-60 h-2 bg-gray-600 rounded-t-sm" />
          <div className="w-72 md:w-80 h-5 bg-gradient-to-t from-gray-700 to-gray-900 rounded-t-lg shadow-[0_-4px_20px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Juice Drops */}
        <div ref={drop1Ref} className="absolute top-[50%] left-[42%] w-3 h-8 bg-gradient-to-b from-[#009e4f] to-[#00c962] rounded-full opacity-0 z-5 blur-[0.5px]" />
        <div ref={drop2Ref} className="absolute top-[50%] left-[48%] w-4 h-10 bg-gradient-to-b from-[#009e4f] to-[#00c962] rounded-full opacity-0 z-5 blur-[0.5px]" />
        <div ref={drop3Ref} className="absolute top-[50%] left-[54%] w-2 h-6 bg-gradient-to-b from-[#009e4f] to-[#00c962] rounded-full opacity-0 z-5 blur-[0.5px]" />
        <div ref={drop4Ref} className="absolute top-[50%] left-[38%] w-2 h-5 bg-gradient-to-b from-[#009e4f] to-[#00c962] rounded-full opacity-0 z-5 blur-[0.5px]" />
        <div ref={drop5Ref} className="absolute top-[50%] left-[58%] w-3 h-7 bg-gradient-to-b from-[#009e4f] to-[#00c962] rounded-full opacity-0 z-5 blur-[0.5px]" />

        {/* The Bottle */}
        <div ref={bottleRef} className="absolute bottom-[3%] opacity-0 flex flex-col items-center z-10">
          {/* Bottle neck */}
          <div className="w-8 h-6 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-lg border border-gray-300" />
          {/* Bottle body */}
          <div className="w-28 h-44 border-2 border-gray-300 rounded-b-[1.5rem] overflow-hidden relative bg-white/80 shadow-lg">
            <div ref={bottleFillRef} className="absolute bottom-0 w-full h-0 bg-gradient-to-t from-[#006633] via-[#009e4f] to-[#00c962] transition-none" />
            {/* Glass highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {/* Nativos label */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center z-10">
              <span className="text-[10px] font-bold text-white tracking-widest uppercase drop-shadow-md">Nativos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final label */}
      <div ref={labelRef} className="absolute bottom-8 md:bottom-12 text-center w-full opacity-0 z-20 px-6">
        <p className="text-2xl md:text-3xl font-serif text-[#009e4f]">Pura vida en cada gota</p>
        <p className="text-sm text-gray-400 mt-2 font-light">Sin calor · Sin conservantes · Sin compromisos</p>
      </div>
    </section>
  );
}
