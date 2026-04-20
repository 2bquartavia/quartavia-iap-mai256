import { ArrowRight, Quote } from "lucide-react";
import PillButton from "@/components/PillButton";
import portrait from "@/assets/adrian-carvalho.png";

export default function SpeakerSection() {
  const stats = [
    { n: "+3.000", l: "Famílias atendidas" },
    { n: "CFP®", l: "Certificação" },
    { n: "+10", l: "Anos no mercado" },
    { n: "Int.", l: "Reconhecimento global" },
  ];

  return (
    <section id="speaker" className="speaker-v2">
      <div className="wrap">
        <div className="speaker-v2__card">
          {/* Left — Portrait */}
          <div className="speaker-v2__media">
            <img src={portrait} alt="Adrian Carvalho" />
            <div className="speaker-v2__media-overlay" />
            <div className="speaker-v2__media-tag">
              <span className="speaker-v2__media-dot" />
              Fundador · QuartaVia
            </div>
          </div>

          {/* Right — Content */}
          <div className="speaker-v2__body">
            <span className="speaker-v2__eyebrow">Quem conduz</span>
            <h2 className="speaker-v2__title">
              Adrian <em>Carvalho</em>
            </h2>
            <p className="speaker-v2__role">
              Especialista em Engenharia Patrimonial · CFP®
            </p>

            <div className="speaker-v2__stats">
              {stats.map((s) => (
                <div key={s.l} className="speaker-v2__stat">
                  <div className="speaker-v2__stat-n">{s.n}</div>
                  <div className="speaker-v2__stat-l">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="speaker-v2__bio">
              <p>
                Fundador da <strong>QuartaVia</strong> e especialista em engenharia patrimonial
                para profissionais de alta renda. Em mais de uma década, desenvolveu a metodologia{" "}
                <strong>O Quarto Caminho</strong> — um sistema que combina decisão financeira,
                estruturação patrimonial e multiplicação de ativos para fazer o dinheiro
                trabalhar no lugar das pessoas.
              </p>
              <p>
                Já ajudou médicos, advogados, empresários e executivos a construírem liberdade
                patrimonial real, sem precisar trabalhar mais e sem abrir mão do padrão de vida
                conquistado.
              </p>
            </div>

            <figure className="speaker-v2__quote">
              <Quote className="speaker-v2__quote-icon" size={28} />
              <blockquote>
                No mercado, só vejo o Adrian Carvalho como a pessoa certa para nos assessorar
                nisso.
              </blockquote>
              <figcaption>— Dr. Felipe Hurtado</figcaption>
            </figure>

            <div className="speaker-v2__cta">
              <PillButton
                label="Quero garantir minha vaga no LOTE ZERO"
                variant="gold"
                icon={<ArrowRight size={18} strokeWidth={2.2} />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
