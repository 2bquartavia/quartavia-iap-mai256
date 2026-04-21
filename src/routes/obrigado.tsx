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
    <main style={{ background: "#031a28", minHeight: "100vh" }}>
      {/* TOP BAR */}
      <div
        className="fixed top-0 inset-x-0 z-50 text-white text-center py-2 px-4 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ background: "#CC7514" }}
      >
        IMERSÃO ALAVANCA PATRIMONIAL
      </div>

      {/* HERO de confirmação */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "2rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          <img
            src={logoQuartavia}
            alt="QuartaVia"
            style={{ height: "32px", margin: "0 auto 1.5rem", display: "block" }}
            decoding="async"
          />

          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "999px",
              background: "#CC7514",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
              boxShadow: "0 0 0 6px color-mix(in oklab, #CC7514 18%, transparent)",
            }}
          >
            <Check size={26} strokeWidth={3} color="#fff" />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3.2vw, 1.85rem)",
              lineHeight: 1.2,
              fontWeight: 600,
              margin: "0 0 0.85rem",
              letterSpacing: "-0.02em",
            }}
          >
            Falta apenas <em style={{ color: "#E8A554", fontStyle: "italic" }}>um passo</em> para garantir a sua pré-inscrição no Lote ZERO
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.72)",
              margin: 0,
            }}
          >
            Para concluir a sua inscrição, responda:
          </p>
        </div>
      </section>

      {/* PLACEHOLDER — Formulário de pesquisa de lead */}
      <section
        id="pesquisa-lead"
        style={{
          padding: "0.5rem 1.25rem 2rem",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            border: "1px dashed rgba(232,165,84,0.35)",
            borderRadius: "1.25rem",
            padding: "3rem 1.5rem",
            textAlign: "center",
            background: "rgba(255,255,255,0.02)",
            minHeight: "280px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Pesquisa de leads
          </p>
          <div
            style={{
              padding: "0.6rem 1.5rem",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.04em",
            }}
          >
            [PRÓXIMA]
          </div>
        </div>
      </section>

      {/* CTA WHATSAPP */}
      <section
        style={{
          padding: "1rem 1.25rem 4rem",
          maxWidth: "620px",
          margin: "0 auto",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.72)",
            margin: "0 0 1.25rem",
          }}
        >
          Após responder as questões, toque no botão abaixo para entrar no grupo onde as vagas do <strong style={{ color: "#fff" }}>LOTE ZERO</strong> serão liberadas:
        </p>

        <PillButton
          label="Entrar no grupo de WhatsApp"
          variant="gold"
          size="lg"
        />
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#020f17", padding: "1.5rem 1.25rem" }}>
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
