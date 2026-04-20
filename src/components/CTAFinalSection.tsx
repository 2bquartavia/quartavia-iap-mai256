import { ArrowRight, MessageCircle, Users, Clock } from "lucide-react";

export default function CTAFinalSection() {
  return (
    <section id="cadastro" className="cta-final">
      <div className="cta-final__bg">
        <div className="cta-final__orb cta-final__orb--1" />
        <div className="cta-final__orb cta-final__orb--2" />
        <div className="cta-final__grid-overlay" />
      </div>

      <div className="wrap cta-final__inner">
        <div className="cta-final__card">
          <div className="cta-final__shine" />

          <div className="cta-final__badge">
            <span className="cta-final__badge-dot" />
            Lote ZERO · 26 de abril
          </div>

          <h2 className="cta-final__title">
            Cadastre-se agora e entre no <em>grupo de WhatsApp</em>
          </h2>

          <p className="cta-final__lead">
            Somente quem se cadastrar aqui terá acesso ao Lote ZERO da Imersão Alavanca Patrimonial
            em primeira mão no dia <strong>26 de abril</strong>, com a melhor condição da história.
          </p>

          <a href="#" className="cta-final__btn">
            <span className="cta-final__btn-icon">
              <MessageCircle size={20} strokeWidth={2.2} />
            </span>
            <span className="cta-final__btn-label">Quero garantir minha vaga no Lote ZERO</span>
            <span className="cta-final__btn-arrow">
              <ArrowRight size={18} strokeWidth={2.4} />
            </span>
          </a>

          <div className="cta-final__meta">
            <span className="cta-final__meta-item">
              <Users size={14} strokeWidth={2.2} />
              Acesso gratuito ao grupo
            </span>
            <span className="cta-final__meta-sep" />
            <span className="cta-final__meta-item">
              <Clock size={14} strokeWidth={2.2} />
              Vagas limitadas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
