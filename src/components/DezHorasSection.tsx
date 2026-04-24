import { useEffect, useRef, useState } from "react";
import PillButton from "@/components/PillButton";

type Item = {
  eyebrow: string;
  title: string;
  body: string;
  arrow: string;
  extra?: string;
  showVagas?: boolean;
};

const ITEMS: Item[] = [
  {
    eyebrow: "01 — Ao vivo",
    title: "As 5 Alavancas, ao vivo com Adrian Carvalho",
    body: "Uma por noite. De 25 a 29 de maio, às 20h. Você interage, pergunta e monta seu plano de transição de primo pra tio — com a sua realidade, seus números, seu momento.",
    arrow:
      "Uma sessão de diagnóstico patrimonial individual custa R$ 997. Aqui você recebe o framework completo em 5 noites.",
  },
  {
    eyebrow: "02 — Material",
    title: "Caderno de Implementação",
    body: "Preenchido ao longo das 5 noites. Você sai com um documento que mostra: onde você está, quais são seus 3 motores, qual o gap e quais são os próximos ativos — e como adquiri-los sem pagar por eles.",
    arrow: "Você sai com o plano pronto. Não com \"ideias\".",
  },
  {
    eyebrow: "03 — Documento",
    title: "Inventário de Mecanismos da Economia Real",
    body: "Lista de 7 mecanismos de aquisição de ativos — com as 3 perguntas que você precisa responder antes de usar cada um.",
    arrow:
      "O documento que nenhuma assessoria entrega — porque não interessa a eles que você saiba disso.",
  },
  {
    eyebrow: "04 — Diagnóstico",
    title: "Diagnóstico Patrimonial Individual",
    body: "O Raio-X dos seus 3 motores e as melhores estratégias aplicáveis. Entregue antes mesmo do evento começar. Apenas 50 Diagnósticos serão realizados.",
    extra: "Esse diagnóstico já foi vendido 1.913 vezes por R$997,00.",
    arrow:
      "Serviço que normalmente custa R$ 997. Incluso para participantes qualificados.",
    showVagas: true,
  },
  {
    eyebrow: "Bônus",
    title: "Biblioteca Confidencial do Quarto Caminho",
    body: "3 estudos de caso reais, documentados, de pessoas que aplicaram o método. Com números, timeline e decisões. Não é teoria. É o que aconteceu.",
    arrow: "",
  },
  {
    eyebrow: "Bônus",
    title: "Manual Anti-Armadilhas",
    body: "Os 5 erros que mantêm você no caminho do primo. Baseado em 3.215 reuniões. Você provavelmente está caindo em, pelo menos, 2 delas.",
    arrow: "",
  },
];

export default function DezHorasSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 quando o topo da seção entra, 1 quando o fim sai pelo topo
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Cada card ocupa uma "fatia" do progresso da seção
  const perCard = 1 / ITEMS.length;

  return (
    <section
      ref={rootRef}
      className="relative w-full"
      style={{
        background: "#031a28",
        // Altura grande para permitir o efeito de empilhamento ao rolar
        minHeight: `${100 + ITEMS.length * 70}vh`,
      }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="mx-auto h-full w-full max-w-[1280px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Coluna esquerda — título fixo */}
          <div className="md:col-span-5 text-white">
            <span className="inline-flex items-center text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              O que você recebe
            </span>
            <h2
              className="mt-4 font-semibold text-white leading-[1.05] tracking-[-0.02em] text-[clamp(1.9rem,4vw,3.2rem)]"
              style={{ fontFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif' }}
            >
              10 horas ao vivo que vão te colocar à frente de 99% dos profissionais de alta renda.
            </h2>
            <div
              aria-hidden
              className="mt-6 h-px w-24"
              style={{ background: "#ffffff", opacity: 0.4 }}
            />

            {/* CTA fica visível no fim da rolagem */}
            <div
              className="mt-8 transition-opacity duration-500"
              style={{ opacity: progress > 0.85 ? 1 : 0.25 }}
            >
              <PillButton
                label="Entrar nas 5 noites — R$97"
                variant="gold"
                size="lg"
              />
              <p className="mt-3 text-white/55 text-[12px] md:text-[13px]">
                Garantia de 30 dias + Garantia da Quarta-feira. Risco zero.
              </p>
            </div>
          </div>

          {/* Coluna direita — pilha de cards */}
          <div className="md:col-span-7 relative h-[78vh] md:h-[82vh]">
            {ITEMS.map((it, i) => {
              // Cada card aparece de baixo e empilha
              const start = i * perCard * 0.85; // começa antes para suavizar
              const local = Math.min(
                Math.max((progress - start) / (perCard * 0.9), 0),
                1
              );
              // Quando o próximo card avança, o atual recua um pouco e escurece
              const next = Math.min(
                Math.max(
                  (progress - (i + 1) * perCard * 0.85) / (perCard * 0.9),
                  0
                ),
                1
              );

              const translateY = (1 - local) * 90; // % de baixo pra cima
              const scale = 1 - next * 0.06;
              const dim = next * 0.35;
              const z = 10 + i;

              return (
                <article
                  key={i}
                  className="absolute left-1/2 top-1/2 will-change-transform"
                  style={{
                    transform: `translate(-50%, calc(-50% + ${translateY}vh)) scale(${scale})`,
                    zIndex: z,
                    width: "min(560px, 92%)",
                    transition:
                      "transform 120ms linear, filter 120ms linear, opacity 120ms linear",
                    opacity: local > 0 ? 1 : 0,
                    filter: `brightness(${1 - dim})`,
                  }}
                >
                  <div
                    className="relative rounded-[22px] overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(155deg, #f6f1e8 0%, #e9e1d2 45%, #d9cfbb 100%)",
                      boxShadow:
                        "0 30px 60px -20px rgba(0,0,0,0.55), 0 8px 24px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
                      aspectRatio: "4 / 5",
                      maxHeight: "70vh",
                    }}
                  >
                    {/* reflexo */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(120deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.25) 100%)",
                        mixBlendMode: "screen",
                      }}
                    />

                    <div className="relative h-full w-full p-7 md:p-9 flex flex-col text-[#031a28]">
                      {/* badge canto */}
                      <div className="flex items-center justify-between">
                        <div
                          className="h-9 w-9 rounded-full flex items-center justify-center"
                          style={{ background: "#031a28", color: "#f6f1e8" }}
                          aria-hidden
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="23 4 23 10 17 10" />
                            <polyline points="1 20 1 14 7 14" />
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                          </svg>
                        </div>
                        <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#031a28]/55">
                          {it.eyebrow}
                        </span>
                      </div>

                      <h3
                        className="mt-6 font-semibold leading-[1.02] tracking-[-0.02em] text-[clamp(1.8rem,3.4vw,2.8rem)]"
                        style={{
                          fontFamily:
                            '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                        }}
                      >
                        {it.title}
                      </h3>

                      <p className="mt-4 text-[#031a28]/80 text-[14px] md:text-[15px] leading-[1.55]">
                        {it.body}
                      </p>

                      {it.extra && (
                        <p className="mt-3 text-[#031a28]/70 text-[13px] md:text-[14px] leading-[1.5] italic">
                          {it.extra}
                        </p>
                      )}

                      {it.showVagas && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[#031a28]/70">
                            <span>Vagas restantes</span>
                            <span>13 / 50</span>
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-[#031a28]/15 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: "26%",
                                background:
                                  "linear-gradient(90deg, #c9a24a, #e6c674)",
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {it.arrow && (
                        <div className="mt-auto pt-5">
                          <div
                            aria-hidden
                            className="h-px w-full mb-4"
                            style={{ background: "#031a28", opacity: 0.18 }}
                          />
                          <p className="text-[#031a28] text-[13px] md:text-[14px] leading-[1.5] font-medium">
                            <span className="mr-2">→</span>
                            {it.arrow}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}