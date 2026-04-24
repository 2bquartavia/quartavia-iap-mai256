import { Landmark, Gavel, Coins, Clock, Scale } from "lucide-react";

const BLOCOS = [
  {
    showHeader: true,
    eyebrow: "Princípio 1",
    title: "Use o dinheiro dos outros.",
    sub: "(Alavancagem)",
    body:
      "Você compra um imóvel de R$500 mil. Dá R$150 mil de entrada. O banco financia o resto. O inquilino paga R$3.500/mês de aluguel — que paga a parcela. Em 15 anos, o imóvel é seu. Quitado. Quem pagou? O inquilino. Não você.",
    Icon: Landmark,
  },
  {
    showHeader: true,
    eyebrow: "Princípio 2",
    title: "Compre na hora certa, do jeito certo.",
    sub: "(Arbitragem)",
    body:
      "Quando você compra no leilão um imóvel por R$600 mil que vale R$1 milhão, você criou R$400 mil de patrimônio no ato. Sem esperar. Sem sorte. Só por saber onde comprar e como estruturar.",
    Icon: Gavel,
  },
  {
    showHeader: false,
    eyebrow: "Combinação",
    title: "Alavancagem + Arbitragem com a engenharia certa.",
    sub: "",
    body:
      "Quando você combina alavancagem e arbitragem com a engenharia certa, você não paga pelos ativos que constrói. Você alavanca. Você posiciona o seu dinheiro na etapa de originação! (Grava essa palavra.)",
    Icon: Scale,
  },
  {
    showHeader: false,
    eyebrow: "Originação",
    title: "A zona onde o dinheiro de verdade é criado.",
    sub: "",
    body:
      "Originação é a zona onde o dinheiro de verdade é criado, não só onde ele é revendido com margem. O sistema financeiro funciona como uma pirâmide, onde quem compra produtos financia quem gera riqueza de verdade.",
    Icon: Coins,
  },
  {
    showHeader: false,
    eyebrow: "Método",
    title: "Eu sistematizei isso.",
    sub: "",
    body:
      "Eu sistematizei isso depois de +3.215 reuniões, 100+ ativos pessoais e R$3 bilhões sob aconselhamento. Não inventei — organizei o que os tios fazem por instinto há décadas.",
    Icon: Clock,
  },
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

        <div className="mt-10 md:mt-14 flex flex-col gap-5 md:gap-6 text-left">
          {BLOCOS.map((b, i) => {
            const isOrange = i % 2 === 0;
            const bg = isOrange ? "#cc7514" : "#031a28";
            const border = isOrange ? "rgba(255,255,255,0.18)" : "rgba(255,193,77,0.35)";
            const eyebrowColor = isOrange ? "#FFE6B8" : "#FFC14D";
            const Icon = b.Icon;
            return (
              <article
                key={i}
                className="rounded-2xl p-5 md:p-7 flex gap-4 md:gap-5 items-start"
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="shrink-0 rounded-xl flex items-center justify-center"
                  style={{
                    width: 48,
                    height: 48,
                    background: isOrange
                      ? "rgba(3,26,40,0.25)"
                      : "rgba(204,117,20,0.18)",
                    color: isOrange ? "#fff" : "#FFC14D",
                  }}
                >
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  {b.showHeader ? (
                    <>
                      <div
                        className="uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-semibold"
                        style={{ color: eyebrowColor }}
                      >
                        {b.eyebrow}
                      </div>
                      <h3 className="mt-1.5 font-semibold text-white text-[15px] md:text-[17px] leading-[1.3] tracking-[-0.01em]">
                        {b.title}{" "}
                        {b.sub && (
                          <span className="text-white/70 font-normal italic">
                            {b.sub}
                          </span>
                        )}
                      </h3>
                      <p className="mt-2 text-white/85 text-[13px] md:text-[14px] leading-[1.6]">
                        {b.body}
                      </p>
                    </>
                  ) : (
                    <p className="text-white/90 text-[13px] md:text-[14px] leading-[1.6]">
                      {b.body}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Fade-out gradient overlay no fim da dobra cobrindo os retângulos */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 bottom-0"
          style={{
            height: "260px",
            background:
              "linear-gradient(180deg, rgba(3,26,40,0) 0%, rgba(3,26,40,0.85) 60%, #031a28 100%)",
          }}
        />
      </div>
    </section>
  );
}

