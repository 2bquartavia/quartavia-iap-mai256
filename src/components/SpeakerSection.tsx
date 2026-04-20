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
                Além de projetar identidades visuais para os meus clientes, transformo minhas
                profissionais em conteúdo.
              </p>
              <p>
                Esse conteúdo gerou demanda por um conteúdo mais aprofundado, então criei o ID
                Class, Forma e agora o Nexus. Ao todo já somos quase 20 mil alunos.
              </p>
              <p>
                Além do curso, tenho meu estúdio de design, e fui premiado em 2018 com um
                A'Design Awards, um dos mais prestigiados prêmios de design do mundo. E em 2019
                premiado pela Brasil Design Award.
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
