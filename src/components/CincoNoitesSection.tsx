import { useEffect, useRef } from "react";
import { isLeadModalOpenNow } from "@/components/leadModalStore";
import { Clock, User, ShieldCheck } from "lucide-react";
import PillButton from "@/components/PillButton";
import heroBg from "@/assets/hero-bg.webp";

const noites = [
  {
    n: "01",
    tag: "Infraestrutura Patrimonial",
    title: "Por que você está preso no caminho do primo",
    desc: "E qual é o Quarto Caminho que não passa pelo mercado financeiro. Os 3 princípios que todo bilionário usa para construir fortuna sem ter que pagar por isso.",
  },
  {
    n: "02",
    tag: "Mapa da Renda Passiva",
    title: "Os 3 motores financeiros que você já tem (e provavelmente só usa 1)",
    desc: "Você vai mapear o gap. A sequência lógica de mecanismos que você precisa para construir liberdade em anos, não em décadas.",
  },
  {
    n: "03",
    tag: "Arsenal de Mecanismos",
    title: "O papel de cada estratégia na Engenharia Patrimonial",
    desc: "Como pessoas fazem isso sem ter que aprender e sem correr riscos amadores fazendo sozinho. Comprar imóveis com desconto em leilão, construir casas de alto padrão com financiamento, instalar usinas solares que se pagam, comprar imóveis financiados nos Estados Unidos.",
  },
  {
    n: "04",
    tag: "Mercados Milenares",
    title: "Imobiliário, agro, energia — onde o tio ganha dinheiro",
    desc: "Os mercados onde o tio ganha dinheiro enquanto o primo perde o sono. Você vai entender exatamente onde o seu dinheiro deve estar para crescer na velocidade que ele realmente pode — e não a que o sistema determina como lei da natureza. (Zona de originação, lembra?)",
  },
  {
    n: "05",
    tag: "Mecanismo de Alavancagem",
    title: "Crédito, capacidade de pagamento e capital de terceiros",
    desc: "Como adquirir ativos sem tirar dinheiro do bolso. 1) Como usar alavancagem para comprar imóveis pagos por inquilinos. 2) Como usar os seus imóveis quitados para levantar capital. (Você pode transformar um imóvel quitado em 3 sem ter que vender.)",
  },
];

export default function CincoNoitesSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const track = root.querySelector<HTMLElement>("[data-immersion-track]");
    const sticky = root.querySelector<HTMLElement>("[data-immersion-sticky]");
    const railWrap = root.querySelector<HTMLElement>(".immersion__rail-wrap");
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-immersion-card]"));
    const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-immersion-dot]"));

    if (!track || !sticky || !railWrap || !cards.length) return;

    sticky.style.setProperty("--hero-bg", `url(${heroBg})`);
    const img = new Image();
    img.src = heroBg;

    let raf = 0;
    let lastIdx = -1;

    const setActive = (idx: number) => {
      cards.forEach((card, i) => {
        card.classList.toggle("is-active", i === idx);
        card.setAttribute("aria-hidden", i === idx ? "false" : "true");
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === idx);
        dot.classList.toggle("is-past", i < idx);
      });
    };

    const updateClip = (expand: number) => {
      const r = railWrap.getBoundingClientRect();
      const top = Math.max(0, r.top);
      const left = Math.max(0, r.left);
      const right = Math.max(0, window.innerWidth - r.right);
      const bottom = Math.max(0, window.innerHeight - r.bottom);
      const t = Math.max(0, Math.min(1, expand));
      const itop = top * (1 - t);
      const ileft = left * (1 - t);
      const iright = right * (1 - t);
      const ibottom = bottom * (1 - t);
      const radius = 28 * (1 - t);
      sticky.style.setProperty(
        "--card-clip",
        `inset(${itop}px ${iright}px ${ibottom}px ${ileft}px round ${radius}px)`,
      );
    };

    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - sticky.offsetHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const isMobile = window.innerWidth <= 760;
      const expand = isMobile ? Math.min(1, Math.pow(p, 0.18) * 1.05) : p;

      updateClip(expand);

      const idx = Math.min(cards.length - 1, Math.floor(p * cards.length * 0.999));
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActive(idx);
      }
    };

    const onScroll = () => {
      if (isLeadModalOpenNow()) return;
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    setActive(0);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="cinco-noites" className="immersion" data-immersion-root ref={rootRef}>
      <div className="immersion__orbs" aria-hidden>
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
        <span className="orb orb--4" />
        <span className="orb orb--5" />
      </div>
      <div className="wrap immersion__intro immersion__intro--center">
        <h2 className="display immersion__title">
          Em 5 noites, eu entrego essa engenharia. Uma alavanca por noite:
        </h2>
      </div>

      <div
        data-immersion-track
        className="immersion__scroll"
        style={{ height: `${noites.length * 70}vh` }}
      >
        <div
          data-immersion-sticky
          className="immersion__sticky"
          style={{ ["--hero-bg" as string]: `url(${heroBg})` }}
        >
          <div className="wrap immersion__stage">
            <div className="immersion__stage-head">
              <div className="immersion__progress">
                {noites.map((l, i) => (
                  <div
                    key={l.n}
                    data-immersion-dot
                    className={`immersion__dot ${i === 0 ? "is-active" : ""}`}
                  >
                    <span>{l.n}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="immersion__rail-wrap">
              <div className="immersion__stack">
                {noites.map((l, i) => (
                  <article
                    key={l.n}
                    data-immersion-card
                    className={`lesson-card ${i === 0 ? "is-active" : ""}`}
                    aria-hidden={i !== 0}
                  >
                    <div className="lesson-card__top">
                      <span className="lesson-card__n">{l.n}ª noite</span>
                      <span className="lesson-card__tag">{l.tag}</span>
                    </div>
                    <h4 className="lesson-card__title">{l.title}</h4>
                    <p className="lesson-card__desc">{l.desc}</p>
                    <div className="lesson-card__foot">
                      <span>Noite {l.n} de 0{noites.length} · 20h ao vivo</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap immersion__close relative overflow-hidden">
        {/* Background — engineering grid blueprint */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(3,26,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,26,40,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Header strip — kicker + meta evento */}
        <div className="relative w-full max-w-[680px] mx-auto flex items-center justify-between gap-3 pb-3 border-b border-[#031a28]/15 px-2">
          <span className="inline-flex items-center gap-2 font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.28em] font-bold text-[#031a28]/65">
            <span
              aria-hidden
              className="block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse"
            />
            Imersão ao vivo
          </span>
          <span className="font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.22em] font-bold text-[#031a28]/55">
            Maio · 2026
          </span>
        </div>

        {/* Calendar — 5 colunas separadas só por hairline vertical, sem fundo */}
        <div className="relative w-full max-w-[640px] mx-auto px-2">
          <ol className="relative grid grid-cols-5">
            {[
              { dia: 25, dow: "SEG" },
              { dia: 26, dow: "TER" },
              { dia: 27, dow: "QUA" },
              { dia: 28, dow: "QUI" },
              { dia: 29, dow: "SEX" },
            ].map((d, i) => (
              <li
                key={d.dia}
                className={`cn-day-cell relative flex flex-col items-center justify-center gap-1 py-3 sm:py-4 ${
                  i > 0 ? "border-l border-[#031a28]/15" : ""
                } ${i === 0 ? "cn-day-cell-active" : ""}`}
              >
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[#031a28]/55">
                  {d.dow}
                </span>
                <span
                  className="font-bold tabular-nums text-[#031a28] text-[clamp(1.5rem,3.6vw,2rem)] leading-none tracking-tight"
                  style={{
                    fontFamily:
                      '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                  }}
                >
                  {d.dia}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Headline — texto verbatim do usuário, sem cortes */}
        <p className="relative text-[#031a28] text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.5] font-medium max-w-[640px] text-balance text-center">
          Cada noite ao vivo. <span className="font-semibold">20h.</span>{" "}
          <span className="font-semibold">Com Adrian.</span>{" "}
          <span className="font-bold">Você entende, pergunta, implementa e nós</span>
        </p>

        {/* CTA — pill intrínseca com glow pulsante */}
        <div className="relative inline-block mx-auto">
          <span aria-hidden className="cn-cta-glow" />
          <div className="relative">
            <PillButton
              label="Entrar nas 5 noites — R$97"
              variant="gold"
              size="lg"
            />
          </div>
        </div>

        {/* Garantia com ícone shield */}
        <p className="relative inline-flex items-center gap-2 text-[#031a28]/70 text-[12.5px] md:text-[14px] font-medium px-5 text-center">
          <ShieldCheck
            className="h-[18px] w-[18px] text-emerald-600 shrink-0"
            strokeWidth={2.3}
          />
          <span>Garantia de 30 dias + Garantia da Quarta-feira · Risco zero.</span>
        </p>
      </div>
    </section>
  );
}