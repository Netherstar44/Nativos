import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Configuración de los fotogramas
const frameCount = 307;
const framePath = (index: number) =>
  `${import.meta.env.BASE_URL}fps_png/${index.toString().padStart(3, '0')}.png`;

export default function CanvasVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // Ajustar resolución del canvas al tamaño real de la pantalla
    const setCanvasSize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setCanvasSize();

    // Arreglo para guardar las imágenes precargadas
    const images: HTMLImageElement[] = [];
    const currentFrame = { value: 0 };

    // Precargar todas las imágenes
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      images.push(img);
    }

    // Dibujar el primer fotograma cuando cargue
    images[0].onload = () => render();

    function render() {
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);

      const img = images[currentFrame.value];
      if (!img || !img.complete) return;

      // object-fit: cover para el canvas
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const hRatio = screenW / img.width;
      const vRatio = screenH / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (screenW - img.width * ratio) / 2;
      const cy = (screenH - img.height * ratio) / 2;

      context.drawImage(img, 0, 0, img.width, img.height,
        cx, cy, img.width * ratio, img.height * ratio);
    }

    // ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 0.5,
        pin: true,
      }
    });

    const stInstance = tl.scrollTrigger!;

    // Animar el índice del fotograma
    tl.to(currentFrame, {
      value: frameCount - 1,
      snap: "value",
      ease: "none",
      onUpdate: render,
    }, 0);

    // Textos superpuestos
    tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.1)
      .to(text1Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.3);

    tl.fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.4)
      .to(text2Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.6);

    tl.fromTo(text3Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.7)
      .to(text3Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.9);

    // Redibujar al cambiar de tamaño
    const handleResize = () => {
      setCanvasSize();
      render();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (stInstance) stInstance.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden" id="scroll-sequence">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 pointer-events-none">
        <div ref={text1Ref} className="absolute text-center opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif mb-4 drop-shadow-lg">Natural desde la raíz</h2>
          <p className="text-lg md:text-xl font-light opacity-80 drop-shadow-md">100% fruta colombiana.</p>
        </div>

        <div ref={text2Ref} className="absolute text-center opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif mb-4 drop-shadow-lg">Sin conservantes</h2>
          <p className="text-lg md:text-xl font-light opacity-80 drop-shadow-md">Prensado en frío para mantener su esencia.</p>
        </div>

        <div ref={text3Ref} className="absolute text-center opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif mb-4 drop-shadow-lg">Origen colombiano</h2>
          <p className="text-lg md:text-xl font-light opacity-80 drop-shadow-md">Del campo a nuestro atelier.</p>
        </div>
      </div>
    </section>
  );
}
