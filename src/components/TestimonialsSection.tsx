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
  // Duplicado para criar loop infinito contínuo no marquee
  const loop = [...images, ...images];

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
        <div className="testimonials__track">
          {loop.map((src, i) => (
            <figure key={i} className="testimonial-card">
              <img src={src} alt={`Depoimento ${(i % images.length) + 1}`} loading="lazy" />
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
