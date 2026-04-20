import { ArrowRight, Award, Users, Globe, Clock } from "lucide-react";
import PillButton from "@/components/PillButton";
import portrait from "@/assets/adrian-carvalho.png";

export default function SpeakerSection() {
  const credentials = [
    { icon: <Users size={16} strokeWidth={2.2} />, label: "+3.000 famílias atendidas" },
    { icon: <Award size={16} strokeWidth={2.2} />, label: "CFP®" },
    { icon: <Globe size={16} strokeWidth={2.2} />, label: "Certificação Internacional" },
    { icon: <Clock size={16} strokeWidth={2.2} />, label: "+10 anos no mercado" },
  ];

  return (
    <section id="speaker" className="speaker">
      <div className="wrap">
        <div className="speaker__head">
          <h2 className="display speaker__title">
            Quem vai conduzir a <em>imersão?</em>
          </h2>
        </div>

        <div className="speaker__layout">
          <div className="speaker__portrait">
            <img src={portrait} alt="Adrian Carvalho — Especialista em Engenharia Patrimonial" />
          </div>

          <div className="speaker__content">
            <h3 className="speaker__name">Adrian Carvalho</h3>
            <p className="speaker__role">Especialista em Engenharia Patrimonial · CFP®</p>

            <ul className="speaker__creds">
              {credentials.map((c) => (
                <li key={c.label}>
                  <span className="speaker__creds-icon">{c.icon}</span>
                  {c.label}
                </li>
              ))}
            </ul>

            <div className="speaker__bio">
              <p>
                Adrian Carvalho é o fundador da QuartaVia e especialista em engenharia patrimonial
                para profissionais de alta renda. Ao longo de mais de uma década, desenvolveu a
                metodologia <strong>O Quarto Caminho</strong>: um sistema que combina decisão
                financeira, estruturação patrimonial e multiplicação de ativos para fazer o
                dinheiro trabalhar no lugar das pessoas.
              </p>
              <p>
                Reconhecido pela capacidade de traduzir estratégias complexas em planos
                aplicáveis, Adrian já ajudou médicos, advogados, empresários e executivos a
                construírem liberdade patrimonial real, sem precisar trabalhar mais e sem abrir
                mão do padrão de vida conquistado.
              </p>
            </div>

            <blockquote className="speaker__quote">
              “No mercado, só vejo o Adrian Carvalho como a pessoa certa para nos assessorar
              nisso.”
              <cite>— Dr. Felipe Hurtado</cite>
            </blockquote>

            <div className="speaker__cta">
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
