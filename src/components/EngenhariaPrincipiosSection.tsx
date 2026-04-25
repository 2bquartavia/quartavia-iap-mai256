import { Landmark, Home, Clock, Building2, Gavel, Scale, Coins } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const iconsRef = useRef<HTMLDivElement>(null);
  const [iconsInView, setIconsInView] = useState(false);

  useEffect(() => {
    const el = iconsRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setIconsInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIconsInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,193,77,0.08), transparent 55%), linear-gradient(180deg, rgba(3,26,40,0.6), transparent 20%, transparent 80%, rgba(3,26,40,0.6))",
        }}
      />

      <div className="relative mx-auto w-full max-w-[960px] px-5 md:px-8 py-20 md:py-24 text-center">
        <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
          <span aria-hidden className="block h-px w-7 bg-white/35" />
          Engenharia Patrimonial
          <span aria-hidden className="block h-px w-7 bg-white/35" />
        </span>
        <h2 className="mt-4 md:mt-5 font-semibold leading-[1.08] tracking-[-0.02em] text-white text-[clamp(1.7rem,3.4vw,2.85rem)]">
          A Engenharia Patrimonial funciona com{" "}
          <span style={{ color: "#FFC14D" }}>dois princípios.</span>
        </h2>

        {/* DUAS COLUNAS — sólidas, sem curvas, separadas só por borda */}
        <div className="mt-9 md:mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 border-t border-b border-white/20 text-left">
          <article className="px-5 md:px-7 py-7 md:py-9 md:border-r border-white/20">
            <span
              className="font-mono text-[12px] md:text-[12px] uppercase tracking-[0.24em] font-bold"
              style={{ color: "#FFC14D" }}
            >
              01 · Alavancagem
            </span>
            <h3 className="mt-3 text-white text-[clamp(1.15rem,2vw,1.45rem)] font-semibold leading-[1.22] tracking-[-0.018em]">
              Use o dinheiro dos outros.
            </h3>
            <p className="mt-3.5 text-white/80 text-[14.5px] md:text-[15.5px] leading-[1.7]">
              Você compra um imóvel de{" "}
              <span className="font-semibold text-white">R$ 500 mil</span>. Dá{" "}
              <span className="font-semibold text-white">R$ 150 mil</span> de entrada. O banco financia o resto. O inquilino paga{" "}
              <span className="font-semibold text-white">R$ 3.500/mês</span> de aluguel — que paga a parcela. Em{" "}
              <span className="font-semibold text-white">15 anos</span>, o imóvel é seu. Quitado.
            </p>
            <p className="mt-4 text-white text-[14.5px] md:text-[15.5px] font-semibold leading-[1.5]">
              Quem pagou? O inquilino.{" "}
              <span className="text-white/55 font-normal">Não você.</span>
            </p>
          </article>

          <article className="px-5 md:px-7 py-7 md:py-9 border-t md:border-t-0 border-white/20">
            <span
              className="font-mono text-[12px] md:text-[12px] uppercase tracking-[0.24em] font-bold"
              style={{ color: "#FFC14D" }}
            >
              02 · Arbitragem
            </span>
            <h3 className="mt-3 text-white text-[clamp(1.15rem,2vw,1.45rem)] font-semibold leading-[1.22] tracking-[-0.018em]">
              Compre na hora certa, do jeito certo.
            </h3>
            <p className="mt-3.5 text-white/80 text-[14.5px] md:text-[15.5px] leading-[1.7]">
              Quando você compra no leilão um imóvel por{" "}
              <span className="font-semibold text-white">R$ 600 mil</span> que vale{" "}
              <span className="font-semibold text-white">R$ 1 milhão</span>, você criou{" "}
              <span className="font-semibold text-white">R$ 400 mil</span> de patrimônio no ato.
            </p>
            <p className="mt-4 text-white text-[14.5px] md:text-[15.5px] font-semibold leading-[1.5]">
              Sem esperar. Sem sorte.{" "}
              <span className="text-white/55 font-normal">
                Só por saber onde comprar e como estruturar.
              </span>
            </p>
          </article>
        </div>

        {/* Texto de conexão — combinação dos princípios */}
        <div className="mt-10 md:mt-14 mx-auto max-w-[720px] text-left space-y-5 md:space-y-6 text-white/85 text-[15px] md:text-[16.5px] leading-[1.7]">
          <p>
            Quando você combina alavancagem e arbitragem com a engenharia certa, você não paga pelos ativos que constrói. Você alavanca. Você posiciona o seu dinheiro na etapa de{" "}
            <span className="font-semibold text-white">originação</span>! (Grava essa palavra.) Originação é a zona onde o dinheiro de verdade é criado, não só onde ele é revendido com margem. O sistema financeiro funciona como uma pirâmide, onde quem compra produtos financia quem gera riqueza de verdade.
          </p>
          <p>
            Eu sistematizei isso depois de{" "}
            <span className="font-semibold text-white">+3.215 reuniões</span>,{" "}
            <span className="font-semibold text-white">100+ ativos pessoais</span> e{" "}
            <span className="font-semibold text-white">R$ 3 bilhões sob aconselhamento</span>. Não inventei — organizei o que os tios fazem por instinto há décadas.
          </p>
        </div>

        {/* Icon set — desktop: 3D card flip wave (md+); mobile: marquee lateral infinito */}
        <div ref={iconsRef}>

        {/* MOBILE — marquee "two worlds": mono à esquerda, vivo à direita, separados por linha */}
        <div
          data-active={iconsInView ? "true" : "false"}
          className="md:hidden mt-12 ep-icons-marquee"
          aria-hidden
        >
          {/* Camada base — mono (visível só no lado esquerdo via mask) */}
          <div className="ep-marquee-base">
            <div className="ep-icons-track py-2">
              {[...ICONS, ...ICONS].map(({ Icon, label }, i) => (
                <div
                  key={`mono-${i}`}
                  title={label}
                  className="ep-marquee-item"
                >
                  <Icon size={26} strokeWidth={1.7} />
                </div>
              ))}
            </div>
          </div>

          {/* Camada overlay — vivo/colorido (visível só no lado direito via mask) */}
          <div className="ep-marquee-overlay">
            <div className="ep-icons-track py-2">
              {[...ICONS, ...ICONS].map(({ Icon, label }, i) => (
                <div
                  key={`color-${i}`}
                  title={label}
                  className="ep-marquee-item"
                >
                  <Icon size={26} strokeWidth={1.7} color="#FFC14D" />
                </div>
              ))}
            </div>
          </div>

          {/* Linha divisória central — fronteira entre os dois mundos */}
          <div className="ep-marquee-divider" aria-hidden />
        </div>

        {/* DESKTOP — grid 7 cols com 3D flip wave */}
        <div
          data-active={iconsInView ? "true" : "false"}
          className="ep-icons-grid hidden md:grid mt-16 grid-cols-7 gap-4 justify-items-center"
        >
          {ICONS.map(({ Icon, label }, i) => (
            <div
              key={i}
              aria-label={label}
              title={label}
              className="ep-icon w-full aspect-square max-w-[96px]"
              style={{
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="ep-icon-card"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="ep-icon-face ep-icon-front">
                  <Icon size={28} strokeWidth={1.6} color="#FFC14D" />
                </div>
                <div className="ep-icon-face ep-icon-back">
                  <Icon size={28} strokeWidth={2} color="#031a28" />
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>{/* fecha wrapper iconsRef */}
      </div>
    </section>
  );
}
