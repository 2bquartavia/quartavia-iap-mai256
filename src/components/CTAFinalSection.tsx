import { ArrowRight, Calendar, Lock, Users } from "lucide-react";

export default function CTAFinalSection() {
  return (
    <section id="cadastro" className="cta-zero">
      {/* animated background layers */}
      <div className="cta-zero__rings" aria-hidden>
        <span /><span /><span /><span />
      </div>
      <div className="cta-zero__spotlight" aria-hidden />

      <div className="wrap cta-zero__inner">
        <div className="cta-zero__date">
          <Calendar size={14} strokeWidth={2.4} />
          <span>26 · ABRIL</span>
          <span className="cta-zero__date-sep" />
          <span className="cta-zero__date-pulse" />
          Lote ZERO
        </div>

        <h2 className="cta-zero__title">
          Cadastre-se agora <br />e entre no <em>grupo de WhatsApp</em>
        </h2>

        <p className="cta-zero__lead">
          Somente quem se cadastrar aqui terá acesso ao Lote ZERO da Imersão Alavanca Patrimonial em
          primeira mão no dia <strong>26 de abril</strong>, com a melhor condição da história.
        </p>

        <a href="#" className="cta-zero__cta">
          <span className="cta-zero__cta-bg" />
          <span className="cta-zero__cta-label">Quero garantir minha vaga no Lote ZERO</span>
          <span className="cta-zero__cta-arrow">
            <ArrowRight size={20} strokeWidth={2.6} />
          </span>
        </a>

        <div className="cta-zero__meta">
          <div className="cta-zero__meta-item">
            <Users size={14} strokeWidth={2.4} />
            Acesso gratuito ao grupo
          </div>
          <span className="cta-zero__meta-dot" />
          <div className="cta-zero__meta-item">
            <Lock size={14} strokeWidth={2.4} />
            Vagas limitadas
          </div>
        </div>
      </div>

      {/* marquee strip */}
      <div className="cta-zero__marquee" aria-hidden>
        <div className="cta-zero__marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="cta-zero__marquee-row">
              {[
                "LOTE ZERO",
                "26 · ABRIL",
                "ACESSO ANTECIPADO",
                "MELHOR CONDIÇÃO",
                "VAGAS LIMITADAS",
                "IMERSÃO ALAVANCA PATRIMONIAL",
              ].map((t, i) => (
                <span key={i}>
                  {t}
                  <span className="cta-zero__marquee-star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
