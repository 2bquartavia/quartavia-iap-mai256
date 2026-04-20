import { ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";
import dep1 from "@/assets/depoimento-1.jpeg";
import dep2 from "@/assets/depoimento-2.jpeg";
import dep3 from "@/assets/depoimento-3.jpeg";
import dep4 from "@/assets/depoimento-4.jpeg";

const images = [dep1, dep2, dep3, dep4];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="testimonials">
      <div className="wrap">
        <div className="testimonials__head">
          <span className="immersion__eyebrow">Depoimentos</span>
          <h2 className="display testimonials__title">
            O que as pessoas falam desse conteúdo <em>Imersão?</em>
          </h2>
        </div>

        <div className="testimonials__grid">
          {images.map((src, i) => (
            <figure key={i} className="testimonial-card">
              <img src={src} alt={`Depoimento ${i + 1}`} loading="lazy" />
            </figure>
          ))}
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
