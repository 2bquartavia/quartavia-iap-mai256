import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import PillButton from "@/components/PillButton";
import Ticker from "@/components/Ticker";
import ImmersionSection from "@/components/ImmersionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SpeakerSection from "@/components/SpeakerSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import HeroPortrait from "@/components/HeroPortrait";

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

            <HeroPortrait />
          </div>
        </div>
        <Ticker />
      </section>

      {/* IMMERSION — segunda dobra */}
      <ImmersionSection />

      {/* DEPOIMENTOS */}
      <TestimonialsSection />

      {/* SPEAKER */}
      <SpeakerSection />

      {/* CTA FINAL — Cadastro WhatsApp */}
      <CTAFinalSection />

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
