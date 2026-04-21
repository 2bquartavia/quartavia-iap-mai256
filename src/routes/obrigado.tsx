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

      {/* PASSO 01 — Formulário de pesquisa */}
      <section
        id="pesquisa-lead"
        style={{
          padding: "0.5rem 1.25rem 1.5rem",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            borderRadius: "1.25rem",
            overflow: "hidden",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(204,117,20,0.35)",
            boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 1.25rem",
              background: "linear-gradient(90deg, rgba(204,117,20,0.18), rgba(204,117,20,0.04))",
              borderBottom: "1px solid rgba(204,117,20,0.25)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "999px",
                background: "#CC7514",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                flexShrink: 0,
              }}
            >
              01
            </span>
            <div style={{ color: "#fff" }}>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                Passo 01
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                Responda a pesquisa abaixo
              </div>
            </div>
          </div>
          <div
            data-tf-live="01KPQMFQBBR6A8CPF0MV12PA66"
            style={{ width: "100%", minHeight: "520px" }}
          />
        </div>
      </section>

      {/* DIVISOR */}
      <div
        aria-hidden
        style={{
          maxWidth: "720px",
          margin: "1.5rem auto",
          padding: "0 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
          Em seguida
        </span>
        <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
      </div>

      {/* PASSO 02 — CTA WHATSAPP */}
      <section
        style={{
          padding: "0 1.25rem 4rem",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            borderRadius: "1.25rem",
            background: "rgba(3, 26, 40, 0.55)",
            backdropFilter: "blur(24px) saturate(140%)",
            WebkitBackdropFilter: "blur(24px) saturate(140%)",
            border: "1px solid rgba(37,211,102,0.45)",
            boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
            padding: "1.5rem 1.25rem 1.75rem",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "0.85rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "999px",
                background: "#25D366",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              02
            </span>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
              Passo 02
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.1rem, 2.4vw, 1.4rem)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              margin: "0 0 0.6rem",
            }}
          >
            Entre no grupo de WhatsApp
          </h2>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.72)",
              margin: "0 0 1.25rem",
            }}
          >
            Após responder a pesquisa, toque no botão abaixo para entrar no grupo onde as vagas do <strong style={{ color: "#fff" }}>LOTE ZERO</strong> serão liberadas:
          </p>

          <a
            href="https://sndflw.com/i/NnjsMDHLPXMY2sIZDKgo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <PillButton
              label="Entrar no grupo de WhatsApp"
              variant="gold"
              size="lg"
              noModal
            />
          </a>
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
