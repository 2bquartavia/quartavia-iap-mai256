import { ArrowRight, Check } from "lucide-react";

const messages = [
  { from: "them", text: "Bom dia! 👋 Bem-vindo ao grupo VIP", delay: "0.2s" },
  { from: "them", text: "Aqui você terá acesso ao Lote ZERO em primeira mão", delay: "1.2s" },
  { from: "me", text: "Quero garantir minha vaga 🔥", delay: "2.4s" },
  { from: "them", text: "Liberado! Lote ZERO abre 26/04 às 9h ⏰", delay: "3.6s" },
];

export default function CTAFinalSection() {
  return (
    <section id="cadastro" className="cta-wa">
      <div className="cta-wa__noise" />
      <div className="wrap">
        <div className="cta-wa__grid">
          {/* LEFT — phone mockup */}
          <div className="cta-wa__phone-wrap">
            <div className="cta-wa__phone">
              <div className="cta-wa__phone-notch" />
              <div className="cta-wa__chat-header">
                <div className="cta-wa__avatar">AV</div>
                <div>
                  <div className="cta-wa__chat-name">Aurum · Lote ZERO</div>
                  <div className="cta-wa__chat-status">
                    <span className="cta-wa__online-dot" /> online agora
                  </div>
                </div>
              </div>
              <div className="cta-wa__chat-body">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`cta-wa__bubble cta-wa__bubble--${m.from}`}
                    style={{ animationDelay: m.delay }}
                  >
                    {m.text}
                    {m.from === "me" && <Check size={12} className="cta-wa__bubble-check" />}
                  </div>
                ))}
                <div
                  className="cta-wa__typing"
                  style={{ animationDelay: "4.6s" }}
                >
                  <span /><span /><span />
                </div>
              </div>
            </div>
            <div className="cta-wa__phone-glow" />
          </div>

          {/* RIGHT — content */}
          <div className="cta-wa__content">
            <div className="cta-wa__tag">
              <span className="cta-wa__tag-pulse" />
              26 de abril · Lote ZERO
            </div>
            <h2 className="cta-wa__title">
              Cadastre-se agora <br />
              e entre no <span>grupo de WhatsApp</span>
            </h2>
            <p className="cta-wa__desc">
              Somente quem se cadastrar aqui terá acesso ao Lote ZERO da Imersão Alavanca
              Patrimonial em primeira mão no dia <strong>26 de abril</strong>, com a melhor
              condição da história.
            </p>

            <a href="#" className="cta-wa__cta">
              <span>Quero garantir minha vaga no Lote ZERO</span>
              <ArrowRight size={20} strokeWidth={2.4} />
            </a>

            <div className="cta-wa__trust">
              <div className="cta-wa__trust-item">
                <Check size={14} strokeWidth={3} />
                Acesso gratuito ao grupo
              </div>
              <div className="cta-wa__trust-item">
                <Check size={14} strokeWidth={3} />
                Vagas limitadas
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
