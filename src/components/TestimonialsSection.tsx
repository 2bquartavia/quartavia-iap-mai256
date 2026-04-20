import { ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";

const placeholders = Array.from({ length: 6 });

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
          {placeholders.map((_, i) => (
            <figure key={i} className="testimonial-card">
              <div className="testimonial-card__img">
                <span>Foto {i + 1}</span>
              </div>
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
