import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Configuración de los fotogramas (¡Modifica esto según cuántos exportes!)
const frameCount = 150; // Total de imágenes
const framePath = (index: number) => 
  `${import.meta.env.BASE_URL}frames/frame_${index.toString().padStart(3, '0')}.webp`; // Ejemplo: frames/frame_001.webp

export default function CanvasVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // Ajustar resolución del canvas para retina displays (se ve mucho más nítido)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Arreglo para guardar las imágenes precargadas
    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    // Precargar las imágenes para evitar parpadeos
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      images.push(img);
    }

    // Dibujar el primer fotograma apenas cargue
    images[0].onload = render;

    function render() {
      if (!canvas || !context) return;
      // Limpiar el canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      const img = images[airpods.frame];
      if (!img) return;

      // Calcular cómo dibujar la imagen para que llene la pantalla (object-fit: cover)
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // 4 pantallas de duración
        scrub: 0.5, // Suavidad ideal para secuencias de imágenes
        pin: true,
      }
    });

    // Animar la propiedad "frame" del objeto desde 0 hasta el total de frames
    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame", // Forzar a que sean números enteros (0, 1, 2...)
      ease: "none",
      onUpdate: render // Dibujar cada vez que cambie el fotograma
    }, 0);

    // Animación de los textos por encima del canvas
    tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.1)
      .to(text1Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.3);

    tl.fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.4)
      .to(text2Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.6);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden" id="canvas-scroll">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 pointer-events-none drop-shadow-md">
        <div ref={text1Ref} className="absolute text-center opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Fluidez Absoluta</h2>
          <p className="text-lg md:text-xl font-light opacity-80">Renderizado por Canvas a 60FPS.</p>
        </div>

        <div ref={text2Ref} className="absolute text-center opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Nivel Premium</h2>
          <p className="text-lg md:text-xl font-light opacity-80">Cero saltos, cero congelamientos.</p>
        </div>
      </div>
    </section>
  );
}
