import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".testimonial-card");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="depoimentos" className="testimonials">
      <div className="wrap">
        <div className="testimonials__head">
          <h2 className="display testimonials__title">
            O que as pessoas falam desse conteúdo <em>Imersão?</em>
          </h2>
        </div>

        <div className="testimonials__carousel">
          <button
            type="button"
            aria-label="Anterior"
            className="testimonials__nav testimonials__nav--prev"
            onClick={() => scrollBy(-1)}
          >
            <ChevronLeft size={22} strokeWidth={2.2} />
          </button>

          <div ref={trackRef} className="testimonials__track">
            {images.map((src, i) => (
              <figure key={i} className="testimonial-card">
                <img src={src} alt={`Depoimento ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>

          <button
            type="button"
            aria-label="Próximo"
            className="testimonials__nav testimonials__nav--next"
            onClick={() => scrollBy(1)}
          >
            <ChevronRight size={22} strokeWidth={2.2} />
          </button>
        </div>

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
