import { isLeadModalOpenNow } from "@/components/leadModalStore";
import { Star, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import renatoOberg from "@/assets/renato-oberg.png";
import LpPicture from "@/components/LpPicture";

const REALITY_CHECKS = [
  "A escola dos seus filhos continua sendo paga?",
  "O plano de saúde continua ativo?",
  "A parcela do apartamento continua caindo?",
  "O seguro, o condomínio, a viagem que já prometeu?",
];

const SPEC_CARDS: {
  id: string;
  category: string;
  body: string;
}[] = [
  {
    id: "01",
    category: "Renda",
    body: "Renda acima de R$20 mil.",
  },
  {
    id: "02",
    category: "Patrimônio",
    body: "Patrimônio que não reflete essa renda.",
  },
  {
    id: "03",
    category: "Investimentos",
    body: "Investimentos que mal acompanham a inflação real.",
  },
  {
    id: "04",
    category: "Renda passiva",
    body: "Zero fontes de renda que funcionam sem eles.",
  },
];

// IO genérico — observa entrada no viewport
function useInView<T extends HTMLElement>(opts?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const { threshold = 0.18, rootMargin = "0px 0px -8% 0px", once = true } =
    opts ?? {};
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);
  return { ref, inView };
}

// Soft-flow reveal: paragraphs slide in as they enter viewport
function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  from?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const initial =
    from === "left"
      ? "translate3d(-22px, 0, 0)"
      : from === "right"
      ? "translate3d(22px, 0, 0)"
      : "translate3d(0, 14px, 0)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: inView ? "translate3d(0, 0, 0)" : initial,
        opacity: inView ? 1 : 0,
        transition: `transform 720ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms, opacity 720ms ease-out ${delay}ms`,
        willChange: inView ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

// LineReveal — texto sobe de baixo de uma máscara (clip overflow)
function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className={`inline-block overflow-hidden align-bottom ${className}`}
    >
      <span
        className="inline-block"
        style={{
          transform: inView ? "translate3d(0,0,0)" : "translate3d(0,105%,0)",
          transition: `transform 980ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`,
          willChange: inView ? "auto" : "transform",
        }}
      >
        {children}
      </span>
    </span>
  );
}

// MarkHighlight — brush horizontal que se desenha por baixo de palavra-chave
function MarkHighlight({
  children,
  delay = 220,
  color = "rgba(252, 211, 77, 0.6)",
}: {
  children: ReactNode;
  delay?: number;
  color?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute left-[-3px] right-[-3px] bottom-[6%] h-[42%] origin-left rounded-[3px]"
        style={{
          background: color,
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 900ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms`,
          willChange: inView ? "auto" : "transform",
        }}
      />
    </span>
  );
}

// StrikeOut — strikethrough vermelho que se desenha (background-image, multi-line safe)
function StrikeOut({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className="diag-strike"
      data-active={inView ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

// DrawnUnderline — sublinhado SVG handwritten que se desenha por baixo
function DrawnUnderline({
  children,
  delay = 0,
  color = "#031a28",
}: {
  children: ReactNode;
  delay?: number;
  color?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 -bottom-[6px] w-full h-[10px] pointer-events-none"
      >
        <path
          d="M2 8 C 50 2, 100 12, 198 5"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: `stroke-dashoffset 1100ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms`,
          }}
        />
      </svg>
    </span>
  );
}

// RealityRow — bullet de pergunta com fade + slide
function RealityRow({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className="relative px-5 md:px-6 py-4 md:py-5 text-center text-[#031a28] text-[clamp(1rem,2vw,1.25rem)] leading-[1.45] font-medium"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translate3d(0,0,0)"
          : "translate3d(0, 10px, 0)",
        transition: `opacity 620ms ease-out ${delay}ms, transform 620ms cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
        willChange: inView ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </li>
  );
}

// SpecCard — bloco "ficha técnica" do diagnóstico, robusto, com header, métrica e ticks
function SpecCard({
  spec,
  delay = 0,
  from = "up",
}: {
  spec: (typeof SPEC_CARDS)[number];
  delay?: number;
  from?: "up" | "left" | "right";
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const initial =
    from === "left"
      ? "translate3d(-18px, 0, 0)"
      : from === "right"
      ? "translate3d(18px, 0, 0)"
      : "translate3d(0, 14px, 0)";

  return (
    <article
      ref={ref}
      className="group relative bg-white rounded-[10px] border-[1.5px] border-[#031a28]/15 shadow-[0_14px_32px_-18px_rgba(3,26,40,0.32)] overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : initial,
        transition: `opacity 640ms ease-out ${delay}ms, transform 640ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`,
        willChange: inView ? "auto" : "opacity, transform",
      }}
    >
      {/* Header strip */}
      <header className="flex items-center justify-between px-3.5 md:px-4 py-2 border-b border-[#031a28]/12 bg-[#031a28]/[0.04]">
        <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-[#031a28]/80">
          {spec.id}
        </span>
        <span className="text-[9.5px] md:text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#031a28]/55">
          {spec.category}
        </span>
      </header>

      {/* Body — texto completo do item, tipografia uniforme */}
      <div className="px-3.5 md:px-4 py-4 md:py-5">
        <p className="text-[#031a28] text-[14px] md:text-[15px] font-medium leading-[1.5]">
          {spec.body}
        </p>
      </div>
    </article>
  );
}

export default function DiagnosticoSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Scan line desce a imagem conforme você rola — toque "diagnóstico"
  useEffect(() => {
    const onScroll = () => {
      if (isLeadModalOpenNow()) return;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.min(1, Math.max(0, passed / total));
      setScanProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#FAEDDD" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(3,26,40,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[960px] px-5 md:px-8 py-20 md:py-24">
        {/* Testimonial */}
        <Reveal from="up">
          <figure className="mx-auto max-w-[860px] rounded-2xl border border-[#031a28]/15 bg-white/60 backdrop-blur-sm px-6 md:px-9 py-7 md:py-8 shadow-xl">
            <div className="flex items-center gap-1 text-[#031a28] mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-current"
                  strokeWidth={0}
                />
              ))}
            </div>
            <blockquote className="text-[#031a28] text-[17px] md:text-[19px] leading-[1.55] font-medium">
              "Passei por 2 assessorias e 1 consultoria. Nenhuma me deu um plano real de construção de ativos. Aqui, o que foi prometido foi entregue."
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={renatoOberg}
                alt="Renato Oberg"
                className="h-10 w-10 rounded-full object-cover object-top ring-1 ring-[#031a28]/20"
                loading="lazy"
              />
              <span className="text-[#031a28]/70 text-[13px] md:text-[14px] uppercase tracking-[0.12em]">
                Renato Oberg{" "}
                <span className="text-[#031a28]/40">— Médico</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* PERGUNTA — momento cinematográfico, full-width do container */}
        <div className="mt-16 md:mt-24 text-center">
          <Reveal from="up">
            <div className="inline-flex items-center gap-2.5 mb-5 md:mb-7">
              <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
              <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-[#031a28]/55">
                Deixa eu te fazer uma pergunta
              </span>
              <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
            </div>
          </Reveal>

          <h2 className="text-[#031a28] font-semibold leading-[1.04] tracking-[-0.028em] text-[clamp(2.2rem,6.4vw,4.4rem)]">
            <span className="block">
              <LineReveal>
                Se você parar de trabalhar por{" "}
                <MarkHighlight delay={520}>6 meses</MarkHighlight>
              </LineReveal>
            </span>
            <span className="block mt-2 md:mt-3">
              <LineReveal delay={180}>
                <span className="text-[#031a28]/60 font-medium italic text-[clamp(1.4rem,3.6vw,2.4rem)]">
                  — não por escolha, por necessidade —
                </span>
              </LineReveal>
            </span>
            <span className="block mt-2 md:mt-3">
              <LineReveal delay={360}>o que acontece?</LineReveal>
            </span>
          </h2>

          <ul className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 max-w-[860px] mx-auto border-y border-[#031a28]/15 md:border md:border-[#031a28]/15 md:rounded-[14px] divide-y md:divide-y-0 divide-[#031a28]/12 md:[&>li:nth-child(odd)]:border-r md:[&>li:nth-child(odd)]:border-[#031a28]/12 md:[&>li:nth-child(-n+2)]:border-b md:[&>li:nth-child(-n+2)]:border-[#031a28]/12">
            {REALITY_CHECKS.map((q, i) => (
              <RealityRow key={i} delay={i * 90}>
                {q}
              </RealityRow>
            ))}
          </ul>

        </div>

        {/* DIAGNÓSTICO — conclusão + eliminações em um bloco coeso */}
        <div className="mt-12 md:mt-16 max-w-[820px] mx-auto">
          {/* Conclusão centralizada */}
          <Reveal from="up">
            <p className="text-center text-[#031a28] text-[clamp(1.15rem,2.4vw,1.55rem)] leading-[1.45] font-medium tracking-[-0.012em]">
              Se a resposta é{" "}
              <em className="not-italic text-red-700 font-semibold">
                "aperta"
              </em>{" "}
              ou{" "}
              <em className="not-italic text-red-700 font-semibold">
                "não sei"
              </em>
              , você tem um problema. Mas{" "}
              <span className="text-[#031a28] font-bold">
                não é o problema que você pensa.
              </span>
            </p>
          </Reveal>

          {/* Conector hairline central */}
          <div
            aria-hidden
            className="mt-8 md:mt-10 mx-auto flex items-center justify-center gap-2"
          >
            <span className="block h-px w-10 bg-[#031a28]/20" />
            <span className="block w-1 h-1 rounded-full bg-red-700/45" />
            <span className="block h-px w-10 bg-[#031a28]/20" />
          </div>

          {/* Eliminações como items left-aligned com X em vermelho */}
          <ul className="mt-8 md:mt-10 max-w-[680px] mx-auto space-y-5 md:space-y-6">
            <Reveal from="up">
              <li className="flex items-start gap-3.5 md:gap-4">
                <span className="mt-[5px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-700/12 text-red-700 ring-1 ring-red-700/30">
                  <X className="h-3 w-3" strokeWidth={3.5} />
                </span>
                <p className="text-[#031a28] text-[clamp(1rem,1.9vw,1.25rem)] leading-[1.55]">
                  <StrikeOut>
                    <span className="font-semibold">
                      Não é falta de renda.
                    </span>
                  </StrikeOut>{" "}
                  <span className="text-[#031a28]/80">
                    Você ganha bem. Provavelmente melhor que 95% do país.
                  </span>
                </p>
              </li>
            </Reveal>
            <Reveal from="up" delay={80}>
              <li className="flex items-start gap-3.5 md:gap-4">
                <span className="mt-[5px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-700/12 text-red-700 ring-1 ring-red-700/30">
                  <X className="h-3 w-3" strokeWidth={3.5} />
                </span>
                <p className="text-[#031a28] text-[clamp(1rem,1.9vw,1.25rem)] leading-[1.55]">
                  <StrikeOut delay={120}>
                    <span className="font-semibold">
                      Não é falta de conhecimento.
                    </span>
                  </StrikeOut>{" "}
                  <span className="text-[#031a28]/80">
                    Você já leu sobre investimentos, já montou carteira, já conversou com assessor.
                  </span>
                </p>
              </li>
            </Reveal>
          </ul>
        </div>

        {/* SECTION BREAK — régua hairline separando "problema" de "diagnóstico" */}
        <div
          aria-hidden
          className="mt-16 md:mt-24 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(3,26,40,0.28) 50%, transparent 100%)",
          }}
        />

        {/* PIVÔ — visual diferente do bloco acima: kicker mono, headline + sub-explicação com filete */}
        <div className="diag-engineering pt-12 md:pt-16">
          <Reveal from="up">
            <div className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="block w-2 h-2 rounded-full bg-[#031a28]"
              />
              <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.26em] text-[#031a28]/75">
                O problema é outro
              </span>
            </div>
          </Reveal>

          <Reveal from="up" delay={80}>
            <p className="mt-3 md:mt-4 text-[#031a28]/80 text-[16px] md:text-[18px] leading-[1.55] max-w-[760px]">
              Mais simples e mais grave ao mesmo tempo:
            </p>
          </Reveal>

          <h3 className="mt-5 md:mt-6 text-[#031a28] font-semibold leading-[1.14] tracking-[-0.02em] text-[clamp(1.5rem,3.1vw,2.25rem)] max-w-[820px]">
            <span className="block">
              <LineReveal>{"Você não tem "}</LineReveal>
              <LineReveal delay={140}>
                <DrawnUnderline delay={620}>
                  Engenharia Patrimonial
                </DrawnUnderline>
                .
              </LineReveal>
            </span>
          </h3>

          <Reveal from="up" delay={120}>
            <div className="mt-6 md:mt-8 relative pl-5 md:pl-6 max-w-[700px]">
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, #031a28 0%, rgba(3,26,40,0.15) 100%)",
                }}
              />
              <p className="text-[#031a28]/80 text-[16px] md:text-[18px] leading-[1.55] font-medium">
                Tem um amontoado de produtos financeiros que não conversam, não geram renda e não constroem nada.
              </p>
            </div>
          </Reveal>

          <Reveal from="up">
            <p className="mt-10 md:mt-14 text-[#031a28]/75 text-[16px] md:text-[17px] leading-[1.65] max-w-[700px]">
              Eu sei disso porque já sentei com mais de{" "}
              <span className="text-[#031a28] font-semibold">
                3.000 profissionais
              </span>{" "}
              nessa situação. Médicos, empresários, advogados, engenheiros. Gente que acorda cedo, dorme tarde e faz mais do que a maioria.
            </p>
          </Reveal>

          <Reveal from="up" delay={120}>
            <p className="mt-5 md:mt-6 text-[#031a28]/85 text-[16px] md:text-[17px] leading-[1.65] max-w-[700px] font-medium">
              Quase todos tinham o mesmo perfil:
            </p>
          </Reveal>

          {/* CASE FILE — dossiê emoldurado + 4 spec cards estruturados */}
          <div className="mt-10 md:mt-12">
            {/* Header do dossiê */}
            <Reveal from="up">
              <div className="flex items-center justify-between pb-3 border-b border-[#031a28]/20 mb-5 md:mb-6">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.65)]"
                  />
                  <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em] text-[#031a28]/80">
                    Perfil clínico patrimonial
                  </span>
                </div>
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#031a28]/50">
                  04 amostras · n = 3.000+
                </span>
              </div>
            </Reveal>

            {/* Grid: cards-esquerda · imagem · cards-direita (md+); coluna única (mobile) */}
            <div className="grid md:grid-cols-[1fr_minmax(280px,1.15fr)_1fr] gap-5 md:gap-6 items-stretch">
              {/* Cards à esquerda — apenas md+ */}
              <div className="hidden md:flex flex-col gap-5 justify-between">
                <SpecCard spec={SPEC_CARDS[0]!} delay={0} from="left" />
                <SpecCard spec={SPEC_CARDS[2]!} delay={140} from="left" />
              </div>

              {/* IMAGEM — emoldurada como case file, com scan line por scroll */}
              <div ref={wrapperRef} className="relative">
                <div className="relative rounded-[10px] overflow-hidden border-[1.5px] border-[#031a28]/20 shadow-[0_22px_50px_-22px_rgba(3,26,40,0.40)] bg-white/40">
                  {/* File header */}
                  <div className="relative flex items-center justify-between px-3.5 md:px-4 py-2.5 border-b border-[#031a28]/15 bg-white/65 backdrop-blur-sm">
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="block w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                      />
                      <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#031a28]/85 font-bold">
                        Caso 04 · 2026
                      </span>
                    </span>
                    <span className="font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.2em] text-[#031a28]/55">
                      confidencial
                    </span>
                  </div>

                  {/* Imagem + scan line */}
                  <div className="relative">
                    <LpPicture
                      stem="profissional-diagnostico"
                      alt="Profissional concentrado diante do computador"
                      sizes="(max-width: 900px) 100vw, 40vw"
                      width={1200}
                      height={800}
                      className="w-full h-auto block"
                    />

                    {/* Scan line — desce com o scroll */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 h-[2px]"
                      style={{
                        top: `${scanProgress * 100}%`,
                        opacity:
                          scanProgress > 0.02 && scanProgress < 0.98 ? 1 : 0,
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.95) 30%, rgba(16,185,129,1) 50%, rgba(16,185,129,0.95) 70%, transparent 100%)",
                        boxShadow: "0 0 14px rgba(16,185,129,0.65)",
                        transition: "opacity 0.3s ease-out",
                      }}
                    />

                    {/* Crop marks nos 4 cantos */}
                    {[
                      "top-2 left-2 border-t-[2px] border-l-[2px]",
                      "top-2 right-2 border-t-[2px] border-r-[2px]",
                      "bottom-2 left-2 border-b-[2px] border-l-[2px]",
                      "bottom-2 right-2 border-b-[2px] border-r-[2px]",
                    ].map((cls, i) => (
                      <span
                        key={i}
                        aria-hidden
                        className={`absolute ${cls} border-white/85 w-3.5 h-3.5 pointer-events-none mix-blend-difference`}
                      />
                    ))}
                  </div>

                  {/* File footer */}
                  <div className="px-3.5 md:px-4 py-2.5 border-t border-[#031a28]/15 bg-white/65 backdrop-blur-sm flex items-center justify-between">
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#031a28]/75 font-semibold">
                      Padrão repetido em + de 3.000 casos
                    </span>
                    <span className="font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.2em] text-[#031a28]/50">
                      v · 1.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Cards à direita — apenas md+ */}
              <div className="hidden md:flex flex-col gap-5 justify-between">
                <SpecCard spec={SPEC_CARDS[1]!} delay={70} from="right" />
                <SpecCard spec={SPEC_CARDS[3]!} delay={210} from="right" />
              </div>
            </div>

            {/* Stack mobile dos cards — abaixo da imagem */}
            <div className="md:hidden mt-5 grid gap-3">
              {SPEC_CARDS.map((spec, i) => (
                <SpecCard
                  key={spec.id}
                  spec={spec}
                  delay={i * 80}
                  from="up"
                />
              ))}
            </div>
          </div>

          <Reveal from="left">
            <p className="mt-12 md:mt-16 text-[#031a28]/75 text-[16px] md:text-[17px] leading-[1.65] max-w-[700px]">
              E o que pouca gente admite: essa situação não fica só no extrato bancário. Ela entra no casamento. No sono. Na relação com os filhos. Já vi profissional de R$80 mil por mês com vergonha de falar de dinheiro em casa. Já vi empresário que ganha mais do que o pai sonhou ganhar na vida inteira e sente que não construiu nada de verdade.
            </p>
          </Reveal>

          <Reveal from="right">
            <p className="mt-6 text-[#031a28]/85 text-[16px] md:text-[17px] leading-[1.65] max-w-[700px]">
              Não é falta de esforço.{" "}
              <span className="text-[#031a28] font-semibold">
                Você recebeu o diagnóstico errado
              </span>{" "}
              e passou anos tentando resolver o problema errado.
            </p>
          </Reveal>
        </div>

        {/* PRESCRIÇÃO — início da solução: NÃO vs PRECISA, com régua espessa entre */}
        <Reveal from="up">
          <div className="mt-14 md:mt-20 max-w-[760px]">
            <div className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em] text-[#031a28]/55 mb-5 md:mb-6 inline-flex items-center gap-2">
              <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
              <span>Início da solução · prescrição</span>
            </div>

            {/* Linha 1 — descartado */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 md:gap-x-6 items-baseline">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-red-700/85 font-bold whitespace-nowrap">
                ✕ Não precisa
              </span>
              <p className="text-[#031a28]/65 text-[clamp(1.05rem,2vw,1.3rem)] leading-[1.3] font-medium">
                <StrikeOut>investir melhor</StrikeOut>
              </p>
            </div>

            {/* Régua espessa com nó central */}
            <div aria-hidden className="my-5 md:my-7 flex items-center gap-3">
              <span className="block h-[2px] flex-1 bg-[#031a28]/22 rounded-full" />
              <span className="block w-2 h-2 rotate-45 bg-[#031a28]/40" />
              <span className="block h-[2px] flex-1 bg-[#031a28]/22 rounded-full" />
            </div>

            {/* Linha 2 — prescrição final */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 md:gap-x-6 items-baseline">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#031a28] font-bold whitespace-nowrap">
                → Precisa
              </span>
              <p className="text-[#031a28] text-[clamp(1.3rem,2.7vw,1.8rem)] font-bold leading-[1.18] tracking-[-0.018em]">
                <DrawnUnderline delay={300}>
                  Engenharia Patrimonial
                </DrawnUnderline>
                .
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal from="up">
          <p className="mt-10 md:mt-12 text-[#031a28]/65 text-[15px] md:text-[16px] leading-[1.65] italic">
            E pra entender o que isso muda, precisa conhecer duas pessoas…
          </p>
        </Reveal>
      </div>
    </section>
  );
}
