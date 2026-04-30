import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import andeanImg from "@/assets/andean-landscape.png";

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(imageRef.current,
      { y: -50, scale: 1.1 },
      {
        y: 50,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    gsap.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="atelier" ref={containerRef} className="py-32 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative h-[600px] rounded-[2rem] overflow-hidden">
          <img 
            ref={imageRef}
            src={andeanImg} 
            alt="Paisaje Andino" 
            className="absolute inset-0 w-full h-full object-cover origin-center"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        </div>

        <div ref={textRef} className="max-w-xl">
          <span className="text-secondary-foreground text-sm font-medium tracking-widest uppercase mb-4 block">Nuestro Atelier</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
            Elevando lo autóctono a una forma de arte.
          </h2>
          <div className="space-y-6 text-muted-foreground font-light text-lg">
            <p>
              Nativos nace en Medellín con una premisa simple: nuestras frutas no necesitan ser alteradas, necesitan ser respetadas.
            </p>
            <p>
              Trabajamos directamente con agricultores de las regiones andinas, seleccionando a mano curubas, lulos y moras. En nuestro atelier, el proceso de prensado en frío extrae la esencia pura de cada ingrediente, preservando sus nutrientes y su vibrante color original.
            </p>
            <p>
              No es solo jugo. Es Nativos. Naturalmente Activos.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
