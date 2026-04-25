import PillButton from "@/components/PillButton";

const PARAS: { n: string; body: React.ReactNode }[] = [
  {
    n: "01",
    body: (
      <>
        Mas o dinheiro que você ganhou até hoje construiu algo que{" "}
        <span className="font-semibold" style={{ color: "#E6C674" }}>
          funciona sem você
        </span>
        ?
      </>
    ),
  },
  {
    n: "02",
    body: (
      <>
        Daqui a 5 anos você vai estar em um de dois lugares. No mesmo — ganhando bem, trabalhando muito, dependendo do próximo mês. Ou recebendo depósito de aluguel no{" "}
        <span className="font-semibold text-white">dia 5</span> sem ter levantado da cama pra isso.
      </>
    ),
  },
  {
    n: "03",
    body: (
      <>
        A Imersão não garante o segundo lugar. Mas é o passo que{" "}
        <span className="font-semibold text-white">1.917 famílias</span> deram antes de você. 5 noites. Engenharia Patrimonial.{" "}
        <span className="font-semibold" style={{ color: "#E6C674" }}>
          R$97
        </span>
        . Risco zero.
      </>
    ),
  },
];

export default function CTAFinalSection() {
  return (
    <section
      id="cadastro"
      className="relative w-full"
      style={{
        background:
          "linear-gradient(180deg, #042234 0%, #031a28 45%, #020e16 100%)",
        scrollMarginTop: "1rem",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 25%, rgba(230,198,116,0.14), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(230,198,116,0.4) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1080px] px-5 md:px-8 py-20 md:py-28">
        {/* Headline + sub — primeira parte da Para 1 */}
        <header className="text-center max-w-[760px] mx-auto">
          <h2
            className="font-semibold leading-[1.06] tracking-[-0.022em] text-[clamp(2rem,4.4vw,3.2rem)]"
            style={{
              fontFamily:
                '"Source Serif 4", "Source Serif Pro", Georgia, serif',
              backgroundImage:
                "linear-gradient(135deg, #ffffff 0%, #f6e7c4 35%, #E6C674 70%, #E8A75A 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            <span className="block">Você já provou que sabe</span>
            <span className="block italic">ganhar dinheiro.</span>
          </h2>
          <p className="mt-3 md:mt-4 text-white/55 text-[14px] md:text-[16px] italic font-medium">
            Isso não está em discussão.
          </p>
        </header>

        {/* 3 colunas — Paras 1 (resto), 2, 3 */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 md:divide-x divide-white/12 max-w-[960px] mx-auto">
          {PARAS.map((p) => (
            <article
              key={p.n}
              className="px-2 md:px-6 lg:px-8 first:md:pl-0 last:md:pr-0 text-center"
            >
              <div className="mb-4 md:mb-5 flex justify-center">
                <span
                  className="font-semibold tabular-nums leading-none text-[clamp(1.6rem,2.4vw,2rem)]"
                  style={{
                    fontFamily:
                      '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                    backgroundImage:
                      "linear-gradient(180deg, #E6C674 0%, #E8A75A 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {p.n}
                </span>
              </div>
              <p className="text-white/85 text-[14.5px] md:text-[15.5px] leading-[1.65]">
                {p.body}
              </p>
            </article>
          ))}
        </div>

        {/* Urgency — Para 4 */}
        <div
          className="mt-12 md:mt-14 mx-auto max-w-[820px] py-5 md:py-6 text-center border-y"
          style={{
            borderColor: "rgba(230,198,116,0.35)",
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, rgba(230,198,116,0.06) 50%, transparent 100%)",
          }}
        >
          <p className="text-white text-[14.5px] md:text-[16.5px] leading-[1.5] font-semibold">
            A Imersão começa dia{" "}
            <span style={{ color: "#E6C674" }}>25 de maio</span>. Apenas{" "}
            <span style={{ color: "#E6C674" }}>
              50 Diagnósticos Individuais
            </span>{" "}
            serão realizados.{" "}
            <em className="not-italic" style={{ color: "#E8A75A" }}>
              Quando acabar, acabou.
            </em>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-12 mx-auto max-w-[460px]">
          <PillButton
            label="Quero construir meus ativos — R$97"
            variant="gold"
            size="lg"
            fullWidth
          />
        </div>

        {/* Signature — verbatim do usuário */}
        <div className="mt-14 md:mt-16 max-w-[560px] mx-auto pt-7 border-t border-white/15 text-center">
          <p
            className="text-[clamp(1.4rem,2vw,1.7rem)] leading-tight"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              backgroundImage:
                "linear-gradient(90deg, #E6C674 0%, #E8A75A 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Adrian Carvalho
          </p>
          <p className="mt-1.5 text-white/85 text-[13px] md:text-[14.5px] font-medium">
            Engenheiro Patrimonial. CEO da Quartavia.
          </p>
          <p className="mt-2 text-white/55 text-[12px] md:text-[13px] leading-[1.6]">
            Ex-primo. Tio com 100+ ativos. 1.917 familias. R$3 bilhões sob aconselhamento.
          </p>
        </div>
      </div>
    </section>
  );
}
