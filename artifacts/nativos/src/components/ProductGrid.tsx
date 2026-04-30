import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import luloSmoothie from "@/assets/lulo-smoothie.png";
import mangoSmoothie from "@/assets/mango-smoothie.png";
import moraSmoothie from "@/assets/mora-smoothie.png";

const products = [
  {
    id: "lulo",
    name: "Lulo Radiante",
    description: "Cítrico, vibrante y lleno de energía. El sabor inconfundible de los Andes.",
    image: luloSmoothie,
    color: "bg-[#e8f3ee]"
  },
  {
    id: "mango",
    name: "Mango Sol",
    description: "Dulce, denso y tropical. Como una tarde cálida en el valle.",
    image: mangoSmoothie,
    color: "bg-[#fff9e6]"
  },
  {
    id: "mora",
    name: "Mora Silvestre",
    description: "Profundo, antioxidante y complejo. Cosechado en tierras altas.",
    image: moraSmoothie,
    color: "bg-[#f5e6e8]"
  }
];

export default function ProductGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section id="sabores" ref={containerRef} className="py-32 px-6 bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-6">Sabores de Origen</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Cada botella es un tributo a la biodiversidad colombiana. Sin azúcares añadidos, sin conservantes. Solo la fruta en su máxima expresión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              ref={el => cardsRef.current[index] = el}
              className="group relative flex flex-col items-center p-8 rounded-[2rem] bg-white border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ease-out overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${product.color}`} />
              
              <div className="relative z-10 h-80 w-full mb-8 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full object-contain filter drop-shadow-md group-hover:scale-105 group-hover:drop-shadow-xl transition-all duration-500 ease-out"
                />
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-serif text-primary mb-3">{product.name}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
