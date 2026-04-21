import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import PillButton from "@/components/PillButton";
import ImmersionSection from "@/components/ImmersionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SpeakerSection from "@/components/SpeakerSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import HeroPortrait from "@/components/HeroPortrait";
import logoQuartavia from "@/assets/logo-quartavia.png";
import heroBg from "@/assets/hero-bg.webp";
import speakerPortrait from "@/assets/adrian-carvalho.jpg";
import ctaBg from "@/assets/cta-bg.jpg";
import dep1 from "@/assets/depoimento-1.jpeg";
import dep2 from "@/assets/depoimento-2.jpeg";
import dep3 from "@/assets/depoimento-3.jpeg";
import dep4 from "@/assets/depoimento-4.jpeg";
import dep5 from "@/assets/depoimento-5.jpeg";
import dep6 from "@/assets/depoimento-6.jpeg";
import dep7 from "@/assets/depoimento-7.jpeg";

const belowFoldImages = [dep1, dep2, dep3, dep4, dep5, dep6, dep7, speakerPortrait, ctaBg];

function warmImageCache(srcs: string[]) {
  if (typeof window === "undefined") return;

  let index = 0;
  const loadNext = () => {
    const src = srcs[index++];
    if (!src) return;
    const img = new Image();
    img.decoding = "async";
    img.onload = loadNext;
    img.onerror = loadNext;
    img.src = src;
  };

  loadNext();
  loadNext();
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuartaVia — Imersão Alavanca Patrimonial" },
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
      { rel: "prefetch", as: "image", href: dep1 },
      { rel: "prefetch", as: "image", href: speakerPortrait },
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
