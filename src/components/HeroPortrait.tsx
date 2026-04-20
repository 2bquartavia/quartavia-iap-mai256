import { useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const wrap = wrapRef.current;
      const img = imgRef.current;
      const glow = glowRef.current;
      if (!wrap || !img) return;

      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: 0 when hero top at viewport top; 1 when fully scrolled past
      const progress = Math.min(Math.max(-rect.top / (rect.height || vh), 0), 1.2);

      // Innovative multi-layer parallax:
      // - image translates up slower than scroll (classic parallax)
      // - subtle zoom-in as you scroll (cinematic dolly)
      // - slight rotate/skew for depth
      // - radial glow drifts down for atmosphere
      const translateY = progress * 120; // px
      const scale = 1 + progress * 0.18;
      const blur = progress * 4; // px
      const rotate = progress * -1.2; // deg

      img.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`;
      img.style.filter = `blur(${blur}px) brightness(${1 - progress * 0.35})`;

      if (glow) {
        glow.style.transform = `translate3d(0, ${progress * 200}px, 0)`;
        glow.style.opacity = `${0.55 - progress * 0.5}`;
      }
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero__portrait" ref={wrapRef}>
      <img
        ref={imgRef}
        src={heroBg}
        alt="Adrian Carvalho no palco da Mansão Davos"
        className="hero__portrait-img"
      />
      <div className="hero__portrait-glow" ref={glowRef} aria-hidden />
      <div className="hero__portrait-grain" aria-hidden />
    </div>
  );
}
