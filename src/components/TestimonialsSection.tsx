import { useEffect, useRef } from "react";

import PillButton from "@/components/PillButton";
import dep1 from "@/assets/depoimento-1.jpeg";
import dep2 from "@/assets/depoimento-2.jpeg";
import dep3 from "@/assets/depoimento-3.jpeg";
import dep4 from "@/assets/depoimento-4.jpeg";
import dep5 from "@/assets/depoimento-5.jpeg";
import dep6 from "@/assets/depoimento-6.jpeg";
import dep7 from "@/assets/depoimento-7.jpeg";

const images = [dep1, dep2, dep3, dep4, dep5, dep6, dep7];

export default function TestimonialsSection() {
  // Triplicado para permitir loop infinito com "salto" invisível
  const loop = [...images, ...images, ...images];
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Auto-scroll com requestAnimationFrame + loop infinito
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Posiciona no meio (segundo bloco) para permitir scroll em ambas direções
    const cycle = track.scrollWidth / 3;
    track.scrollLeft = cycle;

    const BASE_SPEED = 80; // px/segundo
    const SLOW_SPEED = 55; // px/segundo quando um card está centralizado (nunca para)
    const SLOW_RANGE_RATIO = 0.45; // fração da largura do card considerada "zona de leitura"

    let centerDist = Infinity;
    let centerCardWidth = 0;
    let pointerDown = false;
    let draggingHorizontally = false;
    let startX = 0;
    let startY = 0;

    const tick = (t: number) => {
      // Pausa quando aba está oculta — evita pile-up de timestamps
      // ao retomar e descarta trabalho desnecessário em background.
      if (document.hidden) {
        lastTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (document.body.classList.contains("lead-modal-open")) {
        lastTimeRef.current = t;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = t;
      const dt = Math.min((t - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = t;

      const speed = BASE_SPEED;

      if (!draggingHorizontally) {
        track.scrollLeft += speed * dt;
      }

      const c = track.scrollWidth / 3;
      if (track.scrollLeft >= c * 2) track.scrollLeft -= c;
      else if (track.scrollLeft <= 0) track.scrollLeft += c;

      updateCenter();
      rafRef.current = requestAnimationFrame(tick);
    };

    const updateCenter = () => {
      const rect = track.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      let bestEl: HTMLElement | null = null;
      let bestDist = Infinity;
      let bestWidth = 0;
      track.querySelectorAll<HTMLElement>(".testimonial-card").forEach((el) => {
        const r = el.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - centerX);
        if (d < bestDist) {
          bestDist = d;
          bestEl = el;
          bestWidth = r.width;
        }
      });
      centerDist = bestDist;
      centerCardWidth = bestWidth;
      track.querySelectorAll(".testimonial-card.is-center").forEach((el) => {
        if (el !== bestEl) el.classList.remove("is-center");
      });
      if (bestEl) (bestEl as HTMLElement).classList.add("is-center");
    };

    const beginGesture = (x: number, y: number) => {
      pointerDown = true;
      draggingHorizontally = false;
      startX = x;
      startY = y;
    };

    const trackGesture = (x: number, y: number) => {
      if (!pointerDown) return;
      const dx = Math.abs(x - startX);
      const dy = Math.abs(y - startY);
      draggingHorizontally = dx > dy && dx > 8;
    };

    const endGesture = () => {
      pointerDown = false;
      draggingHorizontally = false;
    };

    const onTouchStart = (e: TouchEvent) => beginGesture(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => trackGesture(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchEnd = () => endGesture();
    const onMouseDown = (e: MouseEvent) => beginGesture(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => trackGesture(e.clientX, e.clientY);
    const onMouseUp = () => endGesture();

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("scroll", updateCenter, { passive: true });

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("scroll", updateCenter);
    };
  }, []);

  return (
    <section id="depoimentos" className="testimonials">
      <div className="wrap">
        <div className="testimonials__head">
          <h2 className="display testimonials__title">
            O que as pessoas falam desse conteúdo <em>Imersão?</em>
          </h2>
        </div>
      </div>

      <div className="testimonials__carousel">
        <div ref={trackRef} className="testimonials__track">
          {loop.map((src, i) => {
            const originalIndex = i % images.length;
            const isPrimarySet = i < images.length;
            return (
              <figure key={i} className="testimonial-card">
                <div className="testimonial-card__media">
                  <img
                    src={src}
                    alt={`Depoimento ${originalIndex + 1}`}
                    loading={isPrimarySet ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={isPrimarySet ? "low" : "auto"}
                  />
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="wrap">
        <div className="testimonials__cta">
          <PillButton
            label="Quero garantir minha vaga no Lote ZERO"
            variant="gold"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}
