
import PillButton from "@/components/PillButton";
import VerticalTicker from "@/components/VerticalTicker";
import portrait from "@/assets/adrian-carvalho.jpg";

export default function SpeakerSection() {
  return (
    <section id="speaker" className="speaker-v3">
      <div className="wrap">
        <div className="speaker-v3__grid">
          {/* LEFT — Content */}
          <div className="speaker-v3__content">
            <span className="speaker-v3__eyebrow">Quem vai conduzir a imersão?</span>

            <h2 className="speaker-v3__title">Adrian Carvalho</h2>

            <p className="speaker-v3__role">
              Especialista em Engenharia Patrimonial · CFP®
            </p>

            <VerticalTicker
              className="speaker-v3__credentials"
              items={[
                "+3.000 famílias atendidas",
                "CFP® · Certificação Internacional",
                "+10 anos no mercado financeiro",
              ]}
            />

            <div className="speaker-v3__bio">
              <p>
                Adrian Carvalho é o fundador da <strong>QuartaVia</strong> e especialista em
                engenharia patrimonial para profissionais de alta renda. Ao longo de mais de
                uma década, desenvolveu a metodologia <strong>O Quarto Caminho</strong>: um
                sistema que combina decisão financeira, estruturação patrimonial e
                multiplicação de ativos para fazer o dinheiro trabalhar no lugar das pessoas.
              </p>
              <p>
                Reconhecido pela capacidade de traduzir estratégias complexas em planos
                aplicáveis, Adrian já ajudou médicos, advogados, empresários e executivos a
                construírem liberdade patrimonial real, sem precisar trabalhar mais e sem abrir
                mão do padrão de vida conquistado.
              </p>
            </div>

            <figure className="speaker-v3__quote">
              <blockquote>
                "No mercado, só vejo o Adrian Carvalho como a pessoa certa para nos assessorar
                nisso."
              </blockquote>
              <figcaption>— Dr. Felipe Hurtado</figcaption>
            </figure>
          </div>

          {/* RIGHT — Portrait */}
          <div className="speaker-v3__media">
            <img src={portrait} alt="Adrian Carvalho" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="speaker-v3__cta">
          <PillButton
            label="Quero garantir minha vaga no Lote ZERO"
            variant="gold"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}
