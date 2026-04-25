import type { ReactElement } from "react";
import {
  Check,
  AlertCircle,
  Calendar,
  Clock,
  ShieldCheck,
  Lock,
} from "lucide-react";
import PillButton from "@/components/PillButton";

const INCLUSOS: { nome: string; preco: string }[] = [
  { nome: "As 5 Alavancas, ao vivo com Adrian Carvalho", preco: "R$ 997" },
  { nome: "Caderno de Implementação", preco: "R$ 97" },
  { nome: "Inventário de Mecanismos da Economia Real", preco: "R$ 97" },
  { nome: "Diagnóstico Patrimonial Individual", preco: "R$ 997" },
  { nome: "Biblioteca Confidencial do Quarto Caminho", preco: "INCLUSO" },
  { nome: "Manual Anti-Armadilhas", preco: "INCLUSO" },
];

const VAGAS_TOTAL = 50;
const VAGAS_OCUPADAS = 37;
const VAGAS_RESTANTES = VAGAS_TOTAL - VAGAS_OCUPADAS;
const VAGAS_PCT = (VAGAS_OCUPADAS / VAGAS_TOTAL) * 100;

// Bandeiras como SVG inline (mono-component, sem deps).
// Mantidos os logotipos oficiais com cores; cada um envolto em chip de altura uniforme.
const BRAND_LOGOS: { name: string; svg: ReactElement }[] = [
  {
    name: "Visa",
    svg: (
      <svg viewBox="0 0 50 16" className="h-2.5 md:h-3 w-auto" aria-label="Visa">
        <path
          fill="#1A1F71"
          d="M19.65 15.74h-3.66L18.27 1.06h3.66L19.65 15.74zM33.2 1.42a9.04 9.04 0 0 0-3.27-.6c-3.6 0-6.13 1.92-6.15 4.66-.02 2.03 1.81 3.16 3.2 3.83 1.42.69 1.9 1.13 1.89 1.74-.01.94-1.13 1.37-2.18 1.37-1.46 0-2.23-.21-3.43-.74l-.47-.22-.51 3.13c.85.39 2.43.73 4.07.75 3.83 0 6.31-1.89 6.34-4.82.02-1.6-.96-2.83-3.06-3.83-1.27-.65-2.05-1.08-2.04-1.74 0-.59.66-1.21 2.08-1.21a6.4 6.4 0 0 1 2.72.54l.32.16.49-3.02zM38.11 10.55c.3-.81 1.46-3.94 1.46-3.94-.02.04.3-.83.49-1.36l.25 1.22.85 4.08h-3.05zm4.5-9.5h-2.83c-.88 0-1.53.25-1.92 1.17l-5.43 12.51h3.84l.77-2.13h4.69c.11.5.45 2.13.45 2.13h3.39L42.6 1.06zM12.94 1.06l-3.59 9.99-.39-1.97a11.4 11.4 0 0 0-5.31-6.13l3.27 12.78h3.86L16.61 1.06h-3.67zM5.66 1.06H.16c-.18.95.84 1.42 1.55 1.79.94.5 1.78 1.21 2.45 1.93.59.66 1.05 1.46 1.31 2.34.07.15.15.31.22.49L8.22 16h3.86L7.45 1.06H5.66z"
        />
      </svg>
    ),
  },
  {
    name: "Mastercard",
    svg: (
      <svg viewBox="0 0 36 22" className="h-4 md:h-[18px] w-auto" aria-label="Mastercard">
        <circle cx="13" cy="11" r="9" fill="#EB001B" />
        <circle cx="23" cy="11" r="9" fill="#F79E1B" />
        <path
          fill="#FF5F00"
          d="M18 4.18a8.97 8.97 0 0 1 0 13.64 8.97 8.97 0 0 1 0-13.64z"
        />
      </svg>
    ),
  },
  {
    name: "Elo",
    svg: (
      <svg viewBox="0 0 40 22" className="h-3 md:h-[14px] w-auto" aria-label="Elo">
        <circle cx="20" cy="11" r="11" fill="#000" />
        <circle cx="14" cy="11" r="3" fill="#FFCB05" />
        <path d="M14 8.5a2.5 2.5 0 0 1 2.4 1.8l2.4-.7A5 5 0 0 0 14 6v2.5z" fill="#EB1F26" />
        <path d="M14 13.5a2.5 2.5 0 0 1-2.4-1.8l-2.4.7A5 5 0 0 0 14 16v-2.5z" fill="#00A4E0" />
        <text x="22" y="15" fill="#FFF" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="-0.5">elo</text>
      </svg>
    ),
  },
  {
    name: "Amex",
    svg: (
      <svg viewBox="0 0 36 22" className="h-4 md:h-[18px] w-auto" aria-label="American Express">
        <rect width="36" height="22" rx="2" fill="#2E77BC" />
        <text
          x="18"
          y="13.5"
          textAnchor="middle"
          fill="#FFF"
          fontSize="6.4"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          letterSpacing="0.4"
        >
          AMERICAN
        </text>
        <text
          x="18"
          y="19.5"
          textAnchor="middle"
          fill="#FFF"
          fontSize="6.4"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          letterSpacing="0.4"
        >
          EXPRESS
        </text>
      </svg>
    ),
  },
  {
    name: "Hipercard",
    svg: (
      <svg viewBox="0 0 50 22" className="h-4 md:h-[18px] w-auto" aria-label="Hipercard">
        <rect width="50" height="22" rx="2" fill="#B3131B" />
        <text
          x="25"
          y="15"
          textAnchor="middle"
          fill="#FFF"
          fontSize="9"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          letterSpacing="-0.3"
        >
          Hipercard
        </text>
      </svg>
    ),
  },
  {
    name: "Pix",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 md:h-[18px] w-auto" aria-label="Pix">
        <path
          fill="#32BCAD"
          d="M5.283 18.36a3.5 3.5 0 0 0 2.484-1.03l3.535-3.536a.667.667 0 0 1 .942 0l3.535 3.535a3.5 3.5 0 0 0 2.485 1.03h.692L14.5 22.825a3.5 3.5 0 0 1-4.95 0L5.092 18.36zm0-12.72a3.5 3.5 0 0 1 2.484 1.03l3.535 3.535a.667.667 0 0 0 .942 0l3.535-3.535a3.5 3.5 0 0 1 2.485-1.03h.692L14.5 1.175a3.5 3.5 0 0 0-4.95 0L5.092 5.64zm17.382 4.85L19.79 7.81a.5.5 0 0 1-.166.034h-1.4a2.5 2.5 0 0 0-1.768.732l-3.536 3.535a1.667 1.667 0 0 1-2.358 0L7.026 8.575a2.5 2.5 0 0 0-1.768-.732H3.62a.5.5 0 0 1-.166-.034L.535 10.49a3.5 3.5 0 0 0 0 4.95l2.92 2.683a.5.5 0 0 1 .166-.034h1.638a2.5 2.5 0 0 0 1.768-.732l3.535-3.535a1.667 1.667 0 0 1 2.358 0l3.536 3.535a2.5 2.5 0 0 0 1.768.732h1.4a.5.5 0 0 1 .166.034l2.875-2.875a3.5 3.5 0 0 0 0-4.95z"
        />
      </svg>
    ),
  },
];

export default function InvestimentoSection() {
  return (
    <section
      className="relative w-full"
      style={{ background: "#FAEDDD" }}
    >
      {/* Glow sutil topo — transição visual com a dobra escura anterior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[260px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(3,26,40,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10 py-14 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-10 items-stretch">
          {/* Esquerda — título + lista */}
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-[#031a28]/65">
              <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
              Resumo da oferta
            </span>
            <h2
              className="mt-3 md:mt-4 font-semibold text-[#031a28] leading-[1.05] tracking-[-0.02em] text-[clamp(1.85rem,6.2vw,3.4rem)]"
              style={{
                fontFamily:
                  '"Source Serif 4", "Source Serif Pro", Georgia, serif',
              }}
            >
              <span className="block">O que você recebe</span>
              <span className="block">
                por <span style={{ color: "#b9352a" }}>R$ 97</span>
              </span>
            </h2>
            <ul className="mt-6 md:mt-8 divide-y divide-[#031a28]/12">
              {INCLUSOS.map((item) => (
                <li
                  key={item.nome}
                  className="flex items-start gap-2.5 md:gap-4 py-3 md:py-5"
                >
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFC14D]/20 text-[#b9352a] ring-1 ring-[#FFC14D]/45">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <div className="flex-1 flex items-baseline justify-between gap-2 md:gap-4">
                    <span className="text-[#031a28] text-[14px] md:text-[17px] leading-snug font-medium">
                      {item.nome}
                    </span>
                    <span
                      className={`font-mono text-[11px] md:text-[13px] font-bold uppercase tracking-[0.14em] md:tracking-[0.16em] whitespace-nowrap shrink-0 ${
                        item.preco === "INCLUSO"
                          ? "text-[#b9352a]"
                          : "text-[#031a28]/55 line-through decoration-[#031a28]/45 decoration-[1.5px]"
                      }`}
                    >
                      {item.preco}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* TICKET — direita · card moderno (sem backdrop-filter — pesado em mobile) */}
          <aside className="md:col-span-5">
            <div className="relative h-full">
              {/* Card sólido — gradient sutil dá profundidade sem custo de GPU */}
              <div
                className="relative h-full rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #fdf9f3 100%)",
                  boxShadow:
                    "0 30px 80px -30px rgba(3,26,40,0.32), 0 10px 30px -10px rgba(3,26,40,0.16), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                {/* Header minimal — brand + serial */}
                <div className="px-5 md:px-7 pt-5 md:pt-6 flex items-center justify-between gap-2">
                  <span className="font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.22em] font-semibold text-[#031a28]/55 truncate">
                    Imersão · Alavanca Patrimonial
                  </span>
                  <span className="font-mono text-[9px] md:text-[10px] tabular-nums tracking-[0.18em] font-semibold text-[#031a28]/35 shrink-0">
                    #{String(VAGAS_OCUPADAS + 1).padStart(3, "0")}/050
                  </span>
                </div>

                {/* Hero do preço */}
                <div className="px-5 md:px-7 pt-4 md:pt-5">
                  <p className="font-mono text-[12px] md:text-[13px] tabular-nums text-[#031a28]/40 line-through decoration-[#031a28]/30 decoration-[1.5px]">
                    R$ 2.188
                  </p>
                  <p
                    className="mt-1 font-semibold text-[#031a28] leading-[0.95] tracking-[-0.035em] text-[clamp(3rem,11vw,5rem)]"
                    style={{
                      fontFamily:
                        '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                    }}
                  >
                    R$ 97
                  </p>
                  <p className="mt-2.5 text-[#031a28]/65 text-[12.5px] md:text-[13.5px] font-medium">
                    Pagamento único{" "}
                    <span className="mx-1.5 opacity-40">·</span> Sem assinatura
                  </p>
                </div>

                {/* Hairline gradient divisor */}
                <div
                  className="mx-5 md:mx-7 mt-5 md:mt-6 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(3,26,40,0.18) 50%, transparent 100%)",
                  }}
                />

                {/* Vagas restantes — barra de progresso glass */}
                <div className="px-5 md:px-7 pt-4 md:pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] md:text-[12px] font-semibold text-[#031a28]/85">
                      <AlertCircle
                        className="h-3.5 w-3.5 text-[#b9352a]"
                        strokeWidth={2.5}
                      />
                      Vagas restantes
                    </span>
                    <span className="font-mono text-[10.5px] md:text-[11px] font-bold tabular-nums text-[#031a28]/65">
                      {VAGAS_OCUPADAS}<span className="opacity-40">/{VAGAS_TOTAL}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full overflow-hidden bg-[#031a28]/[0.08]">
                    <div
                      className="h-full rounded-full relative"
                      style={{
                        width: `${VAGAS_PCT}%`,
                        background:
                          "linear-gradient(90deg, #b9352a 0%, #e6804a 70%, #FFC14D 100%)",
                        boxShadow: "0 0 12px -2px rgba(185,53,42,0.45)",
                      }}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                          animation: "vagasShimmer 2.6s ease-in-out infinite",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Meta grid — Data/Horário/Formato em hairlines */}
                <div className="px-5 md:px-7 pt-5 md:pt-6">
                  <div className="grid grid-cols-3 rounded-2xl bg-white/40 ring-1 ring-[#031a28]/08 overflow-hidden">
                    {[
                      { label: "Data", value: "25–29 mai" },
                      { label: "Horário", value: "20h" },
                      { label: "Formato", value: "5 noites" },
                    ].map((m, i) => (
                      <div
                        key={m.label}
                        className={`flex flex-col items-center justify-center gap-0.5 py-2.5 md:py-3 ${
                          i > 0 ? "border-l border-[#031a28]/10" : ""
                        }`}
                      >
                        <span className="font-mono text-[8.5px] md:text-[9px] uppercase tracking-[0.2em] font-semibold text-[#031a28]/45">
                          {m.label}
                        </span>
                        <span className="text-[#031a28] text-[12.5px] md:text-[13.5px] font-semibold tabular-nums tracking-tight whitespace-nowrap">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA — split layout (texto esquerda, ícone direita) */}
                <div className="px-5 md:px-7 pt-5 md:pt-6">
                  <PillButton
                    label="Garantir minha vaga"
                    variant="dark"
                    size="lg"
                    className="pill-btn--full-split"
                  />
                  <p className="mt-3 inline-flex items-center justify-center gap-1.5 w-full text-[#031a28]/65 text-[12px] md:text-[13px]">
                    <ShieldCheck
                      className="h-3.5 w-3.5 text-emerald-600"
                      strokeWidth={2.4}
                    />
                    Garantia de 30 dias{" "}
                    <span className="opacity-40 mx-1">·</span> Risco zero
                  </p>
                </div>

                {/* Bandeiras de pagamento — logos SVG centralizados */}
                <div className="px-5 md:px-7 pb-5 md:pb-7 pt-5 md:pt-6 mt-auto">
                  <div className="flex items-center justify-center gap-1.5 mb-3">
                    <Lock
                      className="h-3 w-3 text-[#031a28]/45"
                      strokeWidth={2.4}
                    />
                    <span className="font-mono text-[9px] md:text-[9.5px] uppercase tracking-[0.22em] font-semibold text-[#031a28]/45">
                      Pagamento seguro · SSL
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3 md:gap-3.5 flex-wrap opacity-80">
                    {BRAND_LOGOS.map(({ name, svg }) => (
                      <span
                        key={name}
                        className="inline-flex items-center"
                        title={name}
                      >
                        {svg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Rodapé — stat strip com ícones + dot separators (sem pílulas) */}
        <div className="mt-10 md:mt-12 flex items-center justify-center gap-x-4 md:gap-x-6 gap-y-3 flex-wrap font-mono text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-[0.22em] text-[#031a28]/80">
          <span className="inline-flex items-center gap-1.5">
            <AlertCircle
              className="h-3.5 w-3.5 text-[#b9352a]"
              strokeWidth={2.5}
            />
            Vagas limitadas
          </span>
          <span
            aria-hidden
            className="block w-1 h-1 rounded-full bg-[#031a28]/35"
          />
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" strokeWidth={2.4} />
            25 a 29 de maio
          </span>
          <span
            aria-hidden
            className="block w-1 h-1 rounded-full bg-[#031a28]/35"
          />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" strokeWidth={2.4} />
            Sempre às 20h
          </span>
        </div>
      </div>
    </section>
  );
}
