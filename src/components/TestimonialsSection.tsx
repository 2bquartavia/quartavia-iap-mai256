import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
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
  const userInteractingRef = useRef<boolean>(false);
  const interactTimeoutRef = useRef<number | null>(null);

  // Auto-scroll com requestAnimationFrame + loop infinito
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Posiciona no meio (segundo bloco) para permitir scroll em ambas direções
    const cycle = track.scrollWidth / 3;
    track.scrollLeft = cycle;

    const BASE_SPEED = 90; // px/segundo
    const SLOW_SPEED = 22; // px/segundo quando um card está centralizado
    const SLOW_RANGE_RATIO = 0.55; // fração da largura do card considerada "zona de leitura"

    let centerDist = Infinity;
    let centerCardWidth = 0;

    const tick = (t: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = t;
      const dt = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      // Velocidade dinâmica: desacelera ao chegar perto do centro
      let speed = BASE_SPEED;
      if (centerCardWidth > 0) {
        const range = centerCardWidth * SLOW_RANGE_RATIO;
        const proximity = Math.max(0, Math.min(1, 1 - centerDist / range));
        // Easing suave para a desaceleração
        const eased = proximity * proximity * (3 - 2 * proximity);
        speed = BASE_SPEED + (SLOW_SPEED - BASE_SPEED) * eased;
      }

      if (!userInteractingRef.current) {
        track.scrollLeft += speed * dt;
      }
      // Loop: ao atravessar o terceiro bloco, volta ao segundo
      const c = track.scrollWidth / 3;
      if (track.scrollLeft >= c * 2) track.scrollLeft -= c;
      else if (track.scrollLeft <= 0) track.scrollLeft += c;

      // Atualiza destaque do card central
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

    const flagInteract = () => {
      userInteractingRef.current = true;
      if (interactTimeoutRef.current) window.clearTimeout(interactTimeoutRef.current);
      interactTimeoutRef.current = window.setTimeout(() => {
        userInteractingRef.current = false;
      }, 1500);
    };

    track.addEventListener("pointerdown", flagInteract);
    track.addEventListener("wheel", flagInteract, { passive: true });
    track.addEventListener("touchstart", flagInteract, { passive: true });
    track.addEventListener("scroll", updateCenter, { passive: true });

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (interactTimeoutRef.current) window.clearTimeout(interactTimeoutRef.current);
      track.removeEventListener("pointerdown", flagInteract);
      track.removeEventListener("wheel", flagInteract);
      track.removeEventListener("touchstart", flagInteract);
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
          {loop.map((src, i) => (
            <figure key={i} className="testimonial-card">
              <div className="testimonial-card__media">
                <img src={src} alt={`Depoimento ${(i % images.length) + 1}`} loading="lazy" />
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="testimonials__cta">
          <PillButton
            label="Quero garantir minha vaga no LOTE ZERO"
            variant="gold"
            icon={<ArrowRight size={18} strokeWidth={2.2} />}
          />
        </div>
      </div>
    </section>
  );
}
