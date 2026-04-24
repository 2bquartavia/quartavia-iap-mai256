import PillButton from "@/components/PillButton";

type Linha = { nome: string; valor: string; incluso?: boolean };

const LINHAS: Linha[] = [
  { nome: "As 5 Alavancas, ao vivo com Adrian Carvalho", valor: "R$ 997" },
  { nome: "Caderno de Implementação", valor: "R$ 97" },
  { nome: "Inventário de Mecanismos da Economia Real", valor: "R$ 97" },
  { nome: "Diagnóstico Patrimonial Individual", valor: "R$ 997" },
  { nome: "Biblioteca Confidencial do Quarto Caminho", valor: "INCLUSO", incluso: true },
  { nome: "Manual Anti-Armadilhas", valor: "INCLUSO", incluso: true },
];

export default function InvestimentoSection() {
  return (
    <section
      className="relative w-full"
      style={{ background: "#031a28" }}
    >
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10 py-20 md:py-28">
        {/* Título */}
        <div className="text-center max-w-[760px] mx-auto">
          <span className="inline-flex items-center text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            Resumo da oferta
          </span>
          <h2
            className="mt-4 font-semibold text-white leading-[1.05] tracking-[-0.02em] text-[clamp(1.9rem,4vw,3rem)]"
            style={{ fontFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif' }}
          >
            O que você recebe por R$ 97
          </h2>
          <div
            aria-hidden
            className="mt-6 h-px w-24 mx-auto"
            style={{ background: "#ffffff", opacity: 0.4 }}
          />
        </div>

        {/* Card / fatura */}
        <div
          className="relative mt-12 md:mt-16 rounded-[22px] overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #f6f1e8 0%, #ece4d4 50%, #d9cfbb 100%)",
            boxShadow:
              "0 40px 80px -20px rgba(0,0,0,0.6), 0 8px 24px -8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          {/* reflexo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.2) 100%)",
              mixBlendMode: "screen",
            }}
          />

          <div className="relative p-7 md:p-12 text-[#031a28]">
            {/* Linhas */}
            <ul className="divide-y divide-[#031a28]/15">
              {LINHAS.map((l) => (
                <li
                  key={l.nome}
                  className="flex items-baseline justify-between gap-4 py-4 md:py-5"
                >
                  <span className="text-[15px] md:text-[17px] leading-snug font-medium">
                    {l.nome}
                  </span>
                  <span
                    className={`shrink-0 text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.16em] ${
                      l.incluso ? "text-[#0a6d3a]" : "text-[#031a28]/70"
                    }`}
                  >
                    {l.valor}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divisor pontilhado estilo recibo */}
            <div
              aria-hidden
              className="my-7 md:my-9 h-px w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #031a28 0 6px, transparent 6px 12px)",
                backgroundSize: "12px 1px",
                backgroundRepeat: "repeat-x",
                opacity: 0.35,
              }}
            />

            {/* Total */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div>
                <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-[#031a28]/55">
                  Seu investimento
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-[18px] md:text-[20px] text-[#031a28]/55 line-through">
                    De R$ 2.188
                  </span>
                </div>
                <p
                  className="mt-1 font-semibold leading-none tracking-[-0.03em] text-[clamp(2.6rem,6vw,4.4rem)]"
                  style={{
                    fontFamily:
                      '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                  }}
                >
                  Por R$ 97
                </p>
                <p className="mt-3 text-[#031a28]/65 text-[13px] md:text-[14px]">
                  Pagamento único <span className="mx-2 opacity-50">//</span> Sem assinatura
                </p>
              </div>

              <div className="md:text-right">
                <PillButton
                  label="Garantir minha vaga agora"
                  variant="dark"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé da seção */}
        <div className="mt-8 md:mt-10 flex items-center justify-center gap-3 md:gap-5 flex-wrap text-center">
          {[
            "Vagas limitadas",
            "25 a 29 de maio",
            "Sempre às 20h",
          ].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}