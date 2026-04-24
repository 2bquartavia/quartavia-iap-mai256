import { useEffect, useRef, useState } from "react";
import PillButton from "@/components/PillButton";

const BLOCOS = [
  {
    showHeader: true,
    eyebrow: "1ª Noite",
    title: "Infraestrutura Patrimonial",
    sub: "",
    body:
      "Por que você está preso no caminho do primo — e qual é o Quarto Caminho que não passa pelo mercado financeiro. Os 3 princípios que todo bilionário usa para construir fortuna sem ter que pagar por isso.",
  },
  {
    showHeader: true,
    eyebrow: "2ª Noite",
    title: "Mapa da Renda Passiva",
    sub: "",
    body:
      "Os 3 motores financeiros que você já tem (e provavelmente só usa 1). Você vai mapear o gap. A sequência lógica de mecanismos que você precisa para construir liberdade em anos, não em décadas.",
  },
  {
    showHeader: true,
    eyebrow: "3ª Noite",
    title: "Arsenal de Mecanismos",
    sub: "",
    body:
      "Você vai entender qual o papel de cada estratégia na Engenharia Patrimonial. E o mais importante de tudo, como pessoas fazem isso sem ter que aprender e sem correr riscos amadores fazendo sozinho. Comprar imóveis com desconto em leilão, construir casas de alto padrão com financiamento, instalar usinas solares que se pagam, comprar imóveis financiados nos Estados Unidos.",
  },
  {
    showHeader: true,
    eyebrow: "4ª Noite",
    title: "Mercados Milenares",
    sub: "",
    body:
      "Imobiliário, agro, energia. Os mercados onde o tio ganha dinheiro enquanto o primo perde o sono. Você vai entender exatamente onde o seu dinheiro deve estar para crescer na velocidade que ele realmente pode — e não a que o sistema determina como lei da natureza. (Zona de originação, lembra?)",
  },
  {
    showHeader: true,
    eyebrow: "5ª Noite",
    title: "Mecanismo de Alavancagem",
    sub: "",
    body:
      "Como usar crédito, capacidade de pagamento e capital de terceiros pra adquirir ativos sem tirar dinheiro do bolso. 1) Como usar alavancagem para comprar imóveis pagos por inquilinos. 2) Como usar os seus imóveis quitados para levantar capital. (Você pode transformar um imóvel quitado em 3 sem ter que vender.)",
  },
];

export default function CincoNoitesSection() {
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

  const topFill = 1 - progress;
  const bottomFill = progress;

  return (
    <section
      ref={wrapperRef}
      className="relative w-full"
      style={{
        background: "#031a28",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        minHeight: "260vh",
      }}
    >
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
            <div className="text-white">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                Imersão · 5 noites ao vivo
              </span>
              <h2 className="mt-5 font-semibold leading-[1.05] tracking-[-0.02em] text-[clamp(1.8rem,3.6vw,3rem)]">
                Em 5 noites, eu entrego essa engenharia.{" "}
                <span style={{ color: "#FFC14D" }}>
                  Uma alavanca por noite.
                </span>
              </h2>

              <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-5 pr-2">
                {BLOCOS.map((b, i) => {
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
                            {b.title}
                            {b.sub && (
                              <span className="text-white/60 font-normal italic">
                                {" "}
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

                {/* CTA final dentro do reveal */}
                <div
                  style={{
                    opacity: progress > 0.85 ? 1 : 0.15,
                    transform: `translateY(${progress > 0.85 ? 0 : 24}px)`,
                    transition:
                      "opacity 0.4s ease-out, transform 0.4s ease-out",
                  }}
                  className="mt-3"
                >
                  <p className="text-white/70 text-[13px] md:text-[14px] leading-[1.55] max-w-[560px]">
                    Cada noite ao vivo. 20h. Com Adrian. Você entende, pergunta e implementa.
                  </p>
                  <div className="mt-4">
                    <PillButton
                      label="Entrar nas 5 noites — R$97"
                      variant="gold"
                      size="md"
                    />
                  </div>
                  <p className="mt-3 text-white/50 text-[12px]">
                    Garantia de 30 dias + Garantia da Quarta-feira. Risco zero.
                  </p>
                </div>
              </div>
            </div>

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
  const topY = 20 + (1 - topFill) * 140;
  const bottomY = 300 - bottomFill * 140;

  const topBulb =
    "M 30 20 L 170 20 C 170 70, 130 110, 105 155 C 102 159, 98 159, 95 155 C 70 110, 30 70, 30 20 Z";
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
          <clipPath id="topBulbCN">
            <path d={topBulb} />
          </clipPath>
          <clipPath id="bottomBulbCN">
            <path d={bottomBulb} />
          </clipPath>
          <linearGradient id="sandCN" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD27A" />
            <stop offset="100%" stopColor="#FFC14D" />
          </linearGradient>
          <linearGradient id="glassCN" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        <rect x="14" y="8" width="172" height="14" rx="7" fill="#0b2a3d" stroke="#FFC14D" strokeWidth="1.5" />
        <rect x="14" y="306" width="172" height="14" rx="7" fill="#0b2a3d" stroke="#FFC14D" strokeWidth="1.5" />

        <path d={topBulb} fill="url(#glassCN)" stroke="#FFC14D" strokeWidth="1.5" />
        <path d={bottomBulb} fill="url(#glassCN)" stroke="#FFC14D" strokeWidth="1.5" />

        <g clipPath="url(#topBulbCN)">
          <rect x="0" y={topY} width="200" height={160 - topY} fill="url(#sandCN)" />
        </g>

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

        <g clipPath="url(#bottomBulbCN)">
          <rect x="0" y={bottomY} width="200" height={300 - bottomY} fill="url(#sandCN)" />
        </g>

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
        5 noites · 1 alavanca por noite
      </div>
    </div>
  );
}