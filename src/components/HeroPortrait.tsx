import { useEffect, useRef } from "react";
const heroBg = "/hero-v2-desktop.jpg";
const heroBgMobile = "/hero-v2-mobile.jpg";

export default function HeroPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let lastP = -1;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const fixed = fixedRef.current;
      if (!wrap || !fixed) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.min(Math.max(-rect.top / (rect.height || vh), 0), 1);
      if (Math.abs(progress - lastP) < 0.01) return;
      lastP = progress;
      // Apenas opacidade — composited, sem layout/repaint
      fixed.style.opacity = `${1 - progress}`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero__portrait" ref={wrapRef}>
      <div className="hero__portrait-fixed" ref={fixedRef} style={{ willChange: "opacity" }}>
        <picture>
          <source media="(max-width: 768px)" srcSet={heroBgMobile} />
          <img
            src={heroBg}
            alt="Adrian Carvalho no palco da Mansão Davos"
            className="hero__portrait-img"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="hero__portrait-grain" aria-hidden />
      </div>
    </div>
  );
}
