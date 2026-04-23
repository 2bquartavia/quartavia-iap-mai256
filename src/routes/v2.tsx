import { createFileRoute } from "@tanstack/react-router";
import PillButton from "@/components/PillButton";
import ImmersionSection from "@/components/ImmersionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SpeakerSection from "@/components/SpeakerSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import logoQuartavia from "@/assets/logo-alavanca.png";
const heroBg = "/hero-v2-desktop.jpg";
const heroBgMobile = "/hero-v2-mobile.jpg";

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

      {/* HERO — fundo laranja, texto à esquerda, foto à direita */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "#CC7514", paddingTop: "2.25rem" }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 pt-10 md:pt-14 pb-12 md:pb-20">
          {/* Logo */}
          <div className="flex items-center justify-start mb-10 md:mb-14">
            <img
              src={logoQuartavia}
              alt="Imersão Alavanca Patrimonial"
              className="h-9 md:h-11 w-auto"
              decoding="async"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Coluna esquerda — texto */}
            <div className="text-white">
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 mb-6">
                Imersão Alavanca Patrimonial · 25 a 29 de maio · Ao vivo com Adrian Carvalho · Apenas 50 Diagnósticos Individuais
              </p>

              <h1 className="font-semibold text-white leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,5vw,3.75rem)]">
                Você ganha mais de R$20 mil por mês. Mas se parar de trabalhar, seu patrimônio não te sustenta.
              </h1>

              <div className="mt-8 md:mt-10">
                <PillButton
                  label="Quero garantir minha vaga no Lote ZERO"
                  variant="gold"
                  size="lg"
                />
              </div>
            </div>

            {/* Coluna direita — foto no retângulo */}
            <div className="relative w-full aspect-[4/5] md:aspect-[5/6] rounded-2xl overflow-hidden shadow-2xl">
              <picture>
                <source media="(max-width: 768px)" srcSet={heroBgMobile} />
                <img
                  src={heroBg}
                  alt="Adrian Carvalho no palco da Mansão Davos"
                  className="w-full h-full object-cover"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
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
