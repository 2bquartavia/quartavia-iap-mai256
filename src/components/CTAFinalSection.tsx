import { ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";
import ctaBg from "@/assets/cta-bg.jpg";

export default function CTAFinalSection() {
  return (
    <section id="cadastro" className="cta-thirds">
      <div
        className="cta-thirds__bg"
        style={{ backgroundImage: `url(${ctaBg})` }}
        aria-hidden
      />
      <div className="cta-thirds__overlay" aria-hidden />

      {/* Rule of thirds grid */}
      <div className="cta-thirds__grid" aria-hidden>
        <span className="cta-thirds__line cta-thirds__line--v1" />
        <span className="cta-thirds__line cta-thirds__line--v2" />
        <span className="cta-thirds__line cta-thirds__line--h1" />
        <span className="cta-thirds__line cta-thirds__line--h2" />
      </div>

      <div className="cta-thirds__inner">
        <div className="cta-thirds__center">
          <h2 className="cta-thirds__title">
            Cadastre-se agora e entre no <em>grupo de WhatsApp</em>
          </h2>
          <p className="cta-thirds__lead">
            Somente quem se cadastrar aqui terá acesso ao Lote ZERO da Imersão Alavanca
            Patrimonial em primeira mão no dia <strong>26 de abril</strong>, com a melhor
            condição da história.
          </p>

          <PillButton
            label="Quero garantir minha vaga no Lote ZERO"
            variant="gold"
            icon={<ArrowRight size={18} strokeWidth={2.2} />}
          />

          <p className="cta-thirds__meta">
            Acesso gratuito ao grupo <span className="cta-thirds__dot" /> Vagas limitadas
          </p>
        </div>
      </div>
    </section>
  );
}
