import { useEffect, useRef, useState } from "react";

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
    body: "O Raio-X dos seus 3 motores e as melhores estratégias aplicáveis. Entregue antes mesmo do evento começar. Apenas 50 Diagnósticos Individuais serão realizados.",
    extra: "(Esse diagnóstico já foi vendido 1.913 vezes por R$997,00.",
    arrow:
      "Serviço que normalmente custa R$ 997. Incluso para participantes qualificados.",
    showVagas: true,
  },
  {
    eyebrow: "Bônus",
    title: "Biblioteca Confidencial do Quarto Caminho",
    body: "3 estudos de caso reais, documentados, de pessoas que aplicaram o método. Com números, timeline e decisões. Não é teoria. E o que aconteceu.",
    arrow: "",
  },
  {
    eyebrow: "Bônus",
    title: "Manual Anti-Armadilhas",
    body: "Os 5 erros que mantêm você no caminho do primo. Baseado em 3.215 reuniões. Você provavelmente está caindo em, pelo menos, 2 delas.",
    arrow: "",
  },
];

// Inclinações alternadas — papéis soltos sobre uma mesa
const TILTS = [-2.4, 2.1, -1.8, 2.6, -2.0, 1.7];

export default function DezHorasSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 quando o topo da seção entra, 1 quando o fim sai pelo topo
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
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
        // Cada card tem dwell time pra leitura — slot mais largo
        minHeight: `${30 + ITEMS.length * 38}vh`,
      }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="mx-auto h-full w-full max-w-[1280px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-1 sm:gap-3 md:gap-12 items-start md:items-center pt-4 sm:pt-6 md:pt-0 pb-4 md:pb-0">
          {/* Coluna esquerda — título fixo */}
          <div className="md:col-span-5 text-white">
            <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
              <span aria-hidden className="block h-px w-7 bg-white/35" />
              O que você recebe
            </span>
            <h2
              className="mt-3 md:mt-5 font-semibold leading-[1.08] tracking-[-0.022em] w-full text-[clamp(1.5rem,5vw,2.6rem)] [text-wrap:wrap]"
              style={{
                fontFamily:
                  '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                backgroundImage:
                  "linear-gradient(135deg, #FFC14D 0%, #f6f1e8 45%, #ffffff 75%, #d9cfbb 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              10 horas ao vivo que vão te colocar à frente de 99% dos profissionais de alta renda.
            </h2>
          </div>

          {/* Coluna direita — pilha de cards */}
          <div className="md:col-span-7 relative h-[68vh] md:h-[82vh]">
            {/* Ghost — uma única silhueta atrás do card ativo, peek-out
                pra sinalizar "tem mais coisa aqui". */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <div
                className="absolute left-1/2 top-[42%] md:top-1/2"
                style={{
                  transform: `translate(calc(-50% + 6px), calc(-50% + 10px)) rotate(2.2deg)`,
                  width: "min(560px, 92%)",
                  opacity: Math.max(0.32 * (1 - progress * 0.4), 0),
                }}
              >
                <div
                  className="rounded-[22px] aspect-[4/5] sm:aspect-[5/4] max-h-[58vh] sm:max-h-[60vh]"
                  style={{
                    border: "1.5px dashed rgba(246, 241, 232, 0.6)",
                    background:
                      "linear-gradient(155deg, rgba(246,241,232,0.08) 0%, rgba(246,241,232,0.025) 100%)",
                    boxShadow:
                      "0 20px 50px -25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                />
              </div>
            </div>

            {/* Indicador "card N de 6" + barra de progresso — bottom-right.
                Comunica progresso e sinaliza que há mais conteúdo a revelar. */}
            <div
              aria-hidden
              className="absolute bottom-2 right-2 md:bottom-4 md:right-4 flex items-center gap-3 md:gap-4"
              style={{ zIndex: 2 }}
            >
              <div className="flex items-baseline gap-1.5 font-mono">
                <span
                  className="tabular-nums font-bold text-white text-[18px] md:text-[22px] leading-none"
                  style={{
                    fontFamily:
                      '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                  }}
                >
                  {String(
                    Math.min(
                      ITEMS.length,
                      Math.max(1, Math.ceil(progress * ITEMS.length * 0.999) || 1)
                    )
                  ).padStart(2, "0")}
                </span>
                <span className="text-white/40 text-[12px] md:text-[13px] tabular-nums leading-none">
                  / {String(ITEMS.length).padStart(2, "0")}
                </span>
              </div>
              <div className="h-[3px] w-[88px] md:w-[120px] rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-200 ease-out"
                  style={{
                    width: `${Math.min(100, Math.max(4, progress * 100))}%`,
                    background:
                      "linear-gradient(90deg, #FFC14D 0%, #f6f1e8 100%)",
                  }}
                />
              </div>
            </div>

            {ITEMS.map((it, i) => {
              // Cada card ocupa um slot exclusivo (sem overlap entre starts)
              const start = i * perCard;
              // Animação ocupa 35% do slot — sobram 65% pro card descansar legível
              const animDur = perCard * 0.35;
              const local = Math.min(
                Math.max((progress - start) / animDur, 0),
                1
              );
              // Próximo card só começa a entrar quando o atual já passou tempo de leitura
              const nextStart = (i + 1) * perCard;
              const next = Math.min(
                Math.max((progress - nextStart) / animDur, 0),
                1
              );

              // Subida sutil — viewport menor no mobile, então distância também
              const translateY = (1 - local) * 35;
              const scale = 1 - next * 0.04;
              const dim = next * 0.28;
              const z = 10 + i;
              // Inclinação alternada — papel solto sobre a mesa
              const baseTilt = TILTS[i % TILTS.length] ?? 0;
              // Tilt diminui sutilmente conforme novos cards empilham por cima
              const tilt = baseTilt * (1 - next * 0.4);

              return (
                <article
                  key={i}
                  className="absolute left-1/2 top-[42%] md:top-1/2 will-change-transform"
                  style={{
                    transform: `translate(-50%, calc(-50% + ${translateY}vh)) scale(${scale}) rotate(${tilt}deg)`,
                    zIndex: z,
                    width: "min(560px, 92%)",
                    // Sem transition em transform — animação 1:1 com scroll, sem catch-up
                    transition:
                      "filter 200ms ease-out, opacity 200ms ease-out",
                    opacity: local > 0 ? 1 : 0,
                    filter: `brightness(${1 - dim})`,
                  }}
                >
                  <div
                    className="relative rounded-[22px] overflow-hidden aspect-[4/5] sm:aspect-[5/4] max-h-[64vh] sm:max-h-[60vh]"
                    style={{
                      background:
                        "linear-gradient(155deg, #f6f1e8 0%, #e9e1d2 45%, #d9cfbb 100%)",
                      boxShadow:
                        "0 30px 60px -20px rgba(0,0,0,0.55), 0 8px 24px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
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

                    <div className="relative h-full w-full p-4 md:p-7 flex flex-col text-[#031a28]">
                      {/* badge canto */}
                      <div className="flex items-center justify-between">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center"
                          style={{ background: "#031a28", color: "#f6f1e8" }}
                          aria-hidden
                        >
                          <svg
                            width="13"
                            height="13"
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
                        {it.eyebrow.toLowerCase().startsWith("bônus") ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#b9352a]/12 ring-1 ring-[#b9352a]/45 font-mono text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-[0.22em] text-[#b9352a] shadow-[0_2px_8px_-2px_rgba(185,53,42,0.35)]">
                            {it.eyebrow}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#031a28]/55">
                            {it.eyebrow}
                          </span>
                        )}
                      </div>

                      <h3
                        className="mt-3 md:mt-5 font-semibold leading-[1.12] tracking-[-0.018em] text-[clamp(1.15rem,4.4vw,2rem)]"
                        style={{
                          fontFamily:
                            '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                        }}
                      >
                        {it.title}
                      </h3>

                      <p className="mt-2.5 md:mt-3.5 text-[#031a28]/80 text-[12.5px] md:text-[14.5px] leading-[1.5] md:leading-[1.55]">
                        {it.body}
                      </p>

                      {it.extra && (
                        <p className="mt-2 text-[#031a28]/70 text-[11.5px] md:text-[13.5px] leading-[1.45] md:leading-[1.5] italic">
                          {it.extra}
                        </p>
                      )}

                      {it.showVagas && (
                        <div className="mt-3.5">
                          <div className="flex items-center justify-between text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#031a28]/70">
                            <span>Vagas restantes</span>
                            <span>13 / 50</span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#031a28]/15 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: "74%",
                                background:
                                  "linear-gradient(90deg, #c9a24a, #e6c674)",
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {it.arrow && (
                        <div className="mt-auto pt-3 md:pt-4">
                          <div
                            aria-hidden
                            className="h-px w-full mb-2.5 md:mb-3"
                            style={{ background: "#031a28", opacity: 0.18 }}
                          />
                          <p className="text-[#031a28] text-[11.5px] md:text-[13.5px] leading-[1.45] md:leading-[1.5] font-medium">
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