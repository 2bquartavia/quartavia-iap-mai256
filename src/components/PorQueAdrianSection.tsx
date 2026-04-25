import adrianEsposa from "@/assets/adrian-esposa.jpg";

const COLUMNS: { n: string; tag: string; paras: string[] }[] = [
  {
    n: "01",
    tag: "Era primo",
    paras: [
      "Comecei como estagiário num escritório de investimentos. Passei no CFP. Virei sócio de um dos maiores escritórios do Brasil. Atendia famílias com patrimônios de R$5 milhões a R$500 milhoes.",
      "E nos primeiros anos, eu acreditava no que vendia.",
      "Até que percebi que meus próprios investimentos — supostamente os melhores, montados pelos melhores analistas — andavam de lado. Enquanto os poucos ativos que eu tinha na economia real cresciam mais rápido, com menos risco e com mais previsibilidade.",
    ],
  },
  {
    n: "02",
    tag: "Virei tio",
    paras: [
      "E percebi outra coisa: todos os bilionários que eu atendia tinham construído patrimônio na economia real. Nenhum no mercado financeiro. Eles usavam o mercado financeiro pra guardar dinheiro. Não pra construir. Eram todos tios.",
      "Decidi seguir um caminho diferente. Abri mão de R$4 a 5 milhões em participação. Só tive coragem porque meu patrimônio pessoal — construído pelo mesmo método que vou te mostrar na Imersão — já me sustentava. Eu não tinha pago por esses ativos. Eles se pagaram sozinhos.",
    ],
  },
  {
    n: "03",
    tag: "A missão",
    paras: [
      "Hoje: mais de 100 ativos. Imóveis, usinas solares, operações imobiliárias estruturadas, carros antigos (Sim, são ativos. Pelos menos é a desculpa que dou pra minha esposa kkkk), imóveis nos Estados Unidos. Nenhum depende de mim.",
      "Eu criei a QuartaVia pra entregar Engenharia Patrimonial a quem não tem R$5 milhões pra contratar um family office. Nos últimos anos, 1.917 famílias fizeram a transição de primo pra tio com esse método. E em 5 noites por R$97, eu vou te mostrar como.",
    ],
  },
];

export default function PorQueAdrianSection() {
  return (
    <section
      className="relative w-full overflow-x-clip"
      style={{ background: "#0a1f33" }}
    >
      {/* Foto faded como bg — glassmorphism precisa de algo pra desfocar */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
      >
        <img
          src={adrianEsposa}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "blur(60px) saturate(0.55)" }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(255,193,77,0.08), transparent 50%), radial-gradient(ellipse at 0% 80%, rgba(16,185,129,0.04), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10 py-20 md:py-20">
        {/* Eyebrow + h2 — fora do box, no topo */}
        <header className="text-center max-w-[820px] mx-auto mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
            <span aria-hidden className="block h-px w-7 bg-white/35" />
            Quem fala com você
            <span aria-hidden className="block h-px w-7 bg-white/35" />
          </span>
          <h2 className="mt-4 md:mt-5 text-white font-semibold leading-[1.08] tracking-[-0.02em] text-[clamp(1.85rem,4vw,3rem)]">
            Por que eu sou a melhor pessoa{" "}
            <span style={{ color: "#FFC14D" }}>para te ajudar?</span>
          </h2>
        </header>

        {/* MAGAZINE SPREAD — único box rounded com tudo dentro */}
        <div
          className="relative rounded-[24px] overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.045)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            backdropFilter: "blur(18px) saturate(140%)",
            WebkitBackdropFilter: "blur(18px) saturate(140%)",
          }}
        >
          {/* TOP: imagem 1:1 alinhada ao topo + lead quote ao lado */}
          <div className="grid grid-cols-1 md:grid-cols-[clamp(280px,38vw,440px)_1fr] border-b border-white/12">
            {/* Imagem 1:1 — strict square, alinhada ao topo */}
            <div
              className="relative w-full bg-[#031a28]"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img
                src={adrianEsposa}
                alt="Adrian Carvalho com sua esposa"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "top center" }}
                decoding="async"
                loading="lazy"
              />
              {/* Selo flutuante no canto inferior — glass chip */}
              <div
                className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-auto md:max-w-[220px] flex items-center justify-between gap-3 px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(10, 31, 51, 0.75)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <span className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-[0.22em] font-bold text-white/65">
                  Ativos pessoais
                </span>
                <span
                  className="font-bold text-[16px] md:text-[18px] tabular-nums leading-none"
                  style={{ color: "#FFC14D" }}
                >
                  100+
                </span>
              </div>
            </div>

            {/* Lead — coluna direita, padding simétrico 80px top/bottom (md+),
                content centralizado dentro do range pra igualar altura da imagem 1:1 */}
            <div className="px-5 md:px-8 lg:px-10 py-7 md:pt-[80px] md:pb-[80px] flex flex-col justify-center gap-5 md:gap-6">
              <div>
                <span
                  className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.26em] font-bold"
                  style={{ color: "#FFC14D" }}
                >
                  Adrian Carvalho
                </span>
                <p className="mt-1.5 text-white/55 text-[11px] md:text-[12.5px] uppercase tracking-[0.18em] font-semibold">
                  Fundador · QuartaVia · 100+ ativos · R$ 3 bi sob aconselhamento
                </p>
              </div>

              <p
                className="text-white font-semibold text-[clamp(1.45rem,3.2vw,2.4rem)] leading-[1.08] tracking-[-0.018em]"
                style={{
                  fontFamily:
                    '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                  fontStyle: "italic",
                }}
              >
                "Eu fui primo durante{" "}
                <span className="not-italic" style={{ color: "#FFC14D" }}>
                  10 anos
                </span>
                ."
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t border-white/12">
                {[
                  "CFP · Sócio de family office",
                  "Saiu do mercado financeiro",
                  "Constrói só na economia real",
                ].map((bit) => (
                  <span
                    key={bit}
                    className="font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.18em] font-bold text-white/55"
                  >
                    · {bit}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM: 3 colunas horizontais, separadas só por filete */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/12">
            {COLUMNS.map((col) => (
              <article key={col.n} className="px-5 md:px-6 py-6 md:py-7">
                <header className="flex items-baseline gap-2 mb-3.5 pb-3 border-b border-white/12">
                  <span
                    className="font-mono text-[12px] md:text-[13px] uppercase tracking-[0.24em] font-bold"
                    style={{ color: "#FFC14D" }}
                  >
                    {col.n}
                  </span>
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold text-white/65">
                    · {col.tag}
                  </span>
                </header>
                <div className="space-y-3 text-white/82 text-[14px] md:text-[14.5px] leading-[1.65]">
                  {col.paras.map((p, i) => (
                    <p
                      key={i}
                      className={i === 0 ? "text-white/95 font-medium" : ""}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CLOSING */}
        <div className="mt-8 md:mt-10 max-w-[720px] mx-auto text-center">
          <p className="text-white text-[clamp(1.1rem,2vw,1.4rem)] font-semibold leading-[1.4] tracking-[-0.012em]">
            Em{" "}
            <span style={{ color: "#FFC14D" }}>5 noites por R$ 97</span>, eu vou te mostrar exatamente como.
          </p>
        </div>
      </div>
    </section>
  );
}
