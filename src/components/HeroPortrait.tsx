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
      // 0 no topo do hero, 1 quando o hero saiu completamente da tela
      const progress = Math.min(Math.max(-rect.top / (rect.height || vh), 0), 1);

      // Imagem fica PRESA (fixed). Apenas a "máscara" se fecha conforme rolamos,
      // revelando o conteúdo escuro abaixo. Sem zoom, sem expandir.
      const reveal = progress * 100; // %
      img.style.clipPath = `inset(0 0 ${reveal}% 0)`;
      img.style.opacity = `${1 - progress * 0.15}`;

      if (glow) {
        glow.style.opacity = `${0.6 - progress * 0.55}`;
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
      <div className="hero__portrait-fixed">
        <img
          ref={imgRef}
          src={heroBg}
          alt="Adrian Carvalho no palco da Mansão Davos"
          className="hero__portrait-img"
        />
        <div className="hero__portrait-glow" ref={glowRef} aria-hidden />
        <div className="hero__portrait-grain" aria-hidden />
      </div>
    </div>
  );
}
