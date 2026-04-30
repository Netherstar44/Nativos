import React, { useState } from "react";
import { motion } from "framer-motion";
import luloImg from "@/assets/floating-lulo.png";
import mangoImg from "@/assets/floating-mango.png";

const ingredients = [
  { id: "lulo", name: "Lulo", img: luloImg },
  { id: "mango", name: "Mango", img: mangoImg },
];

export default function FlavorMixer() {
  const [mixed, setMixed] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: any, id: string) => {
    // Check if dropped near the center X
    const centerX = window.innerWidth / 2;
    if (info.point.x > centerX - 150 && info.point.x < centerX + 150) {
      if (!mixed.includes(id)) {
        setMixed([...mixed, id]);
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-white overflow-hidden relative" id="mixer">
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-30">
        <h2 className="text-4xl md:text-6xl font-serif text-[#009e4f] mb-4">Crea tu Mezcla</h2>
        <p className="text-lg text-gray-600">Arrastra las frutas hacia la botella central para descubrir tu jugo ideal.</p>
      </div>

      <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center">
        {/* The Bottle Area */}
        <div className="absolute w-48 h-96 border-4 border-[#009e4f]/20 rounded-[3rem] flex flex-col justify-end overflow-hidden items-center shadow-inner pointer-events-none">
          <div className="absolute inset-0 bg-gray-50/50 -z-10" />
          {mixed.length > 0 ? (
            <motion.div 
              initial={{ height: 0 }} 
              animate={{ height: `${mixed.length * 50}%` }} 
              transition={{ type: "spring", bounce: 0.4 }}
              className="w-full absolute bottom-0 opacity-90 transition-colors duration-700"
              style={{ 
                backgroundColor: mixed.includes("lulo") && mixed.includes("mango") ? "#e67e22" : 
                                 mixed[0] === "lulo" ? "#009e4f" : "#e31e24" 
              }}
            />
          ) : (
             <p className="text-gray-400 font-medium z-10 opacity-50 absolute top-1/2 -translate-y-1/2 text-center px-4">Arrastra aquí<br/>las frutas</p>
          )}
        </div>

        {/* Ingredients */}
        {ingredients.map((ing, i) => (
          <motion.div
            key={ing.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragSnapToOrigin={!mixed.includes(ing.id)}
            onDragEnd={(e, info) => handleDragEnd(e, info, ing.id)}
            className="absolute cursor-grab active:cursor-grabbing z-40 touch-none"
            style={{
              left: i === 0 ? '15%' : 'auto',
              right: i === 1 ? '15%' : 'auto',
              top: '30%'
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-white/80 p-4 rounded-full shadow-lg backdrop-blur-sm border border-gray-100 pointer-events-none">
              <img src={ing.img} alt={ing.name} className="w-24 h-24 md:w-32 md:h-32 object-contain filter drop-shadow-md" />
            </div>
            <p className="text-center mt-4 font-bold text-[#e31e24] uppercase tracking-wider text-sm pointer-events-none">{ing.name}</p>
          </motion.div>
        ))}
      </div>

      {mixed.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-12">
          <h3 className="text-3xl font-serif text-[#e31e24] mb-2">
            {mixed.includes("lulo") && mixed.includes("mango") ? "¡Fusión Andina Tropical!" : 
             mixed[0] === "lulo" ? "¡Poder Verde Refrescante!" : "¡Dulce Energía Tropical!"}
          </h3>
          <p className="text-gray-600">Una excelente elección para mantenerte Naturalmente Activo.</p>
          <button 
            onClick={() => setMixed([])} 
            className="mt-6 px-6 py-2 border-2 border-[#009e4f] text-[#009e4f] rounded-full hover:bg-[#009e4f] hover:text-white transition-colors font-bold text-sm"
          >
            Volver a mezclar
          </button>
        </motion.div>
      )}
    </section>
  );
}
