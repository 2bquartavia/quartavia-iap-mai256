import { Landmark, Home, Clock, Building2, Gavel, Scale, Coins } from "lucide-react";

const ICONS = [
  { Icon: Landmark, label: "Instituições bancárias" },
  { Icon: Home, label: "Aluguel" },
  { Icon: Clock, label: "Hora certa" },
  { Icon: Building2, label: "Imóvel" },
  { Icon: Gavel, label: "Leilão" },
  { Icon: Scale, label: "Arbitragem" },
  { Icon: Coins, label: "Dinheiro" },
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

        <div className="mt-10 md:mt-14 mx-auto max-w-[720px] text-left space-y-5 md:space-y-6 text-white/90 text-[15px] md:text-[17px] leading-[1.7]">
          <p>
            <span className="uppercase tracking-[0.18em] text-[11px] md:text-xs font-semibold" style={{ color: "#FFC14D" }}>Princípio 1 — Alavancagem.</span>{" "}
            Use o dinheiro dos outros. Você compra um imóvel de R$500 mil. Dá R$150 mil de entrada. O banco financia o resto. O inquilino paga R$3.500/mês de aluguel — que paga a parcela. Em 15 anos, o imóvel é seu. Quitado. Quem pagou? O inquilino. Não você.
          </p>
          <p>
            <span className="uppercase tracking-[0.18em] text-[11px] md:text-xs font-semibold" style={{ color: "#FFC14D" }}>Princípio 2 — Arbitragem.</span>{" "}
            Compre na hora certa, do jeito certo. Quando você compra no leilão um imóvel por R$600 mil que vale R$1 milhão, você criou R$400 mil de patrimônio no ato. Sem esperar. Sem sorte. Só por saber onde comprar e como estruturar.
          </p>
          <p>
            Quando você combina alavancagem e arbitragem com a engenharia certa, você não paga pelos ativos que constrói. Você alavanca. Você posiciona o seu dinheiro na etapa de originação! (Grava essa palavra.) Originação é a zona onde o dinheiro de verdade é criado, não só onde ele é revendido com margem. O sistema financeiro funciona como uma pirâmide, onde quem compra produtos financia quem gera riqueza de verdade.
          </p>
          <p>
            Eu sistematizei isso depois de +3.215 reuniões, 100+ ativos pessoais e R$3 bilhões sob aconselhamento. Não inventei — organizei o que os tios fazem por instinto há décadas.
          </p>
        </div>

        {/* Glass icon grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-4 justify-items-center">
          {ICONS.map(({ Icon, label }, i) => (
            <div
              key={i}
              aria-label={label}
              title={label}
              className="w-full aspect-square max-w-[96px] rounded-2xl flex items-center justify-center backdrop-blur-md transition-transform hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 30px -15px rgba(0,0,0,0.55)",
              }}
            >
              <Icon size={28} strokeWidth={1.6} color="#FFC14D" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

