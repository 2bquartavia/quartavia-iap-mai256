import { Check, AlertCircle, Calendar, Clock } from "lucide-react";
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

      <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
          {/* Esquerda — título + lista */}
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-[#031a28]/65">
              <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
              Resumo da oferta
            </span>
            <h2
              className="mt-3 md:mt-4 font-semibold text-[#031a28] leading-[1.05] tracking-[-0.02em] text-[clamp(2.1rem,4.6vw,3.4rem)]"
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
            <ul className="mt-7 md:mt-8 divide-y divide-[#031a28]/12">
              {INCLUSOS.map((item) => (
                <li
                  key={item.nome}
                  className="flex items-start gap-3 md:gap-4 py-4 md:py-5"
                >
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFC14D]/20 text-[#b9352a] ring-1 ring-[#FFC14D]/45">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <div className="flex-1 flex items-baseline justify-between gap-3 md:gap-4 flex-wrap">
                    <span className="text-[#031a28] text-[15px] md:text-[17px] leading-snug font-medium">
                      {item.nome}
                    </span>
                    <span
                      className={`font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.16em] whitespace-nowrap ${
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

          {/* TICKET — direita */}
          <aside className="md:col-span-5">
            <div className="relative h-full">
              <div
                className="relative h-full bg-white border-[1.5px] border-[#031a28]/18 rounded-[14px] overflow-hidden flex flex-col"
              >
                {/* Stub topo — meta evento + serial */}
                <div className="px-5 md:px-6 py-3 md:py-3.5 flex items-center justify-between border-b border-dashed border-[#031a28]/25 bg-[#031a28]/[0.035]">
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold text-[#031a28]/80">
                    Imersão · Alavanca Patrimonial
                  </span>
                  <span className="font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.22em] font-bold text-[#031a28]/55">
                    #{String(VAGAS_OCUPADAS + 1).padStart(3, "0")} / 050
                  </span>
                </div>

                {/* Corpo principal — preço + escassez */}
                <div className="px-5 md:px-6 py-6 md:py-7">
                  <p className="font-mono text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#031a28]/55">
                    Seu investimento
                  </p>
                  <p className="mt-2 font-mono text-[14px] md:text-[15px] font-bold uppercase tracking-[0.14em] text-[#031a28]/55 line-through decoration-[#031a28]/45 decoration-[1.5px]">
                    De R$ 2.188
                  </p>
                  <p
                    className="mt-1 font-semibold text-[#031a28] leading-none tracking-[-0.03em] text-[clamp(2.8rem,6.5vw,4.6rem)]"
                    style={{
                      fontFamily:
                        '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                    }}
                  >
                    R$ 97
                  </p>
                  <p className="mt-3 text-[#031a28]/70 text-[12.5px] md:text-[13.5px]">
                    Pagamento único{" "}
                    <span className="mx-1.5 opacity-50">·</span> Sem assinatura
                  </p>
                </div>

                {/* Divisor perfurado com notches laterais */}
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[11px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full"
                    style={{ background: "#FAEDDD" }}
                  />
                  <span
                    aria-hidden
                    className="absolute -right-[11px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full"
                    style={{ background: "#FAEDDD" }}
                  />
                  <div className="border-t border-dashed border-[#031a28]/30 mx-3" />
                </div>

                {/* Stub inferior — datas + CTA + barcode */}
                <div className="px-5 md:px-6 py-5 md:py-6 flex flex-col gap-5">
                  {/* Grid de meta */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Data", value: "25–29 mai" },
                      { label: "Horário", value: "20h00" },
                      { label: "Formato", value: "5 noites" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="flex flex-col gap-1 px-2.5 py-2 rounded-md bg-[#031a28]/[0.04] border border-[#031a28]/10"
                      >
                        <span className="font-mono text-[9px] md:text-[9.5px] uppercase tracking-[0.2em] font-bold text-[#031a28]/55">
                          {m.label}
                        </span>
                        <span className="text-[#031a28] text-[12.5px] md:text-[13.5px] font-semibold tabular-nums tracking-tight">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <PillButton
                      label="Garantir minha vaga agora"
                      variant="dark"
                      size="lg"
                      fullWidth
                    />
                    <p className="mt-3 text-[#031a28]/60 text-[12px] md:text-[13px] text-center">
                      Garantia de 30 dias · Risco zero
                    </p>
                  </div>

                  {/* Barcode decorativo */}
                  <div className="flex items-end justify-between gap-3 pt-4 border-t border-dashed border-[#031a28]/18">
                    <div className="flex items-end gap-[2px] flex-1">
                      {Array.from({ length: 28 }).map((_, i) => {
                        const heights = [16, 11, 14, 9, 18, 12, 15, 10, 17];
                        const h = heights[i % heights.length] ?? 12;
                        return (
                          <span
                            key={i}
                            className="block w-[2px] bg-[#031a28]/70"
                            style={{ height: `${h}px` }}
                          />
                        );
                      })}
                    </div>
                    <span className="font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.22em] font-bold text-[#031a28]/55">
                      QV·AP·2025
                    </span>
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
