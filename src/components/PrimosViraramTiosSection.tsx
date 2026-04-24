import { Quote, TrendingUp, Sparkles, KeyRound } from "lucide-react";
import PillButton from "@/components/PillButton";

type Depo = {
  quote: string;
  name: string;
  role: string;
  badge?: string;
};

const DEPOIMENTOS: Depo[] = [
  {
    quote:
      "Tinha dinheiro parado em fundo que rendia 8% ao ano. Em uma única operação na economia real, tive ganho de capital equivalente a 3 anos dessa rentabilidade. O ativo continua gerando renda.",
    name: "Leonardo Akira",
    role: "Empresário",
  },
  {
    quote:
      "Meu medo era investir errado. Pela primeira vez, sei quais são os próximos 3 ativos que vou adquirir — e como adquiri-los sem tirar do bolso.",
    name: "Mariana Franceschini",
    role: "Profissional de alta renda",
  },
  {
    quote:
      "Passei por 2 assessorias e 1 consultoria financeira. Nenhuma me deu um plano real. Aqui, o que foi prometido foi entregue. Simples.",
    name: "Renato Oberg",
    role: "Profissional",
  },
  {
    quote:
      "Ganhava R$45 mil por mês e não sobrava nada. Não era problema de renda — era problema de arquitetura. Em 12 meses, montei 2 operações que geram R$8 mil passivos. Nunca mais olhei pra rentabilidade de fundo.",
    name: "Participante PHARUS",
    role: "Empresário, 41 anos",
    badge: "PHARUS",
  },
  {
    quote:
      "Minha esposa já não acreditava mais que eu ia resolver isso. Depois de aplicar o método, pela primeira vez ela viu o patrimônio sendo construído de verdade. Não é conta em corretora — e escritura.",
    name: "Participante PHARUS",
    role: "Advogado, 47 anos",
    badge: "PHARUS",
  },
  {
    quote:
      "Eu era o primo clássico: CFP, 3 certificações, R$1.2M em investimentos financeiros que mal batiam a inflação. Em 2 anos aplicando as alavancas, construir mais patrimônio real do que nos 10 anos anteriores.",
    name: "Participante PHARUS",
    role: "Profissional de mercado financeiro, 38 anos",
    badge: "PHARUS",
  },
];

export default function PrimosViraramTiosSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#FAEDDD" }}
    >
      {/* Glow superior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(3,26,40,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1080px] px-5 md:px-8 py-20 md:py-32 space-y-20 md:space-y-28">
        {/* Header */}
        <header className="text-center max-w-[760px] mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#031a28]/20 bg-[#031a28]/[0.04] px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-[#031a28]">
            <Sparkles className="h-3 w-3" /> Provas reais
          </span>
          <h2 className="mt-6 text-[#031a28] font-semibold leading-[1.15] tracking-[-0.02em] text-[clamp(1.8rem,3.8vw,2.9rem)]">
            Primos que viraram tios.
          </h2>
        </header>

        {/* CASO DESTAQUE — Felipe Hurtado */}
        <article
          className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-[#031a28]/30"
          style={{
            background:
              "linear-gradient(180deg, #042234 0%, #021b28 100%)",
          }}
        >
          {/* Badge flutuante */}
          <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-[#FAEDDD] text-[#031a28] px-3 py-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] shadow-md z-10">
            <Sparkles className="h-3 w-3" /> Caso real — Médico, 44 anos
          </span>

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
            {/* Esquerda — narrativa */}
            <div className="p-8 md:p-12 relative">
              <Quote
                aria-hidden
                className="absolute top-8 right-8 h-16 w-16 text-[#FAEDDD]/8"
                strokeWidth={1.5}
              />
              <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#FAEDDD]/60 mb-5">
                Caso clínico
              </p>
              <blockquote className="relative text-white/95 text-[16px] md:text-[18px] leading-[1.75]">
                <p>
                  <span className="text-[#FAEDDD] font-semibold">
                    44 anos. Médico. R$60 mil por mês.
                  </span>{" "}
                  Trabalhava 12 horas por dia. R$800 mil em investimentos que
                  rendiam menos que a inflação. Em{" "}
                  <span className="text-[#FAEDDD] font-semibold">
                    18 meses com Engenharia Patrimonial
                  </span>
                  : ativou o terceiro motor que estava dormindo, adquiriu{" "}
                  <span className="text-[#FAEDDD] font-semibold">3 ativos</span>{" "}
                  usando crédito e dinheiro de terceiros — não tirou do bolso —
                  e gerou{" "}
                  <span className="text-[#FAEDDD] font-semibold">
                    R$12 mil por mês
                  </span>{" "}
                  de renda recorrente, independente do consultório.
                </p>
              </blockquote>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-white/80 text-[13px]">
                  <TrendingUp className="h-4 w-4 text-[#FAEDDD]" />
                  De primo a tio em{" "}
                  <span className="text-[#FAEDDD] font-semibold">18 meses</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-[13px]">
                  <KeyRound className="h-4 w-4 text-[#FAEDDD]" />
                  Meta:{" "}
                  <span className="text-[#FAEDDD] font-semibold">
                    R$40 mil/mês passivos
                  </span>{" "}
                  em 5 anos
                </div>
              </div>
            </div>

            {/* Direita — depoimento direto */}
            <div
              className="relative p-8 md:p-12 border-t md:border-t-0 md:border-l border-white/10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(250,237,221,0.04), rgba(250,237,221,0.01))",
              }}
            >
              <Quote
                aria-hidden
                className="h-7 w-7 text-[#FAEDDD]/40 mb-4"
                strokeWidth={2}
              />
              <p className="text-white text-[16px] md:text-[18px] leading-[1.7] font-medium italic">
                "Trabalhava 14 horas por dia achando que o problema era ganhar
                pouco. Depois de 18 meses, tenho R$12 mil por mês entrando sem
                depender de plantão. Hoje trabalho porque quero."
              </p>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-[#FAEDDD] font-semibold text-[15px]">
                  Dr. Felipe Hurtado
                </p>
                <p className="text-white/60 text-[13px] mt-0.5">
                  Médico — era primo, virou tio
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* GRID de depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {DEPOIMENTOS.map((d, i) => (
            <article
              key={i}
              className="group relative rounded-2xl bg-white/70 backdrop-blur-sm border border-[#031a28]/15 p-7 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {d.badge && (
                <span className="absolute -top-2.5 right-6 inline-flex items-center rounded-full bg-[#031a28] text-[#FAEDDD] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] shadow-md">
                  {d.badge}
                </span>
              )}
              <Quote
                aria-hidden
                className="h-6 w-6 text-[#031a28]/25 mb-4"
                strokeWidth={2}
              />
              <p className="text-[#031a28]/85 text-[15px] md:text-[15.5px] leading-[1.7] flex-1">
                {d.quote}
              </p>
              <div className="mt-6 pt-5 border-t border-[#031a28]/10">
                <p className="text-[#031a28] font-semibold text-[14.5px]">
                  {d.name}
                </p>
                <p className="text-[#031a28]/55 text-[12.5px] mt-0.5">
                  {d.role}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          className="max-w-[820px] mx-auto rounded-2xl px-8 md:px-12 py-12 md:py-14 text-center shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #042234 0%, #021b28 100%)",
          }}
        >
          <p className="text-white/70 text-[13px] md:text-[14px] uppercase tracking-[0.16em] font-semibold mb-4">
            Sua vez
          </p>
          <p className="text-white text-[clamp(1.15rem,2vw,1.5rem)] font-semibold leading-[1.5] tracking-[-0.01em] max-w-[600px] mx-auto">
            Junte-se a{" "}
            <span className="text-[#FAEDDD]">1.917 famílias</span> que
            escolheram o caminho do tio.
          </p>

          <div className="mt-8 inline-block relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-full blur-2xl opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(250,237,221,0.45), rgba(250,237,221,0.15) 50%, transparent 75%)",
              }}
            />
            <div className="relative">
              <PillButton
                label="Entrar na Imersão com garantia — R$97"
                variant="gold"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}