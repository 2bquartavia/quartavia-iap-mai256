import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import PillButton from "@/components/PillButton";
import ImmersionSection from "@/components/ImmersionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SpeakerSection from "@/components/SpeakerSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import HeroPortrait from "@/components/HeroPortrait";
import logoQuartavia from "@/assets/logo-quartavia.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum Capital — Imersão Alavanca Patrimonial" },
      {
        name: "description",
        content:
          "Descubra como ter ativos que pagam o seu custo de vida hoje — sem depender do seu trabalho. Pré-venda do Lote ZERO em 26/04.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      {/* TOP BAR — fixed */}
      <div
        className="fixed top-0 inset-x-0 z-50 text-white text-center py-2 px-4 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ background: "#CC7514" }}
      >
        OPORTUNIDADE EXCLUSIVA PARA PROFISSIONAIS COM RENDA ACIMA DE R$ 20 MIL
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
            alt="QuartaVia"
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
                Construa a renda que <em>liberta</em> você do trabalho.
              </h1>

              <p className="hero__lead">
                A Imersão <strong style={{ color: "#fff" }}>Alavanca Patrimonial</strong> revela o
                método usado por investidores de alto padrão para montar uma carteira que paga o
                custo de vida — sem sorte, sem achismo e sem depender do próximo salário.
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
                  icon={<ArrowRight size={18} strokeWidth={2.2} />}
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
        <div className="wrap pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40">
          <span>© 2025 Aurum Capital. Todos os direitos reservados.</span>
          <span>Investimentos envolvem riscos.</span>
        </div>
      </footer>
    </main>
  );
}
