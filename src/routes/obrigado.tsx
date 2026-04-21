import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import PillButton from "@/components/PillButton";
import logoQuartavia from "@/assets/logo-quartavia.png";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Obrigado — QuartaVia | Imersão Alavanca Patrimonial" },
      {
        name: "description",
        content:
          "Seu cadastro foi confirmado. Entre no grupo de WhatsApp e garanta acesso ao Lote ZERO da Imersão Alavanca Patrimonial.",
      },
      { property: "og:title", content: "Obrigado — QuartaVia" },
      {
        property: "og:description",
        content:
          "Cadastro confirmado. Próximo passo: entrar no grupo exclusivo do WhatsApp.",
      },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>
      {/* TOP BAR */}
      <div
        className="fixed top-0 inset-x-0 z-50 text-white text-center py-2 px-4 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ background: "#CC7514" }}
      >
        CADASTRO CONFIRMADO · BEM-VINDO À QUARTAVIA
      </div>

      {/* HERO de confirmação */}
      <section
        style={{
          paddingTop: "6rem",
          paddingBottom: "4rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--ink) 96%, var(--gold) 4%) 0%, var(--ink) 60%)",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <img
            src={logoQuartavia}
            alt="QuartaVia"
            style={{ height: "44px", margin: "0 auto 2rem", display: "block" }}
            decoding="async"
          />

          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "999px",
              background: "#CC7514",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              boxShadow: "0 0 0 8px color-mix(in oklab, #CC7514 20%, transparent)",
            }}
          >
            <Check size={36} strokeWidth={3} color="#fff" />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.1,
              fontWeight: 600,
              margin: "0 0 1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Cadastro <em style={{ color: "#E8A554", fontStyle: "italic" }}>confirmado</em>.
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.78)",
              margin: "0 0 2rem",
            }}
          >
            Você está a um passo de garantir sua vaga no Lote ZERO da Imersão Alavanca
            Patrimonial. Entre agora no grupo exclusivo do WhatsApp para receber as
            instruções em primeira mão no dia <strong style={{ color: "#fff" }}>26/04</strong>.
          </p>

          <PillButton
            label="Entrar no grupo do WhatsApp"
            variant="gold"
            size="lg"
          />

          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.04em",
            }}
          >
            Acesso exclusivo · Vagas limitadas
          </p>
        </div>
      </section>

      {/* PRÓXIMOS PASSOS */}
      <section
        style={{
          padding: "4rem 1.25rem",
          maxWidth: "880px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "var(--ink)",
            textAlign: "center",
            marginBottom: "2.5rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          O que acontece agora
        </h2>

        <div style={{ display: "grid", gap: "1rem" }}>
          {[
            {
              n: "01",
              t: "Entre no grupo do WhatsApp",
              d: "É lá que enviaremos o link de acesso ao Lote ZERO antes de qualquer outra pessoa.",
            },
            {
              n: "02",
              t: "Aguarde o aviso em 26/04",
              d: "Abriremos as vagas com a melhor condição da história — apenas para o grupo.",
            },
            {
              n: "03",
              t: "Garanta sua vaga",
              d: "Bastam poucos cliques para entrar no Lote ZERO e começar sua jornada.",
            },
          ].map((s) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                background: "#fff",
                border: "1px solid var(--border-faint)",
                borderRadius: "1rem",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "#CC7514",
                  fontWeight: 600,
                  minWidth: "2.5rem",
                }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: "0 0 0.35rem",
                  }}
                >
                  {s.t}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--ink-3)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLACEHOLDER — Formulário de pesquisa de lead (será adicionado depois) */}
      <section
        id="pesquisa-lead"
        style={{
          padding: "3rem 1.25rem 5rem",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            border: "1px dashed var(--gold-border)",
            borderRadius: "1.25rem",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            background: "color-mix(in oklab, var(--cream) 60%, #fff 40%)",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-4)",
              margin: "0 0 0.75rem",
              fontWeight: 600,
            }}
          >
            Espaço reservado
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              color: "var(--ink-2)",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Formulário de pesquisa de lead
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--ink-3)",
              marginTop: "0.5rem",
            }}
          >
            Este bloco será substituído pelo formulário em uma próxima etapa.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--ink)", padding: "1.5rem 1.25rem" }}>
        <div
          className="wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span>© 2025 QuartaVia. Todos os direitos reservados.</span>
          <span>Investimentos envolvem riscos.</span>
        </div>
      </footer>
    </main>
  );
}
