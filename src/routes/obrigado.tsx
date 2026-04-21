import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PillButton from "@/components/PillButton";
import logoQuartavia from "@/assets/logo-quartavia.png";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Pré-inscrição — QuartaVia | Imersão Alavanca Patrimonial" },
      {
        name: "description",
        content:
          "Falta apenas um passo para garantir sua pré-inscrição no Lote ZERO da Imersão Alavanca Patrimonial.",
      },
      { property: "og:title", content: "Pré-inscrição — QuartaVia" },
      {
        property: "og:description",
        content:
          "Responda algumas perguntas e entre no grupo onde o Lote ZERO será liberado.",
      },
    ],
  }),
  component: ObrigadoPage,
});

const QUESTIONS = [
  {
    id: "faixa",
    label: "Em qual faixa etária você se encaixa?",
    options: ["18-24", "25-35", "36-45", "46-55", "56 ou mais"],
  },
  {
    id: "renda",
    label: "Qual é a sua renda mensal aproximada?",
    options: [
      "Até R$ 10 mil",
      "R$ 10 a R$ 20 mil",
      "R$ 20 a R$ 50 mil",
      "Acima de R$ 50 mil",
    ],
  },
  {
    id: "patrimonio",
    label: "Quanto você já tem investido hoje?",
    options: [
      "Menos de R$ 50 mil",
      "R$ 50 a R$ 200 mil",
      "R$ 200 mil a R$ 1 milhão",
      "Acima de R$ 1 milhão",
    ],
  },
];

function ObrigadoPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const total = QUESTIONS.length;
  const finished = step >= total;
  const current = QUESTIONS[step];
  const selected = current ? answers[current.id] : undefined;

  const handleNext = () => {
    if (!selected) return;
    setStep((s) => s + 1);
  };

  return (
    <main className="obrigado">
      <div className="obrigado__bg" aria-hidden />
      <div className="obrigado__overlay" aria-hidden />

      <div className="obrigado__inner">
        <img
          src={logoQuartavia}
          alt="QuartaVia"
          className="obrigado__logo"
          decoding="async"
        />

        <span className="obrigado__eyebrow">Imersão Alavanca Patrimonial</span>

        <h1 className="obrigado__h1">
          Falta apenas <em>um passo</em> para garantir a sua pré-inscrição no
          Lote ZERO
        </h1>

        <p className="obrigado__lead">Para concluir a sua inscrição, responda:</p>

        {/* CARD DE PESQUISA */}
        <div className="obrigado__card">
          {!finished && current ? (
            <>
              <div className="obrigado__progress">
                <span>
                  Pergunta {step + 1} de {total}
                </span>
                <div className="obrigado__progress-bar" aria-hidden>
                  <span
                    style={{ width: `${((step + 1) / total) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="obrigado__q">{current.label}</h2>

              <ul className="obrigado__options" role="radiogroup">
                {current.options.map((opt) => {
                  const isOn = selected === opt;
                  return (
                    <li key={opt}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isOn}
                        className={`obrigado__option ${isOn ? "is-on" : ""}`}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, [current.id]: opt }))
                        }
                      >
                        <span className="obrigado__radio" aria-hidden />
                        <span>{opt}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="obrigado__action">
                <PillButton
                  label={step + 1 === total ? "Concluir" : "Próxima"}
                  variant="gold"
                  size="lg"
                  fullWidth
                  onClick={handleNext}
                  disabled={!selected}
                />
              </div>
            </>
          ) : (
            <div className="obrigado__done">
              <span className="obrigado__done-badge">Respostas registradas</span>
              <h2 className="obrigado__q" style={{ marginTop: "0.75rem" }}>
                Tudo pronto!
              </h2>
              <p className="obrigado__done-text">
                Agora é só entrar no grupo abaixo para garantir sua vaga.
              </p>
            </div>
          )}
        </div>

        <p className="obrigado__cta-lead">
          Após responder as questões, toque no botão abaixo para entrar no
          grupo onde as vagas do <strong>LOTE ZERO</strong> serão liberadas:
        </p>

        <div className="obrigado__whatsapp">
          <PillButton
            label="Entrar no grupo de WhatsApp"
            variant="gold"
            size="lg"
          />
        </div>
      </div>

      <footer className="obrigado__footer">
        <span>© 2025 QuartaVia. Todos os direitos reservados.</span>
        <span>Investimentos envolvem riscos.</span>
      </footer>
    </main>
  );
}
