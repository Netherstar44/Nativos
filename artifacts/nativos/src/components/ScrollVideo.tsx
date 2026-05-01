import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let stInstance: ScrollTrigger | null = null;
    let reqId: number;
    let targetTime = 0;

    const onLoadedMetadata = () => {
      const duration = video.duration || 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 screens of scrolling
          scrub: 0.1, // Reduced inertia to prevent overwhelming decoder
          pin: true,
          onUpdate: (self) => {
            targetTime = self.progress * duration;
          }
        }
      });
      
      stInstance = tl.scrollTrigger || null;

      // Optimize scrubbing: only update currentTime if the browser has finished seeking
      const updateVideo = () => {
        if (video && !video.seeking) {
          // Only update if the difference is significant enough
          if (Math.abs(video.currentTime - targetTime) > 0.05) {
            video.currentTime = targetTime;
          }
        }
        reqId = requestAnimationFrame(updateVideo);
      };
      updateVideo();

      // Text 1
      tl.fromTo(text1Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.1 },
        0.1
      ).to(text1Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.3);

      // Text 2
      tl.fromTo(text2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.1 },
        0.4
      ).to(text2Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.6);

      // Text 3
      tl.fromTo(text3Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.1 },
        0.7
      ).to(text3Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.9);

      // Force GSAP to recalculate all trigger positions since this one was added asynchronously
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    
    // In case it's already loaded
    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    // iOS Safari hack: play and immediately pause to unlock JS control
    const unlockVideo = () => {
      video.play().then(() => {
        video.pause();
      }).catch(() => {});
    };
    
    // Try to unlock immediately, or on first touch
    unlockVideo();
    window.addEventListener('touchstart', unlockVideo, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener('touchstart', unlockVideo);
      if (stInstance) stInstance.kill();
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden" id="origen">
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}nativos_scroll.mp4`}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        muted
        playsInline
        preload="auto"
        autoPlay
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 pointer-events-none drop-shadow-md">
        <div ref={text1Ref} className="absolute text-center opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Natural desde la raíz</h2>
          <p className="text-lg md:text-xl font-light opacity-80">100% fruta colombiana.</p>
        </div>

        <div ref={text2Ref} className="absolute text-center opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Sin conservantes</h2>
          <p className="text-lg md:text-xl font-light opacity-80">Prensado en frío para mantener su esencia.</p>
        </div>

        <div ref={text3Ref} className="absolute text-center opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Origen colombiano</h2>
          <p className="text-lg md:text-xl font-light opacity-80">Del campo a nuestro atelier.</p>
        </div>
      </div>
    </section>
  );
}
