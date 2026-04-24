import { useEffect, useRef, useState } from "react";

const BLOCOS = [
  {
    showHeader: true,
    eyebrow: "Princípio 1",
    title: "Use o dinheiro dos outros.",
    sub: "(Alavancagem)",
    body:
      "Você compra um imóvel de R$500 mil. Dá R$150 mil de entrada. O banco financia o resto. O inquilino paga R$3.500/mês de aluguel — que paga a parcela. Em 15 anos, o imóvel é seu. Quitado. Quem pagou? O inquilino. Não você.",
  },
  {
    showHeader: true,
    eyebrow: "Princípio 2",
    title: "Compre na hora certa, do jeito certo.",
    sub: "(Arbitragem)",
    body:
      "Quando você compra no leilão um imóvel por R$600 mil que vale R$1 milhão, você criou R$400 mil de patrimônio no ato. Sem esperar. Sem sorte. Só por saber onde comprar e como estruturar.",
  },
  {
    showHeader: false,
    eyebrow: "Combinação",
    title: "Alavancagem + Arbitragem com a engenharia certa.",
    sub: "",
    body:
      "Quando você combina alavancagem e arbitragem com a engenharia certa, você não paga pelos ativos que constrói. Você alavanca. Você posiciona o seu dinheiro na etapa de originação! (Grava essa palavra.)",
  },
  {
    showHeader: false,
    eyebrow: "Originação",
    title: "A zona onde o dinheiro de verdade é criado.",
    sub: "",
    body:
      "Originação é a zona onde o dinheiro de verdade é criado, não só onde ele é revendido com margem. O sistema financeiro funciona como uma pirâmide, onde quem compra produtos financia quem gera riqueza de verdade.",
  },
  {
    showHeader: false,
    eyebrow: "Método",
    title: "Eu sistematizei isso.",
    sub: "",
    body:
      "Eu sistematizei isso depois de +3.215 reuniões, 100+ ativos pessoais e R$3 bilhões sob aconselhamento. Não inventei — organizei o que os tios fazem por instinto há décadas.",
  },
];

export default function EngenhariaPrincipiosSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const passed = -rect.top;
      const p = Math.min(1, Math.max(0, passed / Math.max(1, total)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Hourglass fill: areia desce de cima pra baixo conforme progress (0..1)
  const topFill = 1 - progress; // proporção que ainda está em cima
  const bottomFill = progress;

  return (
    <section
      ref={wrapperRef}
      className="relative w-full"
      style={{
        background: "#031a28",
        // grid de quadrados
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        // Altura grande para permitir scroll
        minHeight: "260vh",
      }}
    >
      {/* gradiente sutil nas bordas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,193,77,0.08), transparent 55%), linear-gradient(180deg, rgba(3,26,40,0.6), transparent 20%, transparent 80%, rgba(3,26,40,0.6))",
        }}
      />

      <div className="sticky top-0 h-screen flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
            {/* COLUNA ESQUERDA — título fixo + lista empilhada */}
            <div className="text-white">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                Engenharia Patrimonial
              </span>
              <h2 className="mt-5 font-semibold leading-[1.05] tracking-[-0.02em] text-[clamp(1.8rem,3.6vw,3rem)]">
                A Engenharia Patrimonial funciona com{" "}
                <span style={{ color: "#FFC14D" }}>dois princípios.</span>
              </h2>

              {/* Lista empilhada — cada bloco surge mas permanece visível */}
              <div className="mt-8 md:mt-10 flex flex-col gap-5 md:gap-6 max-h-[62vh] overflow-hidden pr-2">
                {BLOCOS.map((b, i) => {
                  const slice = 1 / BLOCOS.length;
                  const start = i * slice;
                  const local = Math.min(
                    1,
                    Math.max(0, (progress - start) / slice)
                  );
                  const translateY = (1 - local) * 24;
                  return (
                    <div
                      key={i}
                      style={{
                        opacity: 0.15 + local * 0.85,
                        transform: `translateY(${translateY}px)`,
                        transition:
                          "opacity 0.4s ease-out, transform 0.4s ease-out",
                      }}
                    >
                      <div className="text-[#FFC14D] uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-semibold">
                        {b.eyebrow}
                      </div>
                      <h3 className="mt-1.5 font-semibold text-white text-[15px] md:text-[17px] leading-[1.3] tracking-[-0.01em]">
                        {b.title}{" "}
                        {b.sub && (
                          <span className="text-white/60 font-normal italic">
                            {b.sub}
                          </span>
                        )}
                      </h3>
                      <p className="mt-1.5 text-white/70 text-[13px] md:text-[14px] leading-[1.5] max-w-[560px]">
                        {b.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLUNA DIREITA — Ampulheta arredondada, alinhada à direita */}
            <div className="flex justify-end">
              <Hourglass topFill={topFill} bottomFill={bottomFill} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hourglass({
  topFill,
  bottomFill,
}: {
  topFill: number;
  bottomFill: number;
}) {
  // Ampulheta arredondada — bulbos formados por curvas Bezier.
  // viewBox 200x340. Bulbo superior y: 20 → 160 (gargalo). Bulbo inferior: 160 → 300.
  // Areia no topo drena pela parte superior; nível desce de y=20 até y=160.
  const topY = 20 + (1 - topFill) * 140;
  const bottomY = 300 - bottomFill * 140;

  // Path arredondado bulbo superior (vidro)
  const topBulb =
    "M 30 20 L 170 20 C 170 70, 130 110, 105 155 C 102 159, 98 159, 95 155 C 70 110, 30 70, 30 20 Z";
  // Path arredondado bulbo inferior
  const bottomBulb =
    "M 95 165 C 98 161, 102 161, 105 165 C 130 210, 170 250, 170 300 L 30 300 C 30 250, 70 210, 95 165 Z";

  return (
    <div className="relative">
      <svg
        viewBox="0 0 200 340"
        width="260"
        height="442"
        className="drop-shadow-[0_20px_40px_rgba(255,193,77,0.18)]"
      >
        <defs>
          <clipPath id="topBulb">
            <path d={topBulb} />
          </clipPath>
          <clipPath id="bottomBulb">
            <path d={bottomBulb} />
          </clipPath>
          <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD27A" />
            <stop offset="100%" stopColor="#FFC14D" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        {/* Tampas arredondadas */}
        <rect x="14" y="8" width="172" height="14" rx="7" fill="#0b2a3d" stroke="#FFC14D" strokeWidth="1.5" />
        <rect x="14" y="306" width="172" height="14" rx="7" fill="#0b2a3d" stroke="#FFC14D" strokeWidth="1.5" />

        {/* Vidro */}
        <path d={topBulb} fill="url(#glass)" stroke="#FFC14D" strokeWidth="1.5" />
        <path d={bottomBulb} fill="url(#glass)" stroke="#FFC14D" strokeWidth="1.5" />

        {/* Areia bulbo superior */}
        <g clipPath="url(#topBulb)">
          <rect x="0" y={topY} width="200" height={160 - topY} fill="url(#sand)" />
        </g>

        {/* Fluxo central */}
        {topFill > 0.001 && bottomFill < 0.999 && (
          <rect x="98.5" y="155" width="3" height="14" fill="#FFC14D">
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </rect>
        )}

        {/* Areia bulbo inferior */}
        <g clipPath="url(#bottomBulb)">
          <rect x="0" y={bottomY} width="200" height={300 - bottomY} fill="url(#sand)" />
        </g>

        {/* Brilho lateral */}
        <path
          d="M 38 28 C 40 70, 70 105, 92 150"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 92 178 C 70 220, 40 258, 38 298"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="mt-4 text-right text-white/50 text-[11px] uppercase tracking-[0.2em] pr-2">
        Originação → Distribuição
      </div>
    </div>
  );
}