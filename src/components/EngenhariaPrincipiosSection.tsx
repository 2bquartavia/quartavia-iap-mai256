import { useEffect, useRef, useState } from "react";
import { Landmark, Gavel, Coins, Building2, Clock, Home, Scale } from "lucide-react";

const BLOCOS = [
  {
    showHeader: true,
    eyebrow: "Princípio 1",
    title: "Use o dinheiro dos outros.",
    sub: "(Alavancagem)",
    body:
      "Você compra um imóvel de R$500 mil. Dá R$150 mil de entrada. O banco financia o resto. O inquilino paga R$3.500/mês de aluguel — que paga a parcela. Em 15 anos, o imóvel é seu. Quitado. Quem pagou? O inquilino. Não você.",
    Icon: Landmark,
  },
  {
    showHeader: true,
    eyebrow: "Princípio 2",
    title: "Compre na hora certa, do jeito certo.",
    sub: "(Arbitragem)",
    body:
      "Quando você compra no leilão um imóvel por R$600 mil que vale R$1 milhão, você criou R$400 mil de patrimônio no ato. Sem esperar. Sem sorte. Só por saber onde comprar e como estruturar.",
    Icon: Gavel,
  },
  {
    showHeader: false,
    eyebrow: "Combinação",
    title: "Alavancagem + Arbitragem com a engenharia certa.",
    sub: "",
    body:
      "Quando você combina alavancagem e arbitragem com a engenharia certa, você não paga pelos ativos que constrói. Você alavanca. Você posiciona o seu dinheiro na etapa de originação! (Grava essa palavra.)",
    Icon: Scale,
  },
  {
    showHeader: false,
    eyebrow: "Originação",
    title: "A zona onde o dinheiro de verdade é criado.",
    sub: "",
    body:
      "Originação é a zona onde o dinheiro de verdade é criado, não só onde ele é revendido com margem. O sistema financeiro funciona como uma pirâmide, onde quem compra produtos financia quem gera riqueza de verdade.",
    Icon: Coins,
  },
  {
    showHeader: false,
    eyebrow: "Método",
    title: "Eu sistematizei isso.",
    sub: "",
    body:
      "Eu sistematizei isso depois de +3.215 reuniões, 100+ ativos pessoais e R$3 bilhões sob aconselhamento. Não inventei — organizei o que os tios fazem por instinto há décadas.",
    Icon: Clock,
  },
];

export default function EngenhariaPrincipiosSection() {
  return (
    <section
      className="relative w-full"
      style={{
        background: "#031a28",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
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

      <div className="relative mx-auto w-full max-w-[860px] px-5 md:px-8 py-20 md:py-28 text-center">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
          Engenharia Patrimonial
        </span>
        <h2 className="mt-5 font-semibold leading-[1.05] tracking-[-0.02em] text-white text-[clamp(1.8rem,3.6vw,3rem)]">
          A Engenharia Patrimonial funciona com{" "}
          <span style={{ color: "#FFC14D" }}>dois princípios.</span>
        </h2>

        <div className="mt-10 md:mt-14 flex flex-col gap-5 md:gap-6 text-left">
          {BLOCOS.map((b, i) => {
            const isOrange = i % 2 === 0;
            const bg = isOrange ? "#cc7514" : "#031a28";
            const border = isOrange ? "rgba(255,255,255,0.18)" : "rgba(255,193,77,0.35)";
            const eyebrowColor = isOrange ? "#FFE6B8" : "#FFC14D";
            const Icon = b.Icon;
            return (
              <article
                key={i}
                className="rounded-2xl p-5 md:p-7 flex gap-4 md:gap-5 items-start"
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="shrink-0 rounded-xl flex items-center justify-center"
                  style={{
                    width: 48,
                    height: 48,
                    background: isOrange
                      ? "rgba(3,26,40,0.25)"
                      : "rgba(204,117,20,0.18)",
                    color: isOrange ? "#fff" : "#FFC14D",
                  }}
                >
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  {b.showHeader ? (
                    <>
                      <div
                        className="uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-semibold"
                        style={{ color: eyebrowColor }}
                      >
                        {b.eyebrow}
                      </div>
                      <h3 className="mt-1.5 font-semibold text-white text-[15px] md:text-[17px] leading-[1.3] tracking-[-0.01em]">
                        {b.title}{" "}
                        {b.sub && (
                          <span className="text-white/70 font-normal italic">
                            {b.sub}
                          </span>
                        )}
                      </h3>
                      <p className="mt-2 text-white/85 text-[13px] md:text-[14px] leading-[1.6]">
                        {b.body}
                      </p>
                    </>
                  ) : (
                    <p className="text-white/90 text-[13px] md:text-[14px] leading-[1.6]">
                      {b.body}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Fade-out gradient overlay no fim da dobra cobrindo os retângulos */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 bottom-0"
          style={{
            height: "260px",
            background:
              "linear-gradient(180deg, rgba(3,26,40,0) 0%, rgba(3,26,40,0.85) 60%, #031a28 100%)",
          }}
        />
      </div>
    </section>
  );
}

function _UnusedHourglass({ topFill, bottomFill }: { topFill: number; bottomFill: number }) {
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