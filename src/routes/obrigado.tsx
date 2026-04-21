import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import PillButton from "@/components/PillButton";
import FillInText from "@/components/FillInText";
import logoQuartavia from "@/assets/logo-quartavia.png";
import heroBg from "@/assets/hero-bg.jpg";

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
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "//embed.typeform.com/next/embed.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#031a28",
        backgroundImage: `linear-gradient(180deg, rgba(3,26,40,0.55) 0%, rgba(3,26,40,0.78) 55%, rgba(3,26,40,0.95) 100%), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
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
          position: "relative",
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
            <FillInText
              text="Falta apenas um passo para garantir a sua pré-inscrição no Lote ZERO"
              highlight="um passo"
            />
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
            borderRadius: "1.25rem",
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
            minHeight: "520px",
          }}
        >
          <div
            data-tf-live="01KPQMFQBBR6A8CPF0MV12PA66"
            style={{ width: "100%", minHeight: "520px" }}
          />
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
          noModal
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
