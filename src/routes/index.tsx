import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  LineChart,
  Layers,
  Briefcase,
  Target,
  Zap,
  Check,
} from "lucide-react";
import PillButton from "@/components/PillButton";
import Ticker from "@/components/Ticker";
import ImmersionSection from "@/components/ImmersionSection";
import adrianPortrait from "@/assets/adrian.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum Capital — Inteligência para o Mercado Financeiro" },
      {
        name: "description",
        content:
          "Estratégias profissionais de renda variável, renda fixa e ativos alternativos. Análises diárias, gestão de risco e mentoria para investidores que pensam grande.",
      },
      { property: "og:title", content: "Aurum Capital — Inteligência para o Mercado Financeiro" },
      {
        property: "og:description",
        content:
          "Estratégias profissionais de renda variável, renda fixa e ativos alternativos para investidores exigentes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      {/* TOP BAR — fixed */}
      <div
        className="fixed top-0 inset-x-0 z-50 text-white text-center py-2 px-4 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ background: "#cc7514" }}
      >
        OPORTUNIDADE EXCLUSIVA PARA PROFISSIONAIS COM RENDA ACIMA DE R$ 20 MIL
      </div>

      {/* HERO */}
      <section className="hero" style={{ paddingTop: "2.25rem" }}>
        <div className="hero__inner">
          <nav className="hero__nav">
            <div className="hero__brand">
              Aurum<span>.</span>
            </div>
            <div className="hero__nav-links">
              <a href="#estrategias">Estratégias</a>
              <a href="#metodo">Método</a>
              <a href="#resultados">Resultados</a>
              <a href="#contato">Contato</a>
            </div>
            <PillButton label="Acessar" variant="gold" />
          </nav>

          <div className="hero__layout">
            <div className="hero__content">
              <span className="hero__pill">
                <span className="hero__pill-dot" />
                Imersão Alavanca Patrimonial
              </span>
              <h1 className="hero__h1">
                IMERSÃO ALAVANCA <em>PATRIMONIAL</em>
              </h1>
              <p className="hero__lead">
                Descubra como ter ativos que pagam o seu custo de vida hoje — sem depender do seu
                trabalho.
                <br />
                <strong style={{ color: "var(--ink)" }}>
                  Pré-Venda do Lote ZERO no dia 26/04
                </strong>
              </p>

              <ul className="hero__bullets">
                {[
                  "Independente do seu nível de conhecimento em finanças",
                  "Sem correr riscos desnecessários",
                  "Sem fazer esforços adicionais",
                ].map((b) => (
                  <li key={b}>
                    <span className="hero__bullets-check">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="hero__actions">
                <PillButton
                  label="Quero garantir minha vaga no Lote ZERO"
                  variant="gold"
                  icon={<ArrowRight size={18} strokeWidth={2.2} />}
                />
              </div>
              <p className="hero__fineprint">
                Acesso exclusivo ao LOTE ZERO para quem entrar no grupo de WhatsApp.
              </p>
            </div>

            <div className="hero__portrait">
              <img src={adrianPortrait} alt="Adrian Almeida no palco da Mansão Davos" />
              <div className="hero__portrait-tag">
                <strong>Adrian Almeida</strong>
                <span>Mansão Davos · QuartaVia</span>
              </div>
            </div>
          </div>
        </div>
        <Ticker />
      </section>

      {/* IMMERSION — segunda dobra */}
      <ImmersionSection />

      <div className="wrap">
        <div className="rule" />
      </div>

      {/* ESTRATEGIAS */}
      <section id="estrategias" className="section">
        <div className="wrap">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">Estratégias</span>
            <h2 className="display text-4xl md:text-5xl mt-4">
              Cinco frentes de <em>capital inteligente</em>, uma única tese: disciplina compõe
              juros.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp size={22} strokeWidth={1.8} />,
                title: "Renda Variável",
                desc: "Carteira recomendada com ações brasileiras, BDRs e setoriais selecionados sob critério fundamentalista.",
              },
              {
                icon: <ShieldCheck size={22} strokeWidth={1.8} />,
                title: "Renda Fixa Premium",
                desc: "Títulos pré, pós e indexados ao IPCA com curadoria de crédito e otimização tributária.",
              },
              {
                icon: <LineChart size={22} strokeWidth={1.8} />,
                title: "Quant & Long-Short",
                desc: "Modelos sistemáticos com baixa correlação aos índices, calibrados por nossa mesa quantitativa.",
              },
              {
                icon: <Layers size={22} strokeWidth={1.8} />,
                title: "Internacional",
                desc: "Acesso a ETFs, ações dos EUA e fundos globais com estrutura cambial e fiscal otimizada.",
              },
              {
                icon: <Briefcase size={22} strokeWidth={1.8} />,
                title: "Alternativos",
                desc: "FIIs, FI-Infra, private equity e ativos digitais para diversificação de portfólio sofisticado.",
              },
              {
                icon: <Target size={22} strokeWidth={1.8} />,
                title: "Wealth Planning",
                desc: "Sucessão, holding patrimonial e proteção fiscal para grandes patrimônios.",
              },
            ].map((c) => (
              <div key={c.title} className="card-soft">
                <div className="card-soft__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METODO — DARK */}
      <section id="metodo" className="section s-ink">
        <div className="wrap">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="eyebrow">O método Aurum</span>
              <h2 className="display text-4xl md:text-5xl mt-4">
                Quatro etapas que transformam <em>volatilidade</em> em vantagem.
              </h2>
              <p className="mt-6 text-white/65 leading-relaxed">
                Não vendemos previsões. Construímos um processo replicável de análise, alocação,
                execução e revisão — o mesmo usado por gestoras institucionais.
              </p>
              <div className="mt-8">
                <PillButton label="Conhecer o método completo" variant="gold" />
              </div>
            </div>
            <div className="lg:col-span-7">
              {[
                {
                  n: "01",
                  t: "Diagnóstico de portfólio",
                  d: "Mapeamos perfil, horizonte, fluxo de caixa e exposição atual a cada classe de ativo.",
                },
                {
                  n: "02",
                  t: "Tese de alocação",
                  d: "Definimos a fronteira eficiente personalizada com nossos cenários macro proprietários.",
                },
                {
                  n: "03",
                  t: "Execução disciplinada",
                  d: "Ordens limitadas, rebalanceamentos programados e gestão ativa de risco com stops dinâmicos.",
                },
                {
                  n: "04",
                  t: "Revisão trimestral",
                  d: "Reuniões com seu especialista para revisar tese, performance e ajustes táticos.",
                },
              ].map((s) => (
                <div key={s.n} className="step" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="step__n">{s.n}</div>
                  <div>
                    <h4 style={{ color: "rgba(255,255,255,0.95)" }}>{s.t}</h4>
                    <p style={{ color: "rgba(255,255,255,0.6)" }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS / TESTIMONIAL */}
      <section id="resultados" className="section">
        <div className="wrap">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">Resultado</span>
              <p className="quote mt-6">
                “Em três anos com a Aurum, troquei a ansiedade do home broker por um processo
                claro. Meu patrimônio cresceu 62% — mas o que mais valeu foi dormir tranquilo
                durante as quedas.”
              </p>
              <div className="quote-author">
                <div className="quote-author__avatar">RM</div>
                <div>
                  <strong>Ricardo Monteiro</strong> · <span>CFO, indústria de bens de capital</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="card-soft" style={{ background: "var(--gold-pale)", borderColor: "var(--gold-border)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <Zap size={20} className="text-gold" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-gold">
                    Performance · Carteira Aurum 60/40
                  </span>
                </div>
                {[
                  { l: "12 meses", v: "+24,8%", b: "CDI: 11,2%" },
                  { l: "36 meses", v: "+62,4%", b: "CDI: 36,1%" },
                  { l: "Desde início", v: "+218%", b: "CDI: 92%" },
                ].map((r) => (
                  <div
                    key={r.l}
                    className="flex items-center justify-between py-4 border-t border-gold-border/60 first:border-t-0"
                  >
                    <div>
                      <div className="text-sm text-ink-3">{r.l}</div>
                      <div className="text-xs text-ink-4 mt-0.5">{r.b}</div>
                    </div>
                    <div className="font-display text-2xl font-medium text-ink">{r.v}</div>
                  </div>
                ))}
                <p className="text-xs text-ink-4 mt-4 leading-relaxed">
                  Performance histórica não é garantia de resultados futuros. Dados auditados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="wrap">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="eyebrow">Por que Aurum</span>
            <h2 className="display text-4xl md:text-5xl mt-4">
              O que separa um investidor amador de um <em>alocador profissional</em>.
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              "Mesa proprietária com 18 analistas CNPI dedicados",
              "Relatórios diários antes da abertura do pregão",
              "Acesso direto ao seu especialista — sem call center",
              "Custódia em corretoras top-tier auditadas",
              "Modelos de risco rebalanceados em tempo real",
              "Transparência total: sem rebates ocultos",
            ].map((p) => (
              <div
                key={p}
                className="flex items-start gap-4 py-5 border-t border-border last:border-b"
              >
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold-pale border border-gold-border text-gold flex-shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-lg text-ink">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="contato" className="section">
        <div className="wrap">
          <div className="cta-banner">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <span className="eyebrow" style={{ color: "var(--gold-bright)" }}>
                  Próximo passo
                </span>
                <h2 className="display text-3xl md:text-5xl mt-4 text-white">
                  Agende uma <em>conversa estratégica</em> de 30 minutos.
                </h2>
                <p className="mt-5 text-white/70 max-w-xl leading-relaxed">
                  Sem compromisso. Você sai com um diagnóstico do seu portfólio atual e três
                  oportunidades específicas para os próximos 12 meses.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <PillButton label="Agendar conversa" variant="gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div>
              <div className="hero__brand text-2xl mb-3">
                Aurum<span style={{ color: "var(--gold-bright)" }}>.</span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">
                Inteligência financeira para investidores que pensam em décadas, não em pregões.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Estratégias
              </h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#">Renda Variável</a></li>
                <li><a href="#">Renda Fixa</a></li>
                <li><a href="#">Quant</a></li>
                <li><a href="#">Internacional</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Empresa
              </h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Time</a></li>
                <li><a href="#">Carreiras</a></li>
                <li><a href="#">Imprensa</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Contato
              </h5>
              <ul className="space-y-2 text-sm">
                <li>contato@aurum.cap</li>
                <li>+55 11 4000-0000</li>
                <li>Av. Brigadeiro Faria Lima, 3477</li>
                <li>São Paulo · SP</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40">
            <span>© 2025 Aurum Capital. Todos os direitos reservados.</span>
            <span>
              Aurum Capital é agente autônomo de investimentos. Investimentos envolvem riscos.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
