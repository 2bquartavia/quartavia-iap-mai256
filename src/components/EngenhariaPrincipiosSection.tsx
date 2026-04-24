import { useEffect, useRef, useState } from "react";

const BLOCOS = [
  {
    eyebrow: "Princípio 1",
    title: "Use o dinheiro dos outros.",
    sub: "(Alavancagem)",
    body:
      "Você compra um imóvel de R$500 mil. Dá R$150 mil de entrada. O banco financia o resto. O inquilino paga R$3.500/mês de aluguel — que paga a parcela. Em 15 anos, o imóvel é seu. Quitado. Quem pagou? O inquilino. Não você.",
  },
  {
    eyebrow: "Princípio 2",
    title: "Compre na hora certa, do jeito certo.",
    sub: "(Arbitragem)",
    body:
      "Quando você compra no leilão um imóvel por R$600 mil que vale R$1 milhão, você criou R$400 mil de patrimônio no ato. Sem esperar. Sem sorte. Só por saber onde comprar e como estruturar.",
  },
  {
    eyebrow: "Combinação",
    title: "Alavancagem + Arbitragem com a engenharia certa.",
    sub: "",
    body:
      "Você não paga pelos ativos que constrói. Você alavanca. Você posiciona o seu dinheiro na etapa de originação. (Grava essa palavra.)",
  },
  {
    eyebrow: "Originação",
    title: "A zona onde o dinheiro de verdade é criado.",
    sub: "",
    body:
      "Não é onde ele é revendido com margem. O sistema financeiro funciona como uma pirâmide: quem compra produtos financia quem gera riqueza de verdade.",
  },
  {
    eyebrow: "Método",
    title: "Eu sistematizei isso.",
    sub: "",
    body:
      "Depois de +3.215 reuniões, 100+ ativos pessoais e R$3 bilhões sob aconselhamento. Não inventei — organizei o que os tios fazem por instinto há décadas.",
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
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
            {/* COLUNA ESQUERDA — título fixo + texto que surge */}
            <div className="text-white">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                Engenharia Patrimonial
              </span>
              <h2 className="mt-5 font-semibold leading-[1.05] tracking-[-0.02em] text-[clamp(1.8rem,3.6vw,3rem)]">
                A Engenharia Patrimonial funciona com{" "}
                <span style={{ color: "#FFC14D" }}>dois princípios.</span>
              </h2>

              {/* Stack de blocos com efeito de scroll */}
              <div className="relative mt-10 md:mt-12 min-h-[280px]">
                {BLOCOS.map((b, i) => {
                  const slice = 1 / BLOCOS.length;
                  const start = i * slice;
                  const end = start + slice;
                  const local = Math.min(
                    1,
                    Math.max(0, (progress - start) / (end - start))
                  );
                  const translateY = (1 - local) * 40;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0"
                      style={{
                        opacity: local,
                        transform: `translateY(${translateY}px)`,
                        transition:
                          "opacity 0.3s ease-out, transform 0.3s ease-out",
                          pointerEvents: local > 0.5 ? "auto" : "none",
                      }}
                    >
                      <div className="text-[#FFC14D] uppercase tracking-[0.2em] text-[11px] md:text-xs font-semibold">
                        {b.eyebrow}
                      </div>
                      <h3 className="mt-3 font-semibold text-white text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.25] tracking-[-0.01em]">
                        {b.title}{" "}
                        {b.sub && (
                          <span className="text-white/60 font-normal italic">
                            {b.sub}
                          </span>
                        )}
                      </h3>
                      <p className="mt-4 text-white/75 text-[15px] md:text-[17px] leading-[1.6] max-w-[560px]">
                        {b.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLUNA DIREITA — Ampulheta */}
            <div className="flex justify-center">
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
  // SVG ampulheta. Coordenadas viewbox 200x320
  // Bulbo de cima: triângulo invertido com base superior em y=20, ponta em y=160
  // Bulbo de baixo: triângulo com ponta em y=160 e base em y=300
  // Areia desce: a parte cheia do topo encolhe da base; a parte cheia da base cresce a partir da ponta.

  // Topo: clipPath que mantém a parte de baixo (perto da ponta) sempre cheia? Não — areia drena de cima.
  // Convencionalmente, no topo a areia ocupa a parte de baixo do bulbo (próximo ao gargalo) e vai esvaziando pelo topo.
  // Vamos simplificar: o nível da areia no topo desce — então o "preenchimento" começa em y= 20 + (1-topFill)*140 até 160.
  // No fundo: o nível sobe a partir de 300, ou seja, preenchido entre y= 300 - bottomFill*140 e 300.

  const topY = 20 + (1 - topFill) * 140; // topo do líquido superior
  const bottomY = 300 - bottomFill * 140; // topo do líquido inferior

  return (
    <div className="relative">
      <svg
        viewBox="0 0 200 340"
        width="280"
        height="476"
        className="drop-shadow-[0_20px_40px_rgba(255,193,77,0.15)]"
      >
        <defs>
          {/* Clip para o triângulo de cima (invertido) */}
          <clipPath id="topBulb">
            <polygon points="20,20 180,20 100,160" />
          </clipPath>
          {/* Clip para o triângulo de baixo */}
          <clipPath id="bottomBulb">
            <polygon points="100,160 180,300 20,300" />
          </clipPath>
          <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD27A" />
            <stop offset="100%" stopColor="#FFC14D" />
          </linearGradient>
        </defs>

        {/* Tampas */}
        <rect x="10" y="10" width="180" height="12" rx="3" fill="#0b2a3d" stroke="#FFC14D" strokeWidth="1.5" />
        <rect x="10" y="308" width="180" height="12" rx="3" fill="#0b2a3d" stroke="#FFC14D" strokeWidth="1.5" />

        {/* Vidro — contornos dos bulbos */}
        <polygon
          points="20,20 180,20 100,160"
          fill="rgba(255,255,255,0.03)"
          stroke="#FFC14D"
          strokeWidth="1.5"
        />
        <polygon
          points="100,160 180,300 20,300"
          fill="rgba(255,255,255,0.03)"
          stroke="#FFC14D"
          strokeWidth="1.5"
        />

        {/* Areia no bulbo superior */}
        <g clipPath="url(#topBulb)">
          <rect x="0" y={topY} width="200" height={160 - topY} fill="url(#sand)" />
        </g>

        {/* Fluxo central */}
        {topFill > 0.001 && bottomFill < 0.999 && (
          <rect x="98.5" y="155" width="3" height="12" fill="#FFC14D">
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </rect>
        )}

        {/* Areia no bulbo inferior */}
        <g clipPath="url(#bottomBulb)">
          <rect x="0" y={bottomY} width="200" height={300 - bottomY} fill="url(#sand)" />
        </g>

        {/* Hastes laterais */}
        <line x1="20" y1="22" x2="20" y2="308" stroke="#FFC14D" strokeWidth="1" opacity="0.4" />
        <line x1="180" y1="22" x2="180" y2="308" stroke="#FFC14D" strokeWidth="1" opacity="0.4" />
      </svg>

      <div className="mt-4 text-center text-white/50 text-[12px] uppercase tracking-[0.2em]">
        Originação → Distribuição
      </div>
    </div>
  );
}