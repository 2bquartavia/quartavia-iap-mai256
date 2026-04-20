import { ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";
import portrait from "@/assets/adrian-carvalho.png";

export default function SpeakerSection() {
  const credentials = [
    "CFP®",
    "+10 anos",
    "+3.000 famílias",
    "QuartaVia",
    "O Quarto Caminho",
    "Reconhecimento Int.",
  ];

  return (
    <section id="speaker" className="speaker-v3">
      <div className="wrap">
        <div className="speaker-v3__grid">
          {/* LEFT — Content */}
          <div className="speaker-v3__content">
            <span className="speaker-v3__eyebrow">Quem conduz</span>

            <h2 className="speaker-v3__title">
              Adrian <em>Carvalho</em>
            </h2>

            <p className="speaker-v3__role">
              Especialista em Engenharia Patrimonial · CFP®
            </p>

            <div className="speaker-v3__bio">
              <p>
                Além de assessorar profissionais de alta renda, Adrian transformou mais de uma
                década de prática em conteúdo e mentoria — ajudando médicos, advogados,
                empresários e executivos a estruturarem patrimônio com método.
              </p>
              <p>
                Fundou a <strong>QuartaVia</strong> e desenvolveu a metodologia{" "}
                <strong>O Quarto Caminho</strong>: um sistema que combina decisão financeira,
                estruturação patrimonial e multiplicação de ativos. Ao todo, já são milhares
                de famílias atendidas.
              </p>
              <p>
                Reconhecido por pares e clientes como referência em liberdade patrimonial real
                — sem precisar trabalhar mais e sem abrir mão do padrão de vida conquistado.
              </p>
            </div>

            <div className="speaker-v3__badges">
              {credentials.map((c) => (
                <span key={c} className="speaker-v3__badge">
                  {c}
                </span>
              ))}
            </div>

            <div className="speaker-v3__cta">
              <PillButton
                label="Quero garantir minha vaga no LOTE ZERO"
                variant="gold"
                icon={<ArrowRight size={18} strokeWidth={2.2} />}
              />
            </div>
          </div>

          {/* RIGHT — Portrait */}
          <div className="speaker-v3__media">
            <img src={portrait} alt="Adrian Carvalho" />
          </div>
        </div>
      </div>
    </section>
  );
}
