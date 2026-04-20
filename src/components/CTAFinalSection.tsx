import { ArrowRight } from "lucide-react";

export default function CTAFinalSection() {
  return (
    <section id="cadastro" className="cta-elegant">
      <div className="cta-elegant__inner">
        <div className="cta-elegant__eyebrow">
          <span className="cta-elegant__line" />
          <span className="cta-elegant__eyebrow-text">26 · Abril · Lote ZERO</span>
          <span className="cta-elegant__line" />
        </div>

        <h2 className="cta-elegant__title">
          Cadastre-se agora e entre
          <br />
          no <em>grupo de WhatsApp</em>
        </h2>

        <div className="cta-elegant__ornament" aria-hidden>
          <span /><span className="cta-elegant__diamond" /><span />
        </div>

        <p className="cta-elegant__lead">
          Somente quem se cadastrar aqui terá acesso ao Lote ZERO da Imersão Alavanca Patrimonial
          em primeira mão no dia <strong>26 de abril</strong>, com a melhor condição da história.
        </p>

        <a href="#" className="cta-elegant__cta">
          <span>Quero garantir minha vaga no Lote ZERO</span>
          <ArrowRight size={18} strokeWidth={2} />
        </a>

        <p className="cta-elegant__fine">
          Acesso gratuito ao grupo · Vagas limitadas
        </p>
      </div>
    </section>
  );
}
