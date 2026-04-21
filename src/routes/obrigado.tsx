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
        CADASTRO CONFIRMADO · BEM-VINDO À QUARTAVIA
      </div>

      {/* HERO de confirmação */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "2.5rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
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
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              lineHeight: 1.15,
              fontWeight: 600,
              margin: "0 0 0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Cadastro <em style={{ color: "#E8A554", fontStyle: "italic" }}>confirmado</em>.
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.72)",
              margin: 0,
            }}
          >
            Responda a pesquisa abaixo para concluir sua inscrição.
          </p>
        </div>
      </section>

      {/* PLACEHOLDER — Formulário de pesquisa de lead */}
      <section
        id="pesquisa-lead"
        style={{
          padding: "1rem 1.25rem 5rem",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            border: "1px dashed rgba(232,165,84,0.35)",
            borderRadius: "1.25rem",
            padding: "3.5rem 1.5rem",
            textAlign: "center",
            background: "rgba(255,255,255,0.02)",
            minHeight: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            Espaço reservado para o formulário
          </p>
        </div>
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
