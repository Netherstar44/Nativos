import React, { useRef, useEffect } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OriginMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    gsap.fromTo(mapRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: {
        trigger: mapRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }}
    );
  }, []);

  return (
    <section className="py-24 bg-[#009e4f] text-white relative overflow-hidden" id="origen">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <span className="text-sm font-bold uppercase tracking-widest text-[#e31e24] bg-white px-3 py-1 rounded-full mb-6 inline-block">Nuestro Origen</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Raíces Andinas</h2>
          <p className="text-lg font-light opacity-90 mb-8 leading-relaxed">
            Cada gota de nuestros jugos nace en el corazón de Colombia. Trabajamos de la mano con agricultores locales en las regiones montañosas, donde la altitud y el clima perfecto cultivan las frutas más vibrantes del mundo.
          </p>
          <div className="space-y-4">
            <div className="group cursor-pointer p-4 rounded-xl border border-white/20 hover:bg-white/10 hover:scale-[1.02] transition-all flex justify-between items-center">
              <div>
                <h4 className="font-bold text-xl text-[#e31e24]">Valle del Cauca</h4>
                <p className="text-sm opacity-90">Origen del Lulo Radiante</p>
              </div>
              <span className="text-2xl group-hover:rotate-12 transition-transform">🌱</span>
            </div>
            <div className="group cursor-pointer p-4 rounded-xl border border-white/20 hover:bg-white/10 hover:scale-[1.02] transition-all flex justify-between items-center">
              <div>
                <h4 className="font-bold text-xl text-[#e31e24]">Antioquia</h4>
                <p className="text-sm opacity-90">Cosecha de Mora Silvestre</p>
              </div>
              <span className="text-2xl group-hover:rotate-12 transition-transform">⛰️</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 w-full h-[500px] bg-white/5 backdrop-blur-md border border-white/20 rounded-[3rem] p-8 relative flex flex-col items-center justify-center shadow-2xl" ref={mapRef}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-80 bg-white/10 rounded-full blur-[80px]" />
          </div>
          
          <div className="relative z-10 text-center animate-pulse">
            <div className="w-32 h-32 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-lg">
              <span className="text-6xl">🇨🇴</span>
            </div>
            <h3 className="text-3xl font-serif text-white mb-2">100% Colombiano</h3>
            <p className="opacity-80 font-light">Explorador del mapa completo<br/>próximamente</p>
          </div>
        </div>
      </div>
    </section>
  );
}
