import React, { useState, useRef } from "react";

export default function JuiceCompare() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section className="py-24 bg-gray-50 px-6 relative overflow-hidden" id="compare">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-[#009e4f] mb-4">La Verdad en tu Vaso</h2>
        <p className="text-lg text-gray-600">Arrastra el deslizador para ver la diferencia entre un jugo convencional y la textura pura de Nativos.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div 
          ref={containerRef}
          className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden cursor-ew-resize shadow-2xl select-none"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
        >
          {/* Base Image / Right Side (Nativos) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#009e4f] to-[#e31e24] flex items-center justify-end p-8 md:p-16">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
            <div className="text-right z-10 w-1/2 pr-4 md:pr-12 text-white">
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4">Nativos</h3>
              <p className="text-lg opacity-90">Pulpa real, 100% natural. Textura espesa, colores vibrantes y vitaminas intactas por nuestro proceso prensado en frío.</p>
            </div>
          </div>

          {/* Top Image / Left Side (Generic) */}
          <div 
            className="absolute inset-0 overflow-hidden bg-white border-r-4 border-white flex items-center justify-start p-8 md:p-16"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-orange-50" />
            <div className="text-left z-10 w-[400px] pl-4 md:pl-12">
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-gray-400 mb-4">Convencional</h3>
              <p className="text-lg text-gray-500">Agua saborizada con concentrados, azúcares añadidos y colorantes. Transparente y sin vida.</p>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center shadow-lg"
            style={{ left: `calc(${sliderPos}% - 2px)` }}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] text-[#009e4f] text-2xl">
              ⟷
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
