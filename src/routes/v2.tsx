import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import PillButton from "@/components/PillButton";
import ImmersionSection from "@/components/ImmersionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SpeakerSection from "@/components/SpeakerSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import DiagnosticoSection from "@/components/DiagnosticoSection";
import logoQuartavia from "@/assets/logo-alavanca.png";

const heroSlides = [
  "/hero-v2-1.png",
  "/hero-v2-2.png",
  "/hero-v2-3.png",
  "/hero-v2-4.png",
];
const heroBg = heroSlides[0];

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
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // Preload all slides
  useEffect(() => {
    heroSlides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <main>
      {/* HERO — fundo laranja, texto à esquerda, foto à direita */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "#031a28" }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 pt-8 md:pt-10 pb-12 md:pb-20">
          {/* Topbar — logo | data | ao vivo */}
          <div className="flex items-center justify-between gap-4 mb-10 md:mb-14">
            <img
              src={logoQuartavia}
              alt="Imersão Alavanca Patrimonial"
              className="h-9 md:h-11 w-auto brightness-0 invert shrink-0"
              decoding="async"
            />
            <span className="hidden md:inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-white">
              25 a 29 de maio
            </span>
            <span className="hidden md:inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-white shrink-0">
              Ao vivo com Adrian Carvalho
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Coluna esquerda — texto */}
            <div className="text-white">
              {/* Pílulas restantes (mobile mostra todas; desktop só as que não estão no topo) */}
              <div className="flex flex-wrap gap-2 mb-7">
                {[
                  { t: "Imersão Alavanca Patrimonial", mobileOnly: false },
                  { t: "25 a 29 de maio", mobileOnly: true },
                  { t: "Ao vivo com Adrian Carvalho", mobileOnly: true },
                  { t: "Apenas 50 Diagnósticos Individuais", mobileOnly: false },
                ].map(({ t, mobileOnly }) => (
                  <span
                    key={t}
                    className={`${mobileOnly ? "inline-flex md:hidden" : "inline-flex"} items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-white`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="font-semibold text-white leading-[1.1] tracking-[-0.02em] text-[clamp(1.5rem,3.2vw,2.5rem)]">
                Você ganha mais de R$20 mil por mês. Mas se parar de trabalhar, seu patrimônio não te sustenta.
              </h1>

              <p className="mt-6 md:mt-7 text-white/80 text-[15px] md:text-[17px] leading-[1.55] max-w-[560px]">
                Isso não é falta de dinheiro. É falta de Engenharia Patrimonial. Em 5 noites, entenda e implemente a ciência que 1.917 famílias já usam para comprar os ativos que vão sustentá-las pra vida toda — sem pagar por eles, sem mercado financeiro, sem esperar 30 anos.
              </p>

              <p className="mt-4 text-white/70 text-[14px] md:text-[15px] leading-[1.55] max-w-[560px]">
                Para médicos, empresários, advogados, engenheiros e profissionais que ganham acima de R$20 mil/mês e sabem que deveriam ter mais patrimônio do que tem.
              </p>

              <div className="mt-8 md:mt-10">
                <PillButton
                  label="Quero construir meus ativos — R$97"
                  variant="dark"
                  size="lg"
                />
                <p className="mt-3 text-white/60 text-[12px] md:text-[13px]">
                  Garantia de 30 dias. Risco zero. Apenas 50 Diagnósticos Individuais.
                </p>
              </div>
            </div>

            {/* Coluna direita — slideshow no retângulo, rosto centralizado em cima */}
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15 bg-black/20">
              {heroSlides.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt="Adrian Carvalho"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                  style={{ objectPosition: "50% 90%", opacity: slide === i ? 1 : 0 }}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                />
              ))}

              {/* Stats sobrepostos no topo — rosto fica embaixo */}
              <div className="absolute inset-x-0 top-0 flex flex-col items-end gap-2 md:gap-2.5 p-3 md:p-4 pointer-events-none bg-gradient-to-b from-black/60 via-black/25 to-transparent pb-10 md:pb-14">
                {[
                  { v: "1.917", l: "FAMÍLIAS ATENDIDAS", icon: "👥" },
                  { v: "R$3 BI", l: "SOB ACONSELHAMENTO", icon: "💼" },
                  { v: "100+", l: "ATIVOS PESSOAIS DO ADRIAN", icon: "📈" },
                ].map(({ v, l, icon }) => (
                  <div
                    key={l}
                    className="w-[260px] md:w-[300px] rounded-lg border border-white/25 bg-black/55 backdrop-blur-md px-3 py-2 md:px-3.5 md:py-2.5 shadow-lg"
                  >
                    <div className="flex items-baseline gap-2 text-white justify-start text-left">
                      <span className="text-[14px] md:text-[16px] leading-none">
                        {icon}
                      </span>
                      <span className="font-semibold tracking-tight text-[15px] md:text-[17px] leading-none uppercase">
                        {v}
                      </span>
                      <span className="text-white/85 text-[11px] md:text-[12px] leading-tight uppercase tracking-wide">
                        {l}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSION — segunda dobra */}
      <DiagnosticoSection />

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
