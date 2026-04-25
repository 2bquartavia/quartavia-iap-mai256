import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, Briefcase, TrendingUp } from "lucide-react";
import PillButton from "@/components/PillButton";
import CTAFinalSection from "@/components/CTAFinalSection";
import DiagnosticoSection from "@/components/DiagnosticoSection";
import PrimoTioSection from "@/components/PrimoTioSection";
import PrimosViraramTiosSection from "@/components/PrimosViraramTiosSection";
import EngenhariaPrincipiosSection from "@/components/EngenhariaPrincipiosSection";
import CincoNoitesSection from "@/components/CincoNoitesSection";
import PorQueAdrianSection from "@/components/PorQueAdrianSection";
import DezHorasSection from "@/components/DezHorasSection";
import InvestimentoSection from "@/components/InvestimentoSection";
import GarantiasSection from "@/components/GarantiasSection";
import ParaQuemSection from "@/components/ParaQuemSection";
import FAQSection from "@/components/FAQSection";
import logoQuartavia from "@/assets/logo-alavanca.png";

const heroSlides = [
  "/hero-v2-1.png",
  "/hero-v2-2.png",
  "/hero-v2-3.png",
  "/hero-v2-4.png",
];
const heroBg = heroSlides[0];

export const Route = createFileRoute("/iap-l02-h01")({
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
        style={{ background: "#FAEDDD" }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 pt-20 md:pt-10 pb-20 md:pb-20">
          {/* Topbar — logo | metadata editorial */}
          <div className="flex items-center justify-between gap-4 mb-10 md:mb-14">
            <img
              src={logoQuartavia}
              alt="Imersão Alavanca Patrimonial"
              className="h-9 md:h-11 w-auto shrink-0"
              style={{ filter: "brightness(0) saturate(100%) invert(8%) sepia(40%) saturate(2000%) hue-rotate(170deg) brightness(95%) contrast(95%)" }}
              decoding="async"
            />

            {/* Metadata editorial à direita — sem chips */}
            <div className="flex flex-col items-end gap-1 text-right text-[#031a28]">
              <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] leading-none">
                25 a 29 de maio
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] leading-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                <span className="md:hidden">Ao vivo com Adrian</span>
                <span className="hidden md:inline">Ao vivo com Adrian Carvalho</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Coluna esquerda — texto */}
            <div className="text-[#031a28]">
              {/* Metadata em 2 colunas — separadas, com divisor hairline */}
              <div className="mb-6 md:mb-7 inline-flex items-stretch gap-4 md:gap-6 max-w-full">
                {/* Coluna 1 — Formato */}
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#031a28]/50 leading-none mb-1.5 md:mb-2">
                    Formato
                  </span>
                  <span className="text-[10.5px] md:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#031a28] leading-[1.35]">
                    Imersão Alavanca Patrimonial
                  </span>
                </div>

                {/* Hairline vertical divider */}
                <span aria-hidden className="block w-px self-stretch bg-[#031a28]/20" />

                {/* Coluna 2 — Vagas (escassez) */}
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#031a28]/50 leading-none mb-1.5 md:mb-2">
                    Vagas
                  </span>
                  <span className="text-[10.5px] md:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#031a28] leading-[1.35]">
                    Apenas <span className="font-bold tracking-tight">50</span> Diagnósticos Individuais
                  </span>
                </div>
              </div>

              <h1 className="font-semibold text-[#031a28] leading-[1.1] tracking-[-0.02em] text-[clamp(1.5rem,3.2vw,2.5rem)]">
                Você ganha mais de R$20 mil por mês. Mas se parar de trabalhar, seu patrimônio não te sustenta.
              </h1>

              <p className="mt-6 md:mt-7 text-[#031a28]/80 text-[15px] md:text-[17px] leading-[1.55] max-w-[560px]">
                Isso não é falta de dinheiro. É falta de Engenharia Patrimonial. Em 5 noites, entenda e implemente a ciência que 1.917 famílias já usam para comprar os ativos que vão sustentá-las pra vida toda — sem pagar por eles, sem mercado financeiro, sem esperar 30 anos.
              </p>

              <p className="mt-4 text-[#031a28]/70 text-[14px] md:text-[15px] leading-[1.55] max-w-[560px]">
                Para médicos, empresários, advogados, engenheiros e profissionais que ganham acima de R$20 mil/mês e sabem que deveriam ter mais patrimônio do que tem.
              </p>

              <div className="mt-8 md:mt-10 relative inline-block">
                {/* Glow azul no botão */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-3 rounded-full blur-2xl opacity-70"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(3,26,40,0.45), rgba(3,26,40,0.15) 50%, transparent 75%)",
                  }}
                />
                <div className="relative">
                <PillButton
                  label="Quero construir meus ativos — R$97"
                  variant="dark"
                  size="lg"
                />
                </div>
                <p className="mt-3 text-[#031a28]/60 text-[12px] md:text-[13px] relative">
                  Garantia de 30 dias. Risco zero. Apenas 50 Diagnósticos Individuais.
                </p>
              </div>
            </div>

            {/* Coluna direita — slideshow + boxes flutuantes que extrapolam a imagem */}
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
              {/* Container das imagens (clipa o conteúdo) */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#031a28]/15 bg-[#031a28]/10">
                {heroSlides.map((src, i) => {
                  const panTransforms = [
                    "scale(1.08) translate(-1.2%, -1.2%)",
                    "scale(1.08) translate(1.2%, -1%)",
                    "scale(1.08) translate(-1%, 1.2%)",
                    "scale(1.08) translate(1.2%, 1%)",
                  ];
                  const isActive = slide === i;
                  return (
                    <img
                      key={src}
                      src={src}
                      alt="Adrian Carvalho"
                      className="absolute inset-0 w-full h-full object-cover will-change-transform"
                      style={{
                        objectPosition: "50% 90%",
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? panTransforms[i % panTransforms.length]
                          : "scale(1) translate(0, 0)",
                        transition:
                          "opacity 800ms ease-in-out, transform 1900ms cubic-bezier(0.22, 0.61, 0.36, 1)",
                      }}
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "low"}
                    />
                  );
                })}

                {/* Vinheta sutil para dar profundidade */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 60%, transparent 45%, rgba(3,26,40,0.42) 100%)",
                  }}
                />

                {/* Indicador de slides — barras que avançam */}
                <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {heroSlides.map((_, i) => (
                    <span
                      key={i}
                      className="block h-[3px] rounded-full bg-white transition-all duration-500 ease-out"
                      style={{
                        width: slide === i ? 22 : 8,
                        opacity: slide === i ? 1 : 0.45,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Stats — boxes flutuando assimetricamente, passando para fora da imagem */}
              {[
                {
                  v: "1.917",
                  l: "Famílias atendidas",
                  Icon: Users,
                  pos: "top-6 -left-4 md:top-10 md:-left-6",
                  rot: "-rotate-[3deg]",
                },
                {
                  v: "R$3 BI",
                  l: "Sob aconselhamento",
                  Icon: Briefcase,
                  pos: "top-[38%] -right-4 md:-right-6",
                  rot: "rotate-[2.5deg]",
                },
                {
                  v: "100+",
                  l: "Ativos pessoais do Adrian",
                  Icon: TrendingUp,
                  pos: "bottom-10 -left-3 md:bottom-14 md:-left-5",
                  rot: "-rotate-[1.5deg]",
                },
              ].map(({ v, l, Icon, pos, rot }) => (
                <div
                  key={l}
                  className={`absolute ${pos} ${rot} w-[148px] md:w-[172px] rounded-2xl border border-white/30 bg-black/65 backdrop-blur-xl p-4 md:p-[18px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] text-white pointer-events-none`}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/10 ring-1 ring-white/20">
                      <Icon
                        className="w-[18px] h-[18px] md:w-5 md:h-5 text-white"
                        strokeWidth={1.5}
                      />
                    </span>
                    <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold tracking-tight text-[20px] md:text-[22px] leading-none">
                      {v}
                    </span>
                    <span className="text-white/80 text-[11px] md:text-[12px] leading-[1.35] tracking-wide">
                      {l}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSION — segunda dobra */}
      <DiagnosticoSection />

      {/* TERCEIRA DOBRA — Primo vs Tio */}
      <PrimoTioSection />

      {/* QUARTA DOBRA — Primos que viraram tios */}
      <PrimosViraramTiosSection />

      {/* QUINTA DOBRA — Engenharia Patrimonial: 2 princípios */}
      <EngenhariaPrincipiosSection />

      {/* SEXTA DOBRA — 5 Noites */}
      <CincoNoitesSection />

      {/* SÉTIMA DOBRA — Por que eu sou a melhor pessoa */}
      <PorQueAdrianSection />

      {/* OITAVA DOBRA — 10 horas ao vivo (cards empilhando) */}
      <DezHorasSection />

      {/* OFERTA — Resumo de investimento */}
      <InvestimentoSection />

      {/* GARANTIAS — duas garantias */}
      <GarantiasSection />

      {/* PRA QUEM É / NÃO É */}
      <ParaQuemSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA FINAL — Cadastro WhatsApp */}
      <CTAFinalSection />

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap text-center text-[11px] md:text-xs text-white/40">
          <span>© 2026 QuartaVia. Todos os direitos reservados.</span>
        </div>
      </footer>
    </main>
  );
}
