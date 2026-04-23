import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import PillButton from "@/components/PillButton";
import ImmersionSection from "@/components/ImmersionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SpeakerSection from "@/components/SpeakerSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import HeroPortrait from "@/components/HeroPortrait";
import logoQuartavia from "@/assets/logo-alavanca.png";
const heroBg = "/hero-v2-desktop.jpg";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "QuartaVia — Imersão Alavanca Patrimonial (v2)" },
      {
        name: "description",
        content:
          "Descubra como ter ativos que pagam o seu custo de vida hoje — sem depender do seu trabalho. Pré-venda do Lote ZERO em 26/04.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4e090813-50f4-47ee-8148-8442949c3e88/id-preview-97fb3713--a07d5729-6853-49b6-99b2-8873d0bc14e0.lovable.app-1776739634797.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4e090813-50f4-47ee-8148-8442949c3e88/id-preview-97fb3713--a07d5729-6853-49b6-99b2-8873d0bc14e0.lovable.app-1776739634797.png" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroBg, fetchPriority: "high" },
    ],
  }),
  component: IndexV2,
});

function IndexV2() {

  return (
    <main>
      {/* TOP BAR — fixed */}
      <div
        className="fixed top-0 inset-x-0 z-50 text-white text-center py-2 px-4 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ background: "#CC7514" }}
      >
        Imersão Alavanca Patrimonial · 25 a 29 de maio · Ao vivo com Adrian Carvalho · Apenas 50 Diagnósticos Individuais
      </div>

      {/* HERO — full-bleed com foto de fundo + degradê + texto na base */}
      <section className="hero" style={{ paddingTop: "2.25rem" }}>
        {/* Foto de fundo (vem do background) */}
        <HeroPortrait />

        {/* Grade arquitetônica decorativa com halo dourado */}
        <div className="hero__grid" aria-hidden>
          <span className="hero__grid-v hero__grid-v--1" />
          <span className="hero__grid-v hero__grid-v--2" />
          <span className="hero__grid-v hero__grid-v--3" />
          <span className="hero__grid-v hero__grid-v--4" />
          <span className="hero__grid-h hero__grid-h--1" />
          <span className="hero__grid-h hero__grid-h--2" />
        </div>

        {/* Logo no topo do hero */}
        <div className="hero__brand">
          <img
            src={logoQuartavia}
            alt="Imersão Alavanca Patrimonial"
            className="hero__logo"
            decoding="async"
          />
        </div>

        <div className="hero__inner">
          <div className="hero__layout">
            <div className="hero__content">
              <span className="hero__pill">
                <span className="hero__pill-dot" />
                Pré-venda Lote ZERO · 26/04
              </span>

              <h1 className="hero__h1">
                5 encontros pra você sair do <em>improviso financeiro</em> e entrar num plano real de construção de patrimônio.
              </h1>

              <p className="hero__lead">
                Usando <strong style={{ color: "#fff" }}>alavancagem, crédito inteligente</strong> e
                os ativos certos que se pagam sozinhos — sem sorte, sem achismo e sem depender do
                próximo salário.
              </p>

              <div className="hero__marquee" aria-label="Benefícios">
                <div className="hero__marquee-track">
                  {Array.from({ length: 2 }).flatMap((_, dup) =>
                    [
                      "Para qualquer nível de conhecimento",
                      "Estratégia de baixo risco",
                      "Sem esforço extra no dia a dia",
                    ].map((b, i) => (
                      <span key={`${dup}-${i}`} className="hero__marquee-item">
                        <span className="hero__marquee-check">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {b}
                      </span>
                    )),
                  )}
                </div>
              </div>

              <div className="hero__actions">
                <PillButton
                  label="Quero garantir minha vaga no Lote ZERO"
                  variant="gold"
                  size="lg"
                />
              </div>
              <p className="hero__fineprint">
                Acesso exclusivo ao LOTE ZERO para quem entrar no grupo de WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSION — segunda dobra */}
      <ImmersionSection />

      {/* DEPOIMENTOS */}
      <TestimonialsSection />

      {/* SPEAKER */}
      <SpeakerSection />

      {/* CTA FINAL — Cadastro WhatsApp */}
      <CTAFinalSection />

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap pt-6 text-center text-xs text-white/40">
          <span>© 2026 QuartaVia. Todos os direitos reservados.</span>
        </div>
      </footer>
    </main>
  );
}
