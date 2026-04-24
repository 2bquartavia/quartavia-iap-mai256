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
              <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-5 pr-2">
                {BLOCOS.map((b, i) => {
                  // Usa apenas 80% do progresso para revelar os blocos —
                  // garante que TUDO esteja 100% visível antes do fim do scroll.
                  const reveal = Math.min(1, progress / 0.8);
                  const slice = 1 / BLOCOS.length;
                  const start = i * slice;
                  const local = Math.min(
                    1,
                    Math.max(0, (reveal - start) / slice)
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
                      {b.showHeader && (
                        <>
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
                        </>
                      )}
                      <p
                        className={`${
                          b.showHeader ? "mt-1.5" : "mt-0"
                        } text-white/75 text-[13px] md:text-[14px] leading-[1.55] max-w-[560px]`}
                      >
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
  // Ampulheta realista — bulbos esféricos em vidro transparente.
  // viewBox 220x380. Bulbo superior: y 30→180. Gargalo y≈180-190. Bulbo inferior: y 190→340.
  // O fluido OBEDECE GRAVIDADE: superfície horizontal sempre no topo do líquido acumulado embaixo.

  // Bulbo superior — topo do líquido sobe da base (y=180) até o topo (y=30) conforme topFill diminui.
  // Aqui invertemos: areia no topo está DRENANDO. topFill = quanto ainda resta no topo.
  // Como a areia drena pelo gargalo (embaixo do bulbo de cima), o que sobra fica na PARTE DE BAIXO do bulbo de cima,
  // com superfície horizontal subindo de baixo pra cima conforme... NÃO. Pensando de novo:
  // No bulbo de cima a areia OCUPA a parte de baixo (próximo ao gargalo). Conforme drena, o nível DESCE.
  // topFill=1 → areia preenche quase todo o bulbo (nível alto, y pequeno).
  // topFill=0 → vazio (nível no fundo do bulbo, y=180).
  const topLevelY = 180 - topFill * 145; // 35 (cheio) → 180 (vazio)

  // Bulbo inferior — areia se acumula na parte de baixo, nível sobe.
  // bottomFill=0 → vazio (nível em y=340). bottomFill=1 → cheio (nível em y=195).
  const bottomLevelY = 340 - bottomFill * 145;

  // Paths dos bulbos — formas esféricas como na referência (foto da ampulheta).
  // Bulbo superior: esfera achatada que afunila no gargalo central.
  const topBulb =
    "M 110 30 C 50 30, 22 70, 22 110 C 22 145, 60 170, 100 184 C 104 186, 106 188, 108 190 L 112 190 C 114 188, 116 186, 120 184 C 160 170, 198 145, 198 110 C 198 70, 170 30, 110 30 Z";
  // Bulbo inferior: espelho do superior.
  const bottomBulb =
    "M 108 190 C 106 192, 104 194, 100 196 C 60 210, 22 235, 22 270 C 22 310, 50 350, 110 350 C 170 350, 198 310, 198 270 C 198 235, 160 210, 120 196 C 116 194, 114 192, 112 190 Z";

  const flowing = topFill > 0.001 && bottomFill < 0.999;

  return (
    <div className="relative">
      <svg
        viewBox="0 0 220 400"
        width="280"
        height="510"
        className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <clipPath id="topBulbClip">
            <path d={topBulb} />
          </clipPath>
          <clipPath id="bottomBulbClip">
            <path d={bottomBulb} />
          </clipPath>

          {/* Areia: tom natural bege/dourado claro como na foto */}
          <linearGradient id="sandFluid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8D9B0" />
            <stop offset="50%" stopColor="#D4BE8A" />
            <stop offset="100%" stopColor="#B89C68" />
          </linearGradient>

          {/* Vidro transparente com leve azulado */}
          <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.10)" />
          </linearGradient>

          {/* Reflexo principal lateral (highlight) */}
          <linearGradient id="glassHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Sombra da areia (top da superfície líquida — leve sombra) */}
          <linearGradient id="sandShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>

        {/* === BULBO SUPERIOR === */}
        {/* Vidro fundo */}
        <path
          d={topBulb}
          fill="url(#glassBody)"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.2"
        />

        {/* Areia dentro do bulbo superior — sempre no FUNDO, superfície horizontal */}
        <g clipPath="url(#topBulbClip)">
          {/* Massa de areia */}
          <rect
            x="0"
            y={topLevelY}
            width="220"
            height={200 - topLevelY}
            fill="url(#sandFluid)"
          />
          {/* Sombra logo abaixo da superfície */}
          <rect
            x="0"
            y={topLevelY}
            width="220"
            height="8"
            fill="url(#sandShade)"
          />
          {/* Linha da superfície (meniscus) */}
          <line
            x1="0"
            y1={topLevelY}
            x2="220"
            y2={topLevelY}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
        </g>

        {/* Highlight de vidro no bulbo superior */}
        <path
          d="M 45 55 C 35 80, 32 110, 42 140"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 50 50 C 60 45, 75 42, 90 42"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* === FLUXO CENTRAL (areia caindo) === */}
        {flowing && (
          <>
            <line
              x1="110"
              y1="186"
              x2="110"
              y2="200"
              stroke="#C8AC78"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </line>
            {/* Pequeno cone de impacto na areia inferior */}
            <ellipse
              cx="110"
              cy={bottomLevelY + 2}
              rx="6"
              ry="2"
              fill="rgba(200,172,120,0.6)"
            >
              <animate
                attributeName="opacity"
                values="0.4;0.9;0.4"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </ellipse>
          </>
        )}

        {/* === BULBO INFERIOR === */}
        <path
          d={bottomBulb}
          fill="url(#glassBody)"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.2"
        />

        {/* Areia no bulbo inferior — sempre no FUNDO, superfície horizontal */}
        <g clipPath="url(#bottomBulbClip)">
          <rect
            x="0"
            y={bottomLevelY}
            width="220"
            height={350 - bottomLevelY}
            fill="url(#sandFluid)"
          />
          {/* Sombra abaixo da superfície */}
          <rect
            x="0"
            y={bottomLevelY}
            width="220"
            height="8"
            fill="url(#sandShade)"
          />
          {/* Linha da superfície */}
          <line
            x1="0"
            y1={bottomLevelY}
            x2="220"
            y2={bottomLevelY}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.6"
          />
        </g>

        {/* Highlight de vidro no bulbo inferior */}
        <path
          d="M 42 235 C 32 265, 35 305, 48 330"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 175 235 C 185 270, 182 305, 170 330"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Reflexo geral de vidro (faixa superior fina nos dois bulbos) */}
        <ellipse cx="80" cy="55" rx="22" ry="6" fill="rgba(255,255,255,0.18)" />
        <ellipse cx="80" cy="220" rx="22" ry="5" fill="rgba(255,255,255,0.12)" />
      </svg>

      <div className="mt-4 text-right text-white/50 text-[11px] uppercase tracking-[0.2em] pr-2">
        Originação → Distribuição
      </div>
    </div>
  );
}