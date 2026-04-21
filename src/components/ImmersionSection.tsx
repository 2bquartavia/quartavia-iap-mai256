import { useEffect, useRef } from "react";
import PillButton from "@/components/PillButton";
import heroBg from "@/assets/hero-bg.webp";

const lessons = [
  {
    n: "01",
    tag: "Fundamentos",
    title: "A metodologia que torna o patrimônio inevitável",
    desc: "Você vai entender por que o Quarto Caminho é a única metodologia capaz de construir renda passiva vitalícia em poucos anos, de forma segura e sem complicação. Aqui você desvenda o meta-sistema que combina decisão, estruturação e multiplicação para criar patrimônio mesmo num Brasil cíclico e inflacionário.",
  },
  {
    n: "02",
    tag: "Estruturação",
    title: "O mapa patrimonial que ninguém te ensinou",
    desc: "Você vai receber a combinação dos 3 motores que determinam sua velocidade rumo à liberdade: Aporte Mensal, Reserva de Valor e Capacidade de Pagamento. Com esse desenho, enxerga com clareza para onde seu dinheiro deve ir e como construir ativos antes mesmo de pensar em investir.",
  },
  {
    n: "03",
    tag: "Multiplicação",
    title: "A arquitetura completa da liberdade patrimonial",
    desc: "Como usar decisão, estruturação e multiplicação para fazer o patrimônio trabalhar por você. Sistema de Decisão: comportamentos, princípios e neuroeconomia. Sistema de Estruturação: clareza, auditoria e engenharia. Sistema de Multiplicação: os mecanismos que aceleram a renda recorrente.",
  },
  {
    n: "04",
    tag: "Alavancagem inteligente",
    title: "Múltiplos picos de ganho de capital",
    desc: "A estratégia mais poderosa do Quarto Caminho: como criar múltiplos picos de ganho usando o mecanismo mais seguro e mais negligenciado pela alta renda brasileira — sem precisar ter imóvel, se endividar ou correr riscos desnecessários. De longe, o encontro mais transformador da imersão.",
  },
  {
    n: "05",
    tag: "Renda passiva vitalícia",
    title: "Imóveis subutilizados em ativos autopagantes",
    desc: "Como transformar imóveis quitados ou subutilizados em ativos que geram fluxo de caixa, liquidez e crescimento patrimonial ao mesmo tempo. A estratégia usada pelas famílias mais ricas para fabricar renda sem depender de aluguel ou da apreciação lenta do mercado.",
  },
];

export default function ImmersionSection() {
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
    <section id="imersao" className="immersion" data-immersion-root ref={rootRef}>
      <div className="immersion__orbs" aria-hidden>
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
        <span className="orb orb--4" />
        <span className="orb orb--5" />
      </div>
      <div className="wrap immersion__intro">
        <div className="immersion__intro-left">
          <span className="immersion__eyebrow">A Imersão</span>
          <h2 className="display immersion__title">
            A imersão mais completa da QuartaVia para quem quer fazer o{" "}
            <em>patrimônio crescer</em> sem trabalhar mais.
          </h2>
        </div>

        <div className="immersion__intro-right">
          <p className="immersion__lead">
            <strong>5 encontros</strong> pra você sair do improviso financeiro e entrar num plano
            real de construção de patrimônio — usando alavancagem, crédito inteligente e os ativos
            certos que se pagam sozinhos.
          </p>

          <ul className="info-cards" aria-label="Informações da imersão">
            <li className="info-card">
              <span className="info-card__icon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="14" height="11" rx="2" />
                  <path d="M17 10l4-2v8l-4-2z" />
                </svg>
              </span>
              <div className="info-card__body">
                <span className="info-card__label">Encontros</span>
                <span className="info-card__value">5 aulas ao vivo</span>
                <span className="info-card__hint">100% online · com você ao vivo</span>
              </div>
            </li>

            <li className="info-card">
              <span className="info-card__icon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M3 10h18M8 2v4M16 2v4" />
                </svg>
              </span>
              <div className="info-card__body">
                <span className="info-card__label">Quando</span>
                <span className="info-card__value">25 a 29 de maio</span>
                <span className="info-card__hint">segunda a sexta-feira</span>
              </div>
            </li>

            <li className="info-card">
              <span className="info-card__icon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <div className="info-card__body">
                <span className="info-card__label">Horário</span>
                <span className="info-card__value">20h (Brasília)</span>
                <span className="info-card__hint">aprox. 90 min por aula</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        data-immersion-track
        className="immersion__scroll"
        style={{ height: `${lessons.length * 100}vh` }}
      >
        <div
          data-immersion-sticky
          className="immersion__sticky"
          style={{ ["--hero-bg" as string]: `url(${heroBg})` }}
        >
          <div className="wrap immersion__stage">
            <div className="immersion__stage-head">
              <div className="immersion__progress">
                {lessons.map((l, i) => (
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
                {lessons.map((l, i) => (
                  <article
                    key={l.n}
                    data-immersion-card
                    className={`lesson-card ${i === 0 ? "is-active" : ""}`}
                    aria-hidden={i !== 0}
                  >
                    <div className="lesson-card__top">
                      <span className="lesson-card__n">{l.n}</span>
                      <span className="lesson-card__tag">{l.tag}</span>
                    </div>
                    <h4 className="lesson-card__title">{l.title}</h4>
                    <p className="lesson-card__desc">{l.desc}</p>
                    <div className="lesson-card__foot">
                      <span>Encontro {l.n} de 0{lessons.length}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap immersion__close">
        <p className="immersion__close-text">
          A metodologia já foi validada por <strong>mais de 3.000 famílias</strong> colecionadoras
          de ativos — e quem garantir o <em>Lote ZERO</em> poderá acessá-la na melhor condição
          possível. Apenas para quem estiver no grupo de WhatsApp no dia <strong>26 de abril</strong>.
        </p>
        <PillButton
          label="Entrar no grupo e garantir Lote ZERO"
          variant="gold"
          size="lg"
        />
      </div>
    </section>
  );
}
