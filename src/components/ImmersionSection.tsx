import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      const sticky = stickyRef.current;
      if (!el || !sticky) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - sticky.offsetHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeIndex = Math.min(
    lessons.length - 1,
    Math.floor(progress * lessons.length * 0.999),
  );

  return (
    <section id="imersao" className="immersion">
      {/* Intro / hero da seção */}
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
            Serão <strong>5 encontros ao vivo</strong> para desenhar um plano real e personalizado
            para alavancar o que você já tem, sem precisar aportar mais e sem depender só do seu
            trabalho para crescer.
          </p>

          <p className="immersion__kicker">5 encontros ao vivo · 25 a 29 de maio</p>
        </div>
      </div>

      {/* Scroll horizontal sticky */}
      <div
        ref={trackRef}
        className="immersion__scroll"
        style={{ height: `${lessons.length * 100}vh` }}
      >
        <div ref={stickyRef} className="immersion__sticky">
          <div className="wrap immersion__stage">
            <div className="immersion__stage-head">
              <div className="immersion__progress">
                {lessons.map((l, i) => (
                  <div
                    key={l.n}
                    className={`immersion__dot ${i === activeIndex ? "is-active" : ""} ${i < activeIndex ? "is-past" : ""}`}
                  >
                    <span>{l.n}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="immersion__rail-wrap">
              <div
                className="immersion__rail"
                style={{
                  transform: `translateX(calc(${-activeIndex * 100}% - ${activeIndex * 24}px))`,
                }}
              >
                {lessons.map((l) => (
                  <article key={l.n} className="lesson-card">
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

      {/* Fechamento + CTA */}
      <div className="wrap immersion__close">
        <p className="immersion__close-text">
          A metodologia já foi validada por <strong>mais de 3.000 famílias</strong> colecionadoras
          de ativos — e quem garantir o <em>Lote ZERO</em> poderá acessá-la na melhor condição
          possível. Apenas para quem estiver no grupo de WhatsApp no dia <strong>26 de abril</strong>.
        </p>
        <PillButton
          label="Entrar no grupo e garantir Lote ZERO"
          variant="gold"
          icon={<ArrowRight size={18} strokeWidth={2.2} />}
        />
      </div>
    </section>
  );
}
