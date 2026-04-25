import {
  Check,
  X,
  TrendingDown,
  TrendingUp,
  Building2,
  Sparkles,
  KeyRound,
  ArrowRight,
  Plane,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import PillButton from "@/components/PillButton";
import bancoMasterNews from "@/assets/banco-master-news.png";
import LpPicture from "@/components/LpPicture";

const PRIMO = [
  "Sabe tudo sobre investimentos",
  "Lê relatório de analista",
  "Tem app de 3 corretoras",
  "Diversificou em 12 produtos",
  "R$500 mil em 8 investimentos",
  "Confia no assessor",
  "Depende do próximo salário.",
];

const TIO = [
  "Não sabe o que é CDI",
  "Não olha noticiário econômico",
  "Não perde sono quando o mercado cai",
  "Tem 4 imóveis e R$18 mil/mês de aluguel",
  "R$500 mil em 3 imóveis que se pagam",
  "Confia na escritura",
  "É livre.",
];

const EXTRATO_ROWS = [
  { label: "Aluguel — Imóvel 1", v: 3500, display: "R$ 3.500" },
  { label: "Aluguel — Imóvel 2", v: 2800, display: "R$ 2.800" },
  { label: "Usina solar", v: 4200, display: "R$ 4.200" },
  { label: "Imóvel no Texas (USD)", v: 8000, display: "$ 2.000" },
];

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

// Counter — número anima de 0 ao target quando entra no viewport
function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1400,
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  const formatted = value.toLocaleString("pt-BR");
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// Reveal genérico (fade + slide) com IO
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
      ? "translate3d(-20px,0,0)"
      : from === "right"
      ? "translate3d(20px,0,0)"
      : "translate3d(0,14px,0)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : initial,
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
        willChange: inView ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ScenarioStage — sticky scroll storytelling: notícia ruim por baixo, ativo em viagem cobrindo por cima
// Refs + DOM direto (sem setState) pra animação 1:1 com scroll, zero re-render React
function ScenarioStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const primoRef = useRef<HTMLElement>(null);
  const tioRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let raf = 0;

    // 3 fases: dwell na notícia · rise · dwell na transformação
    const READ_PRIMO_END = 0.25; // 0–25% : LÊ A NOTÍCIA (TIO oculto)
    const RISE_END = 0.65;       // 25–65% : TIO SOBE (animação)
    // 65–100%: TIO ANCORADO (LÊ A TRANSFORMAÇÃO)

    const apply = () => {
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, rect.height - vh);
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.max(0, Math.min(1, scrolled / total));

      // tioP cru: mantém 0 na fase 1, 1 na fase 3, sobe linear na fase 2
      let rawTioP: number;
      if (progress < READ_PRIMO_END) rawTioP = 0;
      else if (progress > RISE_END) rawTioP = 1;
      else rawTioP = (progress - READ_PRIMO_END) / (RISE_END - READ_PRIMO_END);

      // Smoothstep — desacelera nas pontas, acelera no meio (motion orgânico)
      const tioP = rawTioP * rawTioP * (3 - 2 * rawTioP);

      const tioY = (1 - tioP) * 110;
      const tioScale = 0.94 + tioP * 0.06;
      const tioOpacity = tioP;

      const primoScale = 1 - tioP * 0.08;
      const primoTilt = tioP * -3.5;
      const primoOpacity = 1 - tioP * 0.4;

      // Caption só aparece quando o TIO está chegando/ancorado (50–80%)
      const captionFade = Math.max(0, Math.min(1, (progress - 0.5) / 0.3));

      const primo = primoRef.current;
      const tio = tioRef.current;
      if (primo) {
        primo.style.transform = `perspective(1200px) rotateX(${primoTilt}deg) scale(${primoScale})`;
        primo.style.opacity = String(primoOpacity);
      }
      if (tio) {
        tio.style.transform = `translate3d(0, ${tioY}%, 0) scale(${tioScale})`;
        tio.style.opacity = String(tioOpacity);
      }
      const caption = captionRef.current;
      if (caption) {
        caption.style.opacity = String(captionFade);
      }
      const bar = progressBarRef.current;
      if (bar) {
        bar.style.width = `${progress * 100}%`;
        // Cor do bar reflete a fase: vermelho na 1, transição na 2, verde na 3
        if (progress < READ_PRIMO_END) {
          bar.style.background = "rgba(239, 68, 68, 0.85)";
        } else if (progress < RISE_END) {
          const t = (progress - READ_PRIMO_END) / (RISE_END - READ_PRIMO_END);
          const r = Math.round(239 - t * (239 - 16));
          const g = Math.round(68 + t * (185 - 68));
          const b = Math.round(68 + t * (129 - 68));
          bar.style.background = `rgba(${r}, ${g}, ${b}, 0.9)`;
        } else {
          bar.style.background = "rgba(16, 185, 129, 0.9)";
        }
      }

      // ORB — cor lerp red(239,68,68) → emerald(16,185,129) ao longo de TODO o progresso
      const orb = orbRef.current;
      if (orb) {
        const t = progress;
        const r = Math.round(239 - t * (239 - 16));
        const g = Math.round(68 + t * (185 - 68));
        const b = Math.round(68 + t * (129 - 68));
        orb.style.background = `radial-gradient(circle at center, rgba(${r}, ${g}, ${b}, 0.85) 0%, rgba(${r}, ${g}, ${b}, 0.35) 40%, rgba(${r}, ${g}, ${b}, 0.05) 70%, transparent 85%)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={stageRef} className="relative" style={{ height: "180vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-5 md:px-8 py-6 md:py-10 overflow-hidden">
        {/* ORB — pulsa continuamente, cor muda com scroll (red → emerald) */}
        <div className="pt-orb-wrap" aria-hidden>
          <div
            ref={orbRef}
            className="pt-orb-inner"
            style={{
              background:
                "radial-gradient(circle at center, rgba(239,68,68,0.85) 0%, rgba(239,68,68,0.35) 40%, rgba(239,68,68,0.05) 70%, transparent 85%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[820px] mx-auto">
          {/* Barra de progresso minimal — cor muda com a fase (vermelho → emerald) */}
          <div className="mb-4 md:mb-5 mx-auto w-full max-w-[260px]">
            <div className="relative h-[2px] w-full rounded-full bg-white/12 overflow-hidden">
              <span
                ref={progressBarRef}
                aria-hidden
                className="absolute left-0 top-0 h-full"
                style={{ width: "0%", background: "rgba(252,165,165,0.85)" }}
              />
            </div>
            <p className="mt-2 text-center font-mono text-[9px] md:text-[10px] uppercase tracking-[0.28em] font-bold text-white/45">
              Role devagar — leia · veja · absorva
            </p>
          </div>

          {/* Stage — cards empilhados, mobile aspect-[5/7] vertical pra evitar overlap, desktop 16/11 wide */}
          <div
            className="relative w-full mx-auto aspect-[5/7] sm:aspect-[16/11]"
            style={{
              maxHeight: "min(72vh, 580px)",
            }}
          >
            {/* PRIMO BASE — notícia */}
            <article
              ref={primoRef}
              className="absolute inset-0 rounded-[14px] overflow-hidden border-[1.5px] border-[#b9352a]/40 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
              style={{
                transform: "perspective(1200px) rotateX(0deg) scale(1)",
                opacity: 1,
                transformOrigin: "center top",
                willChange: "transform, opacity",
              }}
            >
              <img
                src={bancoMasterNews}
                alt="Manchete real do Banco Master"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Vinheta dark + leve "alerta" vermelho */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(8,15,30,0.55) 55%, rgba(8,15,30,0.94) 100%), radial-gradient(ellipse at 70% 20%, rgba(185,53,42,0.18), transparent 55%)",
                }}
              />

              {/* Badge alarme */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 rounded-full bg-[#b9352a] text-white px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] shadow-[0_6px_14px_-3px_rgba(185,53,42,0.6)]">
                <AlertTriangle className="h-3 w-3" strokeWidth={2.6} />
                <span className="hidden sm:inline">Notícia real · 02/2025</span>
                <span className="sm:hidden">Notícia real</span>
              </div>

              {/* Stat negativo top-right — só desktop, mobile fica embaixo no overlay de texto */}
              <div className="hidden sm:block absolute top-4 right-4 rounded-lg bg-black/55 backdrop-blur-md border border-white/10 px-3 py-2 text-right">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55 font-bold">
                  CDB · investidor
                </p>
                <p className="text-[#ef4444] font-bold tabular-nums text-[15px] md:text-[16px]">
                  –93,12%
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-0 px-5 md:px-7 py-5 md:py-7">
                <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] font-bold text-[#fca5a5]">
                  O Primo · perdeu o sono
                </p>
                <h4 className="mt-2 text-white text-[clamp(1.1rem,2.5vw,1.65rem)] font-semibold leading-[1.18] tracking-[-0.012em]">
                  Banco Master quebrou.{" "}
                  <span className="text-[#fca5a5]">R$ 47 bilhões</span> em CDBs.
                </h4>
                <p className="mt-2 text-white/70 text-[13.5px] md:text-[14.5px] leading-[1.55]">
                  6 instituições liquidadas pelo BC em 6 meses. COE de Ambipar devolveu 6,88%.
                </p>
              </div>
            </article>

            {/* TIO OVERLAY — ativo em viagem */}
            <article
              ref={tioRef}
              className="absolute inset-0 rounded-[14px] overflow-hidden border-[1.5px] border-emerald-400/45 shadow-[0_44px_90px_-22px_rgba(16,185,129,0.30),0_30px_60px_-20px_rgba(0,0,0,0.65)]"
              style={{
                transform: "translate3d(0, 100%, 0) scale(0.94)",
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              {/* Background photo (asset placeholder — trocável por foto de viagem real) */}
              <LpPicture
                stem="predio-alugueis"
                alt=""
                sizes="(max-width: 640px) 100vw, 55vw"
                width={800}
                height={600}
                frameClassName="absolute inset-0 block w-full h-full"
                className="h-full w-full object-cover"
                aria-hidden
              />
              {/* Forte vinheta navy + tint emerald */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,31,51,0.55) 0%, rgba(10,31,51,0.85) 60%, rgba(3,26,40,0.96) 100%), radial-gradient(ellipse at 25% 25%, rgba(16,185,129,0.22), transparent 55%)",
                }}
              />

              {/* Avião drifting top-left */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-emerald-500 text-white px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] shadow-[0_8px_18px_-4px_rgba(16,185,129,0.65)]">
                <Plane className="h-3 w-3 pt-plane-drift" strokeWidth={2.6} />
                Estava viajando
              </div>

              {/* Boarding-pass meta top-right — só desktop */}
              <div className="hidden sm:block absolute top-4 right-4 rounded-lg bg-black/40 backdrop-blur-md border border-emerald-300/25 px-3 py-2 text-right">
                <p className="flex items-center justify-end gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300/85 font-bold">
                  <MapPin className="h-2.5 w-2.5" strokeWidth={3} />
                  GRU → CDG
                </p>
                <p className="text-white font-bold tabular-nums text-[14px] md:text-[15px]">
                  Maio · 2025
                </p>
              </div>

              {/* Stat chip flutuante — aluguel caindo enquanto viaja */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[38%] sm:top-[42%] -translate-y-1/2 inline-flex items-center gap-2 sm:gap-2.5 rounded-2xl bg-emerald-500/95 backdrop-blur-md text-white px-3 sm:px-4 py-2 sm:py-2.5 shadow-[0_18px_40px_-12px_rgba(16,185,129,0.55)] ring-1 ring-emerald-300/40">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
                <div className="text-left">
                  <p className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-[0.2em] sm:tracking-[0.22em] font-bold opacity-80 leading-none">
                    Aluguel · dia 5
                  </p>
                  <p className="font-bold tabular-nums text-[14px] sm:text-[16px] md:text-[18px] leading-tight tracking-tight">
                    + R$ 18.000
                  </p>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 px-5 md:px-7 py-5 md:py-7">
                <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] font-bold text-emerald-300">
                  O Tio · 02 / 2025
                </p>
                <h4 className="mt-2 text-white text-[clamp(1.1rem,2.5vw,1.65rem)] font-semibold leading-[1.18] tracking-[-0.012em]">
                  Aluguel caiu no dia 5.{" "}
                  <span className="text-emerald-300">Como sempre.</span>
                </h4>
                <p className="mt-2 text-white/80 text-[13.5px] md:text-[14.5px] leading-[1.55]">
                  O ativo passou por cima da notícia. Sem assessor. Sem home broker. Sem perder o sono.
                </p>
              </div>
            </article>
          </div>

          {/* Caption sob o stage */}
          <div className="mt-5 md:mt-6 max-w-[640px] mx-auto text-center">
            <p
              ref={captionRef}
              className="text-white/65 text-[13.5px] md:text-[15px] leading-[1.55]"
              style={{ opacity: 0.5 }}
            >
              <span className="text-white font-semibold">A notícia é real.</span>{" "}
              <span className="text-emerald-300/90">A escritura também.</span>{" "}
              Quem tem ativo passa por cima.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Comparativo PRIMO/TIO com animações ricas
function ComparativeCards() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const active = inView ? "true" : "false";

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
      {/* VS divider + label "TRANSFORMOU EM" — desktop only */}
      <div
        aria-hidden
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2.5"
      >
        <div className="h-9 w-9 rounded-full bg-[#031a28] text-[#FAEDDD] flex items-center justify-center font-bold text-[10px] tracking-[0.18em] shadow-[0_8px_18px_-6px_rgba(3,26,40,0.5)] ring-[3px] ring-[#FAEDDD]">
          VS
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 ring-1 ring-emerald-600/30 px-2.5 py-1 shadow-sm">
          <ArrowRight className="h-3 w-3 text-emerald-700 pt-arrow-pulse" strokeWidth={2.5} />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] font-bold text-emerald-700 whitespace-nowrap">
            Transformou em
          </span>
        </div>
      </div>

      {/* PRIMO — TRAVADO, vermelho-rust */}
      <article
        data-active={active}
        className="pt-primo-enter relative rounded-[14px] border-[1.5px] border-[#b9352a]/35 bg-[#b9352a]/[0.035] px-6 md:px-7 py-7 md:py-8 overflow-hidden"
        style={{ opacity: 0 }}
      >
        {/* Padrão "loop infinito" sutil de fundo (linhas circulares red faded) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 opacity-[0.07]"
          style={{
            background:
              "repeating-radial-gradient(circle, rgba(185,53,42,1) 0 1px, transparent 1px 16px)",
          }}
        />

        {/* Eyebrow status — TRAVADO */}
        <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-[#b9352a]/12 px-2.5 py-1 ring-1 ring-[#b9352a]/25">
          <span aria-hidden className="block w-1.5 h-1.5 rounded-full bg-[#b9352a] animate-pulse" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] font-bold text-[#b9352a]">
            Travado
          </span>
        </div>

        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#b9352a]/20">
          <div
            data-active={active}
            className="pt-icon-shake h-11 w-11 rounded-lg bg-[#b9352a]/12 flex items-center justify-center ring-1 ring-[#b9352a]/30"
          >
            <TrendingDown className="h-[20px] w-[20px] text-[#b9352a]" strokeWidth={2.4} />
          </div>
          <div>
            <h3 className="text-[#031a28] text-[18px] md:text-[19px] font-semibold leading-tight">
              O Primo dos Investimentos
            </h3>
          </div>
        </div>
        <ul className="space-y-3">
          {PRIMO.map((item, i) => (
            <li
              key={i}
              data-active={active}
              className="pt-list-item flex items-start gap-2.5"
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            >
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#b9352a]/15 text-[#b9352a] ring-1 ring-[#b9352a]/25">
                <X className="h-3 w-3" strokeWidth={3.5} />
              </span>
              <span className="text-[#031a28]/80 text-[14.5px] md:text-[15.5px] leading-[1.55]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Status footer — depende */}
        <div className="mt-5 pt-4 border-t border-dashed border-[#b9352a]/25 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9352a]/85 font-bold">
            Loop · sem patrimônio próprio
          </span>
          <TrendingDown className="h-3.5 w-3.5 text-[#b9352a]/70" strokeWidth={2.5} />
        </div>
      </article>

      {/* TIO — TRANSFORMOU, esmeralda + cream-deep */}
      <div className="relative">
        {/* Anchor badge FORA do article (não é cortado pelo overflow-hidden interno) */}
        <span className="absolute -top-3 left-5 md:left-6 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#031a28] text-[#FAEDDD] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] shadow-[0_6px_14px_-6px_rgba(3,26,40,0.55)] ring-1 ring-emerald-400/40">
          <Sparkles className="h-3 w-3 text-emerald-300" />
          O caminho do ativo
        </span>

        <article
          data-active={active}
          className="pt-tio-glow relative rounded-[14px] border-[1.5px] border-[#031a28]/40 bg-[#031a28]/[0.04] px-6 md:px-7 py-7 md:py-8 overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Brilho "growth" diagonal up-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-[0.6]"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 65%)",
            }}
          />

          {/* Sparkles emergindo */}
          {[
            { top: "12%", right: "12%", delay: "0.6s", size: 14 },
            { top: "28%", right: "8%", delay: "0.9s", size: 10 },
            { top: "20%", right: "22%", delay: "1.2s", size: 11 },
          ].map((s, i) => (
            <Sparkles
              key={i}
              data-active={active}
              className="pt-sparkle absolute text-emerald-500 pointer-events-none"
              style={{
                top: s.top,
                right: s.right,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
                opacity: 0,
              }}
              strokeWidth={2.4}
            />
          ))}

          {/* Eyebrow status — TRANSFORMOU */}
        <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-2.5 py-1 ring-1 ring-emerald-600/35">
          <span aria-hidden className="block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)] animate-pulse" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] font-bold text-emerald-700">
            Transformou
          </span>
        </div>

        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#031a28]/15">
          <div className="relative h-11 w-11 rounded-lg bg-[#031a28]/[0.08] flex items-center justify-center ring-1 ring-[#031a28]/20">
            <Building2 className="h-[20px] w-[20px] text-[#031a28]" strokeWidth={2.2} />
            {/* TrendingUp accent emerald — emblema de crescimento */}
            <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-emerald-500 ring-2 ring-[#FAEDDD] shadow-[0_4px_10px_-3px_rgba(16,185,129,0.6)]">
              <TrendingUp className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
          </div>
          <div>
            <h3 className="text-[#031a28] text-[18px] md:text-[19px] font-semibold leading-tight">
              O Tio dos Imóveis
            </h3>
          </div>
        </div>
        <ul className="space-y-3">
          {TIO.map((item, i) => (
            <li
              key={i}
              data-active={active}
              className="pt-list-item flex items-start gap-2.5"
              style={{ animationDelay: `${0.27 + i * 0.05}s` }}
            >
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-600/30">
                <Check className="h-3 w-3" strokeWidth={3.5} />
              </span>
              <span className="text-[#031a28]/85 text-[14.5px] md:text-[15.5px] leading-[1.55] font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Stat chip emergente — "+R$18k/mês" com bounce-in */}
        <div
          data-active={active}
          className="pt-stat-pop mt-5 pt-4 border-t border-dashed border-emerald-600/30 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2"
          style={{ opacity: 0 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 text-white px-2.5 py-1 text-[11px] md:text-[12px] font-bold tracking-tight shadow-[0_8px_18px_-6px_rgba(16,185,129,0.5)] whitespace-nowrap">
            <TrendingUp className="h-3 w-3" strokeWidth={3} />
            +R$ 18k/mês passivos
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700/85 font-bold whitespace-nowrap">
            Patrimônio próprio
          </span>
        </div>
        </article>
      </div>
    </div>
  );
}

export default function PrimoTioSection() {
  return (
    <section
      className="relative w-full overflow-x-clip"
      style={{ background: "#FAEDDD" }}
    >
      {/* Glow sutil de transição vinda da seção anterior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(3,26,40,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1080px] px-5 md:px-8 pt-20 md:pt-20 pb-20 md:pb-24">
        {/* HEADER */}
        <Reveal from="up">
          <header className="text-center max-w-[780px] mx-auto mb-9 md:mb-12">
            <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-[#031a28]/65">
              <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
              Duas pessoas · Dois caminhos
              <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
            </span>
            <h2 className="mt-4 md:mt-5 text-[#031a28] font-semibold leading-[1.12] tracking-[-0.02em] text-[clamp(1.7rem,3.6vw,2.7rem)]">
              Todo mundo conhece essas{" "}
              <em className="not-italic underline decoration-[#031a28]/25 underline-offset-[6px]">
                duas pessoas
              </em>
              .
            </h2>
          </header>
        </Reveal>

        {/* COMPARATIVO — animado com IO */}
        <ComparativeCards />

        {/* ÂNCORA */}
        <Reveal from="up" delay={120}>
          <div className="mt-9 md:mt-12 max-w-[820px] mx-auto">
            <p className="text-[#031a28]/85 text-[16px] md:text-[18px] leading-[1.65]">
              <span className="text-[#031a28] font-semibold">
                O primo tem informação. O tio tem patrimônio.
              </span>{" "}
              Um estuda riqueza. O outro constrói. O tio não pagou pelos imóveis dele — os inquilinos pagaram, o banco financiou, o mercado valorizou.{" "}
              <span className="text-[#031a28] font-semibold">
                O tio entrou com a engenharia — e saiu com os ativos.
              </span>
            </p>
            <p className="mt-5 md:mt-6 text-[#031a28] text-[clamp(1.05rem,1.9vw,1.4rem)] font-semibold leading-[1.35] tracking-[-0.012em]">
              A diferença entre o primo e o tio não é sorte. Não é capital inicial. Não é conhecimento técnico. É{" "}
              <span className="relative inline-block px-1">
                <span className="relative z-10">Engenharia Patrimonial</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 h-[6px] bg-emerald-400/35 -z-0"
                />
              </span>
              .
            </p>
          </div>
        </Reveal>
      </div>

      {/* MOVIMENTO B — Cenário real (DARK NAVY SÓLIDO + orb scroll-driven) */}
      <div
        className="relative w-full"
        style={{ background: "#0a1f33" }}
      >

        {/* Header */}
        <div className="relative mx-auto w-full max-w-[1080px] px-5 md:px-8 pt-16 md:pt-24 pb-6 md:pb-8">
          <Reveal from="up">
            <header className="max-w-[860px] mx-auto text-center">
              <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-300/85">
                <span aria-hidden className="block h-px w-7 bg-emerald-300/40" />
                Cenário real · O teste
                <span aria-hidden className="block h-px w-7 bg-emerald-300/40" />
              </span>
              <h3 className="mt-4 text-white font-semibold leading-[1.14] tracking-[-0.018em] text-[clamp(1.5rem,3vw,2.25rem)]">
                Quando o mercado despenca, o primo perde o sono.{" "}
                <span className="text-white/55 font-medium">
                  O tio nem fica sabendo.
                </span>
              </h3>
              <p className="mt-4 md:mt-5 text-white/60 text-[14px] md:text-[15.5px] leading-[1.6] max-w-[620px] mx-auto">
                Role devagar — você vai{" "}
                <span className="text-emerald-300 font-semibold">ver o ativo passar por cima</span>{" "}
                de uma notícia real.
              </p>
            </header>
          </Reveal>
        </div>

        {/* SCROLL OVERLAY STAGE */}
        <ScenarioStage />

        {/* Texto integrado abaixo, em dark */}
        <div className="relative mx-auto w-full max-w-[1080px] px-5 md:px-8 pt-2 md:pt-6 pb-16 md:pb-24">
          <Reveal from="up">
            <div className="max-w-[760px] mx-auto space-y-5 text-white/80 text-[15px] md:text-[16.5px] leading-[1.75]">
              <p>
                Quando o{" "}
                <span className="font-semibold text-white">
                  Banco Master quebrou com R$ 47 bilhões em CDBs
                </span>
                , o primo perdeu o sono. O tio estava viajando com a renda dos aluguéis. Quando 6 instituições financeiras foram liquidadas pelo BC em 6 meses, o primo perguntou:{" "}
                <em className="not-italic text-white/65">
                  "será que meus investimentos estão seguros?"
                </em>{" "}
                O tio recebeu o depósito no{" "}
                <span className="font-semibold text-emerald-300">dia 5</span>. Como sempre.
              </p>
              <p>
                Investidores que compraram{" "}
                <span className="font-semibold text-white">
                  COEs de Ambipar
                </span>{" "}
                receberam de volta{" "}
                <span className="font-semibold text-[#fca5a5]">6,88%</span> do que investiram. Seis reais e oitenta e oito centavos a cada cem. O tio nunca precisou de assessor.{" "}
                <span className="text-emerald-300 font-semibold">
                  O tio tem escritura.
                </span>
              </p>
            </div>
          </Reveal>
        </div>

      </div>

      {/* MOVIMENTO C — Extrato (cream, interface bancária com counter animado) */}
      <div className="relative mx-auto w-full max-w-[1080px] px-5 md:px-8 pt-14 md:pt-20 pb-12 md:pb-16">
        <Reveal from="up">
          <header className="max-w-[680px] mx-auto text-center mb-7 md:mb-9">
            <p className="text-[#031a28] text-[clamp(1.05rem,2vw,1.35rem)] font-semibold leading-[1.4] tracking-[-0.012em]">
              Imagine receber notificação de depósito no{" "}
              <span className="underline decoration-emerald-500/50 underline-offset-4">
                dia 5 de cada mês
              </span>
              .
            </p>
          </header>
        </Reveal>

        <Reveal from="up" delay={100}>
          <div className="max-w-[640px] mx-auto rounded-[14px] border-[1.5px] border-[#031a28]/20 bg-white/60 backdrop-blur-sm overflow-hidden shadow-[0_18px_44px_-22px_rgba(3,26,40,0.30)]">
            <div className="px-5 md:px-6 py-3 border-b border-[#031a28]/12 bg-[#031a28]/[0.04] flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold text-[#031a28]/80 whitespace-nowrap">
                <span
                  aria-hidden
                  className="block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.65)] animate-pulse"
                />
                Extrato · Dia 5
              </span>
              <span className="hidden sm:inline font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#031a28]/55 whitespace-nowrap">
                sem trabalho · sem assessor
              </span>
            </div>
            {EXTRATO_ROWS.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 md:px-6 py-3.5 border-b border-[#031a28]/10 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-emerald-500/12 text-emerald-700 flex items-center justify-center text-[13px] font-bold ring-1 ring-emerald-500/25">
                    +
                  </span>
                  <span className="text-[#031a28]/85 text-[14.5px] md:text-[15px]">
                    {row.label}
                  </span>
                </div>
                <span className="text-[#031a28] font-semibold tabular-nums text-[15px] md:text-[16px]">
                  {row.display}
                </span>
              </div>
            ))}
            {/* Total — destacado com counter animado */}
            <div className="flex items-center justify-between px-5 md:px-6 py-4 bg-[#031a28] text-[#FAEDDD]">
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.8} />
                Total · dia 5
              </span>
              <CountUp
                target={18300}
                prefix="R$ "
                suffix="+"
                duration={1600}
                className="font-bold tabular-nums text-[16px] md:text-[18px] text-emerald-300"
              />
            </div>
          </div>
        </Reveal>

        <Reveal from="up" delay={200}>
          <p className="mt-5 text-[#031a28]/65 text-[13px] md:text-[14px] leading-[1.6] text-center max-w-[520px] mx-auto">
            Tudo caindo na conta sem você ter trabalhado por esse dinheiro naquele mês.
          </p>
        </Reveal>
      </div>

      {/* MOVIMENTO D — Cena de vida */}
      <div className="relative mx-auto w-full max-w-[760px] px-5 md:px-8 pb-16 md:pb-20">
        <div className="space-y-5 md:space-y-6">
          <Reveal from="up">
            <p className="text-[#031a28]/85 text-[17px] md:text-[19px] leading-[1.7]">
              <span className="text-[#031a28] font-semibold">
                Quinta-feira, 15h.
              </span>{" "}
              Você está no consultório, no escritório, na empresa — porque{" "}
              <em className="not-italic text-[#031a28] font-medium">quer</em>, não porque{" "}
              <em className="not-italic text-[#031a28] font-medium">precisa</em>.
            </p>
          </Reveal>
          <Reveal from="up" delay={100}>
            <p className="text-[#031a28]/85 text-[17px] md:text-[19px] leading-[1.7]">
              <span className="text-[#031a28] font-semibold">
                Sábado de manhã
              </span>
              , seus filhos estão brincando e você sabe que a escola deles está paga até o final do contrato — pelos ativos, não pelo seu suor.
            </p>
          </Reveal>
          <Reveal from="up" delay={180}>
            <p className="pt-4 border-t border-[#031a28]/15 text-[#031a28]/75 text-[15px] md:text-[16.5px] leading-[1.65]">
              Isso não é fantasia. É a rotina de centenas de famílias que aplicaram{" "}
              <span className="text-[#031a28] font-semibold">
                Engenharia Patrimonial
              </span>
              .
            </p>
          </Reveal>
        </div>
      </div>

      {/* MOVIMENTO E — CTA dark */}
      <div className="relative mx-auto w-full max-w-[1080px] px-0 sm:px-5 md:px-8 pb-20 md:pb-24">
        <Reveal from="up">
          <div
            className="w-full sm:max-w-[820px] sm:mx-auto rounded-none sm:rounded-2xl px-5 sm:px-8 md:px-12 py-12 md:py-16 text-center sm:shadow-[0_24px_60px_-24px_rgba(3,26,40,0.55)]"
            style={{
              background: "linear-gradient(180deg, #042234 0%, #021b28 100%)",
            }}
          >
            <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] font-bold text-white/55 mb-5 md:mb-6">
              A pergunta
            </p>
            <p className="text-white text-[clamp(1.3rem,2.5vw,1.75rem)] font-semibold leading-[1.4] tracking-[-0.01em] max-w-[640px] mx-auto">
              Você está no caminho do{" "}
              <span className="text-white/55 line-through decoration-[#b9352a]/80">
                primo
              </span>
              {" "}— ou no caminho do{" "}
              <span className="text-emerald-300 underline decoration-emerald-300/50 underline-offset-4">
                tio
              </span>
              ?
            </p>

            <div className="mt-9 md:mt-10 mx-auto max-w-[440px] relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 rounded-full blur-2xl opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(250,237,221,0.45), rgba(250,237,221,0.15) 50%, transparent 75%)",
                }}
              />
              <div className="relative">
                <PillButton
                  label="Quero sair do caminho do primo — R$97"
                  variant="gold"
                  size="lg"
                  fullWidth
                />
              </div>
            </div>
            <p className="mt-5 text-white/65 text-[13px] md:text-[14px] tracking-wide">
              5 noites ao vivo. Garantia de 30 dias. Risco zero.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
