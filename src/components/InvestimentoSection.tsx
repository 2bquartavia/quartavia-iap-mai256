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

        {/* Layout: lista à esquerda, preço/CTA à direita */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
          {/* Lista — esquerda */}
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Tudo que está incluso
            </p>
            <ul className="mt-5 divide-y divide-white/12">
              {LINHAS.map((l) => (
                <li
                  key={l.nome}
                  className="flex items-baseline justify-between gap-5 py-4 md:py-5"
                >
                  <span className="text-white text-[15px] md:text-[17px] leading-snug font-medium">
                    {l.nome}
                  </span>
                  <span
                    className={`shrink-0 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.16em] ${
                      l.incluso
                        ? "text-[#e6c674]"
                        : "text-white/55 line-through decoration-white/40"
                    }`}
                  >
                    {l.valor}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-white/55 text-[13px] md:text-[14px]">
              Valor total dos itens:{" "}
              <span className="text-white/80 font-semibold">R$ 2.188</span>
            </p>
          </div>

          {/* Preço + CTA — direita */}
          <aside className="md:col-span-5">
            <div
              className="relative h-full rounded-[22px] overflow-hidden p-7 md:p-9 flex flex-col"
              style={{
                background:
                  "linear-gradient(160deg, #f6f1e8 0%, #ece4d4 55%, #d9cfbb 100%)",
                boxShadow:
                  "0 40px 80px -20px rgba(0,0,0,0.6), 0 8px 24px -8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.2) 100%)",
                  mixBlendMode: "screen",
                }}
              />

              <div className="relative text-[#031a28] flex flex-col h-full">
                <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-[#031a28]/55">
                  Seu investimento
                </p>
                <span className="mt-3 text-[18px] md:text-[20px] text-[#031a28]/55 line-through">
                  De R$ 2.188
                </span>
                <p
                  className="mt-1 font-semibold leading-none tracking-[-0.03em] text-[clamp(3rem,6.5vw,4.8rem)]"
                  style={{
                    fontFamily:
                      '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                  }}
                >
                  Por R$ 97
                </p>
                <p className="mt-3 text-[#031a28]/70 text-[13px] md:text-[14px]">
                  Pagamento único{" "}
                  <span className="mx-2 opacity-50">//</span> Sem assinatura
                </p>

                <div
                  aria-hidden
                  className="my-6 h-px w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #031a28 0 6px, transparent 6px 12px)",
                    backgroundSize: "12px 1px",
                    backgroundRepeat: "repeat-x",
                    opacity: 0.3,
                  }}
                />

                <div className="mt-auto">
                  <PillButton
                    label="Garantir minha vaga agora"
                    variant="dark"
                    size="lg"
                  />
                  <p className="mt-4 text-[#031a28]/60 text-[12px] md:text-[13px]">
                    Garantia de 30 dias. Risco zero.
                  </p>
                </div>
              </div>
            </div>
          </aside>
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