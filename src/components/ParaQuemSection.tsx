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
  'Você está procurando riqueza rápida ou "hack" financeiro.',
  "Você não tem disposição pra mudar a forma como pensa sobre dinheiro.",
  "Você acredita que o mercado financeiro é o único caminho e não está aberto a questionar.",
  "Você já tem um projeto patrimonial claro e estruturado — e está satisfeito com ele.",
  "Você busca uma solução que não exija nenhum envolvimento ou dedicação da sua parte.",
];

export default function ParaQuemSection() {
  return (
    <section
      className="relative w-full overflow-x-clip"
      style={{ background: "#FAEDDD" }}
    >
      {/* Glow ambiente sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[300px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(3,26,40,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10 py-20 md:py-28">
        {/* Layout editorial — 2 colunas separadas só por divisor pontilhado vertical */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-10 lg:gap-x-14 max-w-[960px] mx-auto">
          {/* Divisor vertical pontilhado central — apenas md+ */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-px"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(3,26,40,0.4) 0 6px, transparent 6px 12px)",
              backgroundSize: "1px 12px",
              backgroundRepeat: "repeat-y",
            }}
          />

          {/* COLUNA SIM */}
          <div className="md:pr-2 lg:pr-4">
            <div className="flex items-center gap-3 mb-5 md:mb-6 pb-4 border-b-2 border-emerald-600/40">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-600/40">
                <Check
                  className="h-[18px] w-[18px] text-emerald-700"
                  strokeWidth={3}
                />
              </span>
              <h3 className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.24em] font-bold text-emerald-700">
                É pra você se
              </h3>
            </div>
            <ul className="divide-y divide-emerald-700/15">
              {SIM.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-3.5 md:py-4 text-[#031a28] text-[14.5px] md:text-[15.5px] leading-[1.55] font-medium"
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                    strokeWidth={3}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA NÃO */}
          <div className="md:pl-2 lg:pl-4">
            <div className="flex items-center gap-3 mb-5 md:mb-6 pb-4 border-b-2 border-[#b9352a]/40">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#b9352a]/12 ring-1 ring-[#b9352a]/40">
                <X
                  className="h-[18px] w-[18px] text-[#b9352a]"
                  strokeWidth={3}
                />
              </span>
              <h3 className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.24em] font-bold text-[#b9352a]">
                Não é pra você se
              </h3>
            </div>
            <ul className="divide-y divide-[#b9352a]/15">
              {NAO.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-3.5 md:py-4 text-[#031a28]/65 text-[14.5px] md:text-[15.5px] leading-[1.55]"
                >
                  <X
                    className="mt-1 h-4 w-4 shrink-0 text-[#b9352a]"
                    strokeWidth={3}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 md:mt-16 flex flex-col items-center text-center">
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
              <PillButton
                label="Essa imersão é pra mim"
                variant="dark"
                size="lg"
              />
            </div>
          </div>
          <p className="mt-3 text-[#031a28]/60 text-[12px] md:text-[13px]">
            Garantia de 30 dias · Risco zero · Apenas 50 Diagnósticos Individuais
          </p>
        </div>
      </div>
    </section>
  );
}
