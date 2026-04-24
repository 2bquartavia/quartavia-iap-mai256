import { Check, X, TrendingDown, KeyRound, Sparkles } from "lucide-react";
import PillButton from "@/components/PillButton";
import bancoMasterNews from "@/assets/banco-master-news.png";
import predioAlugueis from "@/assets/predio-alugueis.png";

const PRIMO = [
  "Sabe tudo sobre investimentos",
  "Lê relatório de analista",
  "Tem app de 3 corretoras",
  "Diversificou em 12 produtos",
  "R$500 mil em 8 investimentos",
  "Confia no assessor",
  "Depende do próximo salário.",
];

const TIO = [
  "Não sabe o que é CDI",
  "Não olha noticiário econômico",
  "Não perde sono quando o mercado cai",
  "Tem 4 imóveis e R$18 mil/mês de aluguel",
  "R$500 mil em 3 imóveis que se pagam",
  "Confia na escritura",
  "É livre.",
];

export default function PrimoTioSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#FAEDDD" }}>
      {/* Glow sutil de transição */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(3,26,40,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1080px] px-5 md:px-8 py-20 md:py-32 space-y-24 md:space-y-36">
        {/* Eyebrow + headline */}
        <header className="text-center max-w-[760px] mx-auto">
          <span className="inline-flex items-center rounded-full border border-[#031a28]/20 bg-[#031a28]/[0.04] px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-[#031a28]">
            Duas pessoas. Dois caminhos.
          </span>
          <h2 className="mt-6 text-[#031a28] font-semibold leading-[1.15] tracking-[-0.02em] text-[clamp(1.8rem,3.8vw,2.9rem)]">
            Todo mundo conhece essas duas pessoas.
          </h2>
        </header>

        {/* Cards comparativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative">
          {/* Divisor central com VS (desktop) */}
          <div
            aria-hidden
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center"
          >
            <div className="h-14 w-14 rounded-full bg-[#031a28] text-[#FAEDDD] flex items-center justify-center font-bold text-[13px] tracking-[0.15em] shadow-xl ring-4 ring-[#FAEDDD]">
              VS
            </div>
          </div>

          {/* PRIMO — card claro com X vermelhos */}
          <article className="relative rounded-2xl border border-[#031a28]/15 bg-white/70 backdrop-blur-sm p-8 md:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-[#031a28]/10">
              <div className="h-11 w-11 rounded-xl bg-[#031a28]/[0.06] flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-[#031a28]/70" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#031a28]/55 font-semibold">
                  Caminho 1
                </p>
                <h3 className="text-[#031a28] text-[20px] md:text-[22px] font-semibold leading-tight">
                  O Primo dos Investimentos
                </h3>
              </div>
            </div>
            <ul className="space-y-4">
              {PRIMO.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#b9352a]/12 text-[#b9352a]">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[#031a28]/85 text-[15px] md:text-[16px] leading-[1.65]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* TIO — card escuro com checks dourados, em destaque */}
          <article
            className="relative rounded-2xl p-8 md:p-10 shadow-2xl ring-1 ring-[#031a28]/30"
            style={{
              background:
                "linear-gradient(180deg, #042234 0%, #021b28 100%)",
            }}
          >
            {/* Badge "vencedor" */}
            <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-[#FAEDDD] text-[#031a28] px-3 py-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] shadow-md">
              <Sparkles className="h-3 w-3" /> O caminho do ativo
            </span>

            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-white/10">
              <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
                <KeyRound className="h-5 w-5 text-[#FAEDDD]" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/55 font-semibold">
                  Caminho 2
                </p>
                <h3 className="text-white text-[20px] md:text-[22px] font-semibold leading-tight">
                  O Tio dos Imóveis
                </h3>
              </div>
            </div>
            <ul className="space-y-4">
              {TIO.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FAEDDD]/15 text-[#FAEDDD]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-white/90 text-[15px] md:text-[16px] leading-[1.65]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Bloco analítico — diferença */}
        <div className="max-w-[780px] mx-auto space-y-10 md:space-y-12">
          <p className="text-[#031a28]/85 text-[17px] md:text-[19px] leading-[1.75]">
            <span className="text-[#031a28] font-semibold">O primo tem informação. O tio tem patrimônio.</span> Um estuda riqueza. O outro constrói. E o mais importante: o tio não pagou pelos imóveis dele. Os inquilinos pagaram. O banco financiou. O mercado valorizou. <span className="text-[#031a28] font-semibold">O tio entrou com a engenharia — e saiu com os ativos.</span>
          </p>

          {/* Frase-âncora */}
          <div className="relative pl-6 md:pl-8 border-l-2 border-[#031a28]/30">
            <p className="text-[#031a28] text-[clamp(1.05rem,1.8vw,1.35rem)] font-semibold leading-[1.45] tracking-[-0.01em]">
              A diferença entre o primo e o tio não é sorte. Não é capital inicial. Não é conhecimento técnico. É{" "}
              <span className="relative inline-block px-1">
                <span className="relative z-10">Engenharia Patrimonial</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 h-[6px] bg-[#031a28]/15 -z-0" />
              </span>.
            </p>
          </div>
        </div>

        {/* Bloco contraste — Quando o mercado despenca */}
        <div className="max-w-[1040px] mx-auto space-y-10 md:space-y-12">
          <header className="max-w-[820px]">
            <span className="inline-block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#031a28]/55 mb-3">
              Cenário real
            </span>
            <p className="text-[#031a28] text-[clamp(1.2rem,2.1vw,1.5rem)] font-semibold leading-[1.4] tracking-[-0.01em]">
              Quando o mercado despenca, o primo perde o sono. <span className="text-[#031a28]/55">O tio nem fica sabendo.</span>
            </p>
          </header>

          {/* Grid com imagens reais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {/* PRIMO — manchete real (imagem inclinada acima do card, sem cobrir texto) */}
            <div className="relative flex flex-col pt-10 md:pt-14">
              {/* Imagem flutuante inclinada — fora do card, acima */}
              <div className="relative mx-auto w-[78%] -mb-6 md:-mb-8 z-10 -rotate-[2.5deg] transition-transform duration-300 hover:-rotate-[1.5deg]">
                <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-[#031a28]/15 bg-white">
                  <img
                    src={bancoMasterNews}
                    alt="Manchete G1: STF avalia prisões no caso do Banco Master"
                    className="block w-full h-auto"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#b9352a] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Notícia real
                  </span>
                </div>
              </div>
              <div className="relative p-6 md:p-7 pt-10 md:pt-12 bg-[#b9352a]/[0.05] border border-[#b9352a]/25 rounded-2xl shadow-lg flex-1">
                <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#b9352a] mb-2">O Primo</p>
                <p className="text-[#031a28]/85 text-[15px] leading-[1.6]">
                  Perdeu o sono.
                </p>
              </div>
            </div>

            {/* TIO — prédio de aluguéis */}
            <div className="group relative rounded-2xl overflow-hidden ring-1 ring-[#031a28]/30 shadow-2xl flex flex-col"
              style={{ background: "linear-gradient(180deg, #042234 0%, #021b28 100%)" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={predioAlugueis}
                  alt="Prédio residencial gerador de aluguéis"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(2,27,40,0) 40%, rgba(2,27,40,0.55) 100%)",
                  }}
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#FAEDDD] text-[#031a28] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] shadow-md">
                  <KeyRound className="h-3 w-3" /> Ativo real
                </span>
                <div className="absolute bottom-3 right-3 rounded-lg bg-[#031a28]/85 backdrop-blur-sm border border-white/10 px-3 py-2 text-right">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold">Aluguel / mês</p>
                  <p className="text-[#FAEDDD] font-semibold tabular-nums text-[15px]">R$ 18.000</p>
                </div>
              </div>
              <div className="p-6 md:p-7 border-t border-white/10 flex-1">
                <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#FAEDDD]/80 mb-2">O Tio</p>
                <p className="text-white/90 text-[15px] leading-[1.6]">
                  Estava viajando.
                </p>
              </div>
            </div>
          </div>

          {/* Texto integral do cenário — sem cortes */}
          <div className="max-w-[820px] space-y-5 text-[#031a28]/85 text-[15px] md:text-[16px] leading-[1.75]">
            <p>
              Quando o <span className="font-semibold text-[#031a28]">Banco Master quebrou com R$47 bilhões em CDBs</span>, o primo perdeu o sono. O tio estava viajando com a renda dos aluguéis. Quando 6 instituições financeiras foram liquidadas pelo BC em 6 meses, o primo se perguntou: <em className="not-italic">"será que meus investimentos estão seguros?"</em> O tio recebeu o depósito do aluguel no <span className="font-semibold text-[#031a28]">dia 5</span>. Como sempre.
            </p>
          </div>

          <p className="max-w-[820px] text-[#031a28]/80 text-[15px] md:text-[16px] leading-[1.75] border-l-2 border-[#031a28]/40 pl-5">
            Investidores que compraram <span className="font-semibold text-[#031a28]">COEs de Ambipar</span> receberam de volta <span className="font-semibold text-[#b9352a]">6,88%</span> do que investiram. Seis reais e oitenta e oito centavos a cada cem. O tio nunca precisou de assessor. <span className="text-[#031a28] font-semibold">O tio tem escritura.</span>
          </p>
        </div>

        {/* Visualização — extrato de aluguéis */}
        <div className="max-w-[760px] mx-auto">
          <p className="text-[#031a28]/80 text-[16px] md:text-[17px] leading-[1.7] text-center max-w-[560px] mx-auto">
            Agora imagina receber uma notificação de depósito no <span className="text-[#031a28] font-semibold">dia 5 de cada mês</span>:
          </p>

          <div className="mt-8 rounded-2xl border border-[#031a28]/20 bg-white/70 backdrop-blur-sm overflow-hidden shadow-xl">
            <div className="px-6 md:px-7 py-4 border-b border-[#031a28]/10 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#031a28]/60">
                Extrato — dia 5
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#031a28]/60">
                Sem trabalho. Sem assessor.
              </span>
            </div>
            {[
              { label: "Aluguel — Imóvel 1", v: "R$ 3.500" },
              { label: "Aluguel — Imóvel 2", v: "R$ 2.800" },
              { label: "Usina solar", v: "R$ 4.200" },
              { label: "Imóvel no Texas (USD)", v: "$ 2.000" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 md:px-7 py-4 border-b border-[#031a28]/10 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-[#031a28]/[0.06] text-[#031a28] flex items-center justify-center text-[12px] font-bold">
                    +
                  </span>
                  <span className="text-[#031a28]/85 text-[15px]">{row.label}</span>
                </div>
                <span className="text-[#031a28] font-semibold tabular-nums text-[15px] md:text-[16px]">
                  {row.v}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[#031a28]/60 text-[13px] md:text-[14px] leading-[1.6] text-center max-w-[520px] mx-auto">
            Tudo caindo na conta sem você ter trabalhado por esse dinheiro naquele mês. Sem home broker. Sem assessor.
          </p>
        </div>

        {/* Cena de vida */}
        <div className="max-w-[720px] mx-auto space-y-7">
          <p className="text-[#031a28]/85 text-[17px] md:text-[19px] leading-[1.75]">
            <span className="text-[#031a28] font-semibold">Quinta-feira, 15h.</span> Você está no consultório, no escritório, na empresa — porque <em className="not-italic text-[#031a28] font-medium">quer</em>, não porque <em className="not-italic text-[#031a28] font-medium">precisa</em>.
          </p>
          <p className="text-[#031a28]/85 text-[17px] md:text-[19px] leading-[1.75]">
            <span className="text-[#031a28] font-semibold">Sábado de manhã</span>, seus filhos estão brincando e você sabe que a escola deles está paga até o final do contrato — pelos ativos, não pelo seu suor ou pelo seu heroísmo.
          </p>
          <div className="pt-3 border-t border-[#031a28]/15">
            <p className="text-[#031a28]/75 text-[16px] md:text-[17px] leading-[1.7]">
              Isso não é fantasia. É a rotina de centenas de famílias que aplicaram <span className="text-[#031a28] font-semibold">Engenharia Patrimonial</span>.
            </p>
          </div>
        </div>

        {/* Pergunta-âncora + CTA */}
        <div className="max-w-[820px] mx-auto rounded-2xl px-8 md:px-12 py-12 md:py-16 text-center shadow-2xl"
          style={{ background: "linear-gradient(180deg, #042234 0%, #021b28 100%)" }}
        >
          <p className="text-white text-[clamp(1.3rem,2.5vw,1.75rem)] font-semibold leading-[1.45] tracking-[-0.01em] max-w-[640px] mx-auto">
            A pergunta é: você está no caminho do <span className="text-white/60 line-through decoration-[#b9352a]/70">primo</span> — ou no caminho do <span className="text-[#FAEDDD] underline decoration-[#FAEDDD]/40 underline-offset-4">tio</span>?
          </p>

          <div className="mt-10 inline-block relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-full blur-2xl opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(250,237,221,0.45), rgba(250,237,221,0.15) 50%, transparent 75%)",
              }}
            />
            <div className="relative">
              <PillButton label="Quero sair do caminho do primo — R$97" variant="gold" size="lg" />
            </div>
          </div>
          <p className="mt-6 text-white/65 text-[13px] md:text-[14px] tracking-wide">
            5 noites ao vivo. Garantia de 30 dias. Risco zero.
          </p>
        </div>
      </div>
    </section>
  );
}
