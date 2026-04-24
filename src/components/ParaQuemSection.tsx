import { Check, X } from "lucide-react";
import PillButton from "@/components/PillButton";

const SIM = [
  "Você ganha acima de R$20 mil por mês e sente que deveria ter mais patrimônio do que tem.",
  "Você está no caminho do primo e quer sair — mesmo que não soubesse disso até ler essa página.",
  "Você quer comprar ativos que se pagam sozinhos — sem virar especialista em finanças.",
  "Você está disposto a dedicar 5 noites pra instalar a engenharia que muda os próximos 7 anos.",
  "Você quer parar de improvisar e ter um projeto patrimonial de verdade.",
];

const NAO = [
  "Você está procurando riqueza rápida ou \"hack\" financeiro.",
  "Você não tem disposição pra mudar a forma como pensa sobre dinheiro.",
  "Você acredita que o mercado financeiro é o único caminho e não está aberto a questionar.",
  "Você já tem um projeto patrimonial claro e estruturado — e está satisfeito com ele.",
  "Você busca uma solução que não exija nenhum envolvimento ou dedicação da sua parte.",
];

export default function ParaQuemSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#FAEDDD" }}>
      {/* Decorative subtle orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(3,26,40,0.10), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(3,26,40,0.08), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center rounded-full border border-[#031a28]/20 bg-[#031a28]/[0.04] px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-[#031a28]">
            Pra quem é (e pra quem não é)
          </span>
          <h2 className="mt-5 font-semibold text-[#031a28] leading-[1.1] tracking-[-0.02em] text-[clamp(1.6rem,3.4vw,2.6rem)]">
            Antes de continuar, leia com honestidade.
          </h2>
          <p className="mt-4 text-[#031a28]/70 text-[15px] md:text-[17px] leading-[1.55]">
            Essa imersão não é pra todo mundo. E está tudo bem. Veja se você se reconhece.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {/* SIM */}
          <article
            className="relative rounded-2xl bg-white/70 backdrop-blur-sm border border-[#031a28]/10 p-7 md:p-9 shadow-[0_10px_40px_-15px_rgba(3,26,40,0.15)] transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, #1a8754, #14633e)" }}
              >
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
              </span>
              <h3 className="font-semibold text-[#031a28] text-[18px] md:text-[20px] leading-tight">
                Essa imersão <span className="text-[#1a8754]">É</span> pra você se:
              </h3>
            </div>
            <ul className="space-y-4">
              {SIM.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[#031a28]/85 text-[14px] md:text-[15px] leading-[1.55]"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#1a8754]" strokeWidth={3} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* NÃO */}
          <article
            className="relative rounded-2xl bg-white/40 backdrop-blur-sm border border-[#031a28]/10 p-7 md:p-9 shadow-[0_10px_40px_-15px_rgba(3,26,40,0.15)] transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, #b3261e, #7f1d1d)" }}
              >
                <X className="h-5 w-5 text-white" strokeWidth={3} />
              </span>
              <h3 className="font-semibold text-[#031a28] text-[18px] md:text-[20px] leading-tight">
                Essa imersão <span className="text-[#b3261e]">NÃO</span> é pra você se:
              </h3>
            </div>
            <ul className="space-y-4">
              {NAO.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[#031a28]/75 text-[14px] md:text-[15px] leading-[1.55]"
                >
                  <X className="mt-1 h-4 w-4 shrink-0 text-[#b3261e]" strokeWidth={3} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex flex-col items-center text-center">
          <div className="relative inline-block">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-full blur-2xl opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(3,26,40,0.45), rgba(3,26,40,0.15) 50%, transparent 75%)",
              }}
            />
            <div className="relative">
              <PillButton label="Essa imersão é pra mim" variant="dark" size="lg" />
            </div>
          </div>
          <p className="mt-3 text-[#031a28]/60 text-[12px] md:text-[13px]">
            Garantia de 30 dias. Risco zero. Apenas 50 Diagnósticos Individuais.
          </p>
        </div>
      </div>
    </section>
  );
}
