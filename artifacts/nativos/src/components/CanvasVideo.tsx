import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FILES = 307;
const STEP = 3;
const allFramePaths: string[] = [];
for (let i = 1; i <= TOTAL_FILES; i += STEP) {
  allFramePaths.push(`${import.meta.env.BASE_URL}fps_png/${i.toString().padStart(3, '0')}.png`);
}
const totalFrames = allFramePaths.length;

// Test if canvas 2D is available (Brave blocks it)
function isCanvasAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx = c.getContext("2d");
    if (!ctx) return false;
    ctx.fillRect(0, 0, 1, 1);
    const data = ctx.getImageData(0, 0, 1, 1).data;
    return data[3] !== 0; // If alpha is 0, canvas is poisoned
  } catch {
    return false;
  }
}

// ============================================
// Canvas-based renderer (Chrome, Firefox, Edge)
// ============================================
function CanvasRenderer({ onReady, containerRef, images }: {
  onReady: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  images: HTMLImageElement[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!onReady || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    let stInstance: ScrollTrigger | null = null;
    let lastIdx = -1;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    function draw(idx: number) {
      if (!canvas || !context) return;
      if (idx === lastIdx) return;
      const safeIdx = Math.max(0, Math.min(idx, images.length - 1));
      const img = images[safeIdx];
      if (!img?.complete || !img.naturalWidth) return;
      lastIdx = safeIdx;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const r = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      context.drawImage(img,
        (canvas.width - img.naturalWidth * r) / 2,
        (canvas.height - img.naturalHeight * r) / 2,
        img.naturalWidth * r, img.naturalHeight * r);
    }

    draw(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => draw(Math.round(self.progress * (totalFrames - 1)))
      }
    });
    stInstance = tl.scrollTrigger!;

    const onResize = () => { setSize(); lastIdx = -1; draw(0); };
    window.addEventListener("resize", onResize);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      if (stInstance) stInstance.kill();
    };
  }, [onReady, images]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />;
}

// ============================================
// IMG-based fallback renderer (Brave, Safari)
// ============================================
function ImgRenderer({ onReady, containerRef, images }: {
  onReady: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  images: HTMLImageElement[];
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!onReady || !imgRef.current) return;

    let stInstance: ScrollTrigger | null = null;
    let lastIdx = -1;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (totalFrames - 1));
          if (idx === lastIdx || !imgRef.current) return;
          lastIdx = idx;
          const safeIdx = Math.max(0, Math.min(idx, images.length - 1));
          if (images[safeIdx]?.complete) {
            imgRef.current.src = images[safeIdx].src;
          }
        }
      }
    });
    stInstance = tl.scrollTrigger!;

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      if (stInstance) stInstance.kill();
    };
  }, [onReady, images]);

  return (
    <img
      ref={imgRef}
      src={images[0]?.src || ""}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

// ============================================
// Main Component
// ============================================
export default function CanvasVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [useCanvas, setUseCanvas] = useState(true);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    setUseCanvas(isCanvasAvailable());

    const images: HTMLImageElement[] = new Array(totalFrames);
    let loaded = 0;

    // Preload in batches
    let batchStart = 0;
    const BATCH = 10;

    function loadBatch() {
      const end = Math.min(batchStart + BATCH, totalFrames);
      let batchDone = 0;
      const batchSize = end - batchStart;

      for (let i = batchStart; i < end; i++) {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          batchDone++;
          setLoadProgress(Math.round((loaded / totalFrames) * 100));
          if (batchDone >= batchSize) {
            batchStart = end;
            if (batchStart >= totalFrames) {
              imagesRef.current = images;
              setIsReady(true);
            } else {
              requestAnimationFrame(loadBatch);
            }
          }
        };
        img.src = allFramePaths[i];
        images[i] = img;
      }
    }
    loadBatch();
  }, []);

  // Text animations (only after ready)
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    // Small delay to let the ScrollTrigger from the renderer initialize first
    const timer = setTimeout(() => {
      const existingST = ScrollTrigger.getAll().find(
        st => st.trigger === containerRef.current
      );

      if (existingST) {
        const tl = existingST.animation as gsap.core.Timeline;
        if (tl) {
          tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.1)
            .to(text1Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.3);
          tl.fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.4)
            .to(text2Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.6);
          tl.fromTo(text3Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.7)
            .to(text3Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.9);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isReady]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden" id="scroll-sequence">
      {isReady && (
        useCanvas
          ? <CanvasRenderer onReady={isReady} containerRef={containerRef} images={imagesRef.current} />
          : <ImgRenderer onReady={isReady} containerRef={containerRef} images={imagesRef.current} />
      )}

      {/* Loading */}
      {!isReady && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
          <div className="w-14 h-14 mb-5 border-4 border-white/10 border-t-[#009e4f] rounded-full animate-spin" />
          <div className="relative w-56 h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
            <div className="absolute inset-y-0 left-0 bg-[#009e4f] rounded-full transition-all duration-200"
              style={{ width: `${loadProgress}%` }} />
          </div>
          <p className="text-white/50 text-xs font-light tracking-[0.25em] uppercase">
            Cargando experiencia · {loadProgress}%
          </p>
        </div>
      )}

      {/* Text Overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 pointer-events-none z-10">
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
